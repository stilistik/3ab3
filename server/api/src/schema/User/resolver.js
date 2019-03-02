const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    users(root, args, context) {
      return context.prisma.users();
    },
    user(root, args, context) {
      return context.prisma.user({ id: args.userId });
    },
  },
  Mutation: {
    createUser(root, args, context) {
      const input = {
        name: args.input.name,
        email: args.input.email,
        password: bcrypt.hashSync(args.input.password, 8),
      };
      return context.prisma.createUser(input);
    },
  },
  User: {
    items(root, args, context) {
      return context.prisma.user({ id: root.id }).items();
    },
    purchases(root, args, context) {
      return context.prisma.user({ id: root.id }).purchases({
        orderBy: 'date_DESC',
      });
    },
    payments(root, args, context) {
      return context.prisma.user({ id: root.id }).payments({
        orderBy: 'date_DESC',
      });
    },
    transactions(root, args, context) {
      return context.prisma.user({ id: root.id }).transactions({
        where: { type: args.type },
        orderBy: 'date_DESC',
      });
    },
  },
};