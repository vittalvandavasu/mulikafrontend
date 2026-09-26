import { useEffect, useRef } from 'react';
export function useDialog(open: boolean, onClose: () => void) {
 const ref = useRef<HTMLDivElement>(null);
 const close = useRef(onClose); close.current = onClose;
 useEffect(() => {
  if (!open) return;
  const previous = document.activeElement as HTMLElement;
  const root = ref.current;
  const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  const nodes = () => (Array.from(root?.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]') || []) as HTMLElement[]).filter(e => e.getClientRects().length > 0);
  nodes()[0]?.focus();
  const key = (e: KeyboardEvent) => {
   if(e.key === 'Escape') { e.preventDefault(); close.current(); }
   if(e.key === 'Tab') { const all = nodes(); const first=all[0], last=all[all.length-1]; if (!first) { e.preventDefault(); return; } if(e.shiftKey && (document.activeElement === first || !root?.contains(document.activeElement))) { e.preventDefault(); last.focus(); } else if(!e.shiftKey && (document.activeElement === last || !root?.contains(document.activeElement))) { e.preventDefault(); first.focus(); } }
  };
  document.addEventListener('keydown',key);

  return () => { document.body.style.overflow=overflow; document.removeEventListener('keydown',key); previous?.focus(); };
 },[open]);
 return ref;
}
