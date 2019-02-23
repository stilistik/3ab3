module.exports = {
  Query: {
    checklists(root, args, context) {
      return context.prisma.checklists();
    },
    checklist(root, args, context) {
      return context.prisma.checklist({ id: args.checklistId });
    },
  },
  Mutation: {
    createChecklist(root, args, context) {
      return context.prisma.createChecklist({
        type: args.type,
        date: args.date,
      });
    },
  },
};
