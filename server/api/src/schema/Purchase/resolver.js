module.exports = {
  Query: {
    purchases(root, args, context) {
      return context.prisma.purchases();
    },
    purchase(root, args, context) {
      return context.prisma.purchase({ id: args.purchaseId });
    },
    userPurchases(root, args, context) {
      return context.prisma.user({ id: args.userId }).purchases();
    },
  },
  Mutation: {
    async createPurchase(root, args, context) {
      const { userId, date, items } = args.input;
      let total = 0;
      const itemInput = [];

      // compute total and set up item input to create the consumed items
      for (let item of items) {
        const product = await context.prisma.product({ id: item.productId });
        total += product.price * item.amount;
        itemInput.push({
          price: product.price,
          product: {
            connect: {
              id: product.id,
            },
          },
          amount: item.amount,
          user: {
            connect: {
              id: userId,
            },
          },
        });
      }

      // create new purchase entry
      const purchase = context.prisma.createPurchase({
        user: {
          connect: {
            id: userId,
          },
        },
        total,
        date,
        items: {
          create: itemInput,
        },
      });

      // add total to users balance
      const user = await context.prisma.user({ id: userId });
      await context.prisma.updateUser({
        data: { balance: user.balance + total },
        where: { id: userId },
      });

      return purchase;
    },
    async deletePurchase(root, args, context) {
      const purchase = await context.prisma.purchase({ id: args.purchaseId });
      const user = await context.prisma
        .purchase({ id: args.purchaseId })
        .user();
      await context.prisma.updateUser({
        data: { balance: user.balance - purchase.total },
        where: { id: user.id },
      });
      return context.prisma.deletePurchase({ id: args.purchaseId });
    },
  },
  Purchase: {
    items(root, args, context) {
      return context.prisma.purchase({ id: root.id }).items();
    },
  },
};
