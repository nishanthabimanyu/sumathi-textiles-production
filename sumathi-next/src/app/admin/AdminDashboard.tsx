"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SiteContent } from '@/lib/content';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'hero' | 'festivals' | 'products' | 'settings' | 'orders' | 'reports' | 'users';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetchContent();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/content', { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch content or unauthorized');
      const data = await res.json();
      setContent(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      if (err.message?.includes('unauthorized')) onLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };
  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError('');
    setSuccess('');
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      if (!res.ok) throw new Error('Failed to save content');
      setSuccess('Content saved successfully!');
      setRefreshKey(prev => prev + 1); // Trigger iframe reload
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      // Update nested state dynamically
      if (content) {
        const newContent = { ...content };
        let current: any = newContent;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = data.url;
        setContent(newContent);
        setSuccess('Image uploaded! Click Save to publish.');
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const updateField = (path: string[], value: any) => {
    if (!content) return;
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) return <div className="p-8 text-center text-creamy-ivory/60 font-serif italic">Loading Content Ledger...</div>;
  if (!content) return <div className="p-8 text-center text-red-500">Failed to load payload.</div>;

  return (
    <div className="flex h-screen bg-earthy-brown text-creamy-ivory">
      
      {/* ── LEFT PANE: CONTROLS ────────────────────────────────── */}
      <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col border-r border-burnished-copper/20 transition-all duration-300`}>
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-burnished-copper/20 bg-terracotta-deep/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-bronze-metallic">dashboard</span>
            <h1 className="font-decorative text-lg gold-gradient-text tracking-wider">ATELIER CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)} 
              className="text-bronze-metallic hover:text-creamy-ivory flex items-center gap-1 text-[10px] border border-bronze-metallic/30 px-2 py-1 bg-terracotta-deep/20 hover:bg-bronze-metallic/30 transition-all font-decorative tracking-wider shadow-sm mr-2 cursor-pointer"
              title={showPreview ? "Full Width Editing" : "Side-by-side Preview"}
            >
              <span className="material-symbols-outlined text-sm">
                {showPreview ? 'fullscreen' : 'splitscreen'}
              </span>
              {showPreview ? 'FULL' : 'SPLIT'}
            </button>
            {success && <span className="text-xs text-green-400 font-serif italic">{success}</span>}
            {error && <span className="text-xs text-red-400 font-serif italic">{error}</span>}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-bronze-metallic text-earthy-brown font-decorative py-2 px-6 text-xs tracking-widest hover:bg-creamy-ivory transition-all disabled:opacity-40 flex items-center gap-2"
            >
              {saving ? 'SAVING...' : 'SAVE CHANGES'}
              <span className="material-symbols-outlined text-sm">save</span>
            </button>
            <button onClick={onLogout} className="text-creamy-ivory/40 hover:text-creamy-ivory transition-colors">
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>

        {/* Tab navigation bar */}
        <div className="flex border-b border-burnished-copper/10 text-center bg-terracotta-deep/5 overflow-x-auto no-scrollbar">
          {['hero', 'festivals', 'products', 'orders', 'reports', 'users', 'settings'].map((t) => (
            <button 
              key={t}
              onClick={() => setActiveTab(t as Tab)}
              className={`flex-1 min-w-[80px] py-3 text-xs font-decorative tracking-widest border-b-2 capitalize transition-colors ${activeTab === t ? 'border-bronze-metallic text-bronze-metallic bg-earthy-brown' : 'border-transparent text-creamy-ivory/50 hover:bg-terracotta-deep/10'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Scrollable Form Workspace */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          {/* announcement row is global/persistent top */}
          <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-2">
            <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">ANNOUNCEMENT BAR</label>
            <input 
              type="text" 
              value={content.announcement} 
              onChange={e => updateField(['announcement'], e.target.value)}
              className="w-full bg-transparent border border-burnished-copper/30 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none font-serif"
            />
          </div>

          {/* TAB: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Hero Section</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">HEADLINE</label>
                  <input type="text" value={content.hero.headline} onChange={e => updateField(['hero', 'headline'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                </div>
                <div>
                  <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">TAGLINE (ITALIC)</label>
                  <textarea rows={3} value={content.hero.tagline} onChange={e => updateField(['hero', 'tagline'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif italic resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">CTA 1 LABEL</label>
                    <input type="text" value={content.hero.cta1} onChange={e => updateField(['hero', 'cta1'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">CTA 2 LABEL</label>
                    <input type="text" value={content.hero.cta2} onChange={e => updateField(['hero', 'cta2'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FESTIVALS SECTION */}
          {activeTab === 'festivals' && (
            <div className="space-y-4">
              <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Festival Collections</h3>
              <div className="space-y-4">
                {content.festivals.map((f, i) => (
                  <div key={f.key} className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-3">
                    <div className="flex justify-between items-center border-b border-burnished-copper/10 pb-2">
                      <span className="font-decorative text-xs text-saffron-rich tracking-widest uppercase">{f.key}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/40">NAME</label>
                        <input type="text" value={f.name} onChange={e => {
                          const newList = [...content.festivals];
                          newList[i].name = e.target.value;
                          setContent({ ...content, festivals: newList });
                        }} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/40">BADGE (MONTH)</label>
                        <input type="text" value={f.badge} onChange={e => {
                          const newList = [...content.festivals];
                          newList[i].badge = e.target.value;
                          setContent({ ...content, festivals: newList });
                        }} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/40 mb-1">IMAGE PATH</label>
                      <div className="flex items-center gap-2">
                        <input type="text" value={f.img} readOnly className="flex-grow bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory/60 outline-none" />
                        <label className="bg-terracotta-deep/30 border border-burnished-copper/30 py-1.5 px-3 text-xs font-decorative tracking-wider text-bronze-metallic hover:bg-bronze-metallic hover:text-earthy-brown cursor-pointer">
                          {uploading ? '...' : 'UPLOAD'}
                          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, ['festivals', i.toString(), 'img'])} className="hidden" disabled={uploading} />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS SECTION */}
          {activeTab === 'products' && (
            <ProductsTab allProducts={allProducts} onRefresh={fetchProducts} />
          )}

          {/* TAB: ORDERS SECTION */}
          {activeTab === 'orders' && (
            <OrdersTab orders={orders} onRefresh={fetchOrders} setError={setError} setSuccess={setSuccess} />
          )}

          {/* TAB: REPORTS SECTION */}
          {activeTab === 'reports' && (
            <ReportsTab orders={orders} />
          )}

          {/* TAB: USERS SECTION */}
          {activeTab === 'users' && (
            <UsersTab />
          )}

          {/* TAB: SETTINGS SECTION */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Site Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">WHATSAPP CONTACT</label>
                  <input type="text" value={content.settings.whatsapp} onChange={e => updateField(['settings', 'whatsapp'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" placeholder="+91 ..." />
                </div>
                <div>
                  <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">INSTAGRAM LINK</label>
                  <input type="text" value={content.settings.instagram} onChange={e => updateField(['settings', 'instagram'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                </div>
                <div>
                  <label className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">YOUTUBE LINK</label>
                  <input type="text" value={content.settings.youtube} onChange={e => updateField(['settings', 'youtube'], e.target.value)} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-sm text-creamy-ivory focus:border-bronze-metallic outline-none mt-1 font-serif" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── RIGHT PANE: LIVE PREVIEW IFRAME ────────────────────── */}
      {showPreview && (
        <div className="w-1/2 h-full bg-white relative transition-all duration-300">
          {saving && (
            <div className="absolute inset-0 bg-earthy-brown/80 backdrop-blur-sm flex items-center justify-center font-serif italic text-creamy-ivory z-20">
              Publishing revisions...
            </div>
          )}
          <iframe 
            ref={iframeRef}
            key={refreshKey}
            src={`/?preview=true&timestamp=${Date.now()}`} 
            className="w-full h-full border-none"
            title="Live Site Preview"
          />
        </div>
      )}

    </div>
  );
}

export { }; // Spacer

// ── SUB-COMPONENTS FOR CLEANLINESS ──────────────────────────────────

function ProductsTab({ allProducts, onRefresh }: { allProducts: any[], onRefresh: () => void }) {
  const [form, setForm] = useState({ title: '', price: '', desc: '', slug: '', category: 'sarees' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.title || !form.price) return;
    setSubmitting(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) })
      });
      if (res.ok) {
        setForm({ title: '', price: '', desc: '', slug: '', category: 'sarees' });
        onRefresh();
      }
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete product?")) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) onRefresh();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Product Inventory</h3>
      
      {/* Add Product Form */}
      <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-3 ornate-border">
        <h4 className="text-xs font-decorative text-bronze-metallic tracking-wider">ADD NEW PRODUCT</h4>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic" />
          <input type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic" />
        </div>
        <input type="text" placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="w-full bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic" />
        <button onClick={handleSubmit} disabled={submitting} className="bg-bronze-metallic text-earthy-brown text-[10px] py-2 px-4 font-decorative hover:bg-creamy-ivory transition-colors disabled:opacity-50">
          {submitting ? 'ADDING...' : 'ADD PRODUCT'}
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar">
        {allProducts.map((p) => (
          <div key={p.id} className="flex justify-between items-center p-3 border border-burnished-copper/10 bg-terracotta-deep/5 text-xs hover:bg-terracotta-deep/10 transition-colors">
            <div>
              <span className="font-serif text-creamy-ivory font-bold">{p.title}</span>
              <span className="text-bronze-metallic ml-2">₹{p.price.toLocaleString()}</span>
              {p.desc && <p className="text-creamy-ivory/40 text-[10px] italic mt-1">{p.desc}</p>}
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-red-400/60 hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        ))}
        {allProducts.length === 0 && <p className="text-center text-xs text-creamy-ivory/40 font-serif italic py-8">No items in archive setup.</p>}
      </div>
    </div>
  );
}

function OrdersTab({ orders, onRefresh, setError, setSuccess }: { orders: any[], onRefresh: () => void, setError: any, setSuccess: any }) {
  
  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) { setSuccess('Order status updated'); onRefresh(); setTimeout(() => setSuccess(''), 2000); }
      else { setError('Update failed'); }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Order Ledger</h3>
      
      <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
        {orders.map((o) => (
          <div key={o.id} className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-3 ornate-border">
            <div className="flex justify-between items-start border-b border-burnished-copper/10 pb-2">
              <div>
                <span className="font-decorative text-xs text-bronze-metallic">{o.id}</span>
                <p className="text-[10px] text-creamy-ivory/40">{new Date(o.timestamp).toLocaleString()}</p>
              </div>
              <select 
                value={o.status} 
                onChange={(e) => updateStatus(o.id, e.target.value)}
                className="bg-earthy-brown border border-burnished-copper/20 text-xs text-creamy-ivory p-1 outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="text-xs space-y-1">
              <p><span className="text-creamy-ivory/60">Cust:</span> <span className="font-bold">{o.customer.name}</span> ({o.customer.phone})</p>
              <p><span className="text-creamy-ivory/60">Ship to:</span> {o.customer.address}, {o.customer.city}</p>
              <p><span className="text-creamy-ivory/60">Payment:</span> <span className="uppercase text-[10px] border border-burnished-copper/30 px-1">{o.paymentMethod}</span></p>
            </div>

            <div className="border-t border-burnished-copper/10 pt-2 space-y-1">
              {o.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-[10px] text-creamy-ivory/80">
                  <span>{item.title} x{item.qty}</span>
                  <span>₹{item.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs font-bold text-bronze-metallic pt-1 border-t border-burnished-copper/5">
                <span>Total:</span>
                <span>₹{o.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-xs text-creamy-ivory/40 font-serif italic py-12">No orders placed today catalog ledger.</p>}
      </div>
    </div>
  );
}

function ReportsTab({ orders }: { orders: any[] }) {
  const successfulOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = successfulOrders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  const statusCounts = [
    { label: 'Pending', count: pendingCount, color: 'bg-yellow-500' },
    { label: 'Shipped', count: shippedCount, color: 'bg-blue-500' },
    { label: 'Delivered', count: deliveredCount, color: 'bg-green-500' },
    { label: 'Cancelled', count: orders.length - successfulOrders.length, color: 'bg-red-500' },
  ];

  const maxCount = Math.max(...statusCounts.map(s => s.count), 1);

  return (
    <div className="space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar p-1">
      <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Business Analytics</h3>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-1 ornate-border text-center">
          <span className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">TOTAL REVENUE</span>
          <p className="text-2xl font-decorative text-saffron-rich">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-1 ornate-border text-center">
          <span className="block text-[10px] font-decorative tracking-widest text-bronze-metallic/60">ORDERS PROCESSED</span>
          <p className="text-2xl font-decorative text-saffron-rich">{orders.length}</p>
        </div>
      </div>

      {/* Chart bars */}
      <div className="border border-burnished-copper/10 p-6 bg-terracotta-deep/5 space-y-4 ornate-border">
        <h4 className="text-xs font-decorative text-bronze-metallic tracking-wider mb-2">ORDER STATUS BREAKDOWN</h4>
        <div className="space-y-3">
          {statusCounts.map(sc => (
            <div key={sc.label} className="space-y-1">
              <div className="flex justify-between text-xs text-creamy-ivory/80">
                <span>{sc.label}</span>
                <span>{sc.count}</span>
              </div>
              <div className="w-full bg-earthy-brown border border-burnished-copper/10 h-3">
                <div 
                  className={`h-full ${sc.color} opacity-80`} 
                  style={{ width: `${(sc.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Owner', role: 'Owner', email: 'owner@sumathi.com' },
    { id: 2, name: 'Shop Manager', role: 'Manager', email: 'manager@sumathi.com' },
    { id: 3, name: 'Helper Staff', role: 'Staff', email: 'staff@sumathi.com' },
  ]);

  const [form, setForm] = useState({ name: '', role: 'Staff', email: '' });

  const handleAddUser = () => {
    if (!form.name || !form.email) return;
    setUsers([...users, { id: Date.now(), ...form }]);
    setForm({ name: '', role: 'Staff', email: '' });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete User?")) return;
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar p-1">
      <h3 className="font-decorative text-lg gold-gradient-text border-b border-burnished-copper/10 pb-2">Staff & Roles Management</h3>
      
      {/* Add User Form */}
      <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-3 ornate-border">
        <h4 className="text-xs font-decorative text-bronze-metallic tracking-wider">ADD NEW STAFF / MANAGER</h4>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic font-serif" />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic font-serif" />
        </div>
        <div className="flex gap-2">
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="bg-earthy-brown border border-burnished-copper/20 text-xs p-2 text-creamy-ivory flex-grow outline-none font-serif">
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
            <option value="Owner">Owner</option>
          </select>
          <button onClick={handleAddUser} className="bg-bronze-metallic text-earthy-brown text-[10px] py-2 px-4 font-decorative hover:bg-creamy-ivory transition-all">ADD USER</button>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {users.map(u => (
          <div key={u.id} className="flex justify-between items-center p-3 border border-burnished-copper/10 bg-terracotta-deep/5 text-xs hover:bg-terracotta-deep/10 transition-all ornate-border">
            <div>
              <span className="font-serif text-creamy-ivory font-bold">{u.name}</span>
              <span className={`ml-2 text-[9px] border px-1 opacity-70 ${u.role === 'Owner' ? 'border-saffron-rich text-saffron-rich' : u.role === 'Manager' ? 'border-blue-400 text-blue-400' : 'border-creamy-ivory/50 text-creamy-ivory/60'}`}>{u.role}</span>
              <p className="text-[10px] text-creamy-ivory/40 mt-1">{u.email}</p>
            </div>
            {u.role !== 'Owner' && (
              <button onClick={() => handleDelete(u.id)} className="text-red-400/60 hover:text-red-400 transition-colors">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
