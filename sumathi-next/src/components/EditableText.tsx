import React from 'react';
import { useCart } from '@/context/CartContext';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';
}

export default function EditableText({ 
  value, 
  onChange, 
  className = '', 
  tagName: Tag = 'span' 
}: EditableTextProps) {
  const { isAdmin } = useCart();

  if (!isAdmin) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag 
      contentEditable={true}
      suppressContentEditableWarning={true}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation(); // Stop click from going up to <a>
      } }
      onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation(); // Stop drag selections bugs too
      } }
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        onChange(e.currentTarget.innerText);
      }}
      className={`${className} border border-dashed border-bronze-metallic/60 bg-white/5 hover:bg-white/10 px-1 outline-none cursor-text transition-all focus:bg-white/10 focus:border-bronze-metallic`}
      title="Click to Edit"
    >
      {value}
    </Tag>
  );
}
