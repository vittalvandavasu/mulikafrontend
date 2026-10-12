import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, BookOpen, Bookmark, Info, SearchX, ShieldCheck, ThumbsUp } from 'lucide-react';
import { AyurvedicEntry, HerbMonograph, SearchResult, ThreeStateStatus } from '../types';
import { englishHerbName } from '../lib/herbNames';
import { ProvenanceDrawer, VerificationBadge } from './ProvenanceDrawer';
import { ContextActions } from './ContextActions';
import { normalizeName, relatedHerbRecords } from '../lib/experience';
import { HERB_MONOGRAPHS } from '../data/herbs';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { AilmentContext } from './SearchContext';

export function EvidenceBadge({ status }: { status: ThreeStateStatus }) {
  const label = status === ThreeStateStatus.SUPPORTED ? 'Verified source evidence' : status === ThreeStateStatus.INFERRED ? 'Source-linked interpretation' : 'No verified source evidence found';
  return <span className="evidence-badge" data-status={status}>{status === ThreeStateStatus.SUPPORTED ? <ShieldCheck size={17}/> : <Info size={17}/>} {label}</span>;
}
export function SafetyAlert({ text }: { text?: string }) {
  return <aside className="safety-alert"><AlertTriangle size={20}/><div><strong>{text ? 'Safety & context' : 'Safety information unavailable'}</strong><p>{text || 'Missing safety information does not confirm absence of risk.'}</p></div></aside>;
}
interface Props {
  searchResult: SearchResult | null; loading: boolean; onSelectHerb: (name: string) => void;
  context?: AilmentContext; query?: string; herbs?: HerbMonograph[]; entries?: AyurvedicEntry[];
  onSearch?: (query: string) => void; onOpenSubmitModal?: (name?: string) => void;
  onVoteUserRemedy?: (id: string) => void; onNavigateToSource?: (book: string,page: number,id?: string) => void;
  onNavigateToCompare?: (name: string) => void; onSaveRecipe?: (entry: AyurvedicEntry) => void;
  isRecipeSaved?: (id: string) => boolean; onOpenConverter?: () => void;
}
export const SearchResultsView: React.FC<Props> = ({ searchResult, loading, query = '', herbs = HERB_MONOGRAPHS, entries = MANUSCRIPT_ENTRIES, onNavigateToSource, onNavigateToCompare, onSaveRecipe, isRecipeSaved, onVoteUserRemedy }) => {
  const [evidence,setEvidence] = useState<AyurvedicEntry | null>(null);
  const [all,setAll] = useState(false);
  if(loading) return <div className="loading-state" role="status"><BookOpen/><h2>Searching Mulika’s sources…</h2><p>Looking for records in the indexed collection.</p><div className="loading-bar"/></div>;
  if(!searchResult) return null;
  const result=searchResult;
  const normal=normalizeName(query);
  const herbMatches = normal.length >= 3 ? herbs.filter(herb => [herb.name,herb.botanical,herb.telugu,herb.sanskrit,...herb.common_names].some(name => normalizeName(name).includes(normal))).slice(0,3) : [];
  const catalogue=herbMatches.length > 0 && <section className="entity-matches"><h2>Herbs matching your search</h2>{herbMatches.map(herb => {const linked=relatedHerbRecords(herb,entries);return <article className="discovery-result" key={herb.id}><span className="eyebrow">HERB · BOTANICAL CATALOGUE</span><h3>{englishHerbName(herb)}</h3><p>{herb.description || `Recorded names and botanical identity: ${herb.botanical}`}</p><ContextActions make={linked.length > 0} entity={{kind:'herb',id:herb.id,label:englishHerbName(herb),recordIds:linked.map(entry=>entry.id)}}/><details><summary>Names and botanical identity</summary><p>{herb.botanical}</p><p lang="te">{herb.telugu}</p><p>{herb.sanskrit} · {herb.common_names.join(', ')}</p><p>Catalogue identity is separate from claim-level source verification.</p></details></article>;})}</section>;
  if(result.status === ThreeStateStatus.UNKNOWN || result.is_abstention || !result.status) return <div className="results-layout">{catalogue}<section className="abstention" aria-live="polite"><SearchX size={32}/><EvidenceBadge status={ThreeStateStatus.UNKNOWN}/><h2>We couldn’t verify this in Mulika’s current source collection.</h2><p>Mulika avoids generating a traditional medical claim when the available indexed sources do not provide sufficient evidence.</p><ContextActions entity={{kind:'query',id:query,label:query || 'Your question',recordIds:[]}} make={false} buy={false}/><div className="button-row"><button onClick={() => document.getElementById('ask-input')?.focus()}>Try another spelling</button><a href="#herbs">Search a herb</a><a href="#ailments">Browse related topics</a><a href="#sources">Explore manuscripts <ArrowRight size={16}/></a></div></section></div>;
  const matches=result.manuscript_matches || result.topManuscriptMatches || [];
  return <div className="results-layout">
    <header className="discovery-results-heading"><p className="eyebrow">YOUR DISCOVERY</p><h2>{query || 'Search results'}</h2><p>{matches.length} source records. Choose a next step or open the references.</p><EvidenceBadge status={result.status}/></header>
    <SafetyAlert text={result.safety_note}/>
    {catalogue}
    <section aria-label="Source-linked discoveries"><div className="formulation-grid">{(all ? matches : matches.slice(0,3)).map(entry => <article className="formulation-card discovery-result" key={entry.id}>
      <div className="card-topline"><span>TRADITIONAL PREPARATION</span><button className="icon-button" aria-label={`${isRecipeSaved?.(entry.id) ? 'Unsave' : 'Save'} ${entry.herb}`} aria-pressed={!!isRecipeSaved?.(entry.id)} onClick={() => onSaveRecipe?.(entry)}><Bookmark size={19} fill={isRecipeSaved?.(entry.id) ? 'currentColor' : 'none'}/></button></div>
      <h3>{englishHerbName(entry)}</h3><p className="result-description">{entry.preparation_type || 'Recorded preparation'} · Traditionally described for {entry.ailment} in {entry.source_short}.</p>
      <ContextActions entity={{kind:'formulation',id:entry.id,label:entry.herb,recordIds:[entry.id]}}/>
      <VerificationBadge status={entry.verification_status}/>
      <p className="card-safety"><AlertTriangle size={15}/> Source safety label: {entry.safety_rating || 'Not stated; absence of a label does not confirm safety.'}</p>
      <details className="record-references"><summary>Source records and references</summary><p className="herb-source-name">Source name: {entry.herb}</p><p lang="te" className="telugu">తెలుగు: {entry.telugu}</p><p className="record-preparation">{entry.remedy}</p><p className="source-citation"><BookOpen size={15}/>{entry.source_short} · p. {entry.page}</p><div className="card-actions"><button className="primary-button" onClick={() => onNavigateToSource?.(entry.source_id,entry.page,entry.id)}>View source <ArrowRight size={16}/></button><button onClick={() => setEvidence(entry)}>View evidence</button></div></details>
    </article>)}</div>{matches.length>3 && <button className="more-records" onClick={() => setAll(value=>!value)}>{all ? 'Show fewer records' : `Show ${matches.length-3} more records`}</button>}</section>
    <details className="result-summary source-summary"><summary>Source records and references · Search overview</summary><p className="understood">{result.query_understood_as}</p><h2>What the sources record</h2><p className="answer-text">{result.manuscript_summary}</p>{result.status_explanation && <p className="muted">{result.status_explanation}</p>}<details><summary>How to read this evidence</summary><p>{result.verification_disclosure}</p><p>Source verification describes the historical record. It does not establish clinical effectiveness.</p>{result.claims?.map((claim,i)=><div className="claim-record" key={i}><strong>{claim.claim_text}</strong><p>{claim.source_title} · Page {claim.page_or_folio}</p><VerificationBadge status={claim.verification_status}/><p>{claim.translation_en}</p></div>)}</details></details>
    {result.pathya_guidance && result.pathya_guidance.length>0 && <details className="reading-panel"><summary>Traditional dietary context · Pathya</summary>{Array.isArray(result.pathya_guidance) ? <ul>{result.pathya_guidance.map(item=><li key={item}>{item}</li>)}</ul> : <p>{result.pathya_guidance}</p>}</details>}
    {result.modern_crossref && <details className="reading-panel"><summary>Modern references · separate from manuscript evidence</summary><p>{result.modern_crossref}</p>{result.modern_sources?.map(item=><p key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.title} ↗</a></p>)}</details>}
    {!!result.user_submitted_matches?.length && <details className="community-panel"><summary>Experience from the community</summary><p>Community contributions are separate from Mulika’s verified manuscript corpus. Upvotes represent interest, not medical validity.</p>{result.user_submitted_matches.map(item=><article key={item.id}><strong>Community contribution · {item.title || item.herb_common}</strong><p>{item.author_name || item.user_name} · {item.source_tradition}</p><p>{item.recipe || item.preparation_instructions}</p>{(item.precautions || item.notes) && <SafetyAlert text={item.precautions || item.notes}/>}<button onClick={()=>onVoteUserRemedy?.(item.id)}><ThumbsUp size={16}/>{item.upvotes} · Interest</button></article>)}</details>}
    {evidence && <ProvenanceDrawer entry={evidence} onClose={()=>setEvidence(null)} onSource={()=>{onNavigateToSource?.(evidence.source_id,evidence.page,evidence.id);setEvidence(null);}} onCompare={()=>{onNavigateToCompare?.(evidence.herb);setEvidence(null);}}/>}
  </div>;
};
