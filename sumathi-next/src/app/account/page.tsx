"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer } from '@/components/AnimationWrapper';

export default function AccountPage() {
  const { user } = useCart();

  // Mock data for order history and wishlist
  const orders = [
    { id: 'ST-9421', date: 'Oct 24, 2024', status: 'Delivered', total: 12500, item: 'Kanchipuram Silk Saree' },
    { id: 'ST-8810', date: 'Aug 12, 2024', status: 'Shipped', total: 8400, item: 'Banarasi Brocade' }
  ];

  const wishlist = [
    { name: 'Bridal Crimson Zari', price: 45000, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&h=400&auto=format&fit=crop' },
    { name: 'Emerald Temple Silk', price: 18000, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300&h=400&auto=format&fit=crop' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-earthy-brown flex items-center justify-center p-8">
        <FadeIn className="text-center space-y-6 max-w-md">
          <span className="material-symbols-outlined text-bronze-metallic text-6xl">lock_person</span>
          <h1 className="font-decorative text-3xl gold-gradient-text">Member Sanctuary</h1>
          <p className="font-serif italic text-creamy-ivory/60">
            Please sign in via the profile portal (top right) to view your bespoke collection and heritage orders.
          </p>
          <a href="/" className="inline-block border border-burnished-copper/40 px-8 py-3 text-xs font-decorative tracking-widest text-bronze-metallic hover:bg-bronze-metallic hover:text-earthy-brown transition-all">
            RETURN TO HOME
          </a>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earthy-brown text-creamy-ivory pt-32 pb-20 px-6 md:px-16">
      <style>{`
        .glass-card {
          background: rgba(142, 59, 33, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(184, 115, 51, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .gold-gradient-text {
          background: linear-gradient(to bottom, #FFF9E5 0%, #D4AF37 50%, #B87333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Profile Header */}
        <FadeIn direction="down" className="flex flex-col md:flex-row items-center gap-8 border-b border-burnished-copper/20 pb-12">
          <div className="w-32 h-32 rounded-full border-2 border-bronze-metallic p-1">
            <div className="w-full h-full rounded-full bg-terracotta-deep flex items-center justify-center text-5xl font-decorative text-creamy-ivory shadow-2xl">
              {user.name[0].toUpperCase()}
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="font-decorative text-5xl gold-gradient-text">Namaste, {user.name}</h1>
            <p className="font-serif italic text-bronze-metallic/60 text-lg">Member since October 2024 • Silk Connoisseur Tier</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <span className="px-4 py-1 border border-saffron-rich/40 text-saffron-rich text-[10px] font-decorative tracking-widest bg-saffron-rich/5">2,500 REWARD POINTS</span>
              <span className="px-4 py-1 border border-bronze-metallic/40 text-bronze-metallic text-[10px] font-decorative tracking-widest bg-bronze-metallic/5">3 TOTAL ORDERS</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-decorative text-2xl tracking-widest text-bronze-metallic uppercase flex items-center gap-3">
               <span className="material-symbols-outlined">history</span> Order History
            </h3>
            <StaggerContainer className="space-y-4">
              {orders.map((order, idx) => (
                <FadeIn key={order.id} delay={idx * 0.1} className="glass-card p-6 flex flex-col md:flex-row justify-between items-center gap-4 group hover:border-bronze-metallic/40 transition-all cursor-pointer">
                  <div className="space-y-1">
                    <span className="text-[10px] font-decorative tracking-[0.2em] text-bronze-metallic/50">{order.date}</span>
                    <h4 className="font-serif text-xl group-hover:text-bronze-metallic transition-colors">{order.item}</h4>
                    <p className="text-xs text-creamy-ivory/40">ID: {order.id}</p>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="text-right">
                        <p className="font-serif text-lg text-creamy-ivory">₹{order.total.toLocaleString()}</p>
                        <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border ${order.status === 'Delivered' ? 'border-green-500/40 text-green-500 bg-green-500/5' : 'border-saffron-rich/40 text-saffron-rich bg-saffron-rich/5'}`}>
                          {order.status}
                        </span>
                     </div>
                     <span className="material-symbols-outlined text-bronze-metallic/30 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>

          {/* Wishlist Sidebar */}
          <div className="space-y-6">
            <h3 className="font-decorative text-2xl tracking-widest text-bronze-metallic uppercase flex items-center gap-3">
               <span className="material-symbols-outlined">favorite</span> The Vault
            </h3>
            <StaggerContainer className="grid grid-cols-1 gap-4">
              {wishlist.map((item, idx) => (
                <FadeIn key={item.name} delay={idx * 0.1} className="glass-card p-4 flex gap-4 hover:border-bronze-metallic/40 transition-all">
                  <div className="w-20 h-24 bg-cover bg-center border border-burnished-copper/20" style={{ backgroundImage: `url('${item.img}')` }} />
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="font-serif text-sm">{item.name}</h4>
                    <p className="font-decorative text-bronze-metallic text-sm mt-1">₹{item.price.toLocaleString()}</p>
                    <button className="text-[9px] font-bold tracking-widest text-creamy-ivory/40 hover:text-creamy-ivory mt-2 flex items-center gap-1 uppercase">
                      Add to Cart <span className="material-symbols-outlined text-[10px]">shopping_cart</span>
                    </button>
                  </div>
                </FadeIn>
              ))}
              <a href="/sarees" className="block text-center py-4 border border-dashed border-burnished-copper/30 text-creamy-ivory/40 hover:text-creamy-ivory hover:border-bronze-metallic transition-all font-serif italic text-sm">
                Add more treasures to your vault...
              </a>
            </StaggerContainer>
          </div>

        </div>

        {/* Heritage Section */}
        <FadeIn className="glass-card p-12 text-center space-y-6 mt-20 border-bronze-metallic/20">
          <span className="material-symbols-outlined text-saffron-rich text-5xl">auto_awesome</span>
          <h2 className="font-decorative text-3xl gold-gradient-text uppercase tracking-widest">The Concierge Service</h2>
          <p className="font-serif italic text-creamy-ivory/60 max-w-2xl mx-auto text-lg leading-relaxed">
            As a valued member of the Sumathi legacy, you have access to our private stylists. Woven stories await your selection for the upcoming bridal season.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="bg-bronze-metallic text-earthy-brown font-decorative px-8 py-3 text-xs tracking-widest hover:bg-creamy-ivory transition-all shadow-xl">
              BOOK A VIRTUAL CONSULTATION
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
