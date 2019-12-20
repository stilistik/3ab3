const { verifyAndDecodeToken } = require('../../auth/verify');
const { uploadFile } = require('../../helper/file.helper.js');
const { AuthenticationError } = require('../../auth/errors');

module.exports = {
  Query: {
    messages(root, args, context) {
      return context.prisma.messagesConnection({
        where: {
          OR: [
            {
              AND: [{ from: { id: args.fromId } }, { to: { id: args.toId } }],
            },
            {
              AND: [{ to: { id: args.fromId } }, { from: { id: args.toId } }],
            },
          ],
        },
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
    onNewMessage: {
      subscribe(root, args, context) {
        return context.prisma.$subscribe.message({
          node: {
            OR: [
              {
                AND: [{ from: { id: args.fromId } }, { to: { id: args.toId } }],
              },
              {
                AND: [{ to: { id: args.fromId } }, { from: { id: args.toId } }],
              },
            ],
          },
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
