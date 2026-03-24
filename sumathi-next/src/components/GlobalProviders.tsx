"use client";

import { CartProvider } from "@/context/CartContext";
import AdminOverlay from "@/components/AdminOverlay";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <AdminOverlay />
    </CartProvider>
  );
}
