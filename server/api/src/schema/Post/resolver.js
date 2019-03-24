const { uploadFile } = require('../../helper/file.helper.js');

module.exports = {
  Query: {
    posts(root, args, context) {
      return context.prisma.posts({
        orderBy: 'date_DESC',
      });
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId });
    },
  },
  Mutation: {
    async createPost(root, args, context) {
      const { userId, image, text } = args.input;
      const date = new Date().toISOString();
      if (image) {
        const file = await uploadFile(image, context);
        return context.prisma.createPost({
          author: {
            connect: { id: userId },
          },
          image: file.uri,
          date,
          text,
        });
      } else {
        return context.prisma.createPost({
          author: {
            connect: { id: userId },
          },
          date,
          text,
        });
      }
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
    unlikePost(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: {
          likedBy: {
            disconnect: { id: args.userId },
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
