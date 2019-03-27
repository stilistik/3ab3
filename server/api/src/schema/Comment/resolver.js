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
    async createComment(root, args, context) {
      const { postId, eventId, userId, text } = args.input;

      const date = new Date().toISOString();
      let input = {
        author: {
          connect: { id: userId },
        },
        date,
        text,
      };

      if (postId) input.post = { connect: { id: postId } };
      else if (eventId) input.event = { connect: { id: eventId } };

      return context.prisma.createComment(input);
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
