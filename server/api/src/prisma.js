const { Prisma } = require('./generated/prisma-client');

const { PRISMA_HOST, PRISMA_PORT, PRISMA_SERVICE_SECRET } = process.env;

const prisma = new Prisma({
  endpoint: `${PRISMA_HOST}:${PRISMA_PORT}`,
  secret: PRISMA_SERVICE_SECRET,
});

module.exports = prisma;
