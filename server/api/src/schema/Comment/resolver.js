module.exports = {
  Query: {
    comments(root, args, context) {
      return context.prisma.comments();
    },
    comment(root, args, context) {
      return context.prisma.comment({ id: args.commentId });
    },
  },
  Mutation: {
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
    author(root, args, context) {
      return context.prisma.comment({ id: root.id }).author();
    },
    likedBy(root, args, context) {
      return context.prisma.comment({ id: root.id }).likedBy();
    },
  },
};
