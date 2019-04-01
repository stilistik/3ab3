const verifyAndDecodeToken = require('../../auth/verify');

module.exports = {
  Mutation: {
    createInvitation(root, args, context) {
      return context.prisma.createInvitation({
        user: { connect: { id: args.userId } },
        committee: { connect: { id: args.committeeId } },
      });
    },
    async acceptInvitation(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const invited = await context.prisma
        .invitation({ id: args.invitationId })
        .user();

      if (invited.id !== id)
        throw new Error('You are not invited by this invitation');

      const committee = await context.prisma
        .invitation({ id: args.invitationId })
        .committee();

      await context.prisma.updateCommittee({
        where: { id: committee.id },
        data: { members: { connect: { id: id } } },
      });

      return context.prisma.updateInvitation({
        where: { id: args.invitationId },
        data: { status: 'ACCEPTED' },
      });
    },
    async declineInvitation(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const invited = await context.prisma
        .invitation({ id: args.invitationId })
        .user();

      if (invited.id !== id)
        throw new Error('You are not invited by this invitation');

      return context.prisma.updateInvitation({
        where: { id: args.invitationId },
        data: { status: 'DECLINED' },
      });
    },
  },
  Invitation: {
    user(root, args, context) {
      return context.prisma.invitation({ id: root.id }).user();
    },
    committee(root, args, context) {
      return context.prisma.invitation({ id: root.id }).committee();
    },
  },
};
