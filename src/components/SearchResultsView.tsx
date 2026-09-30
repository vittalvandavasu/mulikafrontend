import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, BookOpen, Bookmark, Info, SearchX, ShieldCheck, ThumbsUp } from 'lucide-react';
import { AyurvedicEntry, SearchResult, ThreeStateStatus } from '../types';
import { englishHerbName } from '../lib/herbNames';
import { AilmentContext, EMPTY_CONTEXT } from './SearchContext';
import { ResultActions, ResultJourney, ResultIntent } from './ResultJourney';
import { ProvenanceDrawer, VerificationBadge } from './ProvenanceDrawer';

export function EvidenceBadge({ status }: { status: ThreeStateStatus }) {
  const label = status === ThreeStateStatus.SUPPORTED ? 'Verified source evidence' : status === ThreeStateStatus.INFERRED ? 'Source-linked interpretation' : 'No verified source evidence found';
  return <span className="evidence-badge" data-status={status}>{status === ThreeStateStatus.SUPPORTED ? <ShieldCheck size={17}/> : <Info size={17}/>} {label}</span>;
}

export function SafetyAlert({ text }: { text?: string }) {
  return <aside className="safety-alert"><AlertTriangle size={20}/><div><strong>{text ? 'Safety & context' : 'Safety information unavailable'}</strong><p>{text || 'Missing safety information does not confirm absence of risk.'}</p></div></aside>;
}

interface Props {
  context?: AilmentContext;
  searchResult: SearchResult | null; loading: boolean; onSelectHerb: (herbName: string) => void;
  onSearch?: (query: string) => void; onOpenSubmitModal?: (ailmentName?: string) => void;
  onVoteUserRemedy?: (remedyId: string) => void; onNavigateToSource?: (bookId: string, page: number, entryId?: string) => void;
  onNavigateToCompare?: (herbName: string) => void; onSaveRecipe?: (entry: AyurvedicEntry) => void;
  isRecipeSaved?: (entryId: string) => boolean; onOpenConverter?: () => void;
}

