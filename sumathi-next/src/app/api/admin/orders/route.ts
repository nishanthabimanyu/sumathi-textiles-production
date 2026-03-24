import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/orders.server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing ID or Status' }, { status: 400 });
    }

    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex].status = status;
    const success = saveOrders(orders);

    return NextResponse.json({ success, message: 'Order status updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
