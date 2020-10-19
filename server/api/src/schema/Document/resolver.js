const { verifyAndDecodeToken } = require('../../auth/verify');
const { uploadFile, createPdfThumbnail } = require('../../helper/file.helper');

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
  },
  Document: {
    file(root, args, context) {
      return context.prisma.document({ id: root.id }).file();
    },
  },
};
