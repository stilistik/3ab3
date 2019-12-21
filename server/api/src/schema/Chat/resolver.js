module.exports = {
  Query: {
    chats(root, args, context) {
      return context.prisma.chatsConnection({
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
  },
};
