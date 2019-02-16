const { Prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-core');
const schema = require('./schema');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION } = process.env;

const authenticate = async (resolve, root, args, context, info) => {
  try {
    jwt.verify(context.request.get('Authorization'), ACCESS_TOKEN_SECRET);
  } catch (e) {
    return new AuthenticationError(
      'Invalid access token, authorization failed.'
    );
  }
  const result = await resolve(root, args, context, info);
  return result;
};

const server = new GraphQLServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  context: ({ request }) => ({
    request: request,
    prisma: prisma,
  }),
  middlewares: [authenticate],
});

server.express.post('/oauth/token', (req, res) => {
  const accessToken = jwt.sign(
    {
      timestamp: +new Date(),
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
  return res.send(accessToken);
});

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
