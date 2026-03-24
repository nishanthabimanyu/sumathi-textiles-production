import fs from 'fs';
import path from 'path';

const ORDERS_FILE_PATH = path.join(process.cwd(), 'src/data/orders.json');

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  timestamp: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
}

export function getOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE_PATH)) {
      const fileData = fs.readFileSync(ORDERS_FILE_PATH, 'utf-8');
      return JSON.parse(fileData) as Order[];
    }
  } catch (error) {
    console.error("Error reading orders.json:", error);
  }
  return [];
}

export function saveOrders(orders: Order[]): boolean {
  try {
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving orders.json:", error);
    return false;
  }
}

export function addOrder(order: Omit<Order, 'id' | 'timestamp' | 'status'>): Order | null {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: 'Pending'
  };
  
  orders.unshift(newOrder); // Add to beginning (newest first)
  const success = saveOrders(orders);
  return success ? newOrder : null;
}
