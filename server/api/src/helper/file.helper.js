// Module dependencies
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const mkdirp = require('mkdirp');
const uuidv4 = require('uuid/v4');
const { ValidationError, UserInputError } = require('apollo-server-express');

const UPLOAD_DIR = path.resolve(process.env.STORAGE_ROOT);
const SUPPORTED_EXT = ['PNG', 'GIF', 'JPG', 'JPEG', 'PDF', 'TIFF'];

class FileHelper {
  static get uploadDirPath() {
    return UPLOAD_DIR;
  }

  /**
  Helper function to delete a file from the local file system
  */
  static deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /**
  Helper function to store a file on the local file system
  */
  static storeFS({ stream, filename }) {
    const fileId = uuidv4();
    const dirPath = path.resolve(UPLOAD_DIR);
    const extension = filename.split('.').pop();
    const filePath = path.join(dirPath, `${fileId}.${extension}`);

    mkdirp.sync(dirPath);

    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha1');
      hash.setEncoding('hex');
      stream.pipe(hash);
      stream
        .on('error', (error) => {
          if (stream.truncated) {
            // Delete the truncated file
            fs.unlinkSync(filePath);
          }
          reject(error);
        })
        .pipe(fs.createWriteStream(filePath))
        .on('error', (error) => reject(error))
        .on('finish', () => {
          hash.end();
          const fileHash = hash.read();
          resolve({
            fileId,
            filePath,
            fileHash,
          });
        });
    });
  }
}

/**
Convenience function to delete a file from the database and from the file
system.
*/
const deleteFile = async (fileId, context) => {
  const file = await context.prisma.deleteFile({ id: fileId });
  await FileHelper.deleteFile(file.path);
  return file;
};

/**
Convenience function to store a new file on the file system and create a
database entry for it.
*/
const uploadFile = async (file, context) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  if (!filename) {
    throw new UserInputError('No filename provided');
  }

  const fileExtension = filename.split('.').pop();
  if (SUPPORTED_EXT.indexOf(fileExtension.toUpperCase()) < 0) {
    throw new ValidationError(`Unsupported file format: ${fileExtension}`);
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

// Module exports
module.exports = {
  FileHelper,
  uploadFile,
  deleteFile,
};
