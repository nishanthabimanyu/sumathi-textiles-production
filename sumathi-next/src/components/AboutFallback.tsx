"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import EditableText from '@/components/EditableText';

export default function AboutFallback() {
  const { localContent, updateField } = useCart();

  const defaultTimeline = [
    {
      year: "1986",
      title: "The Origin",
      subtitle: "A Loom of Whispering Threads",
      desc: "Our journey began with a single handloom in Coimbatore, weaving pure silk drapes for the local royals and brides. Every thread was spun with devotion and absolute grace.",
      img: "/about_1986.png"
    },
    {
      year: "2015",
      title: "Global Legacy",
      subtitle: "Sustaining Modern Heritage drapes",
      desc: "Adapting high-end photography and concierge support, ensuring anyone anywhere can wear standard masterwork pure silk threads absolute securely.",
      img: "/about_2015.png"
    }
  ];

  const timeline = localContent?.about?.timeline || defaultTimeline;
  const values = localContent?.about?.values || [
    { icon: "verified", title: "Authenticity", desc: "Every saree directly from master weavers in Coimbatore." },
    { icon: "brush", title: "Craftsmanship", desc: "Handloom weaving techniques preserved for over four generations." },
    { icon: "eco", title: "Sustainable", desc: "Ethically sourced pure silk fibers with zero synthetic pollution." },
    { icon: "history_edu", title: "Heritage", desc: "Timeless antique designs rooted in traditional temple aesthetics." }
  ];

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">

      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center justify-center text-center border-b border-burnished-copper/10 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC04zHThCX131qQiyBXNlp6M8DUv4Dgzj0yD4KGrQUZFmVWermXIXiuFEbBzTn4uaKmb1Smwn1MK9O8lvMZEJ2qj5jYuTX80Jm7TCHRqGYp2YBAO2JkDyqgkvokuK2U8Y2JHflSwHunkKF2LupztD7HM_Bqs54dq2ubrABXhI3X9mFu2_uVZ3FCO_7jq9jcDIfBr4qczz09ycq95dBxQoYMTOe4suVWMURkUD8CET3BxoixHRfK3lfoZUm-r5QPgGQBY1g2tiAbFXk')` }}></div>
        <div className="absolute inset-0 bg-earthy-brown/70 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <p className="font-decorative text-saffron-rich tracking-[0.4em] uppercase text-sm mb-4">Est. 1986 · Coimbatore</p>
          <h2 className="font-decorative text-5xl md:text-7xl gold-gradient-text mb-6">
            <EditableText 
              value={localContent?.about?.headline || "Our Legacy"} 
              onChange={(v) => updateField(['about', 'headline'], v)} 
            />
          </h2>
          <p className="font-serif italic text-creamy-ivory/80 text-lg">
            <EditableText 
              value={localContent?.about?.subhead || "Four decades of weaving heritage, imperial artistry, and timeless Coimbatore silks."} 
              onChange={(v) => updateField(['about', 'subhead'], v)} 
            />
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-terracotta-deep/10 py-20 border-y border-burnished-copper/10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {values.map((v, i) => (
            <div key={i} className="space-y-3">
              <span className="material-symbols-outlined text-5xl text-saffron-rich">{v.icon}</span>
              <h4 className="font-decorative text-bronze-metallic tracking-widest text-sm">
                <EditableText 
                  value={v.title} 
                  onChange={val => updateField(['about', 'values', i.toString(), 'title'], val)} 
                />
              </h4>
              <p className="font-serif italic text-creamy-ivory/60 text-xs leading-relaxed">
                <EditableText 
                  value={v.desc} 
                  onChange={val => updateField(['about', 'values', i.toString(), 'desc'], val)} 
                />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        <h3 className="font-decorative text-4xl gold-gradient-text text-center mb-4">Our Journey</h3>
        {timeline.map((item, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 border-l-2 border-bronze-metallic/30 pl-8 relative`}>
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-bronze-metallic"></div>
            <div className="w-full md:w-1/2 aspect-[4/3] bg-cover bg-center ornate-border flex-shrink-0" style={{ backgroundImage: `url('${(item.img && item.img.startsWith('/')) ? item.img : item.img ? `https://lh3.googleusercontent.com/aida-public/${item.img}` : ''}')` }}></div>
            <div className="flex-grow space-y-4">
              <span className="font-decorative text-bronze-metallic text-xl">
                {item.year} — <EditableText value={item.title} onChange={val => updateField(['about', 'timeline', index.toString(), 'title'], val)} />
              </span>
              <h3 className="font-serif text-3xl text-creamy-ivory">
                <EditableText value={item.subtitle} onChange={val => updateField(['about', 'timeline', index.toString(), 'subtitle'], val)} />
              </h3>
              <p className="font-serif italic text-creamy-ivory/60 leading-relaxed">
                <EditableText value={item.desc} onChange={val => updateField(['about', 'timeline', index.toString(), 'desc'], val)} />
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-terracotta-deep/20 py-20 text-center border-t border-burnished-copper/10">
        <h3 className="font-decorative text-3xl gold-gradient-text mb-4">Experience the Atelier</h3>
        <p className="font-serif italic text-creamy-ivory/60 mb-8 max-w-xl mx-auto">Book a personal styling consultation with our master weavers today.</p>
        <a href="/concierge" className="inline-block bg-bronze-metallic text-earthy-brown font-decorative py-4 px-10 tracking-widest hover:bg-creamy-ivory transition-colors">BOOK CONSULTATION</a>
      </section>

    </div>
  );
}
