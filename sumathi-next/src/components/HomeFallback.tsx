"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { SiteContent, getMergedProducts } from '@/lib/content';
import EditableText from '@/components/EditableText';
import EditableImage from '@/components/EditableImage';
import AdminOverlay from '@/components/AdminOverlay';

export default function HomeFallback({ content }: { content?: SiteContent }) {
  const { activeVideo, setActiveVideo, addToCart, localContent, updateField } = useCart();
  const signatureRef = React.useRef<HTMLDivElement>(null);
  const bestsellersRef = React.useRef<HTMLDivElement>(null);

  // Fallback to Server Prop if client context hasn't loaded yet
  const displayContent = localContent || content;
  const mergedProducts = displayContent ? getMergedProducts(displayContent) : products;

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .ornate-border {
          border: 8px solid transparent;
          border-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H100V100H0V0ZM10 10V90H90V10H10Z' fill='%23B87333'/%3E%3C/svg%3E") 30 stretch;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .gold-gradient-text {
          background: linear-gradient(to bottom, #FFF9E5 0%, #D4AF37 50%, #B87333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ruby-shadow {
          box-shadow: 0 0 30px rgba(142, 59, 33, 0.4);
        }
        .terracotta-overlay {
          background: linear-gradient(to top, rgba(142, 59, 33, 0.9) 0%, rgba(142, 59, 33, 0.2) 100%);
        }
        
        /* Premium UX Micro-Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-fade-up {
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .card-lift {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .card-lift:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(142, 59, 33, 0.25);
        }
      `}</style>

      <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">
        {/* Children content wrapper */}

        {/* Hero Section */}
        <section className="relative h-[921px] w-full overflow-hidden flex items-center">
          <EditableImage 
            src={displayContent?.hero?.bgImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2btXF4LHVweI5-WX6qta47omwqrPSh823ssEfJcsKlJl2KYAT3WmvigGHrmC9ma61rovezdZTDZ87wfN2QgAvxilyZmCB6j_UuE3Rjbbk09utJ4lv2kZG9aMsjXmX1azxsk1wimJhGNXkteHhbLOI5DNUa0w-ply6WRB6b7YkxRKfiBy_XYIG5_5MPzSG1-GinZjKu6UIFQfx-jgLaxfZpdmWUZt5ceNSNMKrdCxqk4EMKoCMVULq7nX1uoXQEkVdaRJjArL9nA'} 
            onChange={(url) => updateField(['hero', 'bgImage'], url)}
            className="absolute inset-0 bg-cover bg-fixed bg-center scale-105"
          >
            <div className="absolute inset-0 bg-terracotta-deep/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-earthy-brown via-earthy-brown/60 to-transparent"></div>
          </EditableImage>
          <div className="relative max-w-7xl mx-auto px-8 md:px-20 z-10">
            <div className="border-l-4 border-bronze-metallic pl-8 py-4">
              <span className="font-decorative text-saffron-rich text-lg tracking-[0.4em] mb-6 block">HERITAGE COLLECTION 2024</span>
              <EditableText 
                tagName="h2" 
                value={displayContent?.hero.headline || "Threads of Royalty"} 
                onChange={(v) => updateField(['hero', 'headline'], v)} 
                className="text-6xl md:text-9xl font-decorative leading-none mb-8 gold-gradient-text drop-shadow-2xl animate-fade-up [animation-delay:200ms] block" 
              />
              <EditableText 
                tagName="p" 
                value={displayContent?.hero.tagline || `"Where every warp and weft whispers tales of ancient Coimbatore, woven into silhouettes of contemporary majesty."`} 
                onChange={(v) => updateField(['hero', 'tagline'], v)} 
                className="text-xl md:text-2xl font-serif italic max-w-2xl mb-12 text-creamy-ivory leading-relaxed animate-fade-up [animation-delay:600ms] block" 
              />
              <a href="/sarees" className="group relative px-12 py-5 overflow-hidden inline-block animate-fade-up [animation-delay:1000ms]">
                <div className="absolute inset-0 border-2 border-bronze-metallic group-hover:scale-105 transition-transform"></div>
                <div className="absolute inset-1 bg-terracotta-deep opacity-80"></div>
                <span className="relative font-decorative text-creamy-ivory text-lg tracking-widest">
                  <EditableText 
                    value={displayContent?.hero.cta1 || "EXPLORE COLLECTION"} 
                    onChange={(v) => updateField(['hero', 'cta1'], v)} 
                  />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Signature Collections */}
        <section className="py-32 bg-terracotta-deep/10 border-y border-burnished-copper/10">
          <div className="max-w-screen-2xl mx-auto px-8">
            <h3 className="text-center font-decorative text-5xl gold-gradient-text mb-20 uppercase tracking-widest">Our Signature Collections</h3>
            <div className="relative group/carousel">
              {/* Scroll Buttons */}
              <button onClick={() => scrollLeft(signatureRef)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-earthy-brown/80 border border-burnished-copper/40 p-3 rounded-full text-bronze-metallic opacity-0 group-hover/carousel:opacity-100 hover:bg-bronze-metallic hover:text-earthy-brown transition-all duration-300">
                <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
              </button>
              <button onClick={() => scrollRight(signatureRef)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-earthy-brown/80 border border-burnished-copper/40 p-3 rounded-full text-bronze-metallic opacity-0 group-hover/carousel:opacity-100 hover:bg-bronze-metallic hover:text-earthy-brown transition-all duration-300">
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </button>

              <div ref={signatureRef} className="flex justify-center flex-wrap gap-6 px-4">
              {(content?.festivals && content.festivals.length > 0 ? content.festivals : [
                { key: "pongal", name: "Pongal Harvest", badge: "JAN", img: "/festival_pongal.png" },
                { key: "navratri", name: "Navratri Splendour", badge: "OCT", img: "/festival_navratri.png" },
                { key: "diwali", name: "Diwali Festive", badge: "NOV", img: "/festival_diwali.png" },
                { key: "bridal", name: "Bridal Season", badge: "ALL YEAR", img: "/festival_bridal.png" },
                { key: "onam", name: "Onam Elegance", badge: "AUG", img: "/festival_onam.png" }
              ]).map((item, index) => (
                <a key={index} className="group text-center card-lift block p-4 flex-shrink-0 w-44 md:w-52" href={`/sarees?festival=${item.key}`}>
                  <div className="relative mb-8 p-2 border border-bronze-metallic/30 rounded-full group-hover:border-bronze-metallic transition-all duration-700">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-terracotta-deep">
                      <div className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-125" style={{ backgroundImage: `url('${item.img}')` }}></div>
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-terracotta-deep text-creamy-ivory text-[9px] font-bold px-2 py-0.5 border border-burnished-copper tracking-widest">{item.badge}</span>
                  </div>
                  <p className="font-decorative text-bronze-metallic tracking-widest text-sm uppercase mt-4">{item.name}</p>
                </a>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="py-32 bg-earthy-brown relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center mb-24">
              <span className="font-decorative text-terracotta-deep text-2xl mb-4">❖</span>
              <h3 className="font-decorative text-6xl gold-gradient-text">Bestsellers</h3>
              <p className="font-serif italic text-bronze-metallic/60 mt-4 text-xl">The most coveted weaves of the season</p>
            </div>
            
            <div className="relative group/carousel">
              {/* Scroll Buttons */}
              <button onClick={() => scrollLeft(bestsellersRef)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-earthy-brown/80 border border-burnished-copper/40 p-3 rounded-full text-bronze-metallic opacity-0 group-hover/carousel:opacity-100 hover:bg-bronze-metallic hover:text-earthy-brown transition-all duration-300">
                <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
              </button>
              <button onClick={() => scrollRight(bestsellersRef)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-earthy-brown/80 border border-burnished-copper/40 p-3 rounded-full text-bronze-metallic opacity-0 group-hover/carousel:opacity-100 hover:bg-bronze-metallic hover:text-earthy-brown transition-all duration-300">
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </button>

              <div ref={bestsellersRef} className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap no-scrollbar gap-8 pb-4 px-4 -mx-4 scroll-smooth">
              {mergedProducts.slice(0, 4).map((item, index) => (
                <div key={index} className="group relative bg-terracotta-deep/20 p-4 border border-burnished-copper/10 hover:border-burnished-copper/50 transition-all ruby-shadow card-lift flex-shrink-0 w-64 md:w-72 snap-center">
                  <a href={`/product/${item.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden mb-6 ornate-border">
                      <EditableImage 
                        src={item.localImg || ''} 
                        onChange={(url) => {
                          updateField(['products', index.toString(), 'id'], item.id.toString());
                          updateField(['products', index.toString(), 'localImg'], url);
                        }}
                        className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      />
                      {item.isNew && <span className="absolute top-4 left-4 bg-terracotta-deep text-creamy-ivory text-[10px] font-bold px-3 py-1 border border-burnished-copper">NEW ARRIVAL</span>}
                    </div>
                    <p className="font-serif text-2xl text-bronze-metallic mb-2 hover:underline">
                      <EditableText 
                        value={item.title} 
                        onChange={(v) => {
                          updateField(['products', index.toString(), 'id'], item.id.toString());
                          updateField(['products', index.toString(), 'title'], v);
                        }} 
                      />
                    </p>
                    <p className="text-xs tracking-widest text-creamy-ivory/40 uppercase mb-4">
                      <EditableText 
                        value={item.desc} 
                        onChange={(v) => {
                          updateField(['products', index.toString(), 'id'], item.id.toString());
                          updateField(['products', index.toString(), 'desc'], v);
                        }} 
                      />
                    </p>
                  </a>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-decorative text-bronze-metallic">
                      ₹<EditableText 
                        value={item.price.toString()} 
                        onChange={(v) => {
                          updateField(['products', index.toString(), 'id'], item.id.toString());
                          updateField(['products', index.toString(), 'price'], v); // This should ideally parse to number on back-end or updateField doesn't care
                        }} 
                        />
                    </span>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Ribbon Section */}
        <section className="bg-earthy-brown/40 py-20 border-y border-burnished-copper/30">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: "verified", title: "Authenticity Guaranteed", desc: "100% Genuine Weaver Direct" },
              { icon: "encrypted", title: "Secure Checkout", desc: "Encrypted Payments" },
              { icon: "potted_plant", title: "Sustainable Craft", desc: "Ethical Heritage Crafts" },
              { icon: "history_edu", title: "Easy Returns", desc: "7-Day Hassle-Free Exchange" }
            ].map((item, index) => (
              <div key={index} className="group cursor-default">
                <span className="material-symbols-outlined text-saffron-rich text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h5 className="font-decorative text-saffron-rich tracking-widest text-sm mb-2">{item.title}</h5>
                <p className="text-xs text-creamy-ivory/60 font-serif italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Styled by You Section */}
        <section className="py-32 bg-earthy-brown">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h3 className="font-decorative text-5xl gold-gradient-text mb-4">Styled by You</h3>
              <p className="font-serif italic text-terracotta-deep text-2xl">#SumathiLegacies</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: "6MaLg4PaI0c", title: "Saree Manufacturing Process" },
                { id: "zPE6KLJ5oLI", title: "How Kanchipuram Silks Are Made" },
                { id: "v0VELTX4YVI", title: "Traditional Motifs & Heritage" },
                { id: "8eAmbANFmoA", title: "House of Tuhil: A Weaving Story" }
              ].map((video, index) => (
                <div key={index} onClick={() => setActiveVideo(video.id)} className="relative group aspect-square ornate-border overflow-hidden cursor-pointer">
                  <div className="w-full h-full bg-cover bg-center transition-all duration-1000 group-hover:scale-110" style={{ backgroundImage: `url('https://img.youtube.com/vi/${video.id}/hqdefault.jpg')` }}></div>
                  <div className="absolute inset-0 bg-terracotta-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <span className="material-symbols-outlined text-creamy-ivory text-5xl mb-2 hover:scale-110 transition-transform">play_circle</span>
                    <p className="font-serif italic text-sm text-creamy-ivory text-center mt-2">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl">
            <button onClick={() => setActiveVideo(null)} className="absolute -top-12 right-0 text-creamy-ivory text-xl font-bold flex items-center gap-2 hover:text-bronze-metallic transition-colors">
               <span className="material-symbols-outlined">close</span> Close
            </button>
            <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}
