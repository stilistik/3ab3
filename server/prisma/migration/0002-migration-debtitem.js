const { Prisma, prisma } = require('../generated/prisma-client');
const fs = require('fs');

async function main() {
  const prisma = new Prisma({
    endpoint: 'http://localhost:4466',
  });

  const nanocredits = await prisma.nanoCredits();

  await Promise.all(
    nanocredits.map((nanocredit) => {
      return new Promise((resolve) => {
        prisma
          .nanoCredit({ id: nanocredit.id })
          .user()
          .then((user) => {
            prisma
              .createDebtItem({
                ...nanocredit,
                transaction: {
                  create: {
                    user: { connect: { id: user.id } },
                    date: nanocredit.date,
                    type: 'DEBTITEM',
                    change: -nanocredit.amount,
                  },
                },
                user: { connect: { id: user.id } },
              })
              .then((nc) => resolve(nc));
          });
      });
    })
  );

  await Promise.all(
    nanocredits.map((nanocredit) =>
      prisma.deleteNanoCredit({ id: nanocredit.id })
    )
  );
}

main().catch((e) => console.error(e));
