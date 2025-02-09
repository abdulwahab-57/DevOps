// Import PrismaClient
const { PrismaClient } = require('@prisma/client');

// Create a global variable to store the Prisma client instance
let globalForPrisma = global;

// Check if Prisma client is already initialized globally
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, store the Prisma client instance globally to reuse it
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = { prisma };
