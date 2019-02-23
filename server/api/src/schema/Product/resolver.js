module.exports = {
  Query: {
    products(root, args, context) {
      return context.prisma.products();
    },
    product(root, args, context) {
      return context.prisma.product({ id: args.productId });
    },
  },
  Mutation: {
    createProduct(root, args, context) {
      return context.prisma.createProduct(args.input);
    },
    updateProduct(root, args, context) {
      return context.prisma.updateProduct({
        data: args.input,
        where: { id: args.productId },
      });
    },
  },
};
