import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/shopease';
const DB_NAME = 'shopease';

const products = [
  {
    name: 'UltraVision Pro Monitor',
    description: '4K OLED Display with 144Hz refresh rate and HDR1000 support. Perfect for creators and gamers.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    numReviews: 124,
    countInStock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'SonicWave Wireless ANC',
    description: 'Premium noise-canceling headphones with 40-hour battery life and spatial audio.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    rating: 4.9,
    numReviews: 89,
    countInStock: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'GripMaster Ergonomic Mouse',
    description: 'Precision laser sensor with customizable buttons and weight system. Designed for all-day comfort.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.7,
    numReviews: 210,
    countInStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lumina RGB Mechanical Keyboard',
    description: 'Hot-swappable switches with durable PBT keycaps and per-key RGB lighting.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.6,
    numReviews: 145,
    countInStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'AeroStream Gaming Chair',
    description: 'Memory foam padding with 4D armrests and premium breathable mesh fabric.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=800',
    category: 'Furniture',
    rating: 4.5,
    numReviews: 67,
    countInStock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'NovaBook Pro 16',
    description: 'The ultimate powerhouse for creative professionals. M3 Max chip, 64GB RAM, 2TB SSD.',
    price: 2499.0,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 5.0,
    numReviews: 42,
    countInStock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(DB_NAME);
    const collection = db.collection('Product');

    // Clear existing products to avoid duplicates
    await collection.deleteMany({});
    console.log('Cleared existing products');

    const result = await collection.insertMany(products);
    console.log(`✅ Seeded ${result.insertedCount} products successfully`);
  } finally {
    await client.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
