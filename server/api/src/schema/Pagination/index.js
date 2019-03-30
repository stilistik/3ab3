const path = require('path');
const { importSchema } = require('../helper.graphql');

// Import graphql schema
const typeDef = importSchema(path.join(__dirname, 'pagination.graphql'));

// Module exports
module.exports = {
  typeDef: typeDef,
};
