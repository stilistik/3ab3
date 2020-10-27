module.exports = {
  Query: {
    payments(root, args, context) {
      return context.prisma.payments({
        orderBy: 'date_DESC',
      });
    },
    payment(root, args, context) {
      return context.prisma.payment({ id: args.paymentId });
    },
  },
  Mutation: {
    async createPayment(root, args, context) {
      const { userId, amount, date } = args.input;
      const user = await context.prisma.user({ id: userId });
      const balance = user.balance + amount;
      const payment = await context.prisma.createPayment({
        user: {
          connect: { id: userId },
        },
        transaction: {
          create: {
            user: { connect: { id: userId } },
            date: date,
            type: 'PAYMENT',
            change: amount,
          },
        },
        date,
        amount,
      });

      if (!payment) throw new Error('Payment could not be created.');

      await context.prisma.updateUser({
        data: { balance: balance },
        where: { id: userId },
      });

      return payment;
    },
    async deletePayment(root, args, context) {
      const payment = await context.prisma.payment({ id: args.paymentId });
      const user = await context.prisma.payment({ id: args.paymentId }).user();
      await context.prisma.updateUser({
        data: { balance: user.balance + payment.amount },
        where: { id: user.id },
      });
      return context.prisma.deletePayment({ id: args.paymentId });
    },
    async verifyPayment(root, args, context) {
      return context.prisma.updatePayment({
        where: { id: args.paymentId },
        data: { verified: true },
      });
    },
  },
  Payment: {
    user(root, args, context) {
      return context.prisma.payment({ id: root.id }).user();
    },
  },
};
