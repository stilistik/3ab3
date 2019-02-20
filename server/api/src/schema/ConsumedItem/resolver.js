module.exports = {
  Query: {
    consumedItems(root, args, context) {
      return context.prisma.consumedItems();
    },
    consumedItem(root, args, context) {
      return context.prisma.consumedItem({ id: args.consumedItemId });
    },
    userConsumed(root, args, context) {
      return context.prisma.user({ id: args.userId }).consumedItems();
    },
  },
  Mutation: {
    async createConsumedItem(root, args, context) {
      const { itemId, userId, amount } = args.input;
      const item = await context.prisma.item({ id: itemId });
      return context.prisma.createConsumedItem({
        consumer: {
          connect: {
            id: userId,
          },
        },
        item: {
          connect: {
            id: itemId,
          },
        },
        price: item.price,
        amount: amount,
      });
    },
  },
  ConsumedItem: {
    consumer(root, args, context) {
      return context.prisma.consumedItem({ id: root.id }).consumer();
    },
    item(root, args, context) {
      return context.prisma.consumedItem({ id: root.id }).item();
    },
  },
};
