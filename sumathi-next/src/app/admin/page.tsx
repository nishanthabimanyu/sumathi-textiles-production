"use client";

import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and Password are required');
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setAuthenticated(true);
      } else {
        setError(data.error || 'Invalid Credentials');
      }
    } catch { setError('Login failed'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="bg-earthy-brown text-creamy-ivory min-h-screen flex items-center justify-center font-serif italic">
        Anointing Atelier...
      </div>
    );
  }

  if (authenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/dashboard';
    }
    return (
      <div className="bg-earthy-brown text-creamy-ivory min-h-screen flex flex-col items-center justify-center font-serif italic gap-2">
        <span className="material-symbols-outlined text-4xl animate-spin text-bronze-metallic">sync</span>
        Redirecting to Admin Atelier...
      </div>
    );
  }

  return (
    <div className="bg-earthy-brown text-creamy-ivory font-sans min-h-screen flex items-center justify-center p-6">
      <style>{`
        .gold-gradient-text {
          background: linear-gradient(to bottom, #FFF9E5 0%, #D4AF37 50%, #B87333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ornate-border {
          border: 8px solid transparent;
          border-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H100V100H0V0ZM10 10V90H90V10H10Z' fill='%23B87333'/%3E%3C/svg%3E") 30 stretch;
        }
      `}</style>
      
      <div className="max-w-sm w-full bg-terracotta-deep/10 border border-burnished-copper/20 p-8 space-y-6 ornate-border text-center">
        <span className="material-symbols-outlined text-bronze-metallic text-5xl">lock</span>
        <div>
          <h2 className="font-decorative text-xl gold-gradient-text tracking-[0.2em] uppercase">Private Atelier</h2>
          <p className="font-serif italic text-xs text-creamy-ivory/60 mt-1">Sumathi Textiles CMS Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 pt-2">
          <div>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username" 
              className="w-full bg-transparent border border-burnished-copper/30 p-3 text-sm text-center text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors font-serif placeholder:text-creamy-ivory/30 mb-2"
            />
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password" 
              className="w-full bg-transparent border border-burnished-copper/30 p-3 text-sm text-center text-creamy-ivory outline-none focus:border-bronze-metallic transition-colors font-serif placeholder:text-creamy-ivory/30"
            />
          </div>
          {error && <p className="text-red-400 text-xs font-serif italic">{error}</p>}
          <button type="submit" className="w-full bg-bronze-metallic text-earthy-brown font-decorative py-3 tracking-widest hover:bg-creamy-ivory transition-all text-xs font-bold shadow-md">
            UNLOCK ATELIER
          </button>
        </form>
      </div>
    </div>
  );
}
