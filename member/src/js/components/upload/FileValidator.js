import { SUPPORTED_FILEFORMATS } from 'General';

/**
 * Validates a file against supported file formats defined in the general
 * settings.
 * @param {File} file: The input file to validate
 * @returns {File}: Returns the file if successfully validated against any
 * supported format, or null otherwise.
 */
export const validateFile = async (file) => {
  for (let format of SUPPORTED_FILEFORMATS) {
    const [magicNumber, startIndex, fileExtension] = format;

    // validate the file format using magic numbers
    const valid = await validateFileFormat(file, magicNumber, startIndex);
    if (!valid) continue;

    // validate the file extension, add it if necessary
    return validateFileExtension(file, fileExtension);
  }
  return null;
};

/**
 * Validates a file against a specific format.
 * @param {File} file: The input file to validate
 * @param {String} magicNumber: The specific magic number of the file format
 * @param {Number} startIndex: The offset of the magic number in the file byte stream
 * @returns {Boolean}: Returns true if successfully validated, false otherwise.
 */
const validateFileFormat = async (file, magicNumber, startIndex) => {
  const hex = await getMagicNumber(file, startIndex);
  if (hex === magicNumber) return true;
  else return false;
};

/**
 * Validates the file extension against the expected file format extension
 * and adds the expected file extension if there is a mismatch
 * @param {File} file: The input file
 * @param {String} fileExtension: The expected file extension based on the
 * file format description
 * @returns {File} The input file with the validated file extension.
 */
const validateFileExtension = (file, fileExtension) => {
  const ext = getFileExtension(file);
  if (ext === fileExtension) return file;
  else return addFileExtension(file, fileExtension);
};

/**
 * Adds the a file extension to the file name
 * @param {File} file: The file to add the extension to
 * @param {String} ext: The extension to add to the file name
 * @returns {File}: A new file object with the added extension
 */
const addFileExtension = (file, ext) => {
  const blob = file.slice();
  return new File([blob], `${file.name}.${ext}`);
};

/**
 * Get the file extension of a file using regex
 * @param {File} file: The file to get the extension from
 * @returns {String}: The file extension as a string
 */
const getFileExtension = (file) => {
  let re = /(?:\.([^.]+))?$/;
  return re.exec(file.name)[1];
};

/**
 * Retrieves the magic number from a file header and returns it
 * formatted as a hex string.
 * @param {File} file: The file to retrieve the magic number from
 * @param {Number} startIndex: The starting index of the magic number
 * in the byte sequence of the file
 * @returns {String}: The magic number as a hex string
 */
const getMagicNumber = (file, startIndex) => {
  let blob = file.slice(startIndex, startIndex + 4);
  let filereader = new FileReader();
  filereader.readAsArrayBuffer(blob);
  return new Promise((resolve) => {
    filereader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result);
        let bytes = uint.reduce(function(memo, i) {
          return memo + ('0' + i.toString(16)).slice(-2); //padd with leading 0 if <16
        }, '');
        const hex = bytes.toUpperCase();
        resolve(hex);
      }
    };
  });
};

export default validateFile;
