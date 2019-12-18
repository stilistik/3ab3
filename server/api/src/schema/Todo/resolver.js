const { verifyAndDecodeToken } = require('../../auth/verify');

module.exports = {
  Mutation: {
    createTodo(root, args, context) {
      const { eventId, ...input } = args.input;
      return context.prisma.createTodo({
        event: { connect: { id: eventId } },
        ...input,
      });
    },
    async createManyTodos(root, args, context) {
      const created = [];
      for (let el of args.input) {
        const { eventId, ...rest } = el;
        const todo = await context.prisma.createTodo({
          event: { connect: { id: eventId } },
          ...rest,
        });
        created.push(todo);
      }
      return created;
    },
    deleteTodo(root, args, context) {
      return context.prisma.deleteTodo({ id: args.todoId });
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
    assignUser(root, args, context) {
      return context.prisma.updateTodo({
        where: { id: args.todoId },
        data: {
          assigned: { connect: { id: args.userId } },
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
    assigned(root, args, context) {
      return context.prisma.todo({ id: root.id }).assigned();
    },
  },
};
