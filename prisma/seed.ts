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
  {
    name: 'Quantum Desk Mat',
    description: 'Premium vegan leather desk mat with anti-slip base and integrated magnetic cable management.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.8,
    numReviews: 315,
    countInStock: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'StealthPod Microphone',
    description: 'Studio-quality USB condenser microphone with built-in pop filter and zero-latency monitoring.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9f60c6d?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    rating: 4.7,
    numReviews: 89,
    countInStock: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Orbital Smart Light',
    description: 'App-controlled ambient light bar with 16 million colors and music sync capabilities.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.5,
    numReviews: 240,
    countInStock: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'ErgoLife Standing Desk',
    description: 'Dual-motor standing desk with carbonized bamboo top and 4 memory presets.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1595514535128-4032d8471b48?auto=format&fit=crop&q=80&w=800',
    category: 'Furniture',
    rating: 4.9,
    numReviews: 56,
    countInStock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Nexus Charging Dock',
    description: '3-in-1 wireless charging station for phone, watch, and earbuds. Machined aluminum finish.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.6,
    numReviews: 412,
    countInStock: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'VR Horizon Headset',
    description: 'Next-gen virtual reality headset with 4k displays per eye and inside-out tracking.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    numReviews: 128,
    countInStock: 22,
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
