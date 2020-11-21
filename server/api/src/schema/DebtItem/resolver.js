module.exports = {
  Mutation: {
    async createDebtItem(root, args, context) {
      const user = await context.prisma.user({ id: args.userId });
      const date = new Date().toISOString();
      const balance = user.balance - args.input.amount;

      const debtItem = await context.prisma.createDebtItem({
        user: { connect: { id: user.id } },
        date: date,
        transaction: {
          create: {
            user: { connect: { id: user.id } },
            date: date,
            type: 'DEBTITEM',
            change: -args.input.amount,
          },
        },
        ...args.input,
      });

      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance },
      });

      return debtItem;
    },
    async editDebtItem(root, args, context) {
      const user = await context.prisma.user({ id: args.userId });
      const debtItem = await context.prisma.debtItem({
        id: args.debtItemId,
      });
      const balance = user.balance + debtItem.amount - args.input.amount;
      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance: balance },
      });
      return context.prisma.updateDebtItem({
        where: { id: args.debtItemId },
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
  DebtItem: {
    transaction(root, args, context) {
      return context.prisma.debtItem({ id: root.id }).transaction();
    },
  },
};