export const SearchResultsView: React.FC<Props> = ({ context = EMPTY_CONTEXT, searchResult, loading, onNavigateToSource, onNavigateToCompare, onSaveRecipe, isRecipeSaved, onVoteUserRemedy }) => {
  const [journey, setJourney] = useState<{entry: AyurvedicEntry; intent: ResultIntent} | null>(null);
  const [evidence, setEvidence] = useState<AyurvedicEntry | null>(null);
  if (loading) return <div className="loading-state" role="status"><BookOpen/><h2>Searching Mulika’s sources…</h2><p>Looking for records in the indexed collection.</p><div className="loading-bar"/></div>;
  if (!searchResult) return null;
  const result = searchResult;
  if (result.status === ThreeStateStatus.UNKNOWN || result.is_abstention || !result.status) return <section className="abstention" aria-live="polite"><SearchX size={32}/><EvidenceBadge status={ThreeStateStatus.UNKNOWN}/><h2>We couldn’t verify this in Mulika’s current source collection.</h2><p>Mulika avoids generating a traditional medical claim when the available indexed sources do not provide sufficient evidence.</p><div className="button-row"><button onClick={() => document.getElementById('ask-input')?.focus()}>Try another spelling</button><a href="#herbs">Search a herb</a><a href="#ailments">Browse related topics</a><a href="#sources">Explore manuscripts <ArrowRight size={16}/></a></div></section>;
  const matches = result.manuscript_matches || result.topManuscriptMatches || [];
  return <div className="results-layout">
    <section className="result-summary" aria-live="polite"><p className="eyebrow">MULIKA UNDERSTOOD YOUR QUESTION AS</p><p className="understood">{result.query_understood_as}</p><EvidenceBadge status={result.status}/><h2>What the sources record</h2><p className="answer-text">{result.manuscript_summary}</p>{result.status_explanation && <p className="muted">{result.status_explanation}</p>}<details><summary>How to read this evidence</summary><p>{result.verification_disclosure}</p><p>Source verification describes the historical record. It does not establish clinical effectiveness.</p>{result.claims?.map((claim, index) => <div className="claim-record" key={index}><strong>{claim.claim_text}</strong><p>{claim.source_title} · Page {claim.page_or_folio}</p><VerificationBadge status={claim.verification_status}/><p>{claim.translation_en}</p></div>)}</details></section>
    <SafetyAlert text={result.safety_note}/>
    <section><div className="section-heading"><div><p className="eyebrow">FOLLOW THE EVIDENCE</p><h2>Found in the Codex</h2></div><span className="muted">{matches.length} records</span></div><div className="formulation-grid">{matches.map(entry => <article className="formulation-card" key={entry.id}><div className="card-topline"><span>{entry.preparation_type}</span><button className="icon-button" aria-label={`${isRecipeSaved?.(entry.id) ? 'Unsave' : 'Save'} ${entry.herb}`} aria-pressed={!!isRecipeSaved?.(entry.id)} onClick={() => onSaveRecipe?.(entry)}><Bookmark size={19} fill={isRecipeSaved?.(entry.id) ? 'currentColor' : 'none'}/></button></div><h3>{englishHerbName(entry)}</h3><p className="herb-source-name">Source name: {entry.herb}</p><p lang="te" className="telugu">తెలుగు: {entry.telugu}</p><p className="traditional-use">Traditionally described for {entry.ailment}</p><p className="preparation-excerpt">{entry.remedy}</p><p className="source-citation"><BookOpen size={15}/>{entry.source_short} · p. {entry.page}</p><VerificationBadge status={entry.verification_status}/>{entry.safety_rating && <p className="card-safety"><AlertTriangle size={15}/> Source safety label: {entry.safety_rating}</p>}<div className="card-actions"><button className="primary-button" onClick={() => onNavigateToSource?.(entry.source_id, entry.page, entry.id)}>View source <ArrowRight size={16}/></button><button onClick={() => setEvidence(entry)}>View evidence</button></div><ResultActions onChoose={intent => setJourney({entry, intent})}/></article>)}</div></section>
    {result.pathya_guidance && result.pathya_guidance.length > 0 && <details className="reading-panel"><summary>Traditional dietary context · Pathya</summary>{Array.isArray(result.pathya_guidance) ? <ul>{result.pathya_guidance.map(item => <li key={item}>{item}</li>)}</ul> : <p>{result.pathya_guidance}</p>}</details>}
    {result.modern_crossref && <details className="reading-panel"><summary>Modern references · separate from manuscript evidence</summary><p>{result.modern_crossref}</p>{result.modern_sources?.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></p>)}</details>}
    {!!result.user_submitted_matches?.length && <section className="community-panel"><p className="eyebrow">COMMUNITY CONTRIBUTIONS</p><h2>Experience from the community</h2><p>Community contributions are separate from Mulika’s verified manuscript corpus. Upvotes represent interest, not medical validity.</p>{result.user_submitted_matches.map(item => <article key={item.id}><strong>Community contribution · {item.title || item.herb_common}</strong><p>{item.author_name || item.user_name} {item.author_role || item.user_role} · {item.source_tradition}</p><p>{item.recipe || item.preparation_instructions}</p>{(item.precautions || item.notes) && <SafetyAlert text={item.precautions || item.notes}/>}<button onClick={() => onVoteUserRemedy?.(item.id)}><ThumbsUp size={16}/> {item.upvotes} · Interest</button></article>)}</section>}
    {journey && <ResultJourney entry={journey.entry} intent={journey.intent} context={context} onClose={() => setJourney(null)} onSource={() => { onNavigateToSource?.(journey.entry.source_id, journey.entry.page, journey.entry.id); setJourney(null); }}/>}
    {evidence && <ProvenanceDrawer entry={evidence} onClose={() => setEvidence(null)} onSource={() => { onNavigateToSource?.(evidence.source_id, evidence.page, evidence.id); setEvidence(null); }} onCompare={() => { onNavigateToCompare?.(evidence.herb); setEvidence(null); }}/>}
  </div>;
};
