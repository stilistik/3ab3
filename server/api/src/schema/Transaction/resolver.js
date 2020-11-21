module.exports = {
  Query: {
    transactions(root, args, context) {
      console.log(args);
      return context.prisma.transactionsConnection({
        where: { type: args.type, ...args.where },
        orderBy: args.orderBy || 'date_DESC',
        first: args.first,
        skip: args.skip,
        after: args.after,
      });
    },
    transaction(root, args, context) {
      return context.prisma.transaction({ id: args.transactionId });
    },
  },
  Mutation: {
    async deleteTransaction(root, args, context) {
      const transaction = await context.prisma.transaction({
        id: args.transactionId,
      });

      const user = await context.prisma
        .transaction({
          id: args.transactionId,
        })
        .user();

      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance: user.balance - transaction.change },
      });

      return context.prisma.deleteTransaction({ id: args.transactionId });
    },
  },
  Transaction: {
    payment(root, args, context) {
      return context.prisma.transaction({ id: root.id }).payment();
    },
    purchase(root, args, context) {
      return context.prisma.transaction({ id: root.id }).purchase();
    },
    debt(root, args, context) {
      return context.prisma.transaction({ id: root.id }).debt();
    },
    user(root, args, context) {
      return context.prisma.transaction({ id: root.id }).user();
    },
  },
};
