const { verifyAndDecodeToken } = require('../../auth/verify');
const { uploadFile } = require('../../helper/file.helper.js');
const { AuthenticationError } = require('../../auth/errors');

module.exports = {
  Query: {
    feed(root, args, context) {
      return context.prisma.postsConnection({
        orderBy: 'date_DESC',
        first: args.first,
        after: args.after,
      });
    },
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
      const { userId, image, text, link } = args.input;
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
          link,
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
    commentPost(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const date = new Date().toISOString();
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: {
          comments: {
            create: {
              author: { connect: { id: id } },
              date: date,
              text: args.text,
            },
          },
        },
      });
    },
  },
  Subscription: {
    postCreated: {
      subscribe(root, args, context, info) {
        return context.prisma.$subscribe
          .post({
            mutation_in: ['CREATED'],
          })
          .node();
      },
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
