const { uploadFile, deleteFile } = require('../../helper/file.helper.js');
const { verifyAndDecodeToken } = require('../../auth/verify');
const { canUserModifyEvent } = require('../../helper/authorization.helper');

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
      const { image, flyer, ...rest } = args.input;

      const updateValues = { ...rest };

      if (image) {
        const file = await uploadFile(image, context);
        updateValues.image = file.uri;
      }
      if (flyer) {
        const file = await uploadFile(image, context);
        updateValues.flyer = file.uri;
      }

      return context.prisma.createEvent({
        owner: { connect: { id: id } },
        ...updateValues,
      });
    },
    async editEvent(root, args, context) {
      const canModify = await canUserModifyEvent(args, context);

      if (!canModify) {
        throw new Error('User is unauthorized to modify event.');
      }

      const { image, flyer, ...rest } = args.input;

      const updateValues = { ...rest };

      if (image) {
        const file = await uploadFile(image, context);
        updateValues.image = file.uri;
      }
      if (flyer) {
        const file = await uploadFile(flyer, context);
        updateValues.flyer = file.uri;
      }

      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: updateValues,
      });
    },
    async addCommitteeMembers(root, args, context) {
      const canModify = await canUserModifyEvent(args, context);

      if (!canModify) {
        throw new Error('User is unauthorized to modify event.');
      }

      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          committee: {
            connect: args.memberIds.map((id) => ({ id: id })),
          },
        },
      });
    },
    async removeCommitteeMember(root, args, context) {
      const canModify = await canUserModifyEvent(args, context);

      if (!canModify) {
        throw new Error('User is unauthorized to modify event.');
      }

      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: {
          committee: {
            disconnect: { id: args.memberId },
          },
        },
      });
    },
    setEventPublished(root, args, context) {
      return context.prisma.updateEvent({
        where: { id: args.eventId },
        data: { published: args.published },
      });
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

      if (toDelete.flyer) {
        const flyer = await context.prisma.file({ uri: toDelete.flyer });
        await deleteFile(flyer.id, context);
      }

      if (toDelete.image) {
        const image = await context.prisma.file({ uri: toDelete.image });
        await deleteFile(image.id, context);
      }

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
    committee(root, args, context) {
      return context.prisma.event({ id: root.id }).committee();
    },
  },
};
