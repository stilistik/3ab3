module.exports = {
  Query: {
    purchases(root, args, context) {
      return context.prisma.purchases({
        orderBy: 'date_DESC',
      });
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

      // cart associates items and corresponding products
      const cart = await Promise.all(
        items.map(async (item) => {
          const product = await context.prisma.product({ id: item.productId });
          return { product, item };
        })
      );

      // compute total of this purchase
      const total = cart.reduce(
        (t, el) => t + el.product.price * el.item.amount,
        0
      );

      // compute new user balance
      const user = await context.prisma.user({ id: userId });
      let balance = user.balance - total;

      // create input for the item nodes
      const itemInput = cart.map((el) => {
        return {
          price: el.product.price,
          product: { connect: { id: el.product.id } },
          amount: el.item.amount,
          user: { connect: { id: userId } },
        };
      });

      // create new purchase entry, nested create items
      const purchase = await context.prisma.createPurchase({
        total,
        date,
        items: {
          create: itemInput,
        },
        user: {
          connect: { id: userId },
        },
        transaction: {
          create: {
            user: { connect: { id: userId } },
            date: date,
            type: 'PURCHASE',
            change: -total,
          },
        },
      });

      if (!purchase) throw new Error('Purchase could not be created');

      // update user balance
      await context.prisma.updateUser({
        data: { balance: balance },
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
