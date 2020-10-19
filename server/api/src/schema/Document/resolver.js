const { verifyAndDecodeToken } = require('../../auth/verify');
const { uploadFile } = require('../../helper/file.helper');

module.exports = {
  Query: {
    documents(root, args, context) {
      return context.prisma.documents();
    },
  },
  Mutation: {
    async uploadDocument(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const file = await uploadFile(args.file, context);

      return context.prisma.createDocument({
        name: file.name,
        owner: { connect: { id } },
        file: { connect: { id: file.id } },
      });
    },
    editDocument(root, args, context) {
      return context.prisma.updateDocument({
        where: { id: args.documentId },
        data: args.input,
      });
    },
  },
  File: {},
};
