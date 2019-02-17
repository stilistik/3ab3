module.exports = {
  Query: {
    clients(root, args, context) {
      return context.prisma.clients();
    },
    client(root, args, context) {
      return context.prisma.client({ id: args.clientId });
    },
  },
};
