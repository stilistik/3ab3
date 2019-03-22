const { uploadFile, deleteFile } = require('../../helper/file.helper.js');

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
    async createEvent(root, args, context) {
      if (args.input.image) {
        const { image, ...rest } = args.input;
        const file = await uploadFile(image, context);
        const input = {
          image: file.uri,
          ...rest,
        };
        return context.prisma.createEvent(input);
      } else {
        return context.prisma.createEvent(args.input);
      }
    },
    async deleteEvent(root, args, context) {
      const toDelete = await context.prisma.event({ id: args.eventId });
      const img = await context.prisma.file({ uri: toDelete.image });
      await deleteFile(img.id, context);
      return context.prisma.deleteEvent({ id: args.eventId });
    },
  },
};
