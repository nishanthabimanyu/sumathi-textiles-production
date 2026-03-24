import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/products.server';
import { verifyAuth } from '@/lib/auth';
import { Product } from '@/data/products';

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as Product;
    
    if (!body.title || !body.price) {
      return NextResponse.json({ error: 'Missing title or price' }, { status: 400 });
    }

    const products = getProducts();
    const existingIndex = products.findIndex(p => p.id === body.id || p.slug === body.slug);

    if (existingIndex > -1) {
      // Update
      products[existingIndex] = { ...products[existingIndex], ...body };
    } else {
      // Create
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct: Product = {
        ...body,
        id: newId,
        slug: body.slug || body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        isNew: body.isNew ?? true,
        festivals: body.festivals || []
      };
      products.push(newProduct);
    }

    const success = saveProducts(products);
    return NextResponse.json({ success, message: 'Product updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);

    const success = saveProducts(filtered);
    return NextResponse.json({ success, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete error' }, { status: 500 });
  }
}
