const { Prisma } = require('./generated/prisma-client');
const express = require('express');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const auth = require('./auth');

const API_PATH = '/api';

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const app = express();

// Authentication Endpoints
app.use(passport.initialize());
app.get('/oauth/verify', auth.oauth2.verify);
app.post('/oauth/token', auth.oauth2.token);

// The GraphQL endpoint for API using Apollo Server
app.use(API_PATH, passport.authenticate('bearer', { session: false }));

// Reject any unimplemented requests
app.use('/', (req, res) => {
  res.sendStatus(404);
});

const apollo = new ApolloServer({
  schema: schema,
  introspection: true,
  context: ({ req }) => {
    return {
      request: req,
      prisma: prisma,
    };
  },
});
apollo.applyMiddleware({ cors: false, app, path: API_PATH });

app.listen({ port: 4000 }, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000`)
);
