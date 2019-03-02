const {
  ApolloError,
  ForbiddenError,
  ValidationError,
  UserInputError,
} = require('apollo-server-express');

const FileHelper = require('../../helper/file.helper.js');

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

      const { fileId, filePath, fileHash } = await FileHelper.storeFS({
        stream,
        filename,
      });

      console.log(fileId, filePath, fileHash);
      // if (!filename) {
      //   throw new UserInputError('No filename provided');
      // }
      // const fileExtension = filename.split('.').pop();
      // if (_.indexOf(SUPPORTED_EXT, fileExtension.toUpperCase()) < 0) {
      //   throw new ValidationError(`Unsupported file format ${fileExtension}`);
      // }
      //

      //
      // const fileExist = await File.init().findByHash(fileHash);
      //
      // if (fileExist) {
      //   throw new ValidationError(`File existed in database`);
      // }
      //
      // const uploadedFile = await File.init().create({
      //   uuid: fileUuid,
      //   user_uuid: currentUser.uuid,
      //   dataset_uuid: dataset_uuid || null,
      //   filename: filename,
      //   mimetype: mimetype,
      //   extension: fileExtension,
      //   hash: fileHash,
      //   tags: tags,
      //   path: filePath,
      //   status: 'PARSING',
      // });
      // return uploadedFile;
    },
  },
};
