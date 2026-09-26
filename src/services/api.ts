import { SearchResult, ThreeStateStatus } from '../types';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { adaptToProvenanceRecord } from '../lib/provenanceAdapter';
import { validateCitations } from '../lib/citationValidator';

export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

function scoreEntryMatch(entry: typeof MANUSCRIPT_ENTRIES[number], queryTerms: string[]): number {
  let score = 0;
  const searchableText = `${entry.herb} ${entry.herb_full || ''} ${entry.telugu} ${entry.ailment} ${entry.ailment_telugu || ''} ${entry.remedy} ${entry.botanical || ''} ${entry.category} ${entry.source_title}`.toLowerCase();
  for (const term of queryTerms) {
    if (term.length < 2 || !searchableText.includes(term)) continue;
    score += 5;
    if (entry.herb.toLowerCase().includes(term) || entry.telugu?.includes(term)) score += 10;
    if (entry.ailment.toLowerCase().includes(term) || entry.ailment_telugu?.includes(term)) score += 10;
  }
  const query = queryTerms.join(' ');
  if ((query.includes('pile') || query.includes('hemorrhoid') || query.includes('moola') || query.includes('arshas') || query.includes('fissure') || query.includes('rectal')) && (entry.ailment.toLowerCase().includes('pile') || entry.ailment.toLowerCase().includes('moola') || entry.category === 'Digestive & Piles')) score += 15;
  if ((query.includes('headache') || query.includes('migraine') || query.includes('talanopi') || query.includes('shira') || query.includes('temple') || query.includes('head')) && (entry.ailment.toLowerCase().includes('headache') || entry.ailment.toLowerCase().includes('talanopi') || entry.category === 'Headache & Neuro')) score += 15;
  if ((query.includes('fever') || query.includes('jwara') || query.includes('chills') || query.includes('malaria') || query.includes('temperature') || query.includes('flu')) && (entry.ailment.toLowerCase().includes('fever') || entry.ailment.toLowerCase().includes('jwar') || entry.category === 'Fevers & Immunity')) score += 15;
  if ((query.includes('cold') || query.includes('cough') || query.includes('phlegm') || query.includes('asthma') || query.includes('breath') || query.includes('jalubu') || query.includes('ubhasam')) && (entry.category === 'Respiratory & Cough' || entry.ailment.toLowerCase().includes('cough') || entry.ailment.toLowerCase().includes('cold') || entry.ailment.toLowerCase().includes('asthma'))) score += 15;
  if ((query.includes('joint') || query.includes('knee') || query.includes('arthritis') || query.includes('back') || query.includes('sciatica') || query.includes('keellu')) && (entry.category === 'Joints & Pain' || entry.ailment.toLowerCase().includes('joint') || entry.ailment.toLowerCase().includes('pain'))) score += 15;
  return score;
}

function searchBundledCorpus(query: string, bookFilter: string, categoryFilter: string): SearchResult {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
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
  try {
    return await request<SearchResult>('/api/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, bookFilter, categoryFilter }), signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    return searchBundledCorpus(query, bookFilter, categoryFilter);
  }
}
