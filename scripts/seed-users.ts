import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function seedUsers() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');

    const saltRounds = 10;

    const users = [
      {
        email: 'admin@example.com',
        password: await bcryptjs.hash('adminpass', saltRounds),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@example.com',
        password: await bcryptjs.hash('userpass', saltRounds),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Delete existing users to avoid duplicates
    await usersCollection.deleteMany({ email: { $in: ['admin@example.com', 'user@example.com'] } });

    // Insert new users
    const result = await usersCollection.insertMany(users);
    console.log(`✅ Seeded ${result.insertedCount} users to MongoDB`);
    console.log('Demo credentials:');
    console.log('  Admin: admin@example.com / adminpass');
    console.log('  User: user@example.com / userpass');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedUsers();
