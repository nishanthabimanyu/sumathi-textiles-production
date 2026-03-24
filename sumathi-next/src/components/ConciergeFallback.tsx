"use client";

import React, { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import EditableText from '@/components/EditableText';

type Step = "quiz" | "form" | "done";
type QuizAnswers = { occasion: string; budget: string; style: string };

const SERVICES = [
  {
    icon: "diamond",
    badge: "MOST POPULAR",
    tier: "Bridal Trousseau",
    price: "Complimentary",
    desc: "A full-day private session to curate your complete wedding trousseau — from the bridal silk to every reception look.",
    features: ["Dedicated stylist", "Up to 8 looks curated", "Zari & jewellery pairing", "Alterations guidance"],
    cta: "Book Bridal Session",
    value: "Bridal Trousseau Consult",
  },
  {
    icon: "celebration",
    tier: "Festival Edition",
    price: "₹499 Styling Fee",
    desc: "Festival-ready looks tailored to the season — Pongal, Navratri, Diwali or Onam guided by our textile experts.",
    features: ["Festival-themed palette", "2 complete looks", "WhatsApp style board", "Priority delivery"],
    cta: "Book Festival Consult",
    value: "Festival Collection",
  },
  {
    icon: "edit_note",
    tier: "Fabric Selection",
    price: "₹299 Styling Fee",
    desc: "Not sure which unstitched fabric suits your vision? Our master weavers guide you to the perfect silk, weight and colour.",
    features: ["Weave type advisory", "Colour pairing guide", "Tailor referral service", "Swatch sample sharing"],
    cta: "Book Fabric Session",
    value: "Unstitched Fabric Selection",
  },
  {
    icon: "corporate_fare",
    tier: "Corporate Gifting",
    price: "Custom Quote",
    desc: "Curated textile gift sets for corporate events — premium packaging, bulk pricing, and brand-aligned aesthetics.",
    features: ["Bulk pricing available", "Custom brand packaging", "Pan-India shipping", "Dedicated account manager"],
    cta: "Request Quote",
    value: "Corporate Gifting",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Hariharan",
    location: "Chennai",
    quote: "Anjali helped me pick the most breathtaking crimson Kanchipuram for my wedding. I felt like royalty.",
    occasion: "Bridal Trousseau",
    rating: 5,
  },
  {
    name: "Deepa Suresh",
    location: "Coimbatore",
    quote: "I had no idea which saree to pick for Pongal. One WhatsApp session later, the whole look was sorted!",
    occasion: "Festival Session",
    rating: 5,
  },
  {
    name: "Kavitha Rajan",
    location: "Bangalore",
    quote: "The fabric selection service saved me hours. The stylist knew exactly what would suit my skin tone.",
    occasion: "Fabric Selection",
    rating: 5,
  },
];

const STYLISTS = [
  { name: "Anjali Sundaram", exp: "12 Years", speciality: "Bridal & Bridal Trousseau", icon: "spa" },
  { name: "Meena Krishnaswamy", exp: "18 Years", speciality: "Kanjivaram & Zari", icon: "auto_awesome" },
  { name: "Lakshmi Venkatesh", exp: "8 Years", speciality: "Festival & Contemporary", icon: "celebration" },
];

const QUIZ_OPTIONS = {
  occasion: ["Wedding / Bridal", "Festival Celebration", "Corporate Event", "Casual Gifting", "Family Function"],
  budget: ["Under ₹5,000", "₹5,000–₹15,000", "₹15,000–₹30,000", "Above ₹30,000", "Flexible"],
  style: ["Traditional & Ornate", "Pastel & Soft", "Bold & Vibrant", "Minimal & Elegant", "Not Sure"],
};

export default function ConciergeFallback() {
  const { localContent, updateField } = useCart();
  const [step, setStep] = useState<Step>("quiz");
  const [quiz, setQuiz] = useState<QuizAnswers>({ occasion: "", budget: "", style: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [serviceChoice, setServiceChoice] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleQuizNext = () => {
    if (!quiz.occasion || !quiz.budget || !quiz.style) return;
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setStep("done");
  };

  // Success screen
  if (step === "done") {
    return (
      <div className="bg-earthy-brown text-creamy-ivory min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 max-w-lg px-6 py-12">
          <div className="relative inline-block">
            <span className="material-symbols-outlined text-8xl text-bronze-metallic animate-pulse">auto_awesome</span>
          </div>
          <p className="font-decorative tracking-[0.3em] text-saffron-rich text-xs uppercase">Received with Grace</p>
          <h2 className="font-decorative text-5xl gold-gradient-text">Your Consultation is Reserved</h2>
          <p className="font-serif italic text-creamy-ivory/70 leading-relaxed text-lg">
            A master stylist will reach out on <span className="text-bronze-metallic">WhatsApp</span> within 24 hours to begin your personal styling journey.
          </p>
          <div className="border border-burnished-copper/20 p-6 bg-terracotta-deep/10 text-left space-y-3">
            <p className="text-xs font-decorative tracking-widest text-bronze-metallic/60 uppercase">Your Style Profile</p>
            <p className="font-serif italic text-sm text-creamy-ivory/80">Occasion: <span className="text-bronze-metallic">{quiz.occasion}</span></p>
            <p className="font-serif italic text-sm text-creamy-ivory/80">Budget: <span className="text-bronze-metallic">{quiz.budget}</span></p>
            <p className="font-serif italic text-sm text-creamy-ivory/80">Style: <span className="text-bronze-metallic">{quiz.style}</span></p>
          </div>
          <a href="/" className="inline-block bg-bronze-metallic text-earthy-brown font-decorative py-4 px-10 tracking-widest hover:bg-creamy-ivory transition-colors">
            RETURN TO ATELIER
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/concierge_hero.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-earthy-brown/60 via-earthy-brown/40 to-earthy-brown"></div>
        <div className="relative z-10 text-center max-w-3xl px-6 space-y-6">
          <p className="font-decorative tracking-[0.5em] text-saffron-rich text-xs uppercase">Private Atelier Service</p>
          <h1 className="font-decorative text-5xl md:text-7xl gold-gradient-text leading-tight">
            <EditableText 
              value={localContent?.concierge?.headline || "Personal Styling Concierge"} 
              onChange={(v) => updateField(['concierge', 'headline'], v)} 
            />
          </h1>
          <p className="font-serif italic text-creamy-ivory/70 text-xl leading-relaxed">
            <EditableText 
              value={localContent?.concierge?.desc || "An intimate, one-on-one experience with our master stylists — crafted to dress you for life's most meaningful moments."} 
              onChange={(v) => updateField(['concierge', 'desc'], v)} 
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-bronze-metallic text-earthy-brown font-decorative py-4 px-10 tracking-widest hover:bg-creamy-ivory transition-colors text-sm">
              BEGIN YOUR STYLE JOURNEY
            </button>
            <button onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-burnished-copper/50 text-creamy-ivory font-decorative py-4 px-10 tracking-widest hover:bg-terracotta-deep/20 transition-colors text-sm">
              VIEW SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <section className="border-y border-burnished-copper/20 bg-terracotta-deep/5">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "verified_user", stat: "500+", label: "Brides Styled" },
            { icon: "star", stat: "4.9/5", label: "Client Rating" },
            { icon: "schedule", stat: "24 hrs", label: "Response Time" },
            { icon: "lock", stat: "Private", label: "Consultation" },
          ].map((t, i) => (
            <div key={i} className="space-y-1">
              <span className="material-symbols-outlined text-bronze-metallic text-2xl">{t.icon}</span>
              <p className="font-decorative text-xl gold-gradient-text">{t.stat}</p>
              <p className="font-serif italic text-xs text-creamy-ivory/50">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services-section" className="max-w-screen-xl mx-auto px-6 md:px-16 py-20">
        <div className="text-center mb-14">
          <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">Our Offerings</p>
          <h2 className="font-decorative text-4xl gold-gradient-text">Styling Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className={`relative flex flex-col border p-6 space-y-5 transition-all hover:border-burnished-copper/60 hover:bg-terracotta-deep/10 cursor-pointer group ${i === 0 ? "border-bronze-metallic bg-terracotta-deep/15" : "border-burnished-copper/20 bg-terracotta-deep/5"}`}
              onClick={() => { setServiceChoice(s.value); document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
              {s.badge && <span className="absolute -top-3 left-6 bg-terracotta-deep text-creamy-ivory text-[9px] font-bold px-3 py-1 border border-burnished-copper tracking-widest">{s.badge}</span>}
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-bronze-metallic text-3xl">{s.icon}</span>
                <div>
                  <h4 className="font-serif text-lg text-creamy-ivory">{s.tier}</h4>
                  <p className="font-decorative text-xs text-saffron-rich">{s.price}</p>
                </div>
              </div>
              <p className="font-serif italic text-sm text-creamy-ivory/60 leading-relaxed flex-grow">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-serif text-creamy-ivory/70">
                    <span className="material-symbols-outlined text-sm text-bronze-metallic">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-burnished-copper/10">
                <span className="text-xs font-decorative tracking-widest text-bronze-metallic group-hover:text-creamy-ivory transition-colors">{s.cta} →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-terracotta-deep/5 border-y border-burnished-copper/10 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">The Process</p>
            <h2 className="font-decorative text-4xl gold-gradient-text">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { step: "01", icon: "quiz", title: "Style Quiz", desc: "Answer 3 quick questions to tailor your experience." },
              { step: "02", icon: "edit_note", title: "Submit Request", desc: "Share your name and WhatsApp number." },
              { step: "03", icon: "chat_bubble", title: "Stylist Connects", desc: "Your dedicated stylist reaches you within 24 hours." },
              { step: "04", icon: "shopping_bag", title: "Curated Selection", desc: "Receive a hand-picked styling board just for you." },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center relative px-4">
                {i < 3 && <div className="hidden md:block absolute right-0 top-8 w-full h-px bg-burnished-copper/20 -translate-y-1/2 translate-x-1/2"></div>}
                <div className="relative z-10 w-16 h-16 rounded-full border-2 border-burnished-copper/30 bg-earthy-brown flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-bronze-metallic text-2xl">{s.icon}</span>
                </div>
                <p className="font-decorative text-xs text-saffron-rich tracking-widest mb-1">{s.step}</p>
                <h4 className="font-serif text-sm text-creamy-ivory mb-2">{s.title}</h4>
                <p className="font-serif italic text-xs text-creamy-ivory/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STYLISTS ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">The Experts</p>
          <h2 className="font-decorative text-4xl gold-gradient-text">Meet Your Stylists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS.map((stylist, i) => (
            <div key={i} className="border border-burnished-copper/20 bg-terracotta-deep/5 p-6 text-center space-y-4 hover:border-burnished-copper/50 transition-all">
              <div className="w-20 h-20 rounded-full border-2 border-bronze-metallic bg-terracotta-deep/20 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-bronze-metallic">{stylist.icon}</span>
              </div>
              <div>
                <h4 className="font-serif text-lg text-creamy-ivory">{stylist.name}</h4>
                <p className="font-decorative text-xs text-saffron-rich tracking-widest">{stylist.exp} Experience</p>
              </div>
              <p className="font-serif italic text-xs text-creamy-ivory/60">{stylist.speciality}</p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, j) => <span key={j} className="material-symbols-outlined text-sm text-bronze-metallic">star</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-terracotta-deep/5 border-y border-burnished-copper/10 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">Client Stories</p>
          <h2 className="font-decorative text-4xl gold-gradient-text mb-12">What Our Clients Say</h2>
          <div className="relative">
            <div className="border border-burnished-copper/20 p-10 bg-earthy-brown space-y-6">
              <span className="material-symbols-outlined text-5xl text-bronze-metallic/30">format_quote</span>
              <p className="font-serif italic text-lg text-creamy-ivory/80 leading-relaxed">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div>
                <p className="font-serif text-bronze-metallic">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="font-serif italic text-xs text-creamy-ivory/40">{TESTIMONIALS[activeTestimonial].location} · {TESTIMONIALS[activeTestimonial].occasion}</p>
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm text-bronze-metallic">star</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full border border-burnished-copper/40 transition-all ${i === activeTestimonial ? "bg-bronze-metallic" : "bg-transparent"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STYLE QUIZ + BOOKING FORM ─────────────────────────── */}
      <section id="quiz-section" className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">
            {step === "quiz" ? "Step 1 of 2" : "Step 2 of 2"}
          </p>
          <h2 className="font-decorative text-4xl gold-gradient-text">
            {step === "quiz" ? "Your Style Profile" : "Reserve Your Session"}
          </h2>
          <p className="font-serif italic text-creamy-ivory/50 text-sm mt-2">
            {step === "quiz"
              ? "Answer 3 quick questions so your stylist can personalise your experience."
              : "One final step — your master stylist will be in touch within 24 hours."}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex gap-2 mb-8">
          {["quiz", "form"].map((s, i) => (
            <div key={i} className={`flex-1 h-1 transition-all duration-500 ${(step === "quiz" && i === 0) || step === "form" ? "bg-bronze-metallic" : "bg-burnished-copper/20"}`}></div>
          ))}
        </div>

        <div className="border border-burnished-copper/20 bg-terracotta-deep/5 p-8 ornate-border space-y-6">

          {/* QUIZ STEP */}
          {step === "quiz" && (
            <div className="space-y-8">
              {(Object.entries(QUIZ_OPTIONS) as [keyof QuizAnswers, string[]][]).map(([key, options]) => (
                <div key={key}>
                  <h4 className="font-serif text-creamy-ivory text-sm capitalize mb-4 border-b border-burnished-copper/10 pb-2">
                    {key === "occasion" ? "What is the occasion?" : key === "budget" ? "What is your budget?" : "What is your style preference?"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {options.map(opt => (
                      <button key={opt} onClick={() => setQuiz(q => ({ ...q, [key]: opt }))}
                        className={`text-xs font-decorative tracking-wider px-4 py-2 border transition-all ${quiz[key] === opt ? "bg-bronze-metallic text-earthy-brown border-bronze-metallic" : "border-burnished-copper/30 text-creamy-ivory/70 hover:border-burnished-copper hover:text-creamy-ivory"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handleQuizNext}
                disabled={!quiz.occasion || !quiz.budget || !quiz.style}
                className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-4 tracking-widest hover:bg-creamy-ivory transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <span>CONTINUE TO BOOKING</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          )}

          {/* BOOKING FORM STEP */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Summary of quiz */}
              <div className="bg-terracotta-deep/10 border border-burnished-copper/10 p-4 space-y-1">
                <p className="font-decorative text-[9px] tracking-widest text-bronze-metallic/50 uppercase mb-2">Your Style Profile</p>
                <div className="flex flex-wrap gap-2">
                  {Object.values(quiz).map((v, i) => v && (
                    <span key={i} className="text-[10px] bg-bronze-metallic/10 border border-burnished-copper/30 text-bronze-metallic px-2 py-1 font-decorative tracking-wide">{v}</span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">FULL NAME</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Your name" className="w-full bg-transparent border border-burnished-copper/30 p-3 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors font-serif placeholder:text-creamy-ivory/30" />
              </div>
              <div>
                <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">WHATSAPP NUMBER</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                  placeholder="+91 XXXXX XXXXX" className="w-full bg-transparent border border-burnished-copper/30 p-3 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors font-serif placeholder:text-creamy-ivory/30" />
              </div>
              <div>
                <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">SERVICE</label>
                <select value={serviceChoice} onChange={e => setServiceChoice(e.target.value)}
                  className="w-full bg-earthy-brown border border-burnished-copper/30 p-3 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors">
                  {SERVICES.map(s => <option key={s.value} value={s.value} className="bg-earthy-brown">{s.tier}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60 mb-1.5">ADDITIONAL NOTES (optional)</label>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Colour preferences, function date, special requirements..."
                  className="w-full bg-transparent border border-burnished-copper/30 p-3 text-sm text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors resize-none font-serif placeholder:text-creamy-ivory/30" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep("quiz")}
                  className="px-6 border border-burnished-copper/30 text-creamy-ivory/60 font-decorative py-3 text-xs tracking-widest hover:bg-terracotta-deep/20 transition-colors">
                  ← BACK
                </button>
                <button type="submit"
                  className="flex-grow bg-bronze-metallic text-earthy-brown font-decorative py-4 tracking-widest hover:bg-creamy-ivory transition-colors text-sm flex items-center justify-center gap-2">
                  <span>REQUEST CONSULTATION</span>
                  <span className="material-symbols-outlined text-sm">lock</span>
                </button>
              </div>
              <p className="text-[10px] text-center text-creamy-ivory/40 font-serif italic">Your details are kept strictly private and secure.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── FEATURED PICKS ─────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 py-12 border-t border-burnished-copper/10">
        <div className="text-center mb-10">
          <p className="font-decorative tracking-[0.4em] text-saffron-rich text-xs uppercase mb-3">Stylist Favourites</p>
          <h2 className="font-decorative text-3xl gold-gradient-text">Concierge Picks</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map(p => (
            <a key={p.id} href={`/product/${p.slug}`} className="group border border-burnished-copper/10 hover:border-burnished-copper/40 transition-all overflow-hidden">
              <div className="aspect-[3/4] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${p.localImg}')` }}></div>
              <div className="p-4">
                <h4 className="font-serif text-sm text-creamy-ivory group-hover:text-bronze-metallic transition-colors">{p.title}</h4>
                <p className="font-decorative text-bronze-metallic text-sm mt-1">₹{p.price.toLocaleString()}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
