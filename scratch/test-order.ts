import { getOrdersCollection, getOrderItemsCollection } from '../src/lib/mongodb';
import { ObjectId } from 'mongodb';

async function test() {
  console.log('Testing Database connection and insertion...');
  try {
    const ordersCol = await getOrdersCollection();
    const orderItemsCol = await getOrderItemsCollection();

    console.log('Collections retrieved successfully');

    // Create dummy order
    const newOrder = {
      _id: new ObjectId(),
      userEmail: 'test-user@example.com',
      customerName: 'Test User',
      customerPhone: '1234567890',
      shippingAddress: '123 Test St',
      totalAmount: 100,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Inserting dummy order:', newOrder._id.toHexString());
    await ordersCol.insertOne(newOrder as any);
    console.log('Order inserted successfully');

    // Create dummy order item
    const newOrderItems = [
      {
        _id: new ObjectId(),
        quantity: 1,
        price: 100,
        productId: new ObjectId(), // dummy product id
        orderId: newOrder._id,
      }
    ];

    console.log('Inserting dummy order items...');
    await orderItemsCol.insertMany(newOrderItems as any);
    console.log('Order items inserted successfully');

    // Cleanup
    await ordersCol.deleteOne({ _id: newOrder._id });
    await orderItemsCol.deleteMany({ orderId: newOrder._id });
    console.log('Cleanup completed. Test passed!');
  } catch (error: any) {
    console.error('Test failed with error:', error);
  }
}

test();
