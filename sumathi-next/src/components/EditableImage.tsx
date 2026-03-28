"use client";
import React, { useRef } from 'react';
import { useCart } from '@/context/CartContext';

interface EditableImageProps {
  src: string;
  onChange: (newSrc: string) => void;
  className?: string;
  children?: React.ReactNode; 
}

export default function EditableImage({ src, onChange, className = '', children }: EditableImageProps) {
  const { isAdmin } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // If not admin, just render normally
  if (!isAdmin) {
    if (children) {
      return (
        <div className={className} style={{ backgroundImage: `url('${src}')` }}>
          {children}
        </div>
      );
    }
    return <img src={src} className={className.replace('bg-cover', 'object-cover').replace('bg-center', 'object-center')} alt="" />;
  }

  // Admin view
  return (
    <div className={`relative group ${className}`}>
      {children ? (
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }}>
          {children}
        </div>
      ) : (
        <img src={src} className="w-full h-full object-cover" alt="" />
      )}
      <div 
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer z-20"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      >
        <div className="bg-earthy-brown/80 p-3 rounded-full border border-bronze-metallic/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-saffron-rich text-xl">add_a_photo</span>
          <span className="text-creamy-ivory text-xs font-decorative tracking-widest">Change</span>
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
}
