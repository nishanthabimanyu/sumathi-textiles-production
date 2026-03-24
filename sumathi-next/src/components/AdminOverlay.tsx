"use client";

import React, { useState, useEffect } from 'react';
import { OrdersTab, ReportsTab, UsersTab } from './AdminTabs';

import { useCart } from '@/context/CartContext';

export default function AdminOverlay() {
  const { saveChanges, hasChanges } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Floating Modal states
  const [showOrders, setShowOrders] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [isMounted, setIsMounted] = useState(false);
  const [userRole, setUserRole] = useState('Staff');

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdmin(true);
      try {
        const decoded = atob(token);
        const role = decoded.split(':')[1];
        if (role) setUserRole(role);
      } catch {}
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    if (isAdmin && userRole === 'Owner') {
      fetchUsers();
    }
  }, [isAdmin, userRole]);

  const fetchOrders = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setOrders(data);
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setUsers(data);
    } catch { }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  const handleSaveClick = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await saveChanges();
      setSuccess('Changes saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error saving');
    } finally {
      setSaving(false);
    }
  };

  if (!isMounted || !isAdmin) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-earthy-brown/95 border-b border-bronze-metallic/40 shadow-xl px-6 py-2 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-bronze-metallic text-xl">edit_square</span>
          <span className="font-decorative text-xs tracking-widest gold-gradient-text uppercase">Atelier Edit Mode</span>
          {hasChanges && <span className="text-[10px] bg-bronze-metallic text-earthy-brown px-1.5 py-0.5 font-bold tracking-widest ml-2 animate-pulse">UNSAVED</span>}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setShowOrders(!showOrders); setShowReports(false); setShowUsers(false); }}
            className={`text-creamy-ivory text-xs font-decorative flex items-center gap-1 border px-3 py-1 bg-white/5 cursor-pointer transition-colors ${showOrders ? 'border-bronze-metallic bg-bronze-metallic/10 text-bronze-metallic' : 'border-creamy-ivory/20 hover:text-creamy-ivory'}`}
          >
            ORDERS
          </button>
          
          {userRole === 'Owner' && (
            <>
              <button 
                onClick={() => { setShowReports(!showReports); setShowOrders(false); setShowUsers(false); }}
                className={`text-creamy-ivory text-xs font-decorative flex items-center gap-1 border px-3 py-1 bg-white/5 cursor-pointer transition-colors ${showReports ? 'border-bronze-metallic bg-bronze-metallic/10 text-bronze-metallic' : 'border-creamy-ivory/20 hover:text-creamy-ivory'}`}
              >
                ANALYTICS
              </button>
              <button 
                onClick={() => { setShowUsers(!showUsers); setShowOrders(false); setShowReports(false); }}
                className={`text-creamy-ivory text-xs font-decorative flex items-center gap-1 border px-3 py-1 bg-white/5 cursor-pointer transition-colors ${showUsers ? 'border-bronze-metallic bg-bronze-metallic/10 text-bronze-metallic' : 'border-creamy-ivory/20 hover:text-creamy-ivory'}`}
              >
                USERS
              </button>
            </>
          )}
          
          <div className="h-4 w-px bg-burnished-copper/30" />

          {success && <span className="text-xs text-green-400 font-serif italic">{success}</span>}
          {error && <span className="text-xs text-red-100 font-serif italic bg-red-800/80 px-2 py-1 rounded">{error}</span>}
          
          <button 
            onClick={handleSaveClick}
            disabled={saving}
            className="bg-bronze-metallic text-earthy-brown font-decorative py-1.5 px-6 text-xs tracking-widest hover:bg-creamy-ivory transition-all disabled:opacity-50 flex items-center gap-1 shadow-md cursor-pointer"
          >
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
            <span className="material-symbols-outlined text-sm">save</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="text-creamy-ivory/60 hover:text-creamy-ivory transition-colors text-xs font-decorative tracking-wider flex items-center gap-1 border border-creamy-ivory/20 px-3 py-1 bg-white/5 cursor-pointer"
          >
            EXIT
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </div>
      {/* Sliding Sheet Drawer panel from right */}
      {(showOrders || showReports || showUsers) && (
        <>
          {/* Backdrop layer */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fade-in" 
            onClick={() => { setShowOrders(false); setShowReports(false); setShowUsers(false); }}
          />
          <div className="fixed right-0 top-12 bottom-0 w-full sm:w-[480px] bg-earthy-brown border-l border-bronze-metallic/40 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-[9999] p-6 flex flex-col transform transition-transform duration-300 animate-slide-left ornate-border-l">
            <style>{`
              @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
              .animate-slide-left { animation: slideLeft 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); }
            `}</style>
            <div className="flex justify-between items-center border-b border-burnished-copper/20 pb-4 mb-5">
              <h3 className="font-decorative text-sm gold-gradient-text uppercase tracking-widest">
                {showOrders ? 'Order Ledger' : showReports ? 'Business Analytics' : 'Staff Management'}
              </h3>
              <button onClick={() => { setShowOrders(false); setShowReports(false); setShowUsers(false); }} className="text-creamy-ivory/60 hover:text-bronze-metallic transition-colors text-xl">✕</button>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              {showOrders && <OrdersTab orders={orders} onRefresh={fetchOrders} setError={setError} setSuccess={setSuccess} />}
              {showReports && <ReportsTab orders={orders} />}
              {showUsers && <UsersTab users={users} onRefresh={fetchUsers} setError={setError} setSuccess={setSuccess} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
