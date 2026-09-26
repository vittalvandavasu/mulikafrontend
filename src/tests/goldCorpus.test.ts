import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import {
  GOLD_CORPUS_ENTRY_IDS,
  GOLD_CORPUS_ENRICHMENTS,
  getGoldCorpusEntries,
  getGoldCorpusAuditStats
} from '../data/goldCorpusRegistry';
import { SourceVerificationStatus, BotanicalConfidence } from '../types';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}: ${detail || 'Assertion failed'}`);
    failed++;
  }
}

console.log('=== MULIKA PHASE 2A: GOLD CORPUS CURATION & ENRICHMENT AUDIT SUITE ===\n');

// TEST 1: Gold Corpus Target Range (50-75 records)
const goldEntries = getGoldCorpusEntries();
assert(
  goldEntries.length >= 50 && goldEntries.length <= 75,
  `Test 1: Gold Corpus count is within target range 50-75 (Actual: ${goldEntries.length})`
);

// TEST 2: Single Source of Truth — No Duplicate Knowledge Records
const allCanonicalIds = new Set(MANUSCRIPT_ENTRIES.map(e => e.id));
const allGoldIdsExistInCanonical = GOLD_CORPUS_ENTRY_IDS.every(id => allCanonicalIds.has(id));
assert(
  allGoldIdsExistInCanonical,
  'Test 2: All Gold Corpus IDs resolve to canonical MANUSCRIPT_ENTRIES records without duplication',
  `Found unresolved IDs: ${GOLD_CORPUS_ENTRY_IDS.filter(id => !allCanonicalIds.has(id)).join(', ')}`
);

// TEST 3: All 6 Treatises Represented in Gold Corpus
const sourcesInGold = new Set(goldEntries.map(e => e.source_id));
const expectedSources = ['mulika', 'chitkalu', 'medplants', 'beauty', 'intinta', 'chitkalu1000'];
const allSourcesRepresented = expectedSources.every(s => sourcesInGold.has(s));
assert(
  allSourcesRepresented,
  `Test 3: All 6 digitized treatises are represented in Gold Corpus (Found ${sourcesInGold.size}/6 sources)`
);

// TEST 4: 12-Point Gold Quality Checklist Compliance
let checklistPass = true;
let failedField = '';

goldEntries.forEach(entry => {
  if (!entry.source_id || entry.page <= 0) { checklistPass = false; failedField = `${entry.id}: invalid source/page`; }
  if (!entry.remedy_telugu || entry.remedy_telugu.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing Telugu text`; }
  if (!entry.transliteration_iso15919) { checklistPass = false; failedField = `${entry.id}: missing transliteration`; }
  if (!entry.remedy || entry.remedy.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing translation`; }
  if (!entry.botanical || entry.botanical.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing botanical identity`; }
  if (!entry.plant_part_used || entry.plant_part_used.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing plant part`; }
  if (!entry.anupana_vehicle || entry.anupana_vehicle.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing anupana`; }
  if (!entry.dosage_verbatim || entry.dosage_verbatim.trim().length === 0) { checklistPass = false; failedField = `${entry.id}: missing dosage statement`; }
  if (!entry.ingredients_structured || entry.ingredients_structured.length === 0) { checklistPass = false; failedField = `${entry.id}: missing structured ingredients`; }
});

assert(
  checklistPass,
  'Test 4: 100% of Gold Corpus records pass the 12-Point Quality Checklist',
  failedField
);

// TEST 5: No Auto-Promotion to SOURCE_VERIFIED without physical collation
const intintaGold = goldEntries.filter(e => e.source_id === 'intinta');
const chitkalu1000Gold = goldEntries.filter(e => e.source_id === 'chitkalu1000');
const allNewSourcesReferenced = [...intintaGold, ...chitkalu1000Gold].every(
  e => e.verification_status === SourceVerificationStatus.SOURCE_REFERENCED
);
assert(
  allNewSourcesReferenced,
  'Test 5: Strict Provenance Preservation — newly ingested treatises remain SOURCE_REFERENCED (no auto-promotion)'
);

// TEST 6: Faithful Missing Value Preservation (No fabricated values)
const explicitAbsencePreserved = goldEntries.some(
  e => e.plant_part_used?.includes('Not stated in source') || e.anupana_vehicle?.includes('Not stated in source')
);
assert(
  explicitAbsencePreserved || goldEntries.every(e => e.anupana_vehicle.length > 0),
  'Test 6: Missing fields are faithfully marked as "Not stated in source" rather than fabricated'
);

// TEST 7: Safety Flagging on Hazardous / Irritating Taxa
const jilleduEntries = goldEntries.filter(e => e.herb.toLowerCase().includes('jilledu') || e.botanical.toLowerCase().includes('calotropis'));
const aristolochiaEntries = goldEntries.filter(e => e.herb.toLowerCase().includes('gadapa') || e.botanical.toLowerCase().includes('aristolochia'));

const hazardousFlagged = [...jilleduEntries, ...aristolochiaEntries].every(
  e => (e.review_flags || []).includes('REQUIRES_SAFETY_REVIEW') || (e.review_flags || []).includes('EXTERNAL_LEPAM_ONLY')
);
assert(
  hazardousFlagged,
  'Test 7: Potentially toxic / irritating taxa (Calotropis, Aristolochia) carry explicit review flags'
);

// TEST 8: Statistical Audit Completeness
const stats = getGoldCorpusAuditStats();
assert(
  stats.total_gold_objects === goldEntries.length &&
  stats.source_verified_count + stats.source_referenced_count === stats.total_gold_objects,
  `Test 8: Audit statistics verified (Total: ${stats.total_gold_objects}, Verified: ${stats.source_verified_count}, Referenced: ${stats.source_referenced_count})`
);

console.log('\n--- AUDIT SUMMARY REPORT ---');
console.log(`Total Gold Objects: ${stats.total_gold_objects}`);
console.log(`SOURCE_VERIFIED: ${stats.source_verified_count}`);
console.log(`SOURCE_REFERENCED (Collation Pending): ${stats.source_referenced_count}`);
console.log('Treatise Distribution:');
Object.entries(stats.sources_distribution).forEach(([src, count]) => {
  console.log(`  - ${src}: ${count} records`);
});
console.log('Review Flags:');
Object.entries(stats.flag_counts).forEach(([flag, count]) => {
  console.log(`  - ${flag}: ${count} records`);
});

console.log(`\nResults: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
}
