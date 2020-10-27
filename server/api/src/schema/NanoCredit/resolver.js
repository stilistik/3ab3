module.exports = {
  NanoCredit: {
    transaction(root, args, context) {
      return context.prisma.nanoCredit({ id: root.id }).transaction();
    },
  },
};
