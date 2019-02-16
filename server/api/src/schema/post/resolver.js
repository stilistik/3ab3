module.exports = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts();
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId });
    },
    publishedPosts(root, args, context) {
      return context.prisma.posts({ where: { published: true } });
    },
    postsByUser(root, args, context) {
      return context.prisma.user({ id: args.userId }).posts();
    },
  },
  Mutation: {
    createDraft(root, args, context) {
      return context.prisma.createPost({
        title: args.title,
        author: {
          connect: {
            id: args.userId,
          },
        },
      });
    },
    publish(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true },
      });
    },
  },
  Post: {
    author(root, args, context) {
      return context.prisma.post({ id: root.id }).author();
    },
  },
};
