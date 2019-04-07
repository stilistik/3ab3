module.exports = {
  Query: {
    todoTemplates(root, args, context) {
      return context.prisma.todoTemplates();
    },
    todoTemplate(root, args, context) {
      return context.prsima.todoTemplate({ id: args.templateId });
    },
  },
  Mutation: {
    createTodoTemplate(root, args, context) {
      return context.prisma.createTodoTemplate({
        text: args.text,
        offsetDays: args.offsetDays,
      });
    },
    deleteTodoTemplate(root, args, context) {
      return context.prisma.deleteTodotemplate({ id: args.templateId });
    },
  },
};
