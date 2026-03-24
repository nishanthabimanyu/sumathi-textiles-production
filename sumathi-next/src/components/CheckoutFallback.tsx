"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutFallback() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError('Please fill required shipping fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: cartItems.map(i => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
          total: cartTotal,
          paymentMethod
        })
      });

      if (!res.ok) throw new Error('Failed to place order.');
      
      clearCart();
      setPlaced(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md px-6">
          <span className="material-symbols-outlined text-7xl text-bronze-metallic">check_circle</span>
          <h2 className="font-decorative text-4xl gold-gradient-text">Order Placed!</h2>
          <p className="font-serif italic text-creamy-ivory/70 leading-relaxed">
            Your imperial order has been received. Our artisans will dispatch your treasures within 3–5 working days.
          </p>
          <a href="/" className="inline-block bg-bronze-metallic text-earthy-brown font-decorative py-3 px-8 tracking-widest hover:bg-creamy-ivory transition-colors">RETURN HOME</a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-decorative text-3xl gold-gradient-text mb-8 border-b border-burnished-copper/20 pb-4">Secure Checkout</h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Forms */}
          <div className="flex-grow space-y-8">
            <div className="border border-burnished-copper/10 bg-terracotta-deep/5 p-6 ornate-border space-y-6">
              <h3 className="font-serif text-lg text-bronze-metallic border-b border-burnished-copper/10 pb-2">I. Shipping Destination</h3>
              
              {error && <p className="text-red-400 text-xs font-serif italic">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
                </div>
                <div>
                  <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">Phone Number *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
              </div>
              <div>
                <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">Shipping Address *</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
                </div>
                <div>
                  <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">Postal Code</label>
                  <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
                </div>
                <div>
                  <label className="block text-xs font-serif text-creamy-ivory/60 mb-1">State</label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic" />
                </div>
              </div>
            </div>

            <div className="border border-burnished-copper/10 bg-terracotta-deep/5 p-6 ornate-border space-y-4">
              <h3 className="font-serif text-lg text-bronze-metallic border-b border-burnished-copper/10 pb-2">II. Secure Payment</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-burnished-copper/20 cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="radio" name="pay" checked={paymentMethod === 'Credit Card'} onChange={() => setPaymentMethod('Credit Card')} className="text-terracotta-deep bg-transparent" />
                  <span className="text-sm">Credit / Debit Card Gateway</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-burnished-copper/20 cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="radio" name="pay" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="text-terracotta-deep bg-transparent" />
                  <span className="text-sm">UPI / Net Banking</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-burnished-copper/20 cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="radio" name="pay" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="text-terracotta-deep bg-transparent" />
                  <span className="text-sm">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <aside className="w-full lg:w-80">
            <div className="border border-burnished-copper/10 bg-terracotta-deep/5 p-6 space-y-6 ornate-border sticky top-32">
              <h3 className="font-decorative text-lg text-bronze-metallic border-b border-burnished-copper/20 pb-2">Order Summary</h3>

              <div className="space-y-4 border-b border-burnished-copper/10 pb-4 max-h-48 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-16 bg-cover bg-center border border-burnished-copper/20 flex-shrink-0" style={{ backgroundImage: item.localImg ? `url('${item.localImg}')` : `url('https://lh3.googleusercontent.com/aida-public/${item.img}')` }}></div>
                    <div className="flex-grow">
                      <p className="font-serif text-xs text-creamy-ivory">{item.title}</p>
                      <p className="font-serif italic text-xs text-bronze-metallic">Qty: {item.qty} · ₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs font-serif text-creamy-ivory/80">
                <div className="flex justify-between"><span>Subtotal:</span> <span className="font-bold">₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Taxes:</span> <span className="font-bold">Inclusive</span></div>
                <div className="flex justify-between text-green-500"><span>Shipping:</span> <span className="font-bold">Complimentary</span></div>
              </div>

              <div className="border-t border-burnished-copper/20 pt-4 flex justify-between font-decorative text-lg text-creamy-ivory">
                <span>Total:</span>
                <span className="gold-gradient-text">₹{cartTotal.toLocaleString()}</span>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={submitting || cartItems.length === 0}
                className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-4 px-4 tracking-widest hover:bg-creamy-ivory transition-colors text-center text-sm disabled:opacity-50"
              >
                {submitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
              </button>
              <p className="text-[10px] text-center text-creamy-ivory/40 font-serif italic">256-bit encrypted & safeguarded.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
