const { Prisma } = require('./generated/prisma-client');

const { API_PRISMA_ENDPOINT, PRISMA_SERVICE_SECRET } = process.env

const prisma = new Prisma({
  endpoint: API_PRISMA_ENDPOINT,
  secret: PRISMA_SERVICE_SECRET,
});

module.exports = prisma;
