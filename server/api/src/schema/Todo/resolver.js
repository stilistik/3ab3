const verifyAndDecodeToken = require('../../auth/verify');

module.exports = {
  Mutation: {
    createTodo(root, args, context) {
      const { eventId, ...input } = args.input;
      return context.prisma.createTodo({
        event: { connect: { id: eventId } },
        ...input,
      });
    },
    checkTodo(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const date = new Date().toISOString();
      return context.prisma.updateTodo({
        where: { id: args.todoId },
        data: {
          done: true,
          doneBy: { connect: { id: id } },
          doneAt: date,
        },
      });
    },
    uncheckTodo(root, args, context) {
      return context.prisma.updateTodo({
        where: { id: args.todoId },
        data: {
          done: false,
          doneBy: { disconnect: true },
          doneAt: null,
        },
      });
    },
  },
  Todo: {
    event(root, args, context) {
      return context.prisma.todo({ id: root.id }).event();
    },
    doneBy(root, args, context) {
      return context.prisma.todo({ id: root.id }).doneBy();
    },
  },
};
