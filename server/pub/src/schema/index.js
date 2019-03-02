const { merge } = require('lodash');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date');

const { makeExecutableSchema } = require('apollo-server-express');

const Event = require('./Event');
const Production = require('./Production');

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
  typeDefs: [Scalar, Query, Mutation, Event.typeDef, Production.typeDef],
  resolvers: merge(resolvers, Event.resolvers, Production.resolvers),
});
