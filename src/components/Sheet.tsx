import React, { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';

export function Sheet({ title, onClose, children, className = '' }: { title: string; onClose: () => void; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`mulika-sheet ${className}`} aria-labelledby={id} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === ref.current) onClose(); }}>
    <div className="sheet-content"><header className="sheet-header"><h2 id={id}>{title}</h2><button className="icon-button" aria-label="Close panel" onClick={onClose}><X /></button></header>{children}</div>
  </dialog>;
}
