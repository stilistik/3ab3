const { uploadFile, deleteFile } = require('../../helper/file.helper.js');
const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Query: {
    event(root, args, context) {
      return context.prisma.event({ id: args.eventId });
    },
    events(root, args, context) {
      return context.prisma.eventsConnection({
        orderBy: 'date_DESC',
        first: args.first,
        after: args.after,
      });
    },
    futureEvents(root, args, context) {
      return context.prisma.eventsConnection({
        where: { date_gte: new Date().toISOString() },
        orderBy: 'date_ASC',
        first: args.first,
        after: args.after,
      });
    },
    pastEvents(root, args, context) {
      return context.prisma.eventsConnection({
        where: { date_lt: new Date().toISOString() },
        first: args.first,
        after: args.after,
      });
    },
    futurePublishedEvents(root, args, context) {
      return context.prisma.eventsConnection({
        where: {
          date_gte: new Date().toISOString(),
          published: true,
        },
        orderBy: 'date_ASC',
        first: args.first,
        after: args.after,
      });
    },
    pastPublishedEvents(root, args, context) {
      return context.prisma.eventsConnection({
        where: {
          date_lt: new Date().toISOString(),
          published: true,
        },
        first: args.first,
        after: args.after,
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
              link: args.link,
            },
          },
        },
      });
    },
    supportEvent(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          supporters: {
            connect: { id: args.userId },
          },
        },
      });
    },
    unsupportEvent(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          supporters: {
            disconnect: { id: args.userId },
          },
        },
      });
    },
    publishEvent(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          published: true,
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
    todos(root, args, context) {
      return context.prisma.event({ id: root.id }).todos({
        orderBy: 'due_ASC',
      });
    },
    supporters(root, args, context) {
      return context.prisma.event({ id: root.id }).supporters();
    },
  },
};
