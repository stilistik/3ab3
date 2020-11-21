module.exports = {
  Mutation: {
    async createDebt(root, args, context) {
      const user = await context.prisma.user({ id: args.userId });
      const date = new Date().toISOString();
      const balance = user.balance - args.input.amount;

      const debt = await context.prisma.createDebt({
        user: { connect: { id: user.id } },
        date: date,
        transaction: {
          create: {
            user: { connect: { id: user.id } },
            date: date,
            type: 'DEBT',
            change: -args.input.amount,
          },
        },
        ...args.input,
      });

      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance },
      });

      return debt;
    },
    async editDebt(root, args, context) {
      const user = await context.prisma.user({ id: args.userId });
      const debt = await context.prisma.debt({
        id: args.debtId,
      });
      const balance = user.balance + debt.amount - args.input.amount;
      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance: balance },
      });
      return context.prisma.updateDebt({
        where: { id: args.debtId },
        data: {
          ...args.input,
          transaction: {
            update: {
              change: -args.input.amount,
            },
          },
        },
      });
    },
  },
  Debt: {
    transaction(root, args, context) {
      return context.prisma.debt({ id: root.id }).transaction();
    },
  },
};
