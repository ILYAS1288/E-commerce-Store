const { PrismaClient } = require('@prisma/client');
const config = require('./prisma.config.ts'); // This might not work with require because it's TS
// Wait, I should use tsx to run the debug script if I want to use the config

async function test() {
  try {
    const prisma = new PrismaClient();
    console.log('Testing with no args...');
    await prisma.$connect();
    console.log('Connected!');
    const products = await prisma.product.findMany();
    console.log('Products found:', products.length);
  } catch (error: any) {
    console.error('Error with no args:', error?.message ?? error);
  }
}

test();
