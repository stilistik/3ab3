const { merge } = require('lodash');

const user = require('./user');
const post = require('./post');

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

module.exports = {
  typeDefs: [Query, Mutation, user.typeDef, post.typeDef],
  resolvers: merge(resolvers, user.resolvers, post.resolvers),
};
