const { merge } = require('lodash');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date');
const { makeExecutableSchema } = require('apollo-server-express');

const user = require('./User');
const client = require('./Client');
const checklist = require('./Checklist');
const item = require('./Item');
const consumedItem = require('./ConsumedItem');

const Scalar = `
  scalar Date
  scalar Time
  scalar DateTime
`;

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
const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};

module.exports = makeExecutableSchema({
  typeDefs: [
    Scalar,
    Query,
    Mutation,
    user.typeDef,
    checklist.typeDef,
    client.typeDef,
    item.typeDef,
    consumedItem.typeDef,
  ],
  resolvers: merge(
    resolvers,
    user.resolvers,
    checklist.resolvers,
    client.resolvers,
    item.resolvers,
    consumedItem.resolvers
  ),
});
