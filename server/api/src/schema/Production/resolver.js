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
  Mutation: {
    createProduction(root, args, context) {
      return context.prisma.createProduction(args.input);
    },
    deleteProduction(root, args, context) {
      return context.prisma.deleteProduction({ id: args.productionId });
    },
  },
};
