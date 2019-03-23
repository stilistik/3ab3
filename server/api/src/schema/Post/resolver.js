module.exports = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts();
    },
  },
  Mutation: {
    async createPost(root, args, context) {
      const { userId, date, text } = args.input;
      return context.prisma.createPost({
        author: {
          connect: { id: userId },
        },
        date,
        text,
      });
    },
  },
  Post: {
    comments(root, args, context) {
      return context.prisma.post({ id: root.id }).comments();
    },
  },
};
