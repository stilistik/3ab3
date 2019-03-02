// Module dependencies
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const mkdirp = require('mkdirp');

const UPLOAD_DIR = path.join(process.env.STORAGE_ROOT, './public/file');

class FileHelper {
  static get uploadDirPath() {
    return UPLOAD_DIR;
  }

  static checkExists(filePath) {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }

  static readFile(filePath, opts) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, opts, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  static storeFS({ stream, filename }, file_id) {
    const dirPath = path.resolve(UPLOAD_DIR);
    const extension = filename.split('.').pop();
    const filePath = path.join(dirPath, `${file_id}.${extension}`);

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
            file_id,
            filePath,
            fileHash,
          });
        });
    });
  }
}

// Module exports
module.exports = FileHelper;
