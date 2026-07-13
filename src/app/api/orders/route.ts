import { NextResponse } from 'next/server';
import { getOrdersCollection, getOrderItemsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      items, 
      totalAmount, 
      userEmail = "guest@example.com",
      customerName,
      customerPhone,
      shippingAddress 
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const ordersCol = await getOrdersCollection();
    const orderItemsCol = await getOrderItemsCollection();

    // Create Order
    const newOrder = {
      _id: new ObjectId(),
      userEmail,
      customerName,
      customerPhone,
      shippingAddress,
      totalAmount,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ordersCol.insertOne(newOrder);

    // Create OrderItems
    const newOrderItems = items.map((item: any) => ({
      _id: new ObjectId(),
      quantity: item.quantity,
      price: item.price,
      productId: new ObjectId(item.id),
      orderId: newOrder._id,
    }));

    if (newOrderItems.length > 0) {
      await orderItemsCol.insertMany(newOrderItems);
    }

    return NextResponse.json({ success: true, orderId: newOrder._id.toHexString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
