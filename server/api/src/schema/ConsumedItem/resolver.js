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
      const data = {
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
      };
      return context.prisma.createConsumedItem(data);
    },
    async updateConsumedItem(root, args, context) {
      const { itemId, userId, amount } = args.input;
      const item = await context.prisma.item({ id: itemId });
      const data = {
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
      };
      return context.prisma.updateConsumedItem({
        data: data,
        where: { id: args.consumedItemId },
      });
    },
    deleteConsumedItem(root, args, context) {
      return context.prisma.deleteConsumedItem({ id: args.consumedItemId });
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
