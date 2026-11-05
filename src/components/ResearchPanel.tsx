import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe, Search } from 'lucide-react';
import { ResearchResponse, searchResearch } from '../services/research';
import { researchTopic } from '../lib/searchUnderstanding';

export function ResearchPanel({query}:{query:string}) {
  const [topic,setTopic] = useState(() => researchTopic(query));
  const [searched,setSearched] = useState('');
  const [result,setResult] = useState<ResearchResponse|null>(null);
  const [state,setState] = useState<'idle'|'loading'|'ready'|'error'>('idle');
  const controller = useRef<AbortController|null>(null);
  useEffect(() => () => controller.current?.abort(),[]);
  const search = async () => {
    if (!topic.trim()) return;
    controller.current?.abort(); const request = new AbortController(); controller.current = request;
    setState('loading');setResult(null);setSearched(topic.trim());
    try { const response = await searchResearch(topic.trim(),request.signal);if (!request.signal.aborted) {setResult(response);setState('ready');} }
    catch { if (!request.signal.aborted) setState('error'); }
  };
  return <section className="research-panel" aria-label="Published research beyond manuscripts">
    <header><Globe size={22}/><div><span className="eyebrow">BEYOND THE MANUSCRIPTS</span><h2>What does published research say?</h2></div></header>
    <p>We can also look for publications indexed in Europe PMC. These are separate from Mulika’s historical records.</p>
    <form onSubmit={event => {event.preventDefault();void search();}}><label htmlFor="research-topic">Research topic</label><div><input id="research-topic" value={topic} onChange={event=>setTopic(event.target.value)} maxLength={300} placeholder="A herb, ingredient or research question"/><button className="primary-button" disabled={!topic.trim() || state === 'loading'}><Search size={16}/>{state === 'loading' ? 'Searching…' : 'Search published research'}</button></div><small>Only this topic is sent to Europe PMC when you search. Age, gender and consultation notes are not included. Manuscript filters do not apply.</small></form>
    {state === 'loading' && <p role="status">Looking beyond Mulika’s collection…</p>}
    {state === 'error' && <div role="alert"><p>Published research isn’t reachable right now. Your manuscript results are still available.</p><button onClick={()=>void search()}>Try research again</button></div>}
    {result && <div className="research-response"><p role="status">{result.items.length ? `I found ${result.total.toLocaleString()} indexed publications for “${searched}”. Here are ${result.items.length} results to explore.` : `I couldn’t retrieve usable publication records for “${searched}”. Try a botanical name or a shorter topic.`}</p>{result.items.length>0 && <p className="muted">A search match is not proof of benefit or personal suitability. Study methods and limitations matter; Mulika has not clinically appraised these papers.</p>}<ol>{result.items.map(item=><li key={item.id}><span className="eyebrow">PUBLISHED RESEARCH · {item.year || 'DATE NOT PROVIDED'}</span><h3><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={16}/></a></h3><p className="research-meta">{[item.authors,item.journal].filter(Boolean).join(' · ')}</p>{item.publicationTypes.length>0 && <p className="research-meta">{item.publicationTypes.join(' · ')}</p>}{item.excerpt && <details><summary>Read abstract excerpt</summary><p>{item.excerpt}{item.excerpt.length===500 ? '…' : ''}</p><a href={item.url} target="_blank" rel="noreferrer">Read the full source</a></details>}</li>)}</ol><a href={result.searchUrl} target="_blank" rel="noreferrer">Continue on Europe PMC <ArrowUpRight size={15}/></a></div>}
  </section>;
}
