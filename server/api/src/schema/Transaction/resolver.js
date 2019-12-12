module.exports = {
  Query: {
    transactions(root, args, context) {
      return context.prisma.transactionsConnection({
        where: { type: args.type },
        orderBy: 'date_DESC',
        first: args.first,
        skip: args.skip,
        after: args.after,
      });
    },
    transaction(root, args, context) {
      return context.prisma.transaction({ id: args.transactionId });
    },
  },
  Transaction: {
    payment(root, args, context) {
      return context.prisma.transaction({ id: root.id }).payment();
    },
    purchase(root, args, context) {
      return context.prisma.transaction({ id: root.id }).purchase();
    },
  },
  TransactionConnection: {
    count(root, args, context) {
      return context.prisma
        .transactionsConnection({ where: { type: args.type } })
        .aggregate()
        .count();
    },
  },
};
