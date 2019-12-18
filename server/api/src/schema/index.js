const { merge } = require('lodash');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date');
const { GraphQLUpload } = require('apollo-server-express');

const { makeExecutableSchema } = require('apollo-server-express');

const Pagination = require('./Pagination');
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
const Email = require('./Email');
const Post = require('./Post');
const Comment = require('./Comment');
const Committee = require('./Committee');
const Invitation = require('./Invitation');
const Todo = require('./Todo');
const TodoTemplate = require('./TodoTemplate');
const Question = require('./Question');
const Message = require('./Message');

const { IsAuthenticatedDirective, HasRoleDirective } = require('./Directives');

const Directives = `
  directive @isAuthenticated on OBJECT | FIELD_DEFINITION
  directive @hasRole(requires: UserRole = ADMIN) on OBJECT | FIELD_DEFINITION
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

const Subscription = `
  type Subscription {
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
    Subscription,
    Pagination.typeDef,
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
    Email.typeDef,
    Post.typeDef,
    Comment.typeDef,
    Committee.typeDef,
    Invitation.typeDef,
    Todo.typeDef,
    TodoTemplate.typeDef,
    Question.typeDef,
    Message.typeDef,
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
    File.resolvers,
    Email.resolvers,
    Post.resolvers,
    Comment.resolvers,
    Committee.resolvers,
    Invitation.resolvers,
    Todo.resolvers,
    TodoTemplate.resolvers,
    Question.resolvers,
    Message.resolvers
  ),
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
