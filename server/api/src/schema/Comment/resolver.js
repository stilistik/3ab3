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
    likeComment(root, args, context) {
      return context.prisma.updateComment({
        where: { id: args.commentId },
        data: {
          likedBy: {
            connect: { id: args.userId },
          },
        },
      });
    },
    unlikeComment(root, args, context) {
      return context.prisma.updateComment({
        where: { id: args.commentId },
        data: {
          likedBy: {
            disconnect: { id: args.userId },
          },
        },
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
    likedBy(root, args, context) {
      return context.prisma.comment({ id: root.id }).likedBy();
    },
  },
};
