const fs = require('fs');

class GraphqlHelper {
  static importSchema(filePath) {
    return fs.readFileSync(filePath, 'utf8');
  }
}

module.exports = GraphqlHelper;
