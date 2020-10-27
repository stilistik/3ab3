const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Mutation: {
    async createNanoCredit(root, args, context) {
      const { id } = verifyAndDecodeToken(context);

      const user = await context.prisma.user({ id });
      const date = new Date().toISOString();
      const balance = user.balance - args.input.amount;

      const nanocredit = await context.prisma.createNanoCredit({
        user: { connect: { id: user.id } },
        date: date,
        transaction: {
          create: {
            user: { connect: { id } },
            date: date,
            type: 'NANOCREDIT',
            balance: balance,
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
