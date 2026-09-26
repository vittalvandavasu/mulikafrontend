import React from 'react';
import { ArrowRight, BookOpen, Leaf, Compass, Bookmark } from 'lucide-react';

export function DiscoveryPaths({ navigate, search, openSaved, savedCount }: {
  navigate: (tab: string) => void;
  search: (query: string) => void;
  openSaved: () => void;
  savedCount: number;
}) {
  return <section className="discovery-paths" aria-label="Ways to explore Mulika">
    <div className="path-heading"><div><p className="eyebrow">YOUR NEXT DISCOVERY</p><h2>Start with what you know.</h2></div><p>A familiar herb. A question.<br/>A page worth returning to.</p></div>
    <div className="path-grid">
      <button className="path-card path-featured" onClick={() => navigate('herbs')}><Leaf size={28}/><span className="eyebrow">THE BOTANICAL INDEX</span><h3>Know the herb.<br/>Discover its story.</h3><p>Connect familiar names with botanical identities and traditional source records.</p><span className="path-link">Browse herbs <ArrowRight size={18}/></span></button>
      <div className="path-stack"><button className="path-card" onClick={() => navigate('ailments')}><Compass/><h3>Begin with a condition</h3><p>Find the topics described in the collection.</p><span className="path-link">Browse conditions <ArrowRight size={18}/></span></button><button className="path-card" onClick={() => navigate('sources')}><BookOpen/><h3>Read the original record</h3><p>Explore manuscripts, page by page.</p><span className="path-link">Explore sources <ArrowRight size={18}/></span></button></div>
      <div className="path-notebook"><p className="eyebrow">SMALL BEGINNINGS</p><h3>Everyday herbs.<br/>Deeper stories.</h3><p>Choose a name to see what the sources record.</p><div className="herb-starters">{['Tulasi', 'Ginger', 'Turmeric'].map((name, i) => <button key={name} onClick={() => search(name)}><span className="starter-number">0{i + 1}</span>{name}<ArrowRight size={16}/></button>)}</div><button className="saved-shortcut" onClick={openSaved}><Bookmark size={18}/><span>{savedCount ? `Return to ${savedCount} saved records` : 'Your discoveries, kept together'}</span><ArrowRight size={16}/></button></div>
    </div>
    <div className="research-route"><span>FROM QUESTION TO SOURCE</span><p><strong>01</strong> Find a record</p><i aria-hidden="true">→</i><p><strong>02</strong> Check the evidence</p><i aria-hidden="true">→</i><p><strong>03</strong> Read the source</p></div>
  </section>;
}
