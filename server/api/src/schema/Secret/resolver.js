const { uploadFile, deleteFile } = require('../../helper/file.helper.js');
const { verifyAndDecodeToken } = require('../../auth/verify');
const { canUserModifyEvent } = require('../../helper/authorization.helper');

module.exports = {
  Query: {
    secrets: (root, args, context) => {
      return context.prisma.secrets();
    },
  },
  Mutation: {},
  Secret: {
    creator: (root, args, context) => {
      return context.prisma.secret({ id: root.id }).creator();
    },
  },
};
