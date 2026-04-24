import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

export interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  _id: ObjectId;
  quantity: number;
  price: number;
  productId: ObjectId;
  orderId: ObjectId;
}

export interface Order {
  _id: ObjectId;
  userEmail: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems?: OrderItem[];
}

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/shopease';
const DB_NAME = 'shopease';

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var mongoDb: Db | undefined;
}

async function connectToMongoDB(): Promise<Db> {
  if (globalThis.mongoDb) return globalThis.mongoDb;

  if (!globalThis.mongoClient) {
    globalThis.mongoClient = new MongoClient(MONGODB_URI);
    await globalThis.mongoClient.connect();
  }

  globalThis.mongoDb = globalThis.mongoClient.db(DB_NAME);
  return globalThis.mongoDb;
}

export async function getDb(): Promise<Db> {
  return connectToMongoDB();
}

export async function getProductsCollection(): Promise<Collection<Product>> {
  const db = await getDb();
  return db.collection<Product>('Product');
}

export async function getOrdersCollection(): Promise<Collection<Order>> {
  const db = await getDb();
  return db.collection<Order>('Order');
}

export async function getOrderItemsCollection(): Promise<Collection<OrderItem>> {
  const db = await getDb();
  return db.collection<OrderItem>('OrderItem');
}
