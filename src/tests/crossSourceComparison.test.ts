import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { BOOKS } from '../components/ManuscriptReader';
import { 
  TraditionalClaimRelationship,
  AyurvedicEntry,
  SourceVerificationStatus,
  BotanicalConfidence 
} from '../types';
import { 
  getCanonicalHerbName,
  compareTwoRecords,
  buildHerbComparisonGroup,
  getAllMultiSourceHerbs,
  extractComparisonDimensions
} from '../lib/crossSourceComparator';
import { getTraditionalClaimRelationshipLabel } from '../lib/provenanceLabels';

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

console.log('=== MULIKA PHASE 2C: CROSS-SOURCE COMPARISON VERIFICATION SUITE ===\n');

function makeEntry(p: Partial<AyurvedicEntry> & { id: string; herb: string; remedy: string }): AyurvedicEntry {
  return {
    herb_full: p.herb_full || p.herb,
    telugu: p.telugu || '',
    botanical: p.botanical || 'Taxon sp.',
    source_id: p.source_id || 'mulika',
    source_title: p.source_title || 'Ayurveda Mulika Prayogavali',
    source_short: p.source_short || 'Mulika',
    source_author: p.source_author || 'Traditional Vaidya',
    page: p.page || 1,
    category: p.category || 'General',
    ailment: p.ailment || 'General Condition',
    ailment_telugu: p.ailment_telugu || '',
    preparation_type: p.preparation_type || 'Classical',
    safety_rating: p.safety_rating || 'Safe for Home Use',
    verification_status: p.verification_status || SourceVerificationStatus.SOURCE_VERIFIED,
    verification_note: 'Test record',
    ...p
  };
}

// -------------------------------------------------------------
// Test 1: Canonical Entity Mapping (Deterministic Vernacular & Taxon Normalization)
// -------------------------------------------------------------
const aliasesToTest = [
  { input: 'తులసి', expected: 'Tulasi' },
  { input: 'Ocimum sanctum', expected: 'Tulasi' },
  { input: 'వేప', expected: 'Vepa' },
  { input: 'Azadirachta indica', expected: 'Vepa' },
  { input: 'Nimba', expected: 'Vepa' },
  { input: 'నేల ఉసిరి', expected: 'Nela Usiri' },
  { input: 'Phyllanthus niruri', expected: 'Nela Usiri' },
  { input: 'Bhumi Amalaki', expected: 'Nela Usiri' },
  { input: 'నల్లేరు', expected: 'Nalleru' },
  { input: 'Cissus quadrangularis', expected: 'Nalleru' },
  { input: 'Asthisamharaka', expected: 'Nalleru' }
];

let mappingSuccess = true;
aliasesToTest.forEach(({ input, expected }) => {
  const result = getCanonicalHerbName(input);
  if (result !== expected) {
    mappingSuccess = false;
    console.error(`Mapping error: ${input} mapped to ${result}, expected ${expected}`);
  }
});

assert(
  mappingSuccess,
  'Test 1: Deterministic mapping of vernacular, Sanskrit, and Latin botanical aliases to canonical herb entities'
);

