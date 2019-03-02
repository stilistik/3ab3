// Module dependencies
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const mkdirp = require('mkdirp');
const uuidv4 = require('uuid/v4');

const UPLOAD_DIR = path.resolve(process.env.STORAGE_ROOT);

class FileHelper {
  static get uploadDirPath() {
    return UPLOAD_DIR;
  }

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

// Module exports
module.exports = FileHelper;
