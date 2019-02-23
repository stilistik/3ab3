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
    consumedItems(root, args, context) {
      return context.prisma.user({ id: root.id }).consumedItems();
    },
  },
};
