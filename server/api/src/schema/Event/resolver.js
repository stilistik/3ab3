module.exports = {
  Query: {
    events(root, args, context) {
      return context.prisma.events();
    },
    event(root, args, context) {
      return context.prisma.event({ id: args.eventId });
    },
  },
  Mutation: {
    createEvent(root, args, context) {
      return context.prisma.createEvent(args.input);
    },
    deleteEvent(root, args, context) {
      return context.prisma.deleteEvent({ id: args.eventId });
    },
  },
};
