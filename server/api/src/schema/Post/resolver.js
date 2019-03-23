module.exports = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts();
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId });
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
    likePost(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: {
          likedBy: {
            connect: { id: args.userId },
          },
        },
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
    author(root, args, context) {
      return context.prisma.post({ id: root.id }).author();
    },
    likedBy(root, args, context) {
      return context.prisma.post({ id: root.id }).likedBy();
    },
  },
};
