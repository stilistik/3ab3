module.exports = {
  Query: {
    chats(root, args, context) {
      return context.prisma.chatsConnection({
        orderBy: 'updatedAt_DESC',
        first: args.first,
        after: args.after,
        skip: args.skip,
      });
    },
    async unreadMessagesCount(root, args, context) {
      const { lastSeen } = await context.prisma.chat({ id: args.chatId });
      let userLastSeen = new Date().toISOString();
      if (lastSeen && lastSeen[args.userId])
        userLastSeen = lastSeen[args.userId];
      console.log(userLastSeen);

      return context.prisma
        .messagesConnection({
          where: {
            AND: [{ chat: { id: args.chatId } }, { date_gt: userLastSeen }],
          },
        })
        .aggregate()
        .count();
    },
  },
  Mutation: {
    async createChat(root, args, context) {
      const { input } = args;
      const chat = await context.prisma.createChat({
        title: input.title,
        creator: { connect: { id: input.creatorId } },
        members: {
          connect: [
            { id: input.creatorId },
            ...input.memberIds.map((id) => ({ id: id })),
          ],
        },
      });
      console.log(chat);
      return chat;
    },
    async userLastSeen(root, args, context) {
      const { lastSeen } = await context.prisma.chat({ id: args.chatId });
      const lastSeenUpdated = Object.assign({}, lastSeen, {
        [args.userId]: new Date().toISOString(),
      });
      return context.prisma.updateChat({
        where: { id: args.chatId },
        data: {
          lastSeen: lastSeenUpdated,
        },
      });
    },
  },
  Subscription: {
    onUnreadMessage: {
      subscribe(root, args, context) {
        return context.prisma.$subscribe.message({
          node: { chat: { id: args.chatId } },
          mutation_in: ['CREATED'],
        });
      },
      resolve: (payload, args, context) => {
        return payload;
      },
    },
  },
  Chat: {
    members(root, args, context) {
      return context.prisma.chat({ id: root.id }).members();
    },
    creator(root, args, context) {
      return context.prisma.chat({ id: root.id }).creator();
    },
    messages(root, args, context) {
      return context.prisma.messagesConnection({
        where: { chat: { id: root.id } },
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: 'date_DESC',
      });
    },
    async lastMessage(root, args, context) {
      const messages = await context.prisma.messagesConnection({
        where: { chat: { id: root.id } },
        first: 1,
        orderBy: 'date_DESC',
      });
      if (messages.edges.length) return messages.edges[0].node;
      else return null;
    },
  },
};
