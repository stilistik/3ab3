const { Prisma } = require('../generated/prisma-client');
const fs = require('fs');
const prismaSchema = require('../../api/src/generated/prisma-client/prisma-schema');

function readJsonDumpFiles() {
  const users = JSON.parse(fs.readFileSync('./generated/users.json'));
  const items = JSON.parse(fs.readFileSync('./generated/items.json'));
  const consumed = JSON.parse(fs.readFileSync('./generated/consumed.json'));
  const payments = JSON.parse(fs.readFileSync('./generated/payments.json'));
  const diverse_debt = JSON.parse(
    fs.readFileSync('./generated/diverse_debt.json')
  );
  const checklists = JSON.parse(fs.readFileSync('./generated/checklists.json'));
  return { users, items, consumed, payments, checklists, diverse_debt };
}

async function migrateUsers(prisma, oldUsers) {
  console.log('Migrating users ...');

  // delete all existing users
  const users = await prisma.users();
  await Promise.all(
    users.map((user) => {
      return prisma.deleteUser({ id: user.id });
    })
  );

  const consolidated = [];
  for (let oldUser of oldUsers) {
    if (oldUser.username === 'root') continue;

    const user = await prisma.createUser({
      name: oldUser.first_name,
      email:
        oldUser.username === 'philipp.gerber'
          ? 'philipp@rundumeli.ch'
          : `${oldUser.username}@gmail.com`,
      role: oldUser.is_staff ? 'ADMIN' : 'MEMBER',
    });

    consolidated.push({
      id: user.id,
      pk: oldUser.pk,
    });
  }
  console.log('User migration completed.');
  return consolidated;
}

async function migrateProducts(prisma, oldProducts) {
  console.log('Migrating products ...');

  // delete all existing products
  const products = await prisma.products();
  await Promise.all(
    products.map((product) => {
      return prisma.deleteProduct({ id: product.id });
    })
  );

  const consolidated = [];
  for (let oldProduct of oldProducts) {
    const product = await prisma.createProduct({
      name: oldProduct.name,
      price: oldProduct.price,
      index: oldProduct.index,
    });

    consolidated.push({
      id: product.id,
      pk: oldProduct.pk,
    });
  }
  console.log('Product migration completed.');
  return consolidated;
}

async function migratePayments(prisma, users, oldPayments) {
  console.log('Migrating payments ...');
  const consolidated = [];
  for (let oldPayment of oldPayments) {
    const payingUser = await prisma.user({
      id: users.find((el) => el.pk === oldPayment.payer).id,
    });
    const balance = payingUser.balance + oldPayment.amount;
    const payment = await prisma.createPayment({
      user: {
        connect: { id: payingUser.id },
      },
      transaction: {
        create: {
          user: { connect: { id: payingUser.id } },
          date: new Date(oldPayment.date).toISOString(),
          type: 'PAYMENT',
          change: oldPayment.amount,
        },
      },
      date: new Date(oldPayment.date).toISOString(),
      amount: oldPayment.amount,
    });

    await prisma.updateUser({
      where: { id: payingUser.id },
      data: { balance },
    });

    consolidated.push(payment);
  }
  console.log('Payment migration completed.');
  return consolidated;
}

async function migratePurchases(
  prisma,
  oldConsumed,
  oldChecklists,
  usersConsolidated,
  productsConsolidated
) {
  console.log('Migrating purchases ...');
  for (let oldChecklist of oldChecklists) {
    const items = oldConsumed.filter((el) => el.checklist === oldChecklist.pk);

    const itemsByUser = {};
    items.forEach((item) => {
      if (!itemsByUser[item.consumer]) itemsByUser[item.consumer] = [item];
      else itemsByUser[item.consumer].push(item);
    });

    for (let userPk in itemsByUser) {
      const items = itemsByUser[userPk];
      const user = await prisma.user({
        id: usersConsolidated.find((el) => el.pk === parseInt(userPk)).id,
      });
      const total = items.reduce((acc, curr) => {
        return acc + curr.price * curr.count;
      }, 0);

      const balance = user.balance - total;

      const itemInput = items.map((item) => ({
        price: item.price,
        product: {
          connect: {
            id: productsConsolidated.find((product) => product.pk === item.item)
              .id,
          },
        },
        amount: item.count,
        user: { connect: { id: user.id } },
      }));

      const date = new Date(oldChecklist.date).toISOString();

      await prisma.createPurchase({
        total,
        date,
        items: {
          create: itemInput,
        },
        user: {
          connect: { id: user.id },
        },
        transaction: {
          create: {
            user: { connect: { id: user.id } },
            date,
            type: 'PURCHASE',
            change: -total,
          },
        },
      });

      await prisma.updateUser({
        where: { id: user.id },
        data: { balance },
      });
    }
  }
  console.log('Purchase migration completed.');
}

async function migrateNanoCredits(prisma, oldCredits, usersConsolidated) {
  console.log('Migrating nanocredits ...');
  for (let oldCredit of oldCredits) {
    const user = await prisma.user({
      id: usersConsolidated.find((el) => el.pk === oldCredit.debitor).id,
    });
    const balance = user.balance - oldCredit.amount;

    const date = new Date(oldCredit.date).toISOString();
    await prisma.createNanoCredit({
      amount: oldCredit.amount,
      description: oldCredit.desc,
      date,
      user: { connect: { id: user.id } },
      transaction: {
        create: {
          user: { connect: { id: user.id } },
          date,
          type: 'NANOCREDIT',
          change: -oldCredit.amount,
        },
      },
    });

    await prisma.updateUser({
      where: { id: user.id },
      data: { balance },
    });
  }

  console.log('Nanocredit migration completed.');
}

async function main() {
  const prisma = new Prisma({
    endpoint: 'http://localhost:4466',
  });
  const data = readJsonDumpFiles();

  const users = await migrateUsers(prisma, data.users);
  const products = await migrateProducts(prisma, data.items);

  await migratePayments(prisma, users, data.payments);
  await migrateNanoCredits(prisma, data.diverse_debt, users);
  await migratePurchases(
    prisma,
    data.consumed,
    data.checklists,
    users,
    products
  );
}

main().catch((e) => console.error(e));
