'use client';

import { Menu, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNavToggle({ isOpen, onToggle }: Props) {
  return (
    <button
      className="mobile-nav-toggle"
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}
