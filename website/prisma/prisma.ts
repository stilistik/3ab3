import { Prisma } from '../generated/prisma-client';

const { PRISMA_ENDPOINT, PRISMA_SERVICE_SECRET } = process.env;

// @ts-ignore
export const prisma = new Prisma({
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_SERVICE_SECRET,
});
