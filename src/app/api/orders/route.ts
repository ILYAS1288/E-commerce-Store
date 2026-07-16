import { NextResponse } from 'next/server';
import { getOrdersCollection, getOrderItemsCollection, getProductsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const ordersCol = await getOrdersCollection();
    const orderItemsCol = await getOrderItemsCollection();
    const productsCol = await getProductsCollection();

    const orders = await ordersCol.find({}).sort({ createdAt: -1 }).toArray();
    const allOrderItems = await orderItemsCol.find({}).toArray();
    const products = await productsCol.find({}).toArray();
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    const populatedOrders = orders.map((order) => {
      const items = allOrderItems
        .filter((item) => item.orderId.toString() === order._id.toString())
        .map((item) => {
          const product = productMap.get(item.productId.toString());
          return {
            id: item._id.toHexString(),
            productId: item.productId.toHexString(),
            productName: product ? product.name : 'Unknown Product',
            productImage: product ? product.image : '',
            price: item.price,
            quantity: item.quantity,
          };
        });

      return {
        id: order._id.toHexString(),
        userEmail: order.userEmail,
        customerName: (order as any).customerName || '',
        customerPhone: (order as any).customerPhone || '',
        shippingAddress: (order as any).shippingAddress || '',
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt?.toISOString(),
        updatedAt: order.updatedAt?.toISOString(),
        items,
      };
    });

    return NextResponse.json(populatedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}


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

    // Validate each item has a valid ObjectId to prevent database errors
    for (const item of items) {
      if (!item.id || !ObjectId.isValid(item.id)) {
        return NextResponse.json(
          { error: `Invalid product ID format: ${item.id || 'missing'}` },
          { status: 400 }
        );
      }
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
