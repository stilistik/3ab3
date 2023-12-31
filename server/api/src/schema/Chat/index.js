const path = require('path');
const { importSchema } = require('../helper.graphql');

// Import graphql schema
const typeDef = importSchema(path.join(__dirname, 'chat.graphql'));
const resolver = require('./resolver');

// Module exports
module.exports = {
  typeDef: typeDef,
  resolvers: resolver,
};
