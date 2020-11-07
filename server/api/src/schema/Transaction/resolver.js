module.exports = {
  Query: {
    transactions(root, args, context) {
      return context.prisma.transactionsConnection({
        where: { type: args.type },
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
    deleteTransaction(root, args, context) {
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
    nanocredit(root, args, context) {
      return context.prisma.transaction({ id: root.id }).nanocredit();
    },
    user(root, args, context) {
      return context.prisma.transaction({ id: root.id }).user();
    },
  },
};
