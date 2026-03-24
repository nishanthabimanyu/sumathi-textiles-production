import fs from 'fs';
import path from 'path';
import { Product } from '@/data/products';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'src/data/products.json');

export function getProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileData = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
      return JSON.parse(fileData) as Product[];
    }
  } catch (error) {
    console.error("Error reading products.json:", error);
  }
  return [];
}

export function saveProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving products.json:", error);
    return false;
  }
}
