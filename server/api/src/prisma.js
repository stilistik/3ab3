const { Prisma } = require('./generated/prisma-client');

const { PRISMA_ENDPOINT } = process.env

const prisma = new Prisma({
  endpoint: PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SERVICE_SECRET,
});

module.exports = prisma;
