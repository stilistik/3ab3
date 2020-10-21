import { Prisma } from '../../generated/prisma-ts-client';

const { WEBSITE_PRISMA_ENDPOINT, PRISMA_SERVICE_SECRET } = process.env;

export const prisma = new Prisma({
  endpoint: WEBSITE_PRISMA_ENDPOINT,
  secret: PRISMA_SERVICE_SECRET,
});
