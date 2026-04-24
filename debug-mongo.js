const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

async function test() {
  const url = 'mongodb://localhost:27017/shopease';
  const client = new MongoClient(url);
  await client.connect();
  console.log('MongoDB connected');

  // Try to create a prisma adapter from the mongo client
  const db = client.db('shopease');

  // Check what Prisma exposes that might work as adapter
  const keys = Object.keys(require('@prisma/client'));
  console.log('Exported keys:', keys.filter(k => k.toLowerCase().includes('adapter') || k.toLowerCase().includes('mongo')));

  await client.close();
}

test().catch(console.error);
