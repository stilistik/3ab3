module.exports = {
  publishedPosts(root, args, context) {
    return context.prisma.posts({ where: { published: true } });
  },
  posts(root, args, context) {
    return context.prisma.posts();
  },
  post(root, args, context) {
    return context.prisma.post({ id: args.postId });
  },
  postsByUser(root, args, context) {
    return context.prisma.user({ id: args.userId }).posts();
  },
  users(root, args, context) {
    return context.prisma.users();
  },
};
