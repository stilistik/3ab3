const { merge } = require('lodash');
const { makeExecutableSchema } = require('apollo-server-express');
const user = require('./User');
const post = require('./Post');
const client = require('./Client');
const item = require('./Item');
const consumedItem = require('./ConsumedItem');

const Query = `
  type Query {
    _empty: String
  }
`;
const Mutation = `
  type Mutation {
    _empty: String
  }
`;

// Default resolvers
const resolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    user.typeDef,
    post.typeDef,
    client.typeDef,
    item.typeDef,
    consumedItem.typeDef,
  ],
  resolvers: merge(
    resolvers,
    user.resolvers,
    post.resolvers,
    client.resolvers,
    item.resolvers,
    consumedItem.resolvers
  ),
});
