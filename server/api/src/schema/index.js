const { merge } = require('lodash');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date');
const { GraphQLUpload } = require('apollo-server-express');

const { makeExecutableSchema } = require('apollo-server-express');

const User = require('./User');
const Client = require('./Client');
const Product = require('./Product');
const Item = require('./Item');
const Purchase = require('./Purchase');
const Payment = require('./Payment');
const Transaction = require('./Transaction');
const Event = require('./Event');
const Production = require('./Production');
const File = require('./File');

const AuthDirective = require('./AuthDirective');

const Directives = `
  directive @auth(
   requires: UserRole = ADMIN,
  ) on OBJECT | FIELD_DEFINITION
`;

const Scalar = `
  scalar Date
  scalar Time
  scalar DateTime
  scalar Upload
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
  Upload: GraphQLUpload,
};

module.exports = makeExecutableSchema({
  typeDefs: [
    Directives,
    Scalar,
    Query,
    Mutation,
    User.typeDef,
    Client.typeDef,
    Product.typeDef,
    Item.typeDef,
    Purchase.typeDef,
    Payment.typeDef,
    Transaction.typeDef,
    Event.typeDef,
    Production.typeDef,
    File.typeDef,
  ],
  resolvers: merge(
    resolvers,
    User.resolvers,
    Client.resolvers,
    Product.resolvers,
    Item.resolvers,
    Purchase.resolvers,
    Payment.resolvers,
    Transaction.resolvers,
    Event.resolvers,
    Production.resolvers,
    File.resolvers
  ),
  schemaDirectives: {
    auth: AuthDirective,
  },
});
