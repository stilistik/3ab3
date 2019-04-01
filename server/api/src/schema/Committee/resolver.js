module.exports = {
  Committee: {
    event(root, args, context) {
      return context.prisma.committee({ id: root.id }).event();
    },
    creator(root, args, context) {
      return context.prisma.committee({ id: root.id }).creator();
    },
    members(root, args, context) {
      return context.prisma.committee({ id: root.id }).members();
    },
  },
};
