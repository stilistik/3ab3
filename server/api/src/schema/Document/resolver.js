const { verifyAndDecodeToken } = require('../../auth/verify');
const {
  uploadFile,
  deleteFile,
  createPdfThumbnail,
} = require('../../helper/file.helper');

module.exports = {
  Query: {
    documents(root, args, context) {
      return context.prisma.documents();
    },
  },
  Mutation: {
    async uploadDocument(root, args, context) {
      const { id } = verifyAndDecodeToken(context);

      const file = await uploadFile(args.input.file, context);
      const thumbnailFile = await createPdfThumbnail(args.input.file, context);

      return context.prisma.createDocument({
        name: file.filename,
        owner: { connect: { id } },
        file: { connect: { id: file.id } },
        thumbnail: thumbnailFile.uri,
      });
    },
    editDocument(root, args, context) {
      return context.prisma.updateDocument({
        where: { id: args.documentId },
        data: args.input,
      });
    },
    async deleteDocument(root, args, context) {
      const doc = await context.prisma.document({
        id: args.documentId,
      });
      if (doc) {
        const file = await context.prisma
          .document({ id: args.documentId })
          .file();

        const thumbnailFile = await context.prisma.file({ uri: doc.thumbnail });

        await context.prisma.deleteDocument({ id: doc.id });
        if (file) {
          await deleteFile(file.id, context);
        }
        if (thumbnailFile) {
          await deleteFile(thumbnailFile.id, context);
        }
      }

      return Boolean(doc);
    },
  },
  Document: {
    file(root, args, context) {
      return context.prisma.document({ id: root.id }).file();
    },
  },
};
