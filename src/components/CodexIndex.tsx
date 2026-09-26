import React from 'react';
import { ArrowUpRight, Leaf, BookOpen, GitCompare, Network, Library, Compass } from 'lucide-react';
import { BOOKS } from '../data/books';

export const CODEX_DESTINATIONS = [
  { id: 'herbs', label: 'Herbs', verb: 'Explore the plant', description: 'Botanical identities, traditional names, and recorded uses.', glyph: Leaf, tone: 'botanical' },
  { id: 'az', label: 'A–Z & names', verb: 'Follow the name', description: 'English, scientific, Sanskrit, Telugu, and regional names.', glyph: null, tone: 'type' },
  { id: 'taxonomy', label: 'Families', verb: 'See the relationship', description: 'Browse the family classifications recorded in the index.', glyph: Network, tone: 'mineral' },
  { id: 'sources', label: 'Source texts', verb: 'Trace the source', description: 'Meet the books and understand their evidence status.', glyph: Library, tone: 'earth' },
  { id: 'codex', label: 'Manuscripts', verb: 'Open the folio', description: 'Read transcriptions, translations, and page references.', glyph: BookOpen, tone: 'ink' },
  { id: 'compare', label: 'Compare', verb: 'Read between sources', description: 'Look for shared descriptions, variations, and differences.', glyph: GitCompare, tone: 'mineral' },
  { id: 'ailments', label: 'Traditional uses', verb: 'Begin with a question', description: 'Explore conditions as described by historical records.', glyph: Compass, tone: 'earth' },
];

export function CodexIndex({ navigate, entriesCount, herbsCount }: { navigate: (id: string) => void; entriesCount: number; herbsCount: number }) {
  return <div className="codex-index">
    <header className="codex-masthead"><p className="eyebrow">MULIKA / A DIGITAL BOTANICAL CODEX</p><h1>Many ways in.<br/><em>Roots that run deep.</em></h1><div className="masthead-aside"><p>Plant names. Historical texts.<br/>Knowledge worth following.</p><button onClick={() => navigate('search')}>Ask the Codex <ArrowUpRight size={19}/></button></div></header>
    <div className="index-caption"><span>THE INTERACTIVE INDEX</span><span>Choose a starting point. Follow your curiosity.</span></div>
    <nav className="knowledge-landscape" aria-label="Visual codex index">{CODEX_DESTINATIONS.map((item, index) => <button key={item.id} className={`landscape-object tone-${item.tone}`} onClick={() => navigate(item.id)}>
      <span className="object-number">0{index + 1}</span><span className="object-glyph" aria-hidden="true">{item.glyph ? <item.glyph strokeWidth={1}/> : <span>Aa</span>}</span>
      <span className="object-title">{item.label}<ArrowUpRight size={22}/></span><span className="object-description">{item.description}</span><span className="object-verb">{item.verb} →</span>
    </button>)}</nav>
    <section className="archive-ledger" aria-label="Collection overview"><div><strong>{herbsCount}</strong><span>Herbs & ingredients</span></div><div><strong>{BOOKS.length}</strong><span>Source texts</span></div><div><strong>{entriesCount}</strong><span>Indexed records</span></div><p>Each record has a history.<br/><button onClick={() => navigate('sources')}>See how we trace it <ArrowUpRight size={15}/></button></p></section>
    <section className="index-editorial"><div><p className="eyebrow">THE ARCHIVE IS OPEN</p><h2>A page is only <br/>the beginning.</h2><p>Read a source, follow a name, compare an account. The collection becomes richer with every connection you make.</p></div><div className="text-index">{BOOKS.slice(0,3).map((book,index) => <a key={book.id} href={`#codex?book=${book.id}&page=${book.available_pages[0]}&return=home`}><span>0{index + 1}</span><div><strong>{book.title}</strong><p lang="te">{book.telugu_title}</p><small>{book.author}</small></div><ArrowUpRight size={22}/></a>)}</div></section>
    <footer className="codex-footer"><span>మూలిక / MULIKA</span><p>Historical knowledge, with its sources in view.</p><button onClick={() => navigate('sources')}>About the evidence ↗</button></footer>
  </div>;
}
