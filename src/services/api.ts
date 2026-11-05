import { scoreEntryMatch, searchTerms } from '../lib/searchUnderstanding';
import { SearchResult, ThreeStateStatus } from '../types';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { adaptToProvenanceRecord } from '../lib/provenanceAdapter';
import { validateCitations } from '../lib/citationValidator';

export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export function searchBundledCorpus(query: string, bookFilter: string, categoryFilter: string): SearchResult {
  const terms = searchTerms(query);
  let matches = MANUSCRIPT_ENTRIES.map(entry => ({ entry, score: scoreEntryMatch(entry, terms) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.entry);
  if (bookFilter && bookFilter !== 'ALL') matches = matches.filter(entry => entry.source_id === bookFilter);
  if (categoryFilter && categoryFilter !== 'ALL') matches = matches.filter(entry => entry.category === categoryFilter);
  const citedMatches = matches.slice(0, 8).map(adaptToProvenanceRecord);
  const validation = validateCitations(citedMatches, query);
  if (!validation.isValid) return { query_understood_as: query, status: ThreeStateStatus.UNKNOWN, is_abstention: true, abstention_reason: 'The digitized Mulika corpus currently does not contain verified source evidence for this query.', manuscript_summary: 'No direct folio match found in the digitized Telugu treatises for this query.', modern_crossref: 'Modern pharmacopeial correlations are unavailable without an identified botanical or formulation taxon in the corpus.', safety_note: 'Do not attempt unverified home formulations. Consult a registered Ayurvedic practitioner (BAMS/MD) for clinical assessment.', pathya_guidance: [], topManuscriptMatches: [], manuscript_matches: [], claims: [], verification_disclosure: 'Zero verified primary records identified for this search.' };
  const citations = citedMatches.slice(0, 3).map(entry => `• ${entry.herb} (${entry.telugu}) for ${entry.ailment}: "${entry.remedy}" (Source: ${entry.source_short}, Page ${entry.page})`).join('\n');
  return { query_understood_as: `Source-record search for "${query}"`, status: validation.recommendedStatus, status_detail: validation.statusDetail, status_explanation: validation.recommendedStatus === ThreeStateStatus.SUPPORTED ? 'Directly supported by manually verified primary manuscript folios in the Mulika Codex.' : 'Direct manuscript reference — physical folio verification pending.', verification_disclosure: validation.verificationDisclosure, manuscript_summary: `The indexed Telugu treatises record these page-cited formulations:\n${citations}`, modern_crossref: '', safety_note: 'Historical Ayurvedic formulation for scholarly reference. Does not replace professional clinical diagnosis. Consult a qualified BAMS physician.', pathya_guidance: [], topManuscriptMatches: citedMatches, manuscript_matches: citedMatches, claims: validation.validatedClaims, is_abstention: false, post_validation_passed: true };
}

export async function searchLibrary(query: string, bookFilter: string, categoryFilter: string, signal?: AbortSignal): Promise<SearchResult> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort',abort,{once:true});
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort,12000);
  try {
    return await request<SearchResult>('/api/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, bookFilter, categoryFilter }), signal:controller.signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    return searchBundledCorpus(query, bookFilter, categoryFilter);
  } finally { clearTimeout(timeout); signal?.removeEventListener('abort',abort); }
}
