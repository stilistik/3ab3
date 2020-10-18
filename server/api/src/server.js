const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const auth = require('./auth');
const cors = require('cors');
const { verifyTokenInConnection } = require('./auth/verify');
const prisma = require('./prisma');

const { MODE, API_PATH, API_SUB_PATH, API_PORT } = process.env;

const app = express();

// Compress all requests
app.use(compression());
app.use(cors());

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication Endpoints
app.use(passport.initialize());

if (MODE === 'development') {
  app.post('/auth/passwordless/debugsession', auth.passwordless.debugSession);
}

app.post(
  '/auth/passwordless/request',
  passport.authenticate('basic', { session: false }),
  auth.passwordless.requestEmail
);
app.post(
  '/auth/passwordless/login',
  passport.authenticate('basic', { session: false }),
  auth.passwordless.requestToken
);

app.use(API_PATH, passport.authenticate('bearer', { session: false }));

const apollo = new ApolloServer({
  schema: schema,
  introspection: true,
  context: ({ req, connection }) => {
    if (connection) {
      return {
        connection: connection.context,
        prisma: prisma,
      };
    } else {
      return {
        headers: req.headers,
        request: req,
        prisma: prisma,
      };
    }
  },
  subscriptions: {
    onConnect: async (connectionParams, websocket) => {
      if (connectionParams) {
        const { id } = verifyTokenInConnection(connectionParams);
        const user = await prisma.updateUser({
          where: { id },
          data: { isOnline: true },
        });
        console.log('User CONNECT: ' + user.name);
        if (user)
          return {
            currentUser: user,
          };
      }
      throw new Error('Missing auth token!');
    },
    onOperation: async (connectionParams) => {
      console.log('operation', connectionParams);
    },
    onDisconnect: async (_, context) => {
      const initialContext = await context.initPromise;
      console.log('User DISCONNECT: ' + initialContext.currentUser.name);
      await prisma.updateUser({
        where: { id: initialContext.currentUser.id },
        data: {
          isOnline: false,
          lastOnline: new Date().toISOString(),
        },
      });
    },
  },
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
  },
});
apollo.applyMiddleware({
  cors: false,
  app,
  path: API_PATH,
  subscriptionsPath: API_SUB_PATH,
});

// Reject any unimplemented requests
app.use('/', (req, res) => {
  res.sendStatus(404);
});

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(API_PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${API_PORT}${apollo.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${API_PORT}${
      apollo.subscriptionsPath
    }`
  );
});
