const bcrypt = require('bcryptjs');
const verifyAndDecodeToken = require('../../auth/verify');
const { AuthenticationError } = require('../../auth/errors');
const { uploadFile, deleteFile } = require('../../helper/file.helper.js');

module.exports = {
  Query: {
    users(root, args, context) {
      return context.prisma.users();
    },
    user(root, args, context) {
      return context.prisma.user({ id: args.userId });
    },
    currentUser(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      return context.prisma.user({ id: id });
    },
  },
  Mutation: {
    createUser(root, args, context) {
      const input = {
        name: args.input.name,
        email: args.input.email,
        password: bcrypt.hashSync(args.input.password, 8),
        role: args.input.role,
      };
      return context.prisma.createUser(input);
    },
    editSelf(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const input = {
        name: args.input.name,
        email: args.input.email,
        password: bcrypt.hashSync(args.input.password, 8),
      };
      return context.prisma.updateUser({
        where: { id },
        data: input,
      });
    },
    async uploadAvatar(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (user.avatar) {
        const oldAvatar = await context.prisma.file({ uri: user.avatar });
        await deleteFile(oldAvatar.id, context);
      }

      const file = await uploadFile(args.file, context);
      return context.prisma.updateUser({
        where: { id: user.id },
        data: { avatar: file.uri },
      });
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
