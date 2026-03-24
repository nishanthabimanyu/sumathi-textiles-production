"use client";

import React, { useState } from 'react';

export function OrdersTab({ orders, onRefresh, setError, setSuccess }: { orders: any[], onRefresh: () => void, setError: any, setSuccess: any }) {
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
      <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
        {orders.map((o: any) => (
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

export function ReportsTab({ orders }: { orders: any[] }) {
  const successfulOrders = orders.filter((o: any) => o.status !== 'Cancelled');
  const totalRevenue = successfulOrders.reduce((acc: number, o: any) => acc + (o.total || 0), 0);
  const pendingCount = orders.filter((o: any) => o.status === 'Pending').length;
  const shippedCount = orders.filter((o: any) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o: any) => o.status === 'Delivered').length;

  const statusCounts = [
    { label: 'Pending', count: pendingCount, color: 'bg-yellow-500' },
    { label: 'Shipped', count: shippedCount, color: 'bg-blue-500' },
    { label: 'Delivered', count: deliveredCount, color: 'bg-green-500' },
    { label: 'Cancelled', count: orders.length - successfulOrders.length, color: 'bg-red-500' },
  ];

  const maxCount = Math.max(...statusCounts.map(s => s.count), 1);

  return (
    <div className="space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar p-1">
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

export function UsersTab({ users, onRefresh, setError, setSuccess }: { users: any[], onRefresh: () => void, setError: any, setSuccess: any }) {
  const [form, setForm] = useState({ username: '', password: '', role: 'Staff' });

  const handleAddUser = async () => {
    if (!form.username || !form.password) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) { setSuccess('Staff added'); setForm({ username: '', password: '', role: 'Staff' }); onRefresh(); }
    } catch { setError('Failed to add'); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete staff?")) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) onRefresh();
    } catch { }
  };

  return (
    <div className="space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar p-1">
      <div className="border border-burnished-copper/10 p-4 bg-terracotta-deep/5 space-y-3 ornate-border">
        <h4 className="text-xs font-decorative text-bronze-metallic tracking-wider">ADD NEW STAFF / MANAGER</h4>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic font-serif" />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="bg-transparent border border-burnished-copper/20 p-2 text-xs text-creamy-ivory outline-none focus:border-bronze-metallic font-serif" />
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

      <div className="space-y-2">
        {users.map((u: any) => (
          <div key={u.id} className="flex justify-between items-center p-3 border border-burnished-copper/10 bg-terracotta-deep/5 text-xs hover:bg-terracotta-deep/10 transition-all ornate-border">
            <div>
              <span className="font-serif text-creamy-ivory font-bold">{u.username}</span>
              <span className={`ml-2 text-[9px] border px-1 opacity-70 ${u.role === 'Owner' ? 'border-saffron-rich text-saffron-rich' : u.role === 'Manager' ? 'border-blue-400 text-blue-400' : 'border-creamy-ivory/50 text-creamy-ivory/60'}`}>{u.role}</span>
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
