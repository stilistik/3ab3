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
const Logger = require('./helper/logger');

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
  app.post('/auth/session', auth.passwordless.debugSession);
}

app.post(
  '/auth/request',
  passport.authenticate('basic', { session: false }),
  auth.passwordless.requestEmail
);
app.post(
  '/auth/login',
  passport.authenticate('basic', { session: false }),
  auth.passwordless.requestToken
);
app.post(
  '/auth/token',
  passport.authenticate('basic', { session: false }),
  auth.passwordless.refreshToken
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
        Logger.log('User CONNECT: ' + user.name);
        if (user)
          return {
            currentUser: user,
          };
      }
      throw new Error('Missing auth token!');
    },
    onOperation: async (connectionParams) => {
      Logger.log('operation', connectionParams);
    },
    onDisconnect: async (_, context) => {
      const initialContext = await context.initPromise;
      Logger.log('User DISCONNECT: ' + initialContext.currentUser.name);
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
  Logger.log(
    `🚀 Server ready at http://localhost:${API_PORT}${apollo.graphqlPath}`
  );
  Logger.log(
    `🚀 Subscriptions ready at ws://localhost:${API_PORT}${
      apollo.subscriptionsPath
    }`
  );
});
