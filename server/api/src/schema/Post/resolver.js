const verifyAndDecodeToken = require('../../auth/verify');
const { uploadFile } = require('../../helper/file.helper.js');
const { AuthenticationError } = require('../../auth/errors');

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
    async deletePost(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const author = await context.prisma.post({ id: args.postId }).author();
      if (author.id === id) {
        return context.prisma.deletePost({ id: args.postId });
      } else {
        throw new AuthenticationError({
          message: 'You are not the author if this post',
        });
      }
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
