module.exports = {
  Mutation: {
    createTodo(root, args, context) {
      const { eventId, ...input } = args.input;
      return context.prisma.createTodo({
        event: { connect: { id: eventId } },
        ...input,
      });
    },
  },
  Todo: {
    event(root, args, context) {
      return context.prisma.todo({ id: root.id }).event();
    },
  },
};
