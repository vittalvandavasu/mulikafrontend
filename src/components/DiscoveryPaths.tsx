import React from 'react';
import { ArrowRight, BookOpen, Leaf, Compass, Bookmark } from 'lucide-react';

export function DiscoveryPaths({ navigate, openSaved, savedCount }: {
  navigate: (tab: string) => void; search: (query: string) => void;
  openSaved: () => void; savedCount: number;
}) {
  return <section className="browse-shortcuts" aria-label="Ways to explore Mulika">
    <h2>Prefer to browse?</h2>
    <div>{[
      {id:'herbs', title:'Herbs', detail:'English & regional names', Icon:Leaf},
      {id:'ailments', title:'Topics', detail:'Browse traditional uses', Icon:Compass},
      {id:'sources', title:'Library', detail:'Read the source records', Icon:BookOpen}
    ].map(({id,title,detail,Icon}) => <button key={id} onClick={() => navigate(id)}><Icon size={22}/><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={18}/></button>)}</div>
    {savedCount > 0 && <button className="browse-saved" onClick={openSaved}><Bookmark size={16}/>Continue with {savedCount} saved {savedCount === 1 ? 'record' : 'records'}<ArrowRight size={16}/></button>}
  </section>;
}
