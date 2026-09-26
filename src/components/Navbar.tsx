import React, { useEffect, useState } from 'react';
import { Search, Bookmark, Menu, ArrowUpRight, Compass, BookOpen, X } from 'lucide-react';
import { Sheet } from './Sheet';
import { useTheme } from '../hooks/useTheme';
import { CODEX_DESTINATIONS } from './CodexIndex';
interface NavbarProps {
  activeTab: string; setActiveTab: (tab: string) => void; totalEntriesCount: number;
  onOpenArchitectureModal?: () => void; onOpenSubmitModal?: () => void;
  savedCount?: number; onOpenSavedRemedies?: () => void; onOpenConverter?: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount = 0, onOpenSavedRemedies }) => {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('');
  const { theme, setTheme } = useTheme();
  const go = (id: string) => { setActiveTab(id); setMenu(false); setFilter(''); };
  const destinations = [{id:'home',label:'Visual index',description:'See every way into the Codex.'}, ...CODEX_DESTINATIONS, {id:'glossary',label:'Terms & tools',description:'Glossary, measurements, and reference tools.'}, {id:'community',label:'Community',description:'Read contributions, separate from source evidence.'}];
  const visible = destinations.filter(item => (item.label + ' ' + item.description).toLowerCase().includes(filter.toLowerCase()));
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setMenu(value => !value); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  const current = destinations.find(item => item.id === activeTab)?.label || 'Ask the Codex';
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="topbar codex-topbar"><div className="nav-inner">
    <button className="brand" onClick={() => go('home')} aria-label="Mulika visual index"><span>mulika<span className="brand-sub">THE BOTANICAL CODEX</span></span></button>
    <nav className="desktop-nav" aria-label="Primary">{[['home','Visual index'],['az','A–Z'],['sources','Texts'],['compare','Compare']].map(([id,label]) => <button key={id} onClick={() => go(id)} aria-current={activeTab === id ? 'page' : undefined}>{label}</button>)}</nav>
    <div className="nav-actions"><button className="icon-button" onClick={() => go('search')} aria-label="Ask the Codex"><Search size={19}/></button><button className="icon-button desktop-only" onClick={onOpenSavedRemedies} aria-label={`Saved records (${savedCount})`}><Bookmark size={19}/></button><button className="codex-menu-trigger" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={20}/><span>Index</span><kbd className="desktop-only">⌘ / Ctrl K</kbd></button></div>
  </div></header>
  {activeTab !== 'home' && <div className="location-strip"><button onClick={() => go('home')}>Codex</button><span aria-hidden="true">/</span><span aria-current="page">{current}</span><button className="location-jump" onClick={() => setMenu(true)}>Go somewhere else <ArrowUpRight size={15}/></button></div>}
  {menu && <Sheet title="Where shall we go?" onClose={() => setMenu(false)}><div className="jump-search"><Search size={18}/><input aria-label="Find a destination" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Find a section or search the Codex…" autoFocus onKeyDown={e => { if(e.key === 'Enter' && visible.length === 1) go(visible[0].id); }}/>{filter && <button aria-label="Clear destination filter" onClick={() => setFilter('')}><X size={16}/></button>}</div><nav className="codex-menu" aria-label="All destinations">{visible.map((item,index) => <button key={item.id} onClick={() => go(item.id)} aria-current={activeTab === item.id ? 'page' : undefined}><small>{String(index + 1).padStart(2,'0')}</small><span><strong>{item.label}</strong><span>{item.description}</span></span><ArrowUpRight size={20}/></button>)}</nav>{!visible.length && <p className="muted">No section matches. Try Herbs, Texts, Names, or Compare.</p>}<div className="button-row"><button onClick={() => go('search')}><Search size={17}/> Ask the Codex</button><button onClick={() => {setMenu(false); onOpenSavedRemedies?.();}}><Bookmark size={17}/> Saved records ({savedCount})</button></div><label className="theme-control">Appearance<select value={theme} onChange={e => setTheme(e.target.value)}><option value="system">Use device setting</option><option value="light">Paper</option><option value="dark">Ink</option></select></label></Sheet>}
  <nav className="mobile-nav" aria-label="Mobile primary"><button onClick={() => go('home')} aria-current={activeTab === 'home' ? 'page' : undefined}><Compass/>Index</button><button onClick={() => go('az')} aria-current={['az','herbs','taxonomy'].includes(activeTab) ? 'page' : undefined}><span className="mobile-letters">Aa</span>A–Z</button><button onClick={() => go('search')} aria-current={activeTab === 'search' ? 'page' : undefined}><Search/>Search</button><button onClick={() => go('sources')} aria-current={['sources','codex'].includes(activeTab) ? 'page' : undefined}><BookOpen/>Texts</button><button onClick={onOpenSavedRemedies}><Bookmark/>Saved</button></nav></>;
};
