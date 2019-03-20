const { uploadFile, deleteFile } = require('../../helper/file.helper.js');

module.exports = {
  Query: {
    files(root, args, context) {
      return context.prisma.files();
    },
    file(root, args, context) {
      return context.prisma.file({ id: args.fileId });
    },
  },

  Mutation: {
    async uploadFile(root, args, context) {
      return uploadFile(args.file, context);
    },
    async deleteFile(root, args, context) {
      return deleteFile(args.fileId, context);
    },
  },
};
