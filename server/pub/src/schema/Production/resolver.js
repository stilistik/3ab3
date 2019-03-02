module.exports = {
  Query: {
    productions(root, args, context) {
      return context.prisma.productions();
    },
    currentProductions(root, args, context) {
      return context.prisma.productions({
        where: {
          show: true,
        },
      });
    },
    production(root, args, context) {
      return context.prisma.production({ id: args.productionId });
    },
  },
};
