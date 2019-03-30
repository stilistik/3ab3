const { uploadFile, deleteFile } = require('../../helper/file.helper.js');
const verifyAndDecodeToken = require('../../auth/verify');

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
      const { id } = verifyAndDecodeToken(context);
      if (args.input.image) {
        const { image, ...rest } = args.input;
        const file = await uploadFile(image, context);
        return context.prisma.createEvent({
          image: file.uri,
          owner: { connect: { id: id } },
          ...rest,
        });
      } else {
        return context.prisma.createEvent({
          owner: { connect: { id: id } },
          ...args.input,
        });
      }
    },
    likeEvent(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          likedBy: {
            connect: { id: args.userId },
          },
        },
      });
    },
    unlikeEvent(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          likedBy: {
            disconnect: { id: args.userId },
          },
        },
      });
    },
    async deleteEvent(root, args, context) {
      const toDelete = await context.prisma.event({ id: args.eventId });
      const img = await context.prisma.file({ uri: toDelete.image });
      await deleteFile(img.id, context);
      return context.prisma.deleteEvent({ id: args.eventId });
    },
    commentEvent(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const date = new Date().toISOString();
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          comments: {
            create: {
              author: { connect: { id: id } },
              date: date,
              text: args.text,
            },
          },
        },
      });
    },
  },
  Event: {
    comments(root, args, context) {
      return context.prisma.event({ id: root.id }).comments();
    },
    owner(root, args, context) {
      return context.prisma.event({ id: root.id }).owner();
    },
    likedBy(root, args, context) {
      return context.prisma.event({ id: root.id }).likedBy();
    },
  },
};
