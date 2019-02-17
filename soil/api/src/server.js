const { Prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const schema = require('./schema');
const { authenticate, token } = require('./auth');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const server = new GraphQLServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  context: ({ request }) => ({
    request: request,
    prisma: prisma,
  }),
  middlewares: [authenticate],
});

server.express.post('/oauth/token', token);

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
