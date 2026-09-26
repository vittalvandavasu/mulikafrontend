import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HerbMonograph } from '../types';
import { englishHerbName } from '../lib/herbNames';

type NameMode = 'English' | 'Scientific' | 'Sanskrit' | 'Telugu' | 'Regional';
export function HerbCatalogue({ herbs, mode, select }: { herbs: HerbMonograph[]; mode: 'az' | 'taxonomy'; select: (herb: HerbMonograph) => void }) {
  const [nameMode, setNameMode] = useState<NameMode>('English');
  const [letter, setLetter] = useState('');
  const [family, setFamily] = useState('');
  const groups = useMemo(() => {
    const rows = herbs.flatMap(herb => {
      const names = nameMode === 'Regional' ? herb.common_names : [nameMode === 'Scientific' ? herb.botanical : nameMode === 'Sanskrit' ? herb.sanskrit : nameMode === 'Telugu' ? herb.telugu : englishHerbName(herb)];
      return [...new Set((names || []).filter(Boolean))].map(name => ({ herb, name }));
    }).sort((a,b) => a.name.localeCompare(b.name, nameMode === 'Telugu' ? 'te' : 'en'));
    return rows;
  }, [herbs, nameMode]);
  const letters = [...new Set(groups.map(row => Array.from(row.name.trim())[0]?.toLocaleUpperCase()).filter(Boolean))].sort((a,b) => a.localeCompare(b, nameMode === 'Telugu' ? 'te' : 'en'));
  const families = [...new Set(herbs.map(herb => herb.family).filter(Boolean))].sort();
  const rows = groups.filter(row => (!letter || row.name.toLocaleUpperCase().startsWith(letter)) && (!family || row.herb.family === family));
  return <section className="catalogue" aria-label={mode === 'taxonomy' ? 'Browse recorded families' : 'Alphabetical herb index'}>
    {mode === 'az' ? <><div className="catalogue-modes" role="group" aria-label="Name language">{(['English','Scientific','Sanskrit','Telugu','Regional'] as NameMode[]).map(value => <button key={value} aria-pressed={nameMode === value} onClick={() => {setNameMode(value);setLetter('');}}>{value}</button>)}</div><p className="muted">Names as recorded in the collection. Regional aliases may include several languages.</p><nav className="alphabet-rail" aria-label="Choose initial letter"><button aria-pressed={!letter} onClick={() => setLetter('')}>All</button>{letters.map(value => <button key={value} aria-pressed={letter === value} onClick={() => setLetter(value)}>{value}</button>)}</nav></> : <><p className="muted">Family labels from existing records. This view does not infer a taxonomic hierarchy or reconcile alternate classifications.</p><label className="family-select">Recorded family<select value={family} onChange={e => setFamily(e.target.value)}><option value="">All recorded families ({families.length})</option>{families.map(value => <option key={value}>{value}</option>)}</select></label></>}
    <div className="catalogue-count" role="status">{rows.length} name entries{letter && ` / ${letter}`}{family && ` / ${family}`}</div>
    <div className="catalogue-list">{rows.map(({herb,name}) => <button key={herb.id + name} onClick={() => select(herb)}><span className="catalogue-initial" aria-hidden="true">{Array.from(name)[0]}</span><span><strong lang={nameMode === 'Telugu' ? 'te' : undefined}>{name}</strong><span>{englishHerbName(herb)} · <span lang="te">{herb.telugu}</span></span><i>{herb.botanical}</i></span><span className="catalogue-family">{herb.family}</span><ArrowUpRight size={20}/></button>)}</div>
    {!rows.length && <p className="reading-panel">No entries match this selection. Choose another letter or family.</p>}
  </section>;
}
