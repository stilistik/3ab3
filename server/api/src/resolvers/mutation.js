module.exports = {
  createUser(root, args, context) {
    const input = args.input;
    return context.prisma.createUser(input);
  },
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
};
