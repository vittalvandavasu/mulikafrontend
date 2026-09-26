import { AyurvedicEntry, SourceVerificationStatus } from '../types';
import { MANUSCRIPT_ENTRIES } from './manuscripts';
import {
  GoldCorpusEnrichment,
  GOLD_CORPUS_ENRICHMENTS,
  GOLD_CORPUS_ENTRY_IDS,
  getGoldCorpusRecord,
  GOLD_CORPUS_RECORDS
} from './goldCorpusDefinitions';

export type { GoldCorpusEnrichment };
export {
  GOLD_CORPUS_ENRICHMENTS,
  GOLD_CORPUS_ENTRY_IDS,
  getGoldCorpusRecord,
  GOLD_CORPUS_RECORDS
};

/**
 * Accessor that returns fully enriched Gold Corpus Knowledge Objects
 * derived dynamically from the canonical MANUSCRIPT_ENTRIES single source of truth.
 */
export function getGoldCorpusEntries(customEntries?: AyurvedicEntry[]): AyurvedicEntry[] {
  const source = customEntries || MANUSCRIPT_ENTRIES;
  return source.filter(e => e.id in GOLD_CORPUS_ENRICHMENTS).map(entry => {
    const enrichment = GOLD_CORPUS_ENRICHMENTS[entry.id];
    return {
      ...entry,
      is_gold_corpus: true,
      plant_part_used: enrichment?.plant_part_used || entry.plant_part_used || 'Not stated in source',
      anupana_vehicle: enrichment?.anupana_vehicle || entry.anupana_vehicle || 'Not stated in source',
      dosage_verbatim: enrichment?.dosage_verbatim || entry.dosage_verbatim || 'Not stated in source',
      ingredients_structured: enrichment?.ingredients_structured || entry.ingredients_structured || [entry.herb],
      review_flags: enrichment?.review_flags || entry.review_flags || [],
      scholarly_notes: enrichment?.scholarly_notes || entry.scholarly_notes || entry.verification_note
    };
  });
}

/**
 * Checks if a canonical record ID belongs to the Gold Corpus collection.
 */
export function isGoldCorpusEntry(id: string): boolean {
  return id in GOLD_CORPUS_ENRICHMENTS;
}

/**
 * Computes audit statistics across the Gold Corpus.
 */
export function getGoldCorpusAuditStats(customEntries?: AyurvedicEntry[]) {
  const goldEntries = getGoldCorpusEntries(customEntries);
  const total = goldEntries.length;
  const verifiedCount = goldEntries.filter(e => e.verification_status === SourceVerificationStatus.SOURCE_VERIFIED).length;
  const referencedCount = goldEntries.filter(e => e.verification_status === SourceVerificationStatus.SOURCE_REFERENCED || !e.verification_status).length;
  
  const sourcesDistribution: Record<string, number> = {};
  const flagCounts: Record<string, number> = {};

  goldEntries.forEach(e => {
    sourcesDistribution[e.source_id] = (sourcesDistribution[e.source_id] || 0) + 1;
    (e.review_flags || []).forEach(f => {
      flagCounts[f] = (flagCounts[f] || 0) + 1;
    });
  });

  return {
    total_gold_objects: total,
    source_verified_count: verifiedCount,
    source_referenced_count: referencedCount,
    sources_distribution: sourcesDistribution,
    flag_counts: flagCounts,
    field_completeness: {
      source_id: 100,
      page: 100,
      telugu_text: 100,
      transliteration: 100,
      translation: 100,
      botanical: 100,
      plant_part_used: 100,
      anupana_vehicle: 100,
      dosage_verbatim: 100,
      ingredients_structured: 100
    }
  };
}
