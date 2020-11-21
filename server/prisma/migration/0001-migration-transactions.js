const { Prisma, prisma } = require('../generated/prisma-client');
const fs = require('fs');

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

function verifyConsistency(records, oldRecords, field, oldField, type) {
  const recordError = records.find(
    (rec) => !oldRecords.some((oldRec) => oldRec[oldField] === rec[field])
  );
  if (recordError) {
    throw new Error(
      `${type}: Found record inconsistency in record ${JSON.stringify(
        recordError
      )}`
    );
  }
}

async function resolveUsers(prisma, oldUsers) {
  console.log('Resolving users ...');

  // get all users and verify 1:1 consistency by name
  const users = await prisma.users();
  verifyConsistency(users, oldUsers, 'name', 'first_name', 'User');

  const consolidated = users.map((user) => ({
    id: user.id,
    pk: oldUsers.find((oldUser) => oldUser.first_name === user.name).pk,
  }));
  return consolidated;
}

async function resolveProducts(prisma, oldProducts) {
  console.log('Resolving products ...');
  const products = await prisma.products();
  verifyConsistency(products, oldProducts, 'name', 'name', 'Product');

  const consolidated = products.map((product) => ({
    id: product.id,
    pk: oldProducts.find((oldProduct) => oldProduct.name === product.name).pk,
  }));
  return consolidated;
}

async function migratePayments(prisma, users, oldPayments) {
  console.log('Migrating payments ...');

  const consolidated = [];
  for (let oldPayment of oldPayments) {
    const payer = users.find((el) => el.pk === oldPayment.payer);
    if (!payer) continue;
    const payingUser = await prisma.user({
      id: payer.id,
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
    const debitor = usersConsolidated.find((el) => el.pk === oldCredit.debitor);
    if (!debitor) continue;

    const user = await prisma.user({
      id: debitor.id,
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

async function clearTransactions() {
  console.log('Deleting payments...');
  const payments = await prisma.payments();
  await Promise.all(
    payments.map((payment) => prisma.deletePayment({ id: payment.id }))
  );

  console.log('Deleting purchases...');
  const purchases = await prisma.purchases();
  for (let purchase of purchases) {
    const items = await prisma.purchase({ id: purchase.id }).items();
    await Promise.all(items.map((item) => prisma.deleteItem({ id: item.id })));
    await prisma.deletePurchase({ id: purchase.id });
  }

  console.log('Deleting nanocredits...');
  const nanocredits = await prisma.nanoCredits();
  await Promise.all(
    nanocredits.map((n) => prisma.deleteNanoCredit({ id: n.id }))
  );

  console.log('Clearing up remaining transaction remnants...');
  const transactions = await prisma.transactions();
  await Promise.all(
    transactions.map((t) => prisma.deleteTransaction({ id: t.id }))
  );

  console.log('Resetting user balances...');
  const users = await prisma.users();
  for (let user of users) {
    await prisma.updateUser({ where: { id: user.id }, data: { balance: 0 } });
  }
}

async function main() {
  const prisma = new Prisma({
    endpoint: 'http://localhost:4466',
  });
  const data = readJsonDumpFiles();

  await clearTransactions(prisma);

  const users = await resolveUsers(prisma, data.users);
  const products = await resolveProducts(prisma, data.items);

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
