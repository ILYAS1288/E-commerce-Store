import { NextResponse } from 'next/server';
import { getDb, getProductsCollection, getOrdersCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const productsCol = await getProductsCollection();
    const ordersCol = await getOrdersCollection();
    const usersCol = db.collection('users');

    // 1. Get counts and aggregations
    const totalProducts = await productsCol.countDocuments();
    const activeUsers = await usersCol.countDocuments();
    
    const orders = await ordersCol.find({}).toArray();
    const totalSales = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    
    const openOrders = orders.filter(o => o.status === 'pending').length;

    // 2. Sales Trend (Last 7 Days)
    const salesByDate: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      salesByDate[dateStr] = 0;
    }

    orders.forEach(order => {
      if (order.status !== 'cancelled' && order.createdAt) {
        const dateStr = new Date(order.createdAt).toISOString().split('T')[0];
        if (dateStr in salesByDate) {
          salesByDate[dateStr] += order.totalAmount || 0;
        }
      }
    });

    const trendData = Object.entries(salesByDate).map(([date, sales]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales: Math.round(sales * 100) / 100,
    }));

    // 3. Category Distribution
    const products = await productsCol.find({}).toArray();
    const categories: { [key: string]: number } = {};
    products.forEach(p => {
      if (p.category) {
        categories[p.category] = (categories[p.category] || 0) + 1;
      }
    });
    const categoryData = Object.entries(categories).map(([category, count]) => ({
      category,
      count,
    }));

    const lowStockCount = products.filter(p => (p.countInStock || 0) < 10).length;

    return NextResponse.json({
      kpis: {
        totalSales: Math.round(totalSales * 100) / 100,
        activeUsers,
        openOrders,
        totalProducts,
        lowStockCount,
      },
      salesTrend: trendData,
      categoryDistribution: categoryData,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
