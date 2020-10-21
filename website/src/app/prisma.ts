import { Prisma } from '../../generated/prisma-ts-client';

const { PRISMA_HOST, PRISMA_PORT, PRISMA_SERVICE_SECRET } = process.env;

export const prisma = new Prisma({
  endpoint: `${PRISMA_HOST}:${PRISMA_PORT}`,
  secret: PRISMA_SERVICE_SECRET,
});
