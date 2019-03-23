module.exports = {
  Query: {
    comments(root, args, context) {
      return context.prisma.comments();
    },
  },
  Mutation: {
    createComment(root, args, context) {
      return context.prisma.createComment(args.input);
    },
  },
};
