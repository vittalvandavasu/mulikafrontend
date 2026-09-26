import React, { useEffect, useState } from 'react';
import { Leaf, Search, BookOpen, Bookmark, Compass, Home, Menu, ArrowUpRight } from 'lucide-react';
import { Sheet } from './Sheet';
import { useTheme } from '../hooks/useTheme';
interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalEntriesCount: number;
  onOpenArchitectureModal?: () => void;
  onOpenSubmitModal?: () => void;
  savedCount?: number;
  onOpenSavedRemedies?: () => void;
  onOpenConverter?: () => void;
}


export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount = 0, onOpenSavedRemedies }) => {
  const [menu, setMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const go = (id: string) => { setActiveTab(id); setMenu(false); window.scrollTo(0, 0); };
  const ask = () => { go('search'); setTimeout(() => document.getElementById('ask-input')?.focus(), 0); };
  useEffect(() => { const key = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); ask(); } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  const links = [['herbs', 'Herbs'], ['ailments', 'Conditions'], ['glossary', 'Tools & reference'], ['codex', 'Manuscript reader'], ['sources', 'Sources & methodology'], ['community', 'Community']];
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="topbar"><div className="nav-inner">
    <button className="brand" onClick={() => go('search')} aria-label="Mulika home"><span className="brand-mark"><Leaf /></span><span>mulika<span className="brand-sub">KNOWLEDGE, ROOTED.</span></span></button>
    <nav aria-label="Primary" className="desktop-nav"><button aria-current={activeTab === 'search' ? 'page' : undefined} onClick={ask}>Ask Mulika</button><button aria-current={['herbs','ailments','glossary'].includes(activeTab) ? 'page' : undefined} onClick={() => go('herbs')}>Explore</button><button aria-current={['codex','sources'].includes(activeTab) ? 'page' : undefined} onClick={() => go('sources')}>Library</button><button aria-current={activeTab === 'community' ? 'page' : undefined} onClick={() => go('community')}>Community</button></nav>
    <div className="nav-actions"><button className="icon-button desktop-only" onClick={ask} aria-label="Search (Control or Command K)"><Search size={19}/></button><button className="saved-nav desktop-only" onClick={onOpenSavedRemedies}><Bookmark size={17}/> My Library {savedCount > 0 && <span>{savedCount}</span>}</button><button className="icon-button" aria-label="Open navigation and theme menu" onClick={() => setMenu(true)}><Menu size={21}/></button></div>
  </div></header>
  {['herbs','ailments','glossary'].includes(activeTab) && <nav className="subnav" aria-label="Explore">{links.slice(0,3).map(([id,label]) => <button key={id} aria-current={activeTab === id ? 'page' : undefined} onClick={() => go(id)}>{label}</button>)}</nav>}
  {menu && <Sheet title="Explore Mulika" onClose={() => setMenu(false)}><div className="menu-links">{links.map(([id,label]) => <button key={id} onClick={() => go(id)}>{label}<ArrowUpRight size={18}/></button>)}<button onClick={() => { setMenu(false); onOpenSavedRemedies?.(); }}>My Library <Bookmark size={18}/></button></div><label className="theme-control">Appearance<select value={theme} onChange={e => setTheme(e.target.value)}><option value="system">Use device setting</option><option value="light">Light · warm ivory</option><option value="dark">Dark · forest</option></select></label></Sheet>}
  <nav className="mobile-nav" aria-label="Mobile primary"><button onClick={() => go('search')}><Home/>Home</button><button onClick={() => go('herbs')}><Compass/>Explore</button><button className="mobile-ask" onClick={ask}><Search/>Ask</button><button onClick={() => go('sources')}><BookOpen/>Library</button><button onClick={onOpenSavedRemedies}><Bookmark/>Saved</button></nav></>;
};
