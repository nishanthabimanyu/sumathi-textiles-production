"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartFallback() {
  const { cartItems, cartTotal, removeFromCart, updateQty } = useCart();

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-decorative text-4xl gold-gradient-text mb-8 border-b border-burnished-copper/20 pb-4">Your Shopping Bag</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-bronze-metallic/40 mb-4 block">shopping_bag</span>
            <p className="font-serif italic text-creamy-ivory/60 mb-6">Your bag is currently unburdened.</p>
            <a href="/sarees" className="bg-bronze-metallic text-earthy-brown font-decorative py-3 px-8 tracking-widest hover:bg-creamy-ivory transition-colors inline-block">CONTINUE EXPLORING</a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-grow space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center border border-burnished-copper/10 p-4 bg-terracotta-deep/5 ornate-border relative gap-6">
                  <a href={`/product/${item.slug}`} className="aspect-[3/4] w-24 h-32 overflow-hidden ornate-border flex-shrink-0 block">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${item.localImg}')` }}></div>
                  </a>
                  <div className="flex-grow py-2 space-y-2 text-center sm:text-left">
                    <a href={`/product/${item.slug}`}>
                      <h3 className="font-serif text-lg text-creamy-ivory hover:text-bronze-metallic transition-colors">{item.title}</h3>
                    </a>
                    <p className="font-serif italic text-bronze-metallic/60 text-sm">₹{item.price.toLocaleString()} each</p>
                    <div className="flex items-center justify-center sm:justify-start mt-2">
                      <span className="text-xs text-bronze-metallic font-serif mr-4">Qty:</span>
                      <div className="flex items-center border border-burnished-copper/30 h-8">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 text-bronze-metallic hover:bg-terracotta-deep/20">-</button>
                        <input type="text" value={item.qty} readOnly className="w-8 text-center bg-transparent border-x border-burnished-copper/30 text-xs font-decorative font-bold text-creamy-ivory" />
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 text-bronze-metallic hover:bg-terracotta-deep/20">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="sm:ml-auto flex flex-col items-end py-2 mt-4 sm:mt-0 gap-2">
                    <p className="font-decorative text-bronze-metallic text-lg">₹{(item.price * item.qty).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs font-serif text-terracotta-deep/80 hover:text-red-400 flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="w-full lg:w-80">
              <div className="border border-burnished-copper/10 bg-terracotta-deep/5 p-6 space-y-6 ornate-border sticky top-32">
                <h3 className="font-decorative text-lg text-bronze-metallic border-b border-burnished-copper/20 pb-2">Order Summary</h3>
                <div className="space-y-3 text-sm font-serif text-creamy-ivory/80 pb-4 border-b border-burnished-copper/10">
                  <div className="flex justify-between"><span>Subtotal ({cartItems.reduce((a,i) => a + i.qty, 0)} items):</span> <span>₹{cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Shipping:</span> <span className="text-green-500 font-bold">Complimentary</span></div>
                </div>
                <div className="flex justify-between font-decorative text-lg text-creamy-ivory">
                  <span>Grand Total:</span>
                  <span className="gold-gradient-text">₹{cartTotal.toLocaleString()}</span>
                </div>
                <a href="/checkout" className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-4 px-4 tracking-widest hover:bg-creamy-ivory transition-colors text-center text-sm block">PROCEED TO CHECKOUT</a>
                <p className="text-[10px] text-center text-creamy-ivory/40 font-serif italic">256-bit encrypted & safeguarded pathways.</p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
