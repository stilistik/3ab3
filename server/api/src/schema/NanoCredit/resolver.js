const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Mutation: {
    async createNanoCredit(root, args, context) {
      const user = await context.prisma.user({ id: args.userId });
      const date = new Date().toISOString();
      const balance = user.balance - args.input.amount;

      const nanocredit = await context.prisma.createNanoCredit({
        user: { connect: { id: user.id } },
        date: date,
        transaction: {
          create: {
            user: { connect: { id: user.id } },
            date: date,
            type: 'NANOCREDIT',
            change: -args.input.amount,
          },
        },
        ...args.input,
      });

      await context.prisma.updateUser({
        where: { id: user.id },
        data: { balance },
      });

      return nanocredit;
    },
  },
  NanoCredit: {
    transaction(root, args, context) {
      return context.prisma.nanoCredit({ id: root.id }).transaction();
    },
  },
};
