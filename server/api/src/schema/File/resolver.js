const { ValidationError, UserInputError } = require('apollo-server-express');
const { AuthenticationError } = require('../../auth/errors');
const verifyAndDecodeToken = require('../../auth/verify');

const FileHelper = require('../../helper/file.helper.js');
const SUPPORTED_EXT = ['PNG', 'GIF', 'JPG', 'PDF'];

const uploadFile = async (root, args, context) => {
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
};

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
    async uploadAvatar(root, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const file = await uploadFile(root, args, context);
      await context.prisma.updateUser({
        where: { id: user.id },
        data: { avatar: file.uri },
      });

      return file;
    },
  },
};
