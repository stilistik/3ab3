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
