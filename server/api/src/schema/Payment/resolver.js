module.exports = {
  Query: {
    payments(root, args, context) {
      return context.prisma.payments();
    },
    payment(root, args, context) {
      return context.prisma.payment({ id: args.paymentId });
    },
  },
  Mutation: {
    async createPayment(root, args, context) {
      const { userId, amount, date } = args.input;
      const user = await context.prisma.user({ id: userId });
      await context.prisma.updateUser({
        data: { balance: user.balance - amount },
        where: { id: userId },
      });
      const paymentInput = {
        user: {
          connect: {
            id: userId,
          },
        },
        date,
        amount,
      };
      return context.prisma.createPayment(paymentInput);
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
  },
  Payment: {
    user(root, args, context) {
      return context.prisma.payment({ id: root.id }).user();
    },
  },
};
