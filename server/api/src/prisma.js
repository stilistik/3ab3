const { Prisma } = require('./generated/prisma-client');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

module.exports = prisma;
