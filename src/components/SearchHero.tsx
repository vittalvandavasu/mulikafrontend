import React, { useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, X, ShieldCheck } from 'lucide-react';
import { SearchContext, AilmentContext } from './SearchContext';
import { BOOKS } from '../data/books';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
interface SearchHeroProps {
  context: AilmentContext;
  setContext: (value: AilmentContext) => void;
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


export const SearchHero: React.FC<SearchHeroProps> = ({ context, setContext, compact, query, setQuery, onSearch, loading, bookFilter, setBookFilter, categoryFilter, setCategoryFilter, recentSearches = [], onClearRecentSearches }) => {
 const [filters, setFilters] = useState(false);
 const search = (q: string) => { if (loading) return; setQuery(q); onSearch(q); };
 const activeFilters = Number(bookFilter !== 'ALL') + Number(categoryFilter !== 'ALL');
 return <section className={`search-hero ${compact ? 'search-hero-compact' : ''}`}><div className="hero-kicker"><span/> A LIVING LIBRARY OF TELUGU AYURVEDA</div><h1>{compact ? 'Discover' : 'What would you like to explore?'}</h1><p className="hero-description">A herb, a concern, or a traditional preparation. Start with a name.</p>
 <form className="search-composer" role="search" onSubmit={e => { e.preventDefault(); if (!loading && query.trim()) onSearch(query.trim()); }}><label className="sr-only" htmlFor="ask-input">Ask about a herb, symptom or traditional remedy</label><div className="composer-input"><Search aria-hidden="true"/><textarea id="ask-input" rows={1} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search herbs, ailments, formulations…" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); if (!loading && query.trim()) onSearch(query.trim()); } }}/>{query && <button className="search-clear" type="button" aria-label="Clear search" onClick={() => { setQuery(''); document.getElementById('ask-input')?.focus(); }}><X size={18}/></button>}</div><details className="search-profile" open={context.enabled || undefined}><summary>Age & gender · optional</summary><SearchContext value={context} onChange={setContext}/></details><div className="composer-toolbar"><button type="button" className="filter-button" aria-expanded={filters} onClick={() => setFilters(!filters)}><SlidersHorizontal size={16}/> Refine search{activeFilters > 0 && ` (${activeFilters})`}</button><button type="submit" className="primary-button" disabled={loading || !query.trim()}>{loading ? 'Searching…' : 'Discover'}<ArrowUpRight size={18}/></button></div></form>
 {activeFilters > 0 && <div className="active-filters" aria-label="Applied search filters"><span>Searching within</span>{bookFilter !== 'ALL' && <button onClick={() => setBookFilter('ALL')} aria-label="Remove source filter">{BOOKS.find(b => b.id === bookFilter)?.title || bookFilter} ×</button>}{categoryFilter !== 'ALL' && <button onClick={() => setCategoryFilter('ALL')} aria-label="Remove category filter">{categoryFilter} ×</button>}<button onClick={() => { setBookFilter('ALL'); setCategoryFilter('ALL'); }}>Clear filters</button></div>}
 {filters && <div className="search-filters"><label>Source<select value={bookFilter} onChange={e => setBookFilter(e.target.value)}><option value="ALL">All sources</option>{BOOKS.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}</select></label><label>Traditional category<select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}><option value="ALL">All categories</option>{Array.from(new Set(MANUSCRIPT_ENTRIES.map(e => e.category))).sort().map(c => <option key={c}>{c}</option>)}</select></label></div>}
 {!compact && <><div className="prompt-chips"><span>Start here</span>{['Acidity','Sleep','Tulsi','Amla','Cough','Joint discomfort'].map(q => <button key={q} onClick={() => search(q)}>{q}<ArrowUpRight size={13}/></button>)}</div><p className="grounding-note"><ShieldCheck size={15}/> Answers grounded in Mulika’s digitized source collection.</p></>}
 {!compact && recentSearches.length > 0 && <div className="recent-searches"><span>Recent</span>{recentSearches.slice(0,3).map(q => <button key={q} onClick={() => search(q)}>{q}</button>)}<button onClick={onClearRecentSearches}>Clear</button></div>}
 </section>;
};
