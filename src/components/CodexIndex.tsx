import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Leaf, BookOpen, GitCompare, Network, Library, Compass } from 'lucide-react';
import { CollectionGraphic, ReadingProgress } from './CodexMotion';
import { BOOKS } from '../data/books';

export const CODEX_DESTINATIONS = [
  { id: 'herbs', label: 'Herbs', verb: 'Explore the plant', description: 'Find a herb’s English and Telugu names, identity, and traditional uses.', glyph: Leaf, tone: 'botanical' },
  { id: 'az', label: 'A–Z & names', verb: 'Follow the name', description: 'English, scientific, Sanskrit, Telugu, and regional names.', glyph: null, tone: 'type' },
  { id: 'taxonomy', label: 'Families', verb: 'See the relationship', description: 'Find plants grouped by their recorded botanical family.', glyph: Network, tone: 'mineral' },
  { id: 'sources', label: 'Source texts', verb: 'Trace the source', description: 'See which books the records come from and how they were checked.', glyph: Library, tone: 'earth' },
  { id: 'codex', label: 'Manuscripts', verb: 'Open the folio', description: 'Read the recorded text and English translation, page by page.', glyph: BookOpen, tone: 'ink' },
  { id: 'compare', label: 'Compare', verb: 'Read between sources', description: 'See how different books describe the same herb.', glyph: GitCompare, tone: 'mineral' },
  { id: 'ailments', label: 'Traditional uses', verb: 'Begin with a question', description: 'Find traditional uses described in the books.', glyph: Compass, tone: 'earth' },
];

export function CodexIndex({ navigate, entriesCount, herbsCount }: { navigate: (id: string) => void; entriesCount: number; herbsCount: number }) {
  const reduceMotion = useReducedMotion();
  const [intent, setIntent] = useState(0);
  const paths = [
    { label: 'I know a herb', destination: 'az', title: 'Start with its name.', text: 'Look up an English, Telugu, Sanskrit, or scientific name.', action: 'Find a herb' },
    { label: 'I have a question', destination: 'search', title: 'Search the collection.', text: 'Enter a herb or a traditional use to find matching source records.', action: 'Search the Codex' },
    { label: 'I want to read', destination: 'codex', title: 'Open a source page.', text: 'Read a transcription alongside its translation and page reference.', action: 'Open the reader' }
  ];
  const path = paths[intent];
  const entrance = { initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 } };
  return <div className="codex-index"><ReadingProgress/>
    <motion.header className="codex-masthead" {...entrance} transition={{ duration: reduceMotion ? 0 : 0.45 }}><p className="eyebrow">MULIKA / A DIGITAL BOTANICAL CODEX</p><h1>Discover a herb.<br/><em>Follow its story.</em></h1><div className="masthead-aside"><p>Explore herbs and their traditional uses.<br/>See the books behind each record.</p><button onClick={() => navigate('search')}>Search the collection <ArrowUpRight size={19}/></button></div></motion.header>
    <section className="start-guide" aria-label="Choose a starting point">
      <div className="guide-intro"><p className="eyebrow">WHERE WOULD YOU LIKE TO START?</p><div className="guide-choices" role="group" aria-label="What brings you here?">{paths.map((item, index) => <button key={item.label} aria-pressed={intent === index} onClick={() => setIntent(index)}>{item.label}</button>)}</div></div>
      <div className="guide-answer" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={intent} exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -5 }} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}><h2>{path.title}</h2><p>{path.text}</p></motion.div></AnimatePresence><button className="guide-action" onClick={() => navigate(path.destination)}>{path.action}<ArrowUpRight size={18}/></button></div>
    </section>
    <div className="index-caption"><span>EXPLORE THE COLLECTION</span><span>Choose a section below to open it.</span></div>
    <nav className="knowledge-landscape" aria-label="Visual codex index">{CODEX_DESTINATIONS.map((item, index) => <motion.button {...entrance} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.035 }} whileTap={reduceMotion ? undefined : { scale: 0.985 }} key={item.id} className={`landscape-object tone-${item.tone}`} onClick={() => navigate(item.id)}>
      <svg className="collection-orbit" viewBox="0 0 160 160" fill="none" aria-hidden="true"><circle cx="80" cy="80" r="62"/><ellipse cx="80" cy="80" rx="30" ry="62" transform="rotate(35 80 80)"/><path d="M18 80h124M80 18v124"/><circle className="orbit-seed" cx="80" cy="18" r="5"/></svg><span className="object-number">0{index + 1}</span><span className="object-glyph" aria-hidden="true"><CollectionGraphic>{item.glyph ? <item.glyph strokeWidth={1}/> : <span>Aa</span>}</CollectionGraphic></span>
      <span className="object-title">{item.label}<ArrowUpRight size={22}/></span><span className="object-description">{item.description}</span><span className="object-verb">{item.verb} →</span>
    </motion.button>)}</nav>
    <section className="archive-ledger" aria-label="Collection overview"><div><strong>{herbsCount}</strong><span>Herbs & ingredients</span></div><div><strong>{BOOKS.length}</strong><span>Source texts</span></div><div><strong>{entriesCount}</strong><span>Indexed records</span></div><p>Each record has a history.<br/><button onClick={() => navigate('sources')}>See how we trace it <ArrowUpRight size={15}/></button></p></section>
    <motion.section {...entrance} transition={{ duration: reduceMotion ? 0 : 0.4 }} className="index-editorial"><div><p className="eyebrow">THE ARCHIVE IS OPEN</p><h2>Read where it <br/>was recorded.</h2><p>Choose a book to open its first indexed page. You can read the text, check its translation, and follow its references.</p></div><div className="text-index">{BOOKS.slice(0,3).map((book,index) => <a key={book.id} href={`#codex?book=${book.id}&page=${book.available_pages[0]}&return=home`}><span>0{index + 1}</span><div><strong>{book.title}</strong><p lang="te">{book.telugu_title}</p><small>{book.author}</small></div><ArrowUpRight size={22}/></a>)}</div></motion.section>
    <footer className="codex-footer"><span>మూలిక / MULIKA</span><p>Historical knowledge, with its sources in view.</p><button onClick={() => navigate('sources')}>About the evidence ↗</button></footer>
  </div>;
}
