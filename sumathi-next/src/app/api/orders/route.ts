import { NextResponse } from 'next/server';
import { addOrder } from '@/lib/orders.server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.customer || !body.items || !body.total) {
      return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 });
    }

    const order = addOrder({
      customer: body.customer,
      items: body.items,
      total: body.total,
      paymentMethod: body.paymentMethod || 'Credit Card'
    });

    if (!order) {
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid order structure' }, { status: 400 });
  }
}
