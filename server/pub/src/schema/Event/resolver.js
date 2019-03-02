module.exports = {
  Query: {
    events(root, args, context) {
      return context.prisma.events();
    },
    event(root, args, context) {
      return context.prisma.event({ id: args.eventId });
    },
    futureEvents(root, args, context) {
      return context.prisma.events({
        where: {
          date_gte: args.now,
        },
      });
    },
    pastEvents(root, args, context) {
      return context.prisma.events({
        where: {
          date_lt: args.now,
        },
      });
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
