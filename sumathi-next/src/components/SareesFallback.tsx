"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { getMergedProducts } from '@/lib/content';
import EditableText from '@/components/EditableText';
import EditableImage from '@/components/EditableImage';

const FESTIVAL_LABELS: Record<string, string> = {
  pongal:   "Pongal Harvest",
  navratri: "Navratri Splendour",
  diwali:   "Diwali Festive",
  bridal:   "Bridal Season",
  onam:     "Onam Elegance",
};

export default function SareesFallback({ title = "Silk Sarees" }: { title?: string }) {
  const { addToCart, localContent, updateField } = useCart();
  const [festival, setFestival] = useState<string | null>(null);

  // Read ?festival= query param on mount (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFestival(params.get("festival"));
  }, []);

  // Determine effective title and filtered list
  const festivalLabel = festival ? FESTIVAL_LABELS[festival] : null;
  const displayTitle = festivalLabel ?? (title === "New Arrivals" ? "New Arrivals" : "Silk Sarees");

  const mergedProducts = localContent ? getMergedProducts(localContent) : products;

  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const toggleWishlist = (id: number) => {
    const next = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
    setWishlist(next);
    localStorage.setItem('wishlist', JSON.stringify(next));
  };

  const filteredProducts = festival
    ? mergedProducts.filter(p => p.festivals?.includes(festival))
    : title === "New Arrivals"
    ? mergedProducts.filter(p => p.isNew)
    : mergedProducts;

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">

      {/* Banner section */}
      <section className="bg-stone-950/50 py-16 text-center border-b border-burnished-copper/10">
        <div className="max-w-4xl mx-auto px-6">
          {festival && (
            <p className="font-decorative text-terracotta-deep text-sm tracking-[0.3em] uppercase mb-3">
              Festival Collection
            </p>
          )}
          <h2 className="font-serif text-5xl gold-gradient-text mb-4">{displayTitle}</h2>
          <p className="font-serif italic text-bronze-metallic/60 text-lg">
            {festival
              ? `Curated picks for ${festivalLabel} — handpicked from our looms.`
              : "Woven opulence spanning millennia of Coimbatore crafts heritage."}
          </p>
          {festival && (
            <a href="/sarees" className="inline-block mt-6 text-xs font-decorative tracking-widest text-bronze-metallic border-b border-burnished-copper/40 hover:text-creamy-ivory transition-colors">
              ← View All Sarees
            </a>
          )}
        </div>
      </section>

      {/* Main Grid Content (Sidebar + Listing) */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 border border-burnished-copper/10 bg-terracotta-deep/5 p-6 space-y-8 ornate-border">
            <h3 className="font-serif text-xl gold-gradient-text border-b border-burnished-copper/20 pb-2">Filters</h3>
            
            {/* Festival Quick-links */}
            <div>
              <h4 className="font-serif text-creamy-ivory text-sm mb-3">Festival</h4>
              <div className="space-y-2 text-sm text-creamy-ivory/60">
                {Object.entries(FESTIVAL_LABELS).map(([key, label]) => (
                  <a
                    key={key}
                    href={`/sarees?festival=${key}`}
                    className={`flex items-center gap-2 cursor-pointer hover:text-creamy-ivory transition-colors ${festival === key ? "text-bronze-metallic font-bold" : ""}`}
                  >
                    <span className="material-symbols-outlined text-xs">celebration</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Material Group */}
            <div>
              <h4 className="font-serif text-creamy-ivory text-sm mb-3">Material</h4>
              <div className="space-y-2 text-sm text-creamy-ivory/60">
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="checkbox" className="rounded text-terracotta-deep bg-transparent border-burnished-copper/30" /> Pure Silk</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="checkbox" className="rounded text-terracotta-deep bg-transparent border-burnished-copper/30" /> Cotton Silk</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="checkbox" className="rounded text-terracotta-deep bg-transparent border-burnished-copper/30" /> Velvet Details</label>
              </div>
            </div>

            {/* Price Group */}
            <div>
              <h4 className="font-serif text-creamy-ivory text-sm mb-3">Price Range</h4>
              <div className="space-y-2 text-sm text-creamy-ivory/60">
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="radio" name="price" className="text-terracotta-deep bg-transparent border-burnished-copper/30" /> Below ₹5,000</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="radio" name="price" className="text-terracotta-deep bg-transparent border-burnished-copper/30" /> ₹5,000 - ₹15,000</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-creamy-ivory"><input type="radio" name="price" className="text-terracotta-deep bg-transparent border-burnished-copper/30" /> Above ₹15,000</label>
              </div>
            </div>

            {/* Color Group */}
            <div>
              <h4 className="font-serif text-creamy-ivory text-sm mb-3">Weave Color</h4>
              <div className="flex gap-3 flex-wrap">
                <button className="w-6 h-6 rounded-full bg-red-800 border border-white/20"></button>
                <button className="w-6 h-6 rounded-full bg-emerald-800 border border-white/20"></button>
                <button className="w-6 h-6 rounded-full bg-indigo-900 border border-white/20"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-600 border border-white/20"></button>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8 border-b border-burnished-copper/10 pb-4">
            <span className="text-xs text-creamy-ivory/50 font-sans tracking-widest uppercase">
              Showing {filteredProducts.length} {festival ? `${festivalLabel} Picks` : "Silk Sarees"}
            </span>
            <select className="bg-transparent border border-burnished-copper/20 text-bronze-metallic text-xs font-serif p-2 outline-none">
              <option className="bg-earthy-brown">Sort By: Relevance</option>
              <option className="bg-earthy-brown">Price: Low to High</option>
              <option className="bg-earthy-brown">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 text-creamy-ivory/40 font-serif italic">
              <span className="material-symbols-outlined text-5xl mb-4 block">sentiment_dissatisfied</span>
              No pieces found for this festival. <a href="/sarees" className="text-bronze-metallic underline">View all sarees</a>.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((item) => {
                const originalIndex = mergedProducts.findIndex(p => p.id === item.id);
                const pathIndex = originalIndex.toString();
                return (
                  <div key={item.id} className="group relative bg-terracotta-deep/20 p-4 border border-burnished-copper/10 hover:border-burnished-copper/50 transition-all ruby-shadow card-lift">
                    <a href={`/product/${item.slug}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden ornate-border mb-6">
                        <EditableImage 
                          src={item.localImg || ''} 
                          onChange={(url) => {
                            updateField(['products', pathIndex, 'id'], item.id.toString());
                            updateField(['products', pathIndex, 'localImg'], url);
                          }}
                          className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-earthy-brown via-transparent to-transparent opacity-60"></div>
                        {item.isNew && <span className="absolute top-4 left-4 bg-terracotta-deep text-creamy-ivory text-[10px] font-bold px-3 py-1 border border-burnished-copper">NEW</span>}
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item.id); }} 
                          className="absolute top-4 right-4 text-bronze-metallic hover:scale-110 transition-transform z-20 bg-earthy-brown/60 p-1.5 rounded-full border border-burnished-copper/20 flex items-center justify-center"
                          title={wishlist.includes(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: wishlist.includes(item.id) ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                      </div>
                      <h4 className="font-serif text-creamy-ivory text-lg group-hover:text-bronze-metallic transition-colors">
                        <EditableText 
                          value={item.title} 
                          onChange={(v) => {
                            updateField(['products', pathIndex, 'id'], item.id.toString());
                            updateField(['products', pathIndex, 'title'], v);
                          }} 
                        />
                      </h4>
                      <p className="text-xs tracking-widest text-creamy-ivory/40 uppercase mb-4">
                        <EditableText 
                          value={item.desc} 
                          onChange={(v) => {
                            updateField(['products', pathIndex, 'id'], item.id.toString());
                            updateField(['products', pathIndex, 'desc'], v);
                          }} 
                        />
                      </p>
                    </a>
                    <div className="flex items-center justify-between mt-4 pb-2 border-t border-burnished-copper/10 pt-4">
                      <span className="text-xl font-decorative text-bronze-metallic">
                        ₹<EditableText 
                          value={item.price.toString()} 
                          onChange={(v) => {
                            updateField(['products', pathIndex, 'id'], item.id.toString());
                            updateField(['products', pathIndex, 'price'], v);
                          }} 
                        />
                      </span>
                      <button onClick={() => addToCart(item.slug)} className="bg-bronze-metallic text-earthy-brown px-4 py-2 text-xs font-decorative tracking-widest hover:bg-creamy-ivory transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">shopping_bag</span>
                        ADD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-4 text-sm font-serif text-bronze-metallic">
            <button className="px-4 py-2 border border-burnished-copper/20 bg-terracotta-deep/10 font-bold">I</button>
            <button className="px-4 py-2 border border-burnished-copper/20 text-creamy-ivory">II</button>
            <button className="px-4 py-2 border border-burnished-copper/20">III</button>
          </div>
        </div>
      </section>

    </div>
  );
}
