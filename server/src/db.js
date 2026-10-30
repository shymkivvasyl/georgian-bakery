// Prisma Client is generated from schema.prisma (npx prisma generate)
import { PrismaClient } from './generated/prisma/client.ts';
// Adapter: how Prisma connects to PostgreSQL
import { PrismaPg } from '@prisma/adapter-pg';

// One client for the whole server (each client opens its own connections)
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export default prisma;