// -------------------------------------------------------------
// Test 2: SIMILAR_TRADITIONAL_CLAIM & Multi-Source Collation
// -------------------------------------------------------------
const entrySimA: AyurvedicEntry = makeEntry({
  id: 'sim-1',
  herb: 'Tulasi',
  telugu: 'తులసి',
  botanical: 'Ocimum sanctum',
  category: 'Swasa',
  ailment: 'Chronic Cough & Bronchial Cold',
  remedy: 'Administer leaf juice as directed for bronchial relief.',
  source_id: 'mulika',
  source_title: 'Ayurveda Mulika Prayogavali',
  page: 3,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const entrySimB: AyurvedicEntry = makeEntry({
  id: 'sim-2',
  herb: 'Tulasi',
  telugu: 'తులసి',
  botanical: 'Ocimum sanctum',
  category: 'Kasa',
  ailment: 'Persistent Cough and Phlegm',
  remedy: 'Take fresh swarasa twice a day.',
  source_id: 'intinta',
  source_title: 'Intinta Mulika Vaidyam',
  page: 15,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const pairwiseSim = compareTwoRecords(entrySimA, entrySimB);
const tulasiGroup = buildHerbComparisonGroup('Tulasi', MANUSCRIPT_ENTRIES);

assert(
  pairwiseSim.relationship === TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM &&
  tulasiGroup !== null && 
  tulasiGroup.records.length >= 2 &&
  tulasiGroup.treatisesCount >= 2,
  'Test 2: Collation of overlapping traditional respiratory indications identifies SIMILAR_TRADITIONAL_CLAIM and links multiple treatises'
);

// -------------------------------------------------------------
// Test 3: MATCHING_FORMULATION (Identical/overlapping indications, parts, and preparation)
// -------------------------------------------------------------
const entryA: AyurvedicEntry = makeEntry({
  id: 'match-1',
  herb: 'Tulasi',
  telugu: 'తులసి',
  botanical: 'Ocimum sanctum',
  category: 'Swasa',
  ailment: 'Chronic Cough & Bronchial Cold',
  remedy: 'Extract fresh juice of leaves and administer with pure honey twice daily.',
  source_id: 'mulika',
  source_title: 'Ayurveda Mulika Prayogavali',
  page: 3,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const entryB: AyurvedicEntry = makeEntry({
  id: 'match-2',
  herb: 'Tulasi',
  telugu: 'తులసి',
  botanical: 'Ocimum sanctum',
  category: 'Kasa',
  ailment: 'Persistent Cough and Phlegm',
  remedy: 'Fresh leaf swarasa mixed with honey, taken morning and evening.',
  source_id: 'intinta',
  source_title: 'Intinta Mulika Vaidyam',
  page: 15,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const pairwiseMatch = compareTwoRecords(entryA, entryB);
assert(
  pairwiseMatch.relationship === TraditionalClaimRelationship.MATCHING_FORMULATION,
  'Test 3: Collation of identical plant part (leaf), preparation (juice/swarasa), and vehicle (honey) yields MATCHING_FORMULATION'
);

// -------------------------------------------------------------
// Test 4: FORMULATION_VARIATION (Overlapping indication but different plant parts / preparation)
// -------------------------------------------------------------
const entryVarA: AyurvedicEntry = makeEntry({
  id: 'var-1',
  herb: 'Vepa',
  telugu: 'వేప',
  category: 'Kushta',
  ailment: 'Skin Eruptions and Itching',
  remedy: 'Pound fresh leaves into a paste and apply topically over the lesion.',
  source_id: 'mulika',
  source_title: 'Ayurveda Mulika Prayogavali',
  page: 10,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const entryVarB: AyurvedicEntry = makeEntry({
  id: 'var-2',
  herb: 'Vepa',
  telugu: 'వేప',
  category: 'Tvak',
  ailment: 'Chronic Skin Eczema & Itching',
  remedy: 'Boil stem bark in water into a decoction (kashayam) and drink internally with warm water.',
  source_id: 'medplants',
  source_title: 'Aushadha Mokkallo Arogya Rahasyalu',
  page: 45,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const pairwiseVar = compareTwoRecords(entryVarA, entryVarB);
assert(
  pairwiseVar.relationship === TraditionalClaimRelationship.FORMULATION_VARIATION &&
  pairwiseVar.reason.includes('distinct formulation dimensions'),
  'Test 4: Collation of same indication with differing plant parts (leaf vs bark) and vehicles yields FORMULATION_VARIATION'
);

// -------------------------------------------------------------
// Test 5: UNIQUE_SOURCE_CLAIM (Claim appearing only in a single indexed source)
// -------------------------------------------------------------
const entryUniqueA: AyurvedicEntry = makeEntry({
  id: 'uniq-1',
  herb: 'Nalleru',
  telugu: 'నల్లేరు',
  category: 'Bhagna',
  ailment: 'Bone Fractures & Sprains',
  remedy: 'Fresh stem crushed with sesame oil applied over bone dislocation.',
  source_id: 'mulika',
  source_title: 'Ayurveda Mulika Prayogavali',
  page: 8,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const entryUniqueB: AyurvedicEntry = makeEntry({
  id: 'uniq-2',
  herb: 'Nalleru',
  telugu: 'నల్లేరు',
  category: 'Arshas',
  ailment: 'Chronic Bleeding Hemorrhoids / Piles',
  remedy: 'Tender stem fried in cow ghee taken with food for piles.',
  source_id: 'chitkalu',
  source_title: 'Vaidya Rahasya Chitkalu',
  page: 12,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const pairwiseUnique = compareTwoRecords(entryUniqueA, entryUniqueB);
assert(
  pairwiseUnique.relationship === TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM &&
  pairwiseUnique.reason.includes('only in this source'),
  'Test 5: Collation of non-overlapping traditional indications yields UNIQUE_SOURCE_CLAIM with attribution to respective treatise'
);

// -------------------------------------------------------------
// Test 6: CONFLICTING_SOURCE_CLAIM (Internal ingestion vs strict external lepam)
// -------------------------------------------------------------
const entryConflictInternal: AyurvedicEntry = makeEntry({
  id: 'conf-1',
  herb: 'Jilledu',
  telugu: 'జిల్లేడు',
  category: 'Vata',
  ailment: 'Severe Joint Pain and Arthritis',
  remedy: 'Drink 2 drops of leaf juice internally with warm milk.',
  source_id: 'chitkalu',
  source_title: 'Vaidya Rahasya Chitkalu',
  page: 20,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const entryConflictExternal: AyurvedicEntry = makeEntry({
  id: 'conf-2',
  herb: 'Jilledu',
  telugu: 'జిల్లేడు',
  category: 'Sandhivata',
  ailment: 'Arthritic Joint Swelling',
  remedy: 'Strictly external application (lepam) only. Do not ingest internally due to potent latex toxicity.',
  source_id: 'medplants',
  source_title: 'Aushadha Mokkallo Arogya Rahasyalu',
  page: 56,
  verification_status: SourceVerificationStatus.SOURCE_VERIFIED
});

const pairwiseConflict = compareTwoRecords(entryConflictInternal, entryConflictExternal);
assert(
  pairwiseConflict.relationship === TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM &&
  pairwiseConflict.reason.toLowerCase().includes('contradiction'),
  'Test 6: Collation flags CONFLICTING_SOURCE_CLAIM when one source prescribes internal ingestion while another specifies strict external lepam only'
);

// -------------------------------------------------------------
// Test 7: INSUFFICIENT_INFORMATION (Ambiguous, corrupted, or incomplete source text)
// -------------------------------------------------------------
const entryIncompleteA: AyurvedicEntry = makeEntry({
  id: 'inc-1',
  herb: 'Unknown Plant',
  telugu: '',
  category: 'General',
  ailment: '',
  remedy: 'Leaf text unreadable in damaged folio scan...',
  source_id: 'mulika',
  source_title: 'Ayurveda Mulika Prayogavali',
  page: 99,
  verification_status: SourceVerificationStatus.SOURCE_REFERENCED
});

const entryIncompleteB: AyurvedicEntry = makeEntry({
  id: 'inc-2',
  herb: 'Unknown Plant',
  telugu: '',
  category: 'General',
  ailment: 'Fever',
  remedy: 'Take as directed.',
  source_id: 'chitkalu',
  source_title: 'Vaidya Rahasya Chitkalu',
  page: 1,
  verification_status: SourceVerificationStatus.SOURCE_REFERENCED
});

const pairwiseIncomplete = compareTwoRecords(entryIncompleteA, entryIncompleteB);
assert(
  pairwiseIncomplete.relationship === TraditionalClaimRelationship.INSUFFICIENT_INFORMATION &&
  pairwiseIncomplete.reason.includes('sufficient structured detail'),
  'Test 7: Ambiguous or damaged textual passages fail safely into INSUFFICIENT_INFORMATION rather than manufacturing conclusions'
);

// -------------------------------------------------------------
// Test 8: Botanical Homonym Ambiguity (Brahmi: Bacopa monnieri vs Centella asiatica)
// -------------------------------------------------------------
const brahmiMockEntries: AyurvedicEntry[] = [
  makeEntry({
    id: 'brahmi-1',
    herb: 'Brahmi',
    herb_full: 'Brahmi (Jalanimba)',
    telugu: 'బ్రహ్మి',
    botanical: 'Bacopa monnieri',
    botanical_confidence: BotanicalConfidence.VERIFIED,
    category: 'Medhya',
    ailment: 'Memory & Cognitive Fatigue',
    remedy: 'Fresh leaf swarasa with ghee.',
    source_id: 'mulika',
    source_title: 'Ayurveda Mulika Prayogavali',
    page: 40,
    verification_status: SourceVerificationStatus.SOURCE_VERIFIED
  }),
  makeEntry({
    id: 'brahmi-2',
    herb: 'Brahmi',
    herb_full: 'Brahmi (Mandukaparni)',
    telugu: 'బ్రహ్మి',
    botanical: 'Centella asiatica',
    botanical_confidence: BotanicalConfidence.UNCERTAIN,
    category: 'Medhya',
    ailment: 'Mental Agitation & Insomnia',
    remedy: 'Boil leaves in milk at night.',
    source_id: 'intinta',
    source_title: 'Intinta Mulika Vaidyam',
    page: 60,
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED
  })
];

const brahmiGroup = buildHerbComparisonGroup('Brahmi', brahmiMockEntries);
assert(
  brahmiGroup !== null &&
  brahmiGroup.isBotanicallyAmbiguous === true &&
  brahmiGroup.botanicalIdentities.length === 2 &&
  brahmiGroup.botanicalIdentities.some(b => b.latin.includes('Bacopa')) &&
  brahmiGroup.botanicalIdentities.some(b => b.latin.includes('Centella')) &&
  brahmiGroup.botanicalAmbiguityNote !== undefined &&
  brahmiGroup.botanicalAmbiguityNote.includes('distinct botanical taxa'),
  'Test 8: Botanical homonym disambiguation flags dual taxa (Bacopa monnieri & Centella asiatica) without conflating species'
);

// -------------------------------------------------------------
// Test 9: Deep-Link Citation Integrity Across All Comparison Records
// -------------------------------------------------------------
const multiHerbs = getAllMultiSourceHerbs(MANUSCRIPT_ENTRIES);
let deepLinksValid = true;
let totalCheckedRecords = 0;

multiHerbs.forEach(group => {
  group.records.forEach(rec => {
    totalCheckedRecords++;
    const book = BOOKS.find(b => b.id === rec.sourceId);
    if (!book) {
      deepLinksValid = false;
      console.error(`Invalid sourceId ${rec.sourceId} in comparison record ${rec.entryId}`);
    }
    if (typeof rec.page !== 'number' || rec.page <= 0) {
      deepLinksValid = false;
      console.error(`Invalid page ${rec.page} in comparison record ${rec.entryId}`);
    }
  });
});

assert(
  deepLinksValid && totalCheckedRecords > 0,
  `Test 9: Deep-link citation integrity confirmed across ${totalCheckedRecords} comparison records: valid source treatises and folio page numbers`
);

// -------------------------------------------------------------
// Test 10: Non-Consensus Language & Corpus Scope Mandate
// -------------------------------------------------------------
let nonConsensusClean = true;
const forbiddenPhrases = [
  'consensus',
  'proven effective',
  'medically verified',
  'clinically proven',
  'curative proof',
  'scientific agreement'
];

multiHerbs.forEach(group => {
  const summaryLower = group.relationshipSummary.toLowerCase();
  forbiddenPhrases.forEach(badPhrase => {
    if (summaryLower.includes(badPhrase)) {
      nonConsensusClean = false;
      console.error(`Forbidden phrase "${badPhrase}" found in summary: ${group.relationshipSummary}`);
    }
  });
  if (!summaryLower.includes('indexed') && !summaryLower.includes('treatise') && !summaryLower.includes('source')) {
    nonConsensusClean = false;
    console.error(`Summary lacks corpus-grounding scope words: ${group.relationshipSummary}`);
  }
});

assert(
  nonConsensusClean,
  'Test 10: Deterministic comparison summaries strictly avoid modern medical consensus claims and maintain corpus-bounded language'
);

// -------------------------------------------------------------
// Test 11: Researcher-Friendly Provenance Label Formatting
// -------------------------------------------------------------
const allRelationships = [
  TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM,
  TraditionalClaimRelationship.MATCHING_FORMULATION,
  TraditionalClaimRelationship.FORMULATION_VARIATION,
  TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM,
  TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM,
  TraditionalClaimRelationship.INSUFFICIENT_INFORMATION
];

let labelsComplete = true;
allRelationships.forEach(rel => {
  const labelMeta = getTraditionalClaimRelationshipLabel(rel);
  if (!labelMeta.label || !labelMeta.badgeClass || !labelMeta.description) {
    labelsComplete = false;
  }
});

assert(
  labelsComplete,
  'Test 11: Researcher-friendly UI display labels and badges exist for all 6 Phase 2C relationship categories'
);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log(`\nPhase 2C Test Results: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
}
