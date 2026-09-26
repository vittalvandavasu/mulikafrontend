import React, { useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, ArrowRight, Leaf, BookOpen, ShieldCheck } from 'lucide-react';
import { BOOKS } from '../data/books';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
interface SearchHeroProps {
  compact?: boolean;
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  loading: boolean;
  bookFilter: string;
  setBookFilter: (b: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  recentSearches?: string[];
  onClearRecentSearches?: () => void;
  onOpenSavedRemedies?: () => void;
  savedCount?: number;
  onOpenConverter?: () => void;
}


export const SearchHero: React.FC<SearchHeroProps> = ({ compact, query, setQuery, onSearch, loading, bookFilter, setBookFilter, categoryFilter, setCategoryFilter, recentSearches = [], onClearRecentSearches }) => {
 const [filters, setFilters] = useState(false);
 const search = (q: string) => { setQuery(q); onSearch(q); };
 return <section className={`search-hero ${compact ? 'search-hero-compact' : ''}`}><div className="hero-kicker"><span/> A LIVING LIBRARY OF TELUGU AYURVEDA</div><h1>Traditional knowledge.<br/><em>Traceable to the source.</em></h1><p className="hero-description">Explore herbs, understand traditional uses, and follow<br className="desktop-only"/> every answer back to the manuscript.</p>
 <form className="search-composer" onSubmit={e => { e.preventDefault(); if (!loading && query.trim()) onSearch(query.trim()); }}><label className="sr-only" htmlFor="ask-input">Ask about a herb, symptom or traditional remedy</label><div className="composer-input"><Search aria-hidden="true"/><textarea id="ask-input" rows={2} value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask about a herb, symptom or traditional remedy…" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!loading && query.trim()) onSearch(query.trim()); } }}/></div><div className="composer-toolbar"><button type="button" className="filter-button" aria-expanded={filters} onClick={() => setFilters(!filters)}><SlidersHorizontal size={16}/> Filters{(bookFilter !== 'ALL' || categoryFilter !== 'ALL') && ' · active'}</button><button type="submit" className="primary-button" disabled={loading || !query.trim()}>{loading ? 'Searching…' : 'Ask Mulika'}<ArrowUpRight size={18}/></button></div></form>
 {filters && <div className="search-filters"><label>Source<select value={bookFilter} onChange={e => setBookFilter(e.target.value)}><option value="ALL">All sources</option>{BOOKS.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}</select></label><label>Traditional category<select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}><option value="ALL">All categories</option>{Array.from(new Set(MANUSCRIPT_ENTRIES.map(e => e.category))).sort().map(c => <option key={c}>{c}</option>)}</select></label></div>}
 <div className="prompt-chips"><span>Try asking</span>{['Acidity','Sleep','Tulsi','Amla','Cough','Joint discomfort'].map(q => <button key={q} onClick={() => search(q)}>{q}<ArrowUpRight size={13}/></button>)}</div><p className="grounding-note"><ShieldCheck size={15}/> Answers grounded in Mulika’s digitized source collection.</p>
 {recentSearches.length > 0 && <div className="recent-searches"><span>Recent</span>{recentSearches.slice(0,3).map(q => <button key={q} onClick={() => search(q)}>{q}</button>)}<button onClick={onClearRecentSearches}>Clear</button></div>}
 </section>;
};
