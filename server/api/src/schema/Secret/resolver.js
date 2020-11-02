const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Query: {
    secrets: (root, args, context) => {
      return context.prisma.secrets();
    },
  },
  Mutation: {
    createSecret: (root, args, context) => {
      const { id } = verifyAndDecodeToken(context);
      return context.prisma.createSecret({
        creator: { connect: { id: id } },
        ...args.input,
      });
    },
    editSecret: (root, args, context) => {
      return context.prisma.updateSecret({
        where: { id: args.secretId },
        data: args.input,
      });
    },
    deleteSecret: (root, args, context) => {
      return context.prisma.deleteSecret({ id: args.secretId });
    },
  },
  Secret: {
    creator: (root, args, context) => {
      return context.prisma.secret({ id: root.id }).creator();
    },
  },
};
