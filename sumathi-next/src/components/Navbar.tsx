"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { SiteContent } from '@/lib/content';
import EditableText from '@/components/EditableText';
import AdminOverlay from '@/components/AdminOverlay';
import { motion, AnimatePresence } from 'framer-motion';

const FESTIVALS = [
  { key: "pongal",   label: "Pongal Harvest" },
  { key: "navratri", label: "Navratri Splendour" },
  { key: "diwali",   label: "Diwali Festive" },
  { key: "bridal",   label: "Bridal Season" },
  { key: "onam",     label: "Onam Elegance" },
];

const POPULAR_SEARCHES = ["Kanchipuram Silk", "Bridal Saree", "Zari Work", "Cotton Blend", "New Arrivals"];

type AuthMode = "login" | "register";

export default function Navbar({ content }: { content?: SiteContent }) {
  const { isSearchOpen, setIsSearchOpen, isProfileOpen, setIsProfileOpen, cartCount, user, setUser, saveChanges, hasChanges, localContent, updateField } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [scrolled, setScrolled] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail]     = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError]     = useState("");

  // Register form state
  const [regName, setRegName]         = useState("");
  const [regEmail, setRegEmail]       = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm]   = useState("");
  const [regError, setRegError]       = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = searchQuery.trim() === ""
    ? []
    : products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.festivals.some(f => f.includes(searchQuery.toLowerCase()))
      ).slice(0, 6);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { setLoginError("Please fill all fields."); return; }
    if (!loginEmail.includes("@")) { setLoginError("Enter a valid email."); return; }
    // Simulate login — accept any credentials
    setUser({ name: loginEmail.split("@")[0], email: loginEmail });
    setIsProfileOpen(false);
    setLoginError("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirm) { setRegError("Please fill all fields."); return; }
    if (!regEmail.includes("@")) { setRegError("Enter a valid email."); return; }
    if (regPassword.length < 6) { setRegError("Password must be at least 6 characters."); return; }
    if (regPassword !== regConfirm) { setRegError("Passwords do not match."); return; }
    setUser({ name: regName, email: regEmail });
    setIsProfileOpen(false);
    setRegError("");
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  const closeSearch = () => { setIsSearchOpen(false); setSearchQuery(""); };

  return (
    <>
      <style>{`
        .gold-gradient-text {
          background: linear-gradient(to bottom, #FFF9E5 0%, #D4AF37 50%, #B87333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .auth-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(184,115,51,0.3);
          padding: 10px 12px;
          font-family: serif;
          font-size: 0.85rem;
          color: #FFF9E5;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-input:focus { border-color: #B87333; }
        .auth-input::placeholder { color: rgba(255,249,229,0.35); }
      `}</style>

      {/* Announcement Bar */}
      <div className="bg-terracotta-deep text-creamy-ivory py-2 px-4 text-center text-xs font-bold tracking-[0.2em] uppercase border-b border-burnished-copper/30 w-full relative z-[60]">
        <EditableText 
          value={localContent?.announcement || "Complimentary Shipping on Orders over ₹2000 | Personal Styling via WhatsApp"} 
          onChange={(v: string) => updateField(['announcement'], v)} 
        />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 px-6 md:px-16 py-6 w-full transition-all duration-500 ${scrolled ? 'bg-earthy-brown/80 backdrop-blur-2xl border-b border-burnished-copper/30 py-4 shadow-2xl' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <a href="/" className="flex flex-col items-center select-none cursor-pointer group">
            <span className="material-symbols-outlined text-bronze-metallic text-4xl mb-1 group-hover:scale-110 transition-transform">temple_hindu</span>
            <h1 className="font-decorative text-xl md:text-3xl font-bold tracking-tighter gold-gradient-text">Sumathi Textiles</h1>
          </a>
          <nav className="hidden lg:flex items-center gap-12">
            {['NEW ARRIVALS', 'SILK SAREES', 'CONCIERGE', 'ABOUT'].map((item) => (
              <a 
                key={item}
                className="font-decorative text-sm text-bronze-metallic hover:text-creamy-ivory transition-all tracking-widest relative group" 
                href={`/${item.toLowerCase().replace(' ', '-')}`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-bronze-metallic transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-8">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsSearchOpen(true)} className="text-bronze-metallic" aria-label="Search">
              <span className="material-symbols-outlined text-3xl">search</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsProfileOpen(true)} className="text-bronze-metallic relative" aria-label="Profile">
              <span className="material-symbols-outlined text-3xl">person_2</span>
              {user && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-earthy-brown"></span>}
            </motion.button>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="/cart" className="text-bronze-metallic relative block" aria-label="Cart">
              <span className="material-symbols-outlined text-3xl">shopping_cart</span>
              <span className="absolute -top-1 -right-1 bg-terracotta-deep text-creamy-ivory text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border border-burnished-copper">{cartCount}</span>
            </motion.a>
          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY ─────────────────────────────────────── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex flex-col items-center pt-24 z-[70] p-4 backdrop-blur-md" 
            onClick={closeSearch}
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl" 
              onClick={e => e.stopPropagation()}
            >
              {/* Search bar */}
              <div className="flex items-center border border-burnished-copper/40 bg-earthy-brown shadow-2xl px-4">
                <span className="material-symbols-outlined text-bronze-metallic text-2xl mr-3">search</span>
                <input
                  id="search-input"
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, festivals, styles..."
                  className="flex-grow bg-transparent py-4 text-lg outline-none text-creamy-ivory font-serif italic placeholder:text-creamy-ivory/30"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-creamy-ivory/40 hover:text-creamy-ivory transition-colors ml-2">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
                <button onClick={closeSearch} className="ml-4 text-creamy-ivory/40 hover:text-creamy-ivory transition-colors">
                  <span className="material-symbols-outlined">keyboard_return</span>
                </button>
              </div>

              {/* Results panel */}
              <div className="bg-earthy-brown border border-t-0 border-burnished-copper/20 shadow-2xl max-h-[60vh] overflow-y-auto no-scrollbar">

                {/* Empty state — show suggestions */}
                {searchQuery.trim() === "" && (
                  <div className="p-6 space-y-6">
                    {/* Festival quick-links */}
                    <div>
                      <h4 className="text-[10px] font-decorative tracking-[0.3em] text-bronze-metallic/50 uppercase mb-3">Shop by Festival</h4>
                      <div className="flex flex-wrap gap-2">
                        {(content?.festivals && content.festivals.length > 0 ? content.festivals.map(f => ({ key: f.key, label: f.name })) : FESTIVALS).map(f => (
                          <a key={f.key} href={`/sarees?festival=${f.key}`} onClick={closeSearch}
                            className="text-xs font-decorative tracking-widest border border-burnished-copper/30 px-3 py-1.5 text-bronze-metallic hover:bg-terracotta-deep hover:border-terracotta-deep hover:text-creamy-ivory transition-all">
                            {f.label}
                          </a>
                        ))}
                      </div>
                    </div>
                    {/* Popular searches */}
                    <div>
                      <h4 className="text-[10px] font-decorative tracking-[0.3em] text-bronze-metallic/50 uppercase mb-3">Popular Searches</h4>
                      <div className="space-y-2">
                        {POPULAR_SEARCHES.map(s => (
                          <button key={s} onClick={() => setSearchQuery(s)}
                            className="flex items-center gap-3 text-sm font-serif italic text-creamy-ivory/60 hover:text-creamy-ivory transition-colors w-full text-left group">
                            <span className="material-symbols-outlined text-sm text-bronze-metallic/40 group-hover:text-bronze-metallic transition-colors">trending_up</span>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Live results */}
                {filteredProducts.length > 0 && (
                  <div className="p-4 space-y-1">
                    <h4 className="text-[10px] font-decorative tracking-[0.3em] text-bronze-metallic/50 uppercase mb-3 px-2">Results for "{searchQuery}"</h4>
                    {filteredProducts.map(p => (
                      <a key={p.id} href={`/product/${p.slug}`} onClick={closeSearch}
                        className="flex items-center gap-4 p-3 hover:bg-terracotta-deep/20 transition-colors rounded group">
                        <div className="w-12 h-16 bg-cover bg-center border border-burnished-copper/20 flex-shrink-0"
                          style={{ backgroundImage: `url('${p.localImg}')` }}></div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-sm text-creamy-ivory group-hover:text-bronze-metallic transition-colors">{p.title}</h4>
                          <p className="font-serif italic text-xs text-bronze-metallic/60 truncate">{p.desc}</p>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {p.festivals.map(f => (
                              <span key={f} className="text-[9px] bg-terracotta-deep/40 text-creamy-ivory/50 px-1.5 py-0.5 tracking-wide">{f}</span>
                            ))}
                          </div>
                        </div>
                        <span className="font-decorative text-bronze-metallic text-sm flex-shrink-0">₹{p.price.toLocaleString()}</span>
                      </a>
                    ))}
                    <a href={`/sarees?q=${encodeURIComponent(searchQuery)}`} onClick={closeSearch}
                      className="block text-center text-xs font-decorative tracking-widest text-bronze-metallic/60 hover:text-bronze-metallic py-3 border-t border-burnished-copper/10 mt-2 transition-colors">
                      VIEW ALL RESULTS →
                    </a>
                  </div>
                )}

                {/* No results */}
                {searchQuery.trim() !== "" && filteredProducts.length === 0 && (
                  <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-bronze-metallic/30 mb-3 block">search_off</span>
                    <p className="font-serif italic text-creamy-ivory/40 text-sm">No results for "{searchQuery}"</p>
                    <p className="font-serif italic text-bronze-metallic/40 text-xs mt-2">Try: Kanchipuram, Silk, Diwali…</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROFILE / AUTH SIDEBAR ────────────────────────────── */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[70] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50" 
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-earthy-brown border-l border-burnished-copper/30 shadow-2xl flex flex-col relative z-10" 
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-burnished-copper/20">
                <h3 className="font-decorative text-xl gold-gradient-text">
                  {user ? `Welcome, ${user.name}` : authMode === "login" ? "Sign In" : "Create Account"}
                </h3>
                <button onClick={() => setIsProfileOpen(false)} className="text-creamy-ivory/60 hover:text-creamy-ivory transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto no-scrollbar px-6 py-6 space-y-5">

                {/* ── Logged in state */}
                {(user || (typeof window !== 'undefined' && localStorage.getItem('admin_token'))) ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-terracotta-deep/10 border border-burnished-copper/20">
                      <div className="w-12 h-12 rounded-full bg-terracotta-deep flex items-center justify-center text-creamy-ivory font-decorative text-xl font-bold">
                        {user ? user.name[0].toUpperCase() : 'A'}
                      </div>
                      <div>
                        <p className="font-decorative text-creamy-ivory text-sm">{user ? user.name : 'Administrator'}</p>
                        <p className="font-serif italic text-xs text-bronze-metallic/60">{user ? user.email : 'atelier.access@sumathi.com'}</p>
                      </div>
                    </div>
                    <nav className="space-y-2">
                      {user && (
                        <a href="/account" onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 border border-burnished-copper/10 hover:border-burnished-copper/40 hover:bg-terracotta-deep/10 transition-all text-creamy-ivory/80 hover:text-creamy-ivory">
                          <span className="material-symbols-outlined text-bronze-metallic">account_circle</span>
                          <span className="font-serif italic text-sm font-bold gold-gradient-text">My Account Sanctuary</span>
                        </a>
                      )}
                      {typeof window !== 'undefined' && localStorage.getItem('admin_token') && (
                        <a href="/admin/dashboard" onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 border border-saffron-rich/20 hover:border-saffron-rich/50 hover:bg-saffron-rich/5 transition-all text-saffron-rich/80 hover:text-saffron-rich group">
                          <span className="material-symbols-outlined text-saffron-rich group-hover:rotate-90 transition-transform">architecture</span>
                          <span className="font-serif italic text-sm font-bold">Admin Atelier Dashboard</span>
                        </a>
                      )}
                      {[
                        { icon: "shopping_bag", label: "My Orders", href: "/cart" },
                        { icon: "favorite",     label: "Wishlist",  href: "/sarees" },
                        { icon: "location_on",  label: "Addresses", href: "/checkout" },
                      ].map(item => (
                        <a key={item.label} href={item.href} onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 border border-burnished-copper/10 hover:border-burnished-copper/40 hover:bg-terracotta-deep/10 transition-all text-creamy-ivory/80 hover:text-creamy-ivory">
                          <span className="material-symbols-outlined text-bronze-metallic">{item.icon}</span>
                          <span className="font-serif italic text-sm">{item.label}</span>
                        </a>
                      ))}
                    </nav>
                    <button onClick={handleLogout}
                      className="w-full border border-burnished-copper/30 text-creamy-ivory/60 font-decorative py-3 text-xs tracking-widest hover:bg-terracotta-deep/20 transition-colors">
                      SIGN OUT
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Auth mode tabs */}
                    <div className="flex border border-burnished-copper/20">
                      <button onClick={() => { setAuthMode("login"); setLoginError(""); setRegError(""); }}
                        className={`flex-1 py-2.5 text-xs font-decorative tracking-widest transition-colors ${authMode === "login" ? "bg-terracotta-deep text-creamy-ivory" : "text-bronze-metallic hover:text-creamy-ivory"}`}>
                        SIGN IN
                      </button>
                      <button onClick={() => { setAuthMode("register"); setLoginError(""); setRegError(""); }}
                        className={`flex-1 py-2.5 text-xs font-decorative tracking-widest transition-colors ${authMode === "register" ? "bg-terracotta-deep text-creamy-ivory" : "text-bronze-metallic hover:text-creamy-ivory"}`}>
                        REGISTER
                      </button>
                    </div>

                    {/* ── Login form */}
                    {authMode === "login" && (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">EMAIL ADDRESS</label>
                          <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                            placeholder="your@email.com" className="auth-input" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">PASSWORD</label>
                          <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                            placeholder="••••••••" className="auth-input" />
                        </div>
                        {loginError && <p className="text-red-400 text-xs font-serif italic">{loginError}</p>}
                        <button type="submit"
                          className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-3 tracking-widest text-sm hover:bg-creamy-ivory transition-colors">
                          SIGN IN
                        </button>
                        <p className="text-center text-xs font-serif italic text-bronze-metallic/40 hover:text-bronze-metallic cursor-pointer transition-colors">
                          Forgot Password?
                        </p>
                      </form>
                    )}

                    {/* ── Register form */}
                    {authMode === "register" && (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">FULL NAME</label>
                          <input type="text" value={regName} onChange={e => setRegName(e.target.value)}
                            placeholder="Your Name" className="auth-input" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">EMAIL ADDRESS</label>
                          <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                            placeholder="your@email.com" className="auth-input" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">PASSWORD</label>
                          <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)}
                            placeholder="Min. 6 characters" className="auth-input" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">CONFIRM PASSWORD</label>
                          <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                            placeholder="Repeat password" className="auth-input" />
                        </div>
                        {regError && <p className="text-red-400 text-xs font-serif italic">{regError}</p>}
                        <button type="submit"
                          className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-3 tracking-widest text-sm hover:bg-creamy-ivory transition-colors">
                          CREATE ACCOUNT
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              {!user && (
                <div className="px-6 py-4 border-t border-burnished-copper/10 text-center">
                  <p className="text-xs font-serif italic text-creamy-ivory/30">
                    Your data is protected with 256-bit encryption.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AdminOverlay />
    </>
  );
}
