module.exports = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts();
    },
  },
  Mutation: {
    async createPost(root, args, context) {
      const { userId, text } = args.input;
      const date = new Date().toISOString();
      return context.prisma.createPost({
        author: {
          connect: { id: userId },
        },
        date,
        text,
      });
    },
    deletePost(root, args, context) {
      return context.prisma.deletePost({ id: args.postId });
    },
  },
  Post: {
    comments(root, args, context) {
      return context.prisma.post({ id: root.id }).comments();
    },
  },
};
