const { verifyAndDecodeToken } = require('../../auth/verify');
const { uploadFile } = require('../../helper/file.helper.js');
const { AuthenticationError } = require('../../auth/errors');

module.exports = {
  Query: {
    messages(root, args, context) {
      return context.prisma.messagesConnection({
        orderBy: 'date_DESC',
        first: args.first,
        after: args.after,
        skip: args.skip,
      });
    },
  },
  Mutation: {
    createMessage(root, args, context) {
      const date = new Date().toISOString();
      const { input } = args;
      return context.prisma.createMessage({
        from: { connect: { id: input.fromId } },
        to: { connect: { id: input.toId } },
        date: date,
        link: input.link,
        text: input.text,
      });
    },
  },
  Subscription: {
    messageBetween: {
      subscribe(root, args, context) {
        return context.prisma.$subscribe.message({
          mutation_in: ['CREATED'],
        });
      },
      resolve: (payload) => {
        return payload;
      },
    },
  },
  Message: {
    from(root, args, context) {
      return context.prisma.message({ id: root.id }).from();
    },
    to(root, args, context) {
      return context.prisma.message({ id: root.id }).to();
    },
  },
};
