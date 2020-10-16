const bcrypt = require('bcryptjs');
const { verifyAndDecodeToken } = require('../../auth/verify');
const { AuthenticationError } = require('../../auth/errors');
const { uploadFile, deleteFile } = require('../../helper/file.helper');
const { canUserModify } = require('../../helper/access.helper');

module.exports = {
  Query: {
    users(root, args, context) {
      return context.prisma.users({ where: { deleted: false } });
    },
    user(root, args, context) {
      return context.prisma.user({ id: args.userId });
    },
    currentUser(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      return context.prisma.user({ id: id });
    },
    async roles(root, args, context) {
      const query = `
        query {
          __type(name: "UserRole") {
            enumValues {
              name
            }
          }
        }
      `;
      const variables = {};
      const { __type } = await context.prisma.$graphql(query, variables);
      return __type.enumValues.map((el) => el.name);
    },
    usersWithDebt(root, args, context) {
      return context.prisma.users({
        where: { balance_lte: args.threshold },
      });
    },
  },
  Mutation: {
    createUser(root, args, context) {
      return context.prisma.createUser(args.input);
    },
    async editUser(root, args, context) {
      const { id } = verifyAndDecodeToken(context);

      const currentUser = await context.prisma.user({ id });
      const userToUpdate = await context.prisma.user({ id: args.userId });

      if (!canUserModify(currentUser, userToUpdate)) {
        throw new Error(
          `User with role ${currentUser.role} cannot modify user with role ${
            userToUpdate.role
          }`
        );
      }

      return context.prisma.updateUser({
        where: { id: args.userId },
        data: args.input,
      });
    },
    async deleteUser(root, args, context) {
      const { id } = verifyAndDecodeToken(context);

      if (id === args.userId) {
        throw new Error('You cannot delete yourself.');
      }

      const currentUser = await context.prisma.user({ id });
      const userToUpdate = await context.prisma.user({ id: args.userId });

      if (!canUserModify(currentUser, userToUpdate)) {
        throw new Error(
          `User with role ${currentUser.role} cannot modify user with role ${
            userToUpdate.role
          }`
        );
      }

      return context.prisma.updateUser({
        where: { id: args.userId },
        data: { deleted: true },
      });
    },
    async editSelf(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      const { avatar, ...rest } = args.input;
      const updateValues = { ...rest };

      if (avatar) {
        // we want to change the avatar image
        if (user.avatar) {
          // user already has an avatar, we need to delete it
          const oldAvatar = await context.prisma.file({ uri: user.avatar });
          await deleteFile(oldAvatar.id, context);
        }

        // store file and create database entry
        const newAvatar = await uploadFile(avatar, context);
        updateValues.avatar = newAvatar.uri;
      }

      return context.prisma.updateUser({
        where: { id },
        data: updateValues,
      });
    },
    async uploadAvatar(root, args, context) {
      // get the current user
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (user.avatar) {
        // user already has an avatar, we need to delete it
        const oldAvatar = await context.prisma.file({ uri: user.avatar });
        await deleteFile(oldAvatar.id, context);
      }

      // store file and create database entry
      const file = await uploadFile(args.file, context);

      // update user database entry
      return context.prisma.updateUser({
        where: { id: user.id },
        data: { avatar: file.uri },
      });
    },
    setOnlineStatus(root, args, context) {
      if (args.isOnline) {
        return context.prisma.updateUser({
          where: { id },
          data: {
            isOnline: true,
          },
        });
      } else {
        return context.prisma.updateUser({
          where: { id },
          data: {
            isOnline: false,
            lastOnline: new Date().toISOString(),
          },
        });
      }
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
      return context.prisma.transactionsConnection({
        where: { type: args.type, user: { id: root.id } },
        orderBy: 'date_DESC',
        first: args.first,
        skip: args.skip,
        after: args.after,
      });
    },
    posts(root, args, context) {
      return context.prisma.user({ id: root.id }).posts();
    },
    likedPosts(root, args, context) {
      return context.prisma.user({ id: root.id }).likedPosts();
    },
    comments(root, args, context) {
      return context.prisma.user({ id: root.id }).comments();
    },
    likedComments(root, args, context) {
      return context.prisma.user({ id: root.id }).likedComments();
    },
    events(root, args, context) {
      return context.prisma.user({ id: root.id }).events();
    },
    likedEvents(root, args, context) {
      return context.prisma.user({ id: root.id }).likedEvents();
    },
    supportedEvents(root, args, context) {
      return context.prisma.user({ id: root.id }).supportedEvents();
    },
    chats(root, args, context) {
      return context.prisma.user({ id: root.id }).chats();
    },
    async unreadMessages(root, args, context) {
      const chats = await context.prisma.user({ id: root.id }).chats();
      const totals = await Promise.all(
        chats.map((chat) => {
          const { lastSeen } = chat;
          let userLastSeen = new Date().toISOString();
          if (lastSeen && lastSeen[root.id]) userLastSeen = lastSeen[root.id];
          return context.prisma
            .messagesConnection({
              where: {
                AND: [{ chat: { id: chat.id } }, { date_gt: userLastSeen }],
              },
            })
            .aggregate()
            .count();
        })
      );
      return totals.reduce((acc, curr) => acc + curr, 0);
    },
    async consumptions(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const products = await context.prisma.products();
      return products.map(async (product) => {
        const items = await context.prisma.items({
          where: {
            user: { id: id },
            product: { id: product.id },
          },
        });
        const count = items.reduce((acc, it) => {
          return acc + it.amount;
        }, 0);
        return {
          count,
          product,
        };
      });
    },
  },
};
