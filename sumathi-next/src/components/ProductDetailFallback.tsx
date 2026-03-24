"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { getMergedProducts } from '@/lib/content';

export default function ProductDetailFallback({ slug }: { slug?: string }) {
  const { addToCart, updateField, localContent, isAdmin } = useCart();
  const [qty, setQty] = useState(1);
  const [openCraftsmanship, setOpenCraftsmanship] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  // Merge product on detail view respects direct edits
  const mergedProducts = localContent ? getMergedProducts(localContent) : products;
  const productIndex = products.findIndex(p => p.slug === slug);
  const currentIndex = productIndex !== -1 ? productIndex : 0;
  const product = mergedProducts.find(p => p.slug === slug) || mergedProducts[0];

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">
      {/* Page Content Stream Container */}

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-4 text-xs font-serif text-creamy-ivory/40 flex items-center gap-2">
        <a href="/" className="hover:text-creamy-ivory transition-colors">Home</a> 
        <span>/</span>
        <a href="/sarees" className="hover:text-creamy-ivory transition-colors">Silk Sarees</a> 
        <span>/</span>
        <span className="text-bronze-metallic">{product.title}</span>
      </nav>

      {/* Main Detail section */}
      <section className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-12">
        {/* Left column: Gallery Grid item */}
        <div className="w-full md:w-1/2 space-y-4">
          <EditableImage 
            src={product.localImg} 
            onChange={v => updateField(['products', currentIndex.toString(), 'localImg'], v)} 
            className="relative aspect-[3/4] overflow-hidden ornate-border mb-4"
          />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square bg-cover bg-center ornate-border" style={{ backgroundImage: `url('${product.localImg}')` }}>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Specs Panel */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="border-b border-burnished-copper/10 pb-4">
            <h2 className="font-serif text-4xl gold-gradient-text mb-2">
              <EditableText value={product.title} onChange={v => updateField(['products', currentIndex.toString(), 'title'], v)} />
            </h2>
            <p className="font-serif italic text-bronze-metallic/60">Signature Handloom Collection</p>
          </div>

          {/* Price display */}
          <div className="text-2xl font-decorative text-bronze-metallic flex items-center gap-1">
            <span>₹</span>
            <EditableText value={product.price.toString()} onChange={v => updateField(['products', currentIndex.toString(), 'price'], v)} />
          </div>

          {/* Descriptive text */}
          <div className="font-serif text-creamy-ivory/80 leading-relaxed border-b border-burnished-copper/10 pb-4">
            <EditableText value={product.desc} onChange={v => updateField(['products', currentIndex.toString(), 'desc'], v)} />
          </div>

          {/* Spec detail list */}
          <div className="py-4 space-y-3 font-serif text-sm text-creamy-ivory/60">
            <div className="flex justify-between border-b border-burnished-copper/10 pb-2"><span className="text-bronze-metallic font-normal">Length:</span> <span>6.3 Meters (Including Blouse)</span></div>
            <div className="flex justify-between border-b border-burnished-copper/10 pb-2"><span className="text-bronze-metallic font-normal">Zari Weight:</span> <span>High Grade Metallic Weave</span></div>
            <div className="flex justify-between border-b border-burnished-copper/10 pb-2"><span className="text-bronze-metallic font-normal">Base Material:</span> <span>100% Pure Silk</span></div>
          </div>

          {/* Size / Stitching Option Selector */}
          <div className="space-y-2 pt-4">
            <label className="block text-[10px] font-decorative tracking-[0.2em] text-bronze-metallic/60">SELECTION OPTION</label>
            <select className="bg-transparent border border-burnished-copper/30 p-2 font-serif text-sm text-creamy-ivory outline-none w-full max-w-[260px] hover:border-bronze-metallic transition-all cursor-pointer">
              <option className="bg-earthy-brown">6.3m (Standard Saree)</option>
              <option className="bg-earthy-brown">With Stitched Blouse (+₹1500)</option>
              <option className="bg-earthy-brown">With Unstitched Blouse Piece</option>
            </select>
          </div>

          {/* Action triggers counter */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center border border-burnished-copper/30 max-w-[150px]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-bronze-metallic hover:bg-terracotta-deep/20 flex-1">-</button>
              <input type="text" value={qty} readOnly className="w-12 text-center bg-transparent outline-none border-x border-burnished-copper/30 p-2 font-decorative text-creamy-ivory" />
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-bronze-metallic hover:bg-terracotta-deep/20 flex-1">+</button>
            </div>
            <button onClick={() => { addToCart(product.slug, qty); window.location.href = '/cart'; }} className="flex-grow bg-bronze-metallic text-earthy-brown font-decorative py-4 px-8 tracking-widest hover:bg-creamy-ivory transition-colors">ADD TO BAG</button>
          </div>

          {/* WhatsApp Style Consultation Button */}
          <button className="w-full flex items-center justify-center gap-2 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-decorative py-3 px-8 tracking-widest hover:bg-emerald-500/10 transition-all text-xs">
            <span className="material-symbols-outlined text-base">call</span>
            STYLE ADVICE VIA WHATSAPP
          </button>

          {/* Collapsible notes frame */}
          <div className="pt-6 space-y-4">
            <div>
              <div onClick={() => setOpenCraftsmanship(!openCraftsmanship)} className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 flex justify-between items-center cursor-pointer hover:border-bronze-metallic transition-all">
                <span className="font-serif text-creamy-ivory/80">Craftsmanship & Care</span>
                <span className="material-symbols-outlined text-bronze-metallic">{openCraftsmanship ? 'expand_less' : 'expand_more'}</span>
              </div>
              {openCraftsmanship && (
                <div className="border border-t-0 border-burnished-copper/10 p-4 bg-terracotta-deep/2 font-serif text-sm text-creamy-ivory/60 leading-relaxed space-y-2">
                  <p>• Handcrafted by skilled artisans in Coimbatore targeting heirloom metrics.</p>
                  <p>• Dry Clean Only to maintain the delicate zari weight & color integrity.</p>
                </div>
              )}
            </div>

            <div>
              <div onClick={() => setOpenShipping(!openShipping)} className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 flex justify-between items-center cursor-pointer hover:border-bronze-metallic transition-all">
                <span className="font-serif text-creamy-ivory/80">Shipping & Returns</span>
                <span className="material-symbols-outlined text-bronze-metallic">{openShipping ? 'expand_less' : 'expand_more'}</span>
              </div>
              {openShipping && (
                <div className="border border-t-0 border-burnished-copper/10 p-4 bg-terracotta-deep/2 font-serif text-sm text-creamy-ivory/60 leading-relaxed space-y-2">
                  <p>• Standard Shipping takes 4-7 business days across India.</p>
                  <p>• 7-Day Hassle-Free Exchange for undamaged visual flaws.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
