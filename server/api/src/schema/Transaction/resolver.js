module.exports = {
  Query: {
    transactions(root, args, context) {
      return context.prisma.transactions({
        where: { type: args.type },
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
};
