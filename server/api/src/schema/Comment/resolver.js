module.exports = {
  Query: {
    comments(root, args, context) {
      return context.prisma.comments();
    },
    comment(root, args, context) {
      return context.prisma.comment({ id: args.commentId });
    },
    postComments(root, args, context) {
      return context.prisma.commentsConnection({
        where: {
          post: { id: args.postId },
        },
        orderBy: 'date_DESC',
        first: args.first,
        after: args.after,
      });
    },
    postCommentCount(root, args, context) {
      return context.prisma
        .commentsConnection({
          where: {
            post: { id: args.postId },
          },
        })
        .aggregate()
        .count();
    },
    eventComments(root, args, context) {
      return context.prisma.commentsConnection({
        where: {
          event: { id: args.eventId },
        },
        orderBy: 'date_DESC',
        first: args.first,
        after: args.after,
      });
    },
    eventCommentCount(root, args, context) {
      return context.prisma
        .commentsConnection({
          where: {
            event: { id: args.eventId },
          },
        })
        .aggregate()
        .count();
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
