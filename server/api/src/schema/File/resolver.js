const {
  ApolloError,
  ForbiddenError,
  ValidationError,
  UserInputError,
} = require('apollo-server-express');

const FileHelper = require('../../helper/file.helper.js');

const SUPPORTED_EXT = ['PNG', 'GIF', 'JPG', 'PDF'];

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
      const { createReadStream, filename, mimetype } = await args.file;
      const stream = createReadStream();

      if (!filename) {
        throw new UserInputError('No filename provided');
      }

      const fileExtension = filename.split('.').pop();
      if (SUPPORTED_EXT.indexOf(fileExtension.toUpperCase()) < 0) {
        throw new ValidationError(`Unsupported file format ${fileExtension}`);
      }

      const { fileId, filePath, fileHash } = await FileHelper.storeFS({
        stream,
        filename,
      });

      const fileExist = await context.prisma.file({ hash: fileHash });
      if (fileExist) {
        await FileHelper.deleteFile(filePath);
        throw new ValidationError(`File already exists in the database`);
      }

      return context.prisma.createFile({
        fileId: fileId,
        path: filePath,
        hash: fileHash,
        filename: filename,
        mimetype: mimetype,
        extension: fileExtension,
        uri: '/cdn/' + fileId + '.' + fileExtension,
      });
    },
  },
};
