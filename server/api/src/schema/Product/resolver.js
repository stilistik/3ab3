const { uploadFile } = require('../../helper/file.helper.js');
const verifyAndDecodeToken = require('../../auth/verify');

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
      const { id } = verifyAndDecodeToken(context);
      const products = await context.prisma.products();
      return products.map(async (product) => {
        const items = await context.prisma.items({
          where: {
            user: { id: id },
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
      if (args.input.image) {
        const { image, ...rest } = args.input;
        const file = await uploadFile(image, context);
        const input = {
          thumbnail: file.uri,
          ...rest,
        };
        return context.prisma.createProduct(input);
      } else {
        return context.prisma.createProduct(args.input);
      }
    },
    async updateProduct(root, args, context) {
      if (args.input.image) {
        const { image, ...rest } = args.input;
        const file = await uploadFile(image, context);
        const input = {
          thumbnail: file.uri,
          ...rest,
        };
        return context.prisma.updateProduct({
          data: input,
          where: { id: args.productId },
        });
      } else {
        return context.prisma.updateProduct({
          data: args.input,
          where: { id: args.productId },
        });
      }
    },
    deleteProduct(root, args, context) {
      return context.prisma.updateProduct({
        where: { id: args.productId },
        data: { deleted: true },
      });
    },
  },
};
