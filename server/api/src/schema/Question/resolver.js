module.exports = {
  Query: {
    questions(root, args, context) {
      return context.prisma.questions();
    },
    question(root, args, context) {
      return context.prisma.question({ id: args.questionId });
    },
  },
  Mutation: {
    createQuestion(root, args, context) {
      const { templateIds, ...input } = args.input;
      const templateConnectors = templateIds.map((templateId) => {
        return { id: templateId };
      });
      return context.prisma.createQuestion({
        ...input,
        templates: { connect: templateConnectors },
      });
    },
    deleteQuestion(root, args, context) {
      return context.prisma.deleteQuestion({ id: args.questionId });
    },
  },
  Question: {
    templates(root, args, context) {
      return context.prisma.question({ id: root.id }).templates();
    },
  },
};
