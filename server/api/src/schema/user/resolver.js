module.exports = {
  Query: {
    users(root, args, context) {
      return context.prisma.users();
    },
  },
  Mutation: {
    createUser(root, args, context) {
      const input = args.input;
      return context.prisma.createUser(input);
    },
  },
  User: {
    posts(root, args, context) {
      return context.prisma.user({ id: root.id }).posts();
    },
  },
};
