"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { products, Product } from '@/data/products';
import { SiteContent, getMergedProducts } from '@/lib/content';

export interface CartItem extends Product {
  qty: number;
}

export interface AuthUser {
  name: string;
  email: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (slug?: string, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (val: boolean) => void;
  activeVideo: string | null;
  setActiveVideo: (val: string | null) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  
  // ADMIN INLINE EDITING FIELDS
  localContent: SiteContent | null;
  hasChanges: boolean;
  updateField: (path: string[], value: string) => void;
  saveChanges: () => Promise<void>;
  isAdmin: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // ADMIN STATES
  const [localContent, setLocalContent] = useState<SiteContent | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sumathi_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) { console.error("Failed to parse cart", e); }
    } else {
      // Fallback defaults if empty
      setCartItems([
        { ...products[0], qty: 1 },
        { ...products[3], qty: 1 },
      ]);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('sumathi_cart')) {
      localStorage.setItem('sumathi_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdmin(true);
      fetch('/api/admin/content', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setLocalContent(data); })
      .catch(err => console.error("Failed to load admin content", err));
    }
  }, []);

  const updateField = (path: string[], value: string) => {
    if (!localContent) return;
    const newContent = JSON.parse(JSON.stringify(localContent)); // Deep clone
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setLocalContent(newContent);
    setHasChanges(true);
  };

  const saveChanges = async () => {
    if (!localContent) return;
    const token = localStorage.getItem('admin_token');
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(localContent)
    });
    if (!res.ok) throw new Error('Save failed');
    setHasChanges(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const addToCart = (slug?: string, qty: number = 1) => {
    const mergedProducts = localContent ? getMergedProducts(localContent) : products;
    const product = slug ? mergedProducts.find(p => p.slug === slug) : mergedProducts[0];
    if (!product) return;
    setCartItems(prev => {
      const existing = prev.find(i => Number(i.id) === Number(product.id));
      if (existing) {
        return prev.map(i => Number(i.id) === Number(product.id) ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateQty, clearCart,
      isSearchOpen, setIsSearchOpen, 
      isProfileOpen, setIsProfileOpen, 
      activeVideo, setActiveVideo,
      user, setUser,
      localContent, hasChanges, updateField, saveChanges, isAdmin
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
