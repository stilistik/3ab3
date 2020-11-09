class Logger {
  static log(text) {
    console.log(`[Logger - ${new Date().toISOString()}] ${text}`);
  }
}

module.exports = Logger;
