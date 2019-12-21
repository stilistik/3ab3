module.exports = {
  Query: {
    messages(root, args, context) {
      return context.prisma.messagesConnection({
        where: { chat: { id: args.chatId } },
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
        chat: { connect: { id: input.chatId } },
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
          node: { chat: { id: args.chatId } },
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
    chat(root, args, context) {
      return context.prisma.message({ id: root.id }).chat();
    },
  },
};
