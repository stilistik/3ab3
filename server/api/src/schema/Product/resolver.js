const { uploadFile } = require('../../helper/file.helper.js');
const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Query: {
    products(root, args, context) {
      return context.prisma.products({
        where: {
          deleted: false,
        },
      });
    },
    product(root, args, context) {
      return context.prisma.product({ id: args.productId });
    },
    async consumption(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const items = await context.prisma.items({
        where: {
          user: { id: id },
          product: { id: args.productId },
        },
      });
      const product = await context.prisma.product({ id: args.productId });
      const count = items.reduce((acc, it) => {
        return acc + it.amount;
      }, 0);
      return {
        count,
        product,
      };
    },
    async consumptions(root, args, context) {
      const products = await context.prisma.products();
      return products.map(async (product) => {
        const items = await context.prisma.items({
          where: {
            product: { id: product.id },
          },
        });
        const count = items.reduce((acc, it) => {
          return acc + it.amount;
        }, 0);
        return {
          count,
          product,
        };
      });
    },
  },
  Mutation: {
    async createProduct(root, args, context) {
      const { thumbnail, ...rest } = args.input;

      const input = { ...rest };

      if (thumbnail) {
        const file = await uploadFile(thumbnail, context);
        input.thumbnail = file.uri;
      }

      return context.prisma.createProduct(input);
    },
    async updateProduct(root, args, context) {
      const { thumbnail, ...rest } = args.input;

      const input = { ...rest };

      if (thumbnail) {
        const file = await uploadFile(thumbnail, context);
        input.thumbnail = file.uri;
      }
      return context.prisma.updateProduct({
        data: input,
        where: { id: args.productId },
      });
    },

    deleteProduct(root, args, context) {
      return context.prisma.updateProduct({
        where: { id: args.productId },
        data: { deleted: true },
      });
    },
  },
};
