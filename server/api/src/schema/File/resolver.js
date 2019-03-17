const { uploadFile } = require('../../helper/file.helper.js');

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
    async upload(root, args, context) {
      return uploadFile(root, args, context);
    },
  },
};
