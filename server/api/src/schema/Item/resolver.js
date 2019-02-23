module.exports = {
  Query: {
    items(root, args, context) {
      return context.prisma.items();
    },
    item(root, args, context) {
      return context.prisma.item({ id: args.itemId });
    },
  },
  Item: {
    user(root, args, context) {
      return context.prisma.item({ id: root.id }).consumer();
    },
    product(root, args, context) {
      return context.prisma.item({ id: root.id }).product();
    },
  },
};
