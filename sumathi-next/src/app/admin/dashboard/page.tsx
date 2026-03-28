"use client";

import React, { useState, useEffect } from 'react';
import AdminDashboard from '../AdminDashboard';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="bg-earthy-brown text-creamy-ivory min-h-screen flex items-center justify-center font-serif italic">
        Entering the Atelier...
      </div>
    );
  }

  if (!authenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    return null;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
