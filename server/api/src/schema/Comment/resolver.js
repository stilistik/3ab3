module.exports = {
  Query: {
    comments(root, args, context) {
      return context.prisma.comments();
    },
  },
  Mutation: {
    async createComment(root, args, context) {
      const { postId, userId, text } = args.input;
      const date = new Date().toISOString();
      return context.prisma.createComment({
        author: {
          connect: { id: userId },
        },
        post: {
          connect: { id: postId },
        },
        date,
        text,
      });
    },
    deleteComment(root, args, context) {
      return context.prisma.deleteComment({ id: args.commentId });
    },
  },
  Comment: {
    post(root, args, context) {
      return context.prisma.comment({ id: root.id }).post();
    },
    author(root, args, context) {
      return context.prisma.comment({ id: root.id }).author();
    },
  },
};
