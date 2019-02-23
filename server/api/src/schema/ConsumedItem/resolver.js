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
    checklistConsumed(root, args, context) {
      return context.prisma.checklist({ id: args.checklistId }).consumedItems();
    },
    userChecklistConsumed(root, args, context) {
      return context.prisma.consumedItems({
        where: {
          AND: [
            { consumer: { id: args.userId } },
            { checklist: { id: args.checklistId } },
          ],
        },
      });
    },
  },
  Mutation: {
    async createConsumedItem(root, args, context) {
      const { itemId, userId, checklistId, amount } = args.input;
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
        checklist: {
          connect: {
            id: checklistId,
          },
        },
        price: item.price,
        amount: amount,
      };
      return context.prisma.createConsumedItem(data);
    },
    async updateConsumedItem(root, args, context) {
      const { itemId, userId, checklistId, amount } = args.input;
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
        checklist: {
          connect: {
            id: checklistId,
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
    checklist(root, args, context) {
      return context.prisma.consumedItem({ id: root.id }).checklist();
    },
  },
};
