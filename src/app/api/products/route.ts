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
