module.exports = {
  Query: {
    items(root, args, context) {
      return context.prisma.items();
    },
    item(root, args, context) {
      return context.prisma.item({ id: args.itemId });
    },
  },
  Mutation: {
    createItem(root, args, context) {
      return context.prisma.createItem(args.input);
    },
    updateItem(root, args, context) {
      return context.prisma.updateItem({
        data: args.input,
        where: { id: args.itemId },
      });
    },
  },
};
