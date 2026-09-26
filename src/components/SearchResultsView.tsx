import React, { useState } from 'react';
import { AyurvedicEntry, SearchResult, ThreeStateStatus } from '../types';
import { BookOpen, Bookmark, ArrowRight, ShieldCheck, Info, SearchX, AlertTriangle, GitCompare, ThumbsUp } from 'lucide-react';
import { ProvenanceDrawer, VerificationBadge } from './ProvenanceDrawer';
export function EvidenceBadge({ status }: { status: ThreeStateStatus }) {
 const label = status === ThreeStateStatus.SUPPORTED ? 'Verified source evidence' : status === ThreeStateStatus.INFERRED ? 'Source-linked interpretation' : 'No verified source evidence found';
 return <span className="evidence-badge" data-status={status}>{status === ThreeStateStatus.SUPPORTED ? <ShieldCheck size={17}/> : <Info size={17}/>} {label}</span>;
}
export function SafetyAlert({ text }: { text?: string }) { return <aside className="safety-alert"><AlertTriangle size={20}/><div><strong>{text ? 'Safety & context' : 'Safety information unavailable'}</strong><p>{text || 'Missing safety information does not confirm absence of risk.'}</p></div></aside>; }
interface SearchResultsViewProps {
  searchResult: SearchResult | null;
  loading: boolean;
  onSelectHerb: (herbName: string) => void;
  onSearch?: (query: string) => void;
  onOpenSubmitModal?: (ailmentName?: string) => void;
  onVoteUserRemedy?: (remedyId: string) => void;
  onNavigateToSource?: (bookId: string, page: number, entryId?: string) => void;
  onNavigateToCompare?: (herbName: string) => void;
  onSaveRecipe?: (entry: AyurvedicEntry) => void;
  isRecipeSaved?: (entryId: string) => boolean;
  onOpenConverter?: () => void;
}


export const SearchResultsView: React.FC<SearchResultsViewProps> = ({ searchResult, loading, onSearch, onNavigateToSource, onNavigateToCompare, onSaveRecipe, isRecipeSaved, onVoteUserRemedy }) => {
 const [evidence, setEvidence] = useState<AyurvedicEntry | null>(null);
 if (loading) return <div className="loading-state" role="status"><BookOpen/><h2>Searching Mulika’s sources…</h2><p>Looking for records in the indexed collection.</p><div className="loading-bar"/></div>;
 if (!searchResult) return null;
 const r = searchResult;
 // Authoritative abstention always wins, even if a malformed response also includes claims.
 if (r.status === ThreeStateStatus.UNKNOWN || r.is_abstention || !r.status) return <section className="abstention" aria-live="polite"><SearchX size={32}/><EvidenceBadge status={ThreeStateStatus.UNKNOWN}/><h2>We couldn’t verify this in Mulika’s current source collection.</h2><p>Mulika avoids generating a traditional medical claim when the available indexed sources do not provide sufficient evidence.</p><div className="button-row"><button onClick={() => document.getElementById('ask-input')?.focus()}>Try another spelling</button><a href="#herbs">Search a herb</a><a href="#ailments">Browse related topics</a><a href="#sources">Explore manuscripts <ArrowRight size={16}/></a></div></section>;
 const matches = r.manuscript_matches || r.topManuscriptMatches || [];
 return <div className="results-layout"><section className="result-summary" aria-live="polite"><p className="eyebrow">MULIKA UNDERSTOOD YOUR QUESTION AS</p><p className="understood">{r.query_understood_as}</p><EvidenceBadge status={r.status}/><h2>What the sources record</h2><p className="answer-text">{r.manuscript_summary}</p>{r.status_explanation && <p className="muted">{r.status_explanation}</p>}<details><summary>How to read this evidence</summary><p>{r.verification_disclosure}</p><p>Source verification describes the historical record. It does not establish clinical effectiveness.</p>{r.claims?.map((c,i) => <div className="claim-record" key={i}><strong>{c.claim_text}</strong><p>{c.source_title} · Page {c.page_or_folio}</p><VerificationBadge status={c.verification_status}/><p>{c.translation_en}</p></div>)}</details></section>
 <SafetyAlert text={r.safety_note}/>
 <section><div className="section-heading"><div><p className="eyebrow">FOLLOW THE EVIDENCE</p><h2>Traditional source formulations</h2></div><span className="muted">{matches.length} records</span></div><div className="formulation-grid">{matches.map(e => <article className="formulation-card" key={e.id}><div className="card-topline"><span>{e.preparation_type}</span><button className="icon-button" aria-label={`${isRecipeSaved?.(e.id) ? 'Unsave' : 'Save'} ${e.herb}`} aria-pressed={!!isRecipeSaved?.(e.id)} onClick={() => onSaveRecipe?.(e)}><Bookmark size={19} fill={isRecipeSaved?.(e.id) ? 'currentColor' : 'none'}/></button></div><h3>{e.herb}</h3><p lang="te" className="telugu">{e.telugu}</p><p className="traditional-use">Traditionally described for {e.ailment}</p><p className="preparation-excerpt">{e.remedy}</p><p className="source-citation"><BookOpen size={15}/>{e.source_short} · p. {e.page}</p><VerificationBadge status={e.verification_status}/>{e.safety_rating && <p className="card-safety"><AlertTriangle size={15}/> Source safety label: {e.safety_rating}</p>}<div className="card-actions"><button className="primary-button" onClick={() => onNavigateToSource?.(e.source_id,e.page,e.id)}>View source <ArrowRight size={16}/></button><button onClick={() => setEvidence(e)}>View evidence</button></div></article>)}</div></section>
 {r.pathya_guidance && r.pathya_guidance.length > 0 && <details className="reading-panel"><summary>Traditional dietary context · Pathya</summary>{Array.isArray(r.pathya_guidance) ? <ul>{r.pathya_guidance.map(x => <li key={x}>{x}</li>)}</ul> : <p>{r.pathya_guidance}</p>}</details>}
 {r.modern_crossref && <details className="reading-panel"><summary>Modern references · separate from manuscript evidence</summary><p>{r.modern_crossref}</p>{r.modern_sources?.map(s => <p key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></p>)}</details>}
 {!!r.user_submitted_matches?.length && <section className="community-panel"><p className="eyebrow">COMMUNITY CONTRIBUTIONS</p><h2>Experience from the community</h2><p>Community contributions are separate from Mulika’s verified manuscript corpus. Upvotes represent interest, not medical validity.</p>{r.user_submitted_matches.map(e => <article key={e.id}><strong>Community contribution · {e.title || e.herb_common}</strong><p>{e.author_name || e.user_name} {e.author_role || e.user_role} · {e.source_tradition}</p><p>{e.recipe || e.preparation_instructions}</p>{(e.precautions || e.notes) && <SafetyAlert text={e.precautions || e.notes}/>}<button onClick={() => onVoteUserRemedy?.(e.id)}><ThumbsUp size={16}/> {e.upvotes} · Interest</button></article>)}</section>}
 {evidence && <ProvenanceDrawer entry={evidence} onClose={() => setEvidence(null)} onSource={() => { onNavigateToSource?.(evidence.source_id,evidence.page,evidence.id); setEvidence(null); }} onCompare={() => { onNavigateToCompare?.(evidence.herb); setEvidence(null); }}/>}</div>;
};
