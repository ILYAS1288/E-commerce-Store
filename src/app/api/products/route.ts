import { NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const products = await getProductsCollection();
    const docs = await products.find({}).sort({ createdAt: -1 }).toArray();

    // Serialize for JSON (convert ObjectId and Date to strings)
    const serialized = docs.map((p) => ({
      id: p._id.toHexString(),
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      rating: p.rating,
      numReviews: p.numReviews,
      countInStock: p.countInStock,
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, countInStock } = body;

    if (!name || !description || price == null || !image || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const products = await getProductsCollection();
    const now = new Date();
    const result = await products.insertOne({
      name,
      description,
      price: Number(price),
      image,
      category,
      countInStock: Number(countInStock) || 0,
      rating: 0,
      numReviews: 0,
      createdAt: now,
      updatedAt: now,
    } as any);

    return NextResponse.json({ id: result.insertedId.toHexString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
