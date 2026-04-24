const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function test() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const prisma = new PrismaClient({
      url: process.env.DATABASE_URL
    });
    console.log('PrismaClient initialized successfully');
    const products = await prisma.product.findMany();
    console.log('Products found:', products.length);
  } catch (error) {
    console.error('Initialization Error:', error);
  }
}

test();
