"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { SiteContent } from '@/lib/content';
import EditableText from '@/components/EditableText';

export default function Footer({ content }: { content?: SiteContent }) {
  const { localContent, updateField } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Fallback
  const displayContent = localContent || content;

  return (
    <footer className="bg-earthy-brown border-t-2 border-burnished-copper pt-24 pb-12 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">

        {/* Brand */}
        <div>
          <div className="flex flex-col items-start mb-6">
            <span className="material-symbols-outlined text-bronze-metallic text-3xl mb-2">temple_hindu</span>
            <h4 className="font-decorative text-saffron-rich text-2xl">Sumathi Textiles</h4>
          </div>
          <p className="font-serif italic text-creamy-ivory/70 leading-relaxed mb-6 text-sm">Four decades of imperial weaving. Custodians of Coimbatore's most sacred silk traditions.</p>
          <div className="flex items-start gap-3 text-sm text-saffron-rich/80">
            <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
            <p className="font-sans text-xs text-creamy-ivory/60 leading-relaxed">124 Oppanakara Street,<br />Coimbatore — 641 001</p>
          </div>
        </div>

        {/* Help & Policies */}
        <div>
          <h4 className="font-decorative text-saffron-rich text-xl mb-8">Help & Policies</h4>
          <ul className="space-y-3 font-serif italic text-creamy-ivory/60 text-sm">
            <li><a className="hover:text-saffron-rich transition-colors" href="/about">Shipping Policy</a></li>
            <li><a className="hover:text-saffron-rich transition-colors" href="/about">Returns & Exchanges</a></li>
            <li><a className="hover:text-saffron-rich transition-colors" href="/cart">Order Tracking</a></li>
            <li><a className="hover:text-saffron-rich transition-colors" href="/about">Privacy Policy</a></li>
            <li><a className="hover:text-saffron-rich transition-colors" href="/concierge">Personal Stylist</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-decorative text-saffron-rich text-xl mb-8">Join the Registry</h4>
          <p className="font-serif italic text-creamy-ivory/60 mb-4 text-sm">Be the first to witness our seasonal regalia.</p>
          {subscribed ? (
            <p className="font-serif italic text-green-500 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              You are on the list!
            </p>
          ) : (
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-burnished-copper/30 p-3 pr-24 font-serif text-sm text-creamy-ivory italic focus:ring-1 focus:ring-bronze-metallic outline-none"
                placeholder="Your email..."
              />
              <button
                onClick={() => { if (email) setSubscribed(true); }}
                className="absolute right-0 top-0 bottom-0 bg-bronze-metallic text-earthy-brown px-4 font-decorative text-xs tracking-widest hover:bg-creamy-ivory transition-colors"
              >
                JOIN
              </button>
            </div>
          )}
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-decorative text-saffron-rich text-xl mb-8">Customer Care</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-creamy-ivory/80">
              <span className="material-symbols-outlined text-bronze-metallic">call</span>
              <span className="font-decorative tracking-tight text-lg">
                <EditableText 
                  value={displayContent?.settings.whatsapp || "+91 98765 43210"} 
                  onChange={(v) => updateField(['settings', 'whatsapp'], v)} 
                />
              </span>
            </div>
            <div className="flex items-center gap-3 text-creamy-ivory/80">
              <span className="material-symbols-outlined text-bronze-metallic">mail</span>
              <span className="font-serif italic text-sm text-creamy-ivory/60">care@sumathitextiles.com</span>
            </div>
            <div className="flex items-center gap-3 text-creamy-ivory/80">
              <span className="material-symbols-outlined text-bronze-metallic">schedule</span>
              <span className="font-serif italic text-xs text-creamy-ivory/60">Mon–Sat, 10am–7pm IST</span>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <a href={content?.settings.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 border border-burnished-copper/30 rounded-full flex items-center justify-center hover:bg-terracotta-deep hover:border-terracotta-deep transition-all" aria-label="Instagram">
              <span className="material-symbols-outlined text-bronze-metallic text-xl">photo_camera</span>
            </a>
            <a href={`https://wa.me/${(content?.settings.whatsapp || "+91 98765 43210").replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="h-10 w-10 border border-burnished-copper/30 rounded-full flex items-center justify-center hover:bg-green-700 hover:border-green-700 transition-all" aria-label="WhatsApp">
              <span className="material-symbols-outlined text-bronze-metallic text-xl">chat</span>
            </a>
            <a href={content?.settings.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 border border-burnished-copper/30 rounded-full flex items-center justify-center hover:bg-terracotta-deep hover:border-terracotta-deep transition-all" aria-label="YouTube">
              <span className="material-symbols-outlined text-bronze-metallic text-xl">play_circle</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-burnished-copper/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-decorative text-[10px] tracking-[0.3em] text-saffron-rich/50">© MMXXIV SUMATHI TEXTILES — AN ETERNAL LEGACY</p>
        <div className="flex gap-6 opacity-40 hover:opacity-70 transition-opacity">
          <span className="material-symbols-outlined text-2xl text-bronze-metallic">account_balance</span>
          <span className="material-symbols-outlined text-2xl text-bronze-metallic">token</span>
          <span className="material-symbols-outlined text-2xl text-bronze-metallic">payments</span>
        </div>
      </div>
    </footer>
  );
}
