const { Prisma } = require('./generated/prisma-client');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
  secret: process.env.PRISMA_SERVICE_SECRET,
});

module.exports = prisma;
