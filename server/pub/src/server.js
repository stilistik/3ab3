const { Prisma } = require('./generated/prisma-client');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const cors = require('cors');

const API_PATH = '/pub';

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const app = express();

// Compress all requests
app.use(compression());
app.use(cors());

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apollo = new ApolloServer({
  schema: schema,
  introspection: true,
  context: ({ req }) => {
    return {
      request: req,
      prisma: prisma,
    };
  },
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
  },
});
apollo.applyMiddleware({ cors: false, app, path: API_PATH });

// Reject any unimplemented requests
app.use('/', (req, res) => {
  res.sendStatus(404);
});

app.listen({ port: 5000 }, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:5000`)
);
