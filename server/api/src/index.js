const { Prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    publishedPosts(root, args, context) {
      return context.prisma.posts({ where: { published: true } });
    },
    posts(root, args, context) {
      return context.prisma.posts();
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId });
    },
    postsByUser(root, args, context) {
      return context.prisma.user({ id: args.userId }).posts();
    },
    users(root, args, context) {
      return context.prisma.users();
    },
  },
  Mutation: {
    createUser(root, args, context) {
      const input = args.input;
      return context.prisma.createUser(input);
    },
    createDraft(root, args, context) {
      return context.prisma.createPost({
        title: args.title,
        author: {
          connect: {
            id: args.userId,
          },
        },
      });
    },
    publish(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true },
      });
    },
  },
  User: {
    posts(root, args, context) {
      return context.prisma.user({ id: root.id }).posts();
    },
  },
  Post: {
    author(root, args, context) {
      return context.prisma.post({ id: root.id }).author();
    },
  },
};

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
