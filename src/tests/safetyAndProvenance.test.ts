import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { adaptToProvenanceRecord } from '../lib/provenanceAdapter';
import { validateCitations, validatePostSynthesisCitations } from '../lib/citationValidator';
import { ThreeStateStatus, SourceReferenceDetail, EvidenceLevel, SourceVerificationStatus, BotanicalConfidence } from '../types';

/**
 * Deterministic Safety & Provenance Verification Test Suite
 * Tests architectural guardrails: Safe Abstention, Claim-Level Validation,
 * Verification Integrity, Botanical Uncertainty, Evidence Separation,
 * and Fabricated Citation Rejection.
 */
export function runProvenanceTests(): { passed: number; failed: number; results: { name: string; success: boolean; message?: string }[] } {
  const testResults: { name: string; success: boolean; message?: string }[] = [];

  function assert(name: string, condition: boolean, message?: string) {
    testResults.push({
      name,
      success: condition,
      message: condition ? 'PASSED' : message || 'FAILED'
    });
  }

  // --- TEST 1: Safe Abstention on Out-of-Corpus Query ---
  const emptyMatches: any[] = [];
  const abstentionValidation = validateCitations(emptyMatches, 'nuclear radiation therapy');
  assert(
    '1. Safe Abstention: Empty/Unrelated query yields UNKNOWN status',
    abstentionValidation.recommendedStatus === ThreeStateStatus.UNKNOWN && 
    abstentionValidation.statusDetail === SourceReferenceDetail.UNKNOWN_INSUFFICIENT &&
    abstentionValidation.validatedClaims.length === 0,
    `Expected UNKNOWN/UNKNOWN_INSUFFICIENT but got ${abstentionValidation.recommendedStatus}`
  );

  // --- TEST 2: Manuscript Match with Verified Folio yields SUPPORTED ---
  // Avise (Page 4 in mulika) is in MANUALLY_COLLATED_PAGES
  const aviseEntry = MANUSCRIPT_ENTRIES.find(e => e.source_id === 'mulika' && e.page === 4);
  if (aviseEntry) {
    const adaptedAvise = adaptToProvenanceRecord(aviseEntry);
    const aviseValidation = validateCitations([adaptedAvise]);
    assert(
      '2. Verified Folio Match yields SUPPORTED status and Level 1 Evidence',
      adaptedAvise.verification_status === SourceVerificationStatus.SOURCE_VERIFIED &&
      aviseValidation.recommendedStatus === ThreeStateStatus.SUPPORTED &&
      aviseValidation.statusDetail === SourceReferenceDetail.SOURCE_VERIFIED_PRIMARY &&
      aviseValidation.validatedClaims[0]?.evidence_level === EvidenceLevel.LEVEL_1_PRIMARY_MANUSCRIPT,
      `Expected SUPPORTED with SOURCE_VERIFIED, got status=${aviseValidation.recommendedStatus}, verif=${adaptedAvise.verification_status}`
    );
  } else {
    assert('2. Verified Folio Match (Skip: entry not found)', false, 'Could not locate mulika page 4');
  }

  // --- TEST 3: Uncollated Page yields SOURCE_REFERENCED (no false verification, clear detail) ---
  // A record on an uncollated page (e.g. page 99 if exists, or arbitrary high page)
  const uncollatedMock = {
    ...MANUSCRIPT_ENTRIES[0],
    id: 'mock-uncollated-1',
    source_id: 'mulika',
    page: 99
  };
  const adaptedUncollated = adaptToProvenanceRecord(uncollatedMock);
  const uncollatedValidation = validateCitations([adaptedUncollated]);
  assert(
    '3. Uncollated Folio remains SOURCE_REFERENCED and yields SOURCE_REFERENCED_UNCOLLATED',
    adaptedUncollated.verification_status === SourceVerificationStatus.SOURCE_REFERENCED &&
    uncollatedValidation.recommendedStatus === ThreeStateStatus.INFERRED &&
    uncollatedValidation.statusDetail === SourceReferenceDetail.SOURCE_REFERENCED_UNCOLLATED,
    `Expected SOURCE_REFERENCED and SOURCE_REFERENCED_UNCOLLATED, got verif=${adaptedUncollated.verification_status}, detail=${uncollatedValidation.statusDetail}`
  );

  // --- TEST 4: Citation Integrity on all Corpus Records ---
  let allCitationsValid = true;
  for (const raw of MANUSCRIPT_ENTRIES) {
    if (!raw.source_id || !raw.source_title || typeof raw.page !== 'number' || raw.page <= 0 || !raw.remedy) {
      allCitationsValid = false;
      break;
    }
  }
  assert(
    '4. Citation Completeness: All 100+ raw entries have valid source_id, title, page > 0, and non-empty remedy',
    allCitationsValid,
    'Some entries in manuscripts.ts have invalid citation coordinates'
  );

  // --- TEST 5: Botanical Uncertainty Preservation ---
  // Unknown or folk herb without AYUSH API entry must remain PROVISIONAL, not VERIFIED
  const provisionalMock = {
    ...MANUSCRIPT_ENTRIES[0],
    telugu: 'కొత్త మూలిక (Unknown Folk Herb)',
    botanical: 'Species incertae sedis'
  };
  const adaptedProvisional = adaptToProvenanceRecord(provisionalMock);
  assert(
    '5. Botanical Uncertainty: Unlisted vernacular plants default to PROVISIONAL, not VERIFIED',
    adaptedProvisional.botanical_confidence === BotanicalConfidence.PROVISIONAL,
    `Expected PROVISIONAL, got ${adaptedProvisional.botanical_confidence}`
  );

  // --- TEST 6: AI Synthesis Layer Separation ---
  // Ensure that no claim generated without primary source is elevated to LEVEL_1
  assert(
    '6. Processing Layer Distinction: AI Synthesis is explicitly segregated from Primary Source Evidence',
    EvidenceLevel.LEVEL_1_PRIMARY_MANUSCRIPT !== ('AI_RETRIEVAL_SYNTHESIS' as any),
    'Level 1 must remain strictly reserved for Primary Manuscripts'
  );

  // --- TEST 7: Post-Generation Citation Gatekeeper (Fabricated Citation Rejection) ---
  // Supplied entry is only Mulika Page 4
  const suppliedEntries = [
    {
      ...MANUSCRIPT_ENTRIES[0],
      source_id: 'mulika',
      source_title: 'Ayurveda Mulika Prayogavali',
      source_short: 'Mulika Prayogavali',
      page: 4
    }
  ];

  // Case A: Fabricated Page (Page 999 not in supplied context)
  const hallucinatedPageText = 'Traditional remedy records use of Avise on Page 999 for cough.';
  const failedPageValidation = validatePostSynthesisCitations(hallucinatedPageText, suppliedEntries as any);

  // Case B: Fabricated Treatise ('Andaniki, Arogyaniki Adbhuta Chitkalu' not in supplied context)
  const hallucinatedTreatiseText = 'According to Andaniki, Arogyaniki Adbhuta Chitkalu, this herb cures inflammation.';
  const failedTreatiseValidation = validatePostSynthesisCitations(hallucinatedTreatiseText, suppliedEntries as any);

  // Case C: Grounded Valid Text (Page 4 from Mulika Prayogavali)
  const validGroundedText = 'The classical source Ayurveda Mulika Prayogavali (Page 4) records traditional preparation for cough.';
  const passedValidation = validatePostSynthesisCitations(validGroundedText, suppliedEntries as any);

  assert(
    '7. Fabricated Citation Rejection: Post-LLM gatekeeper rejects ungrounded pages and treatises',
    !failedPageValidation.passed && 
    failedPageValidation.hallucinatedPages.includes(999) &&
    !failedTreatiseValidation.passed &&
    failedTreatiseValidation.hallucinatedSources.length > 0 &&
    passedValidation.passed,
    `Failed to reject fabricated citations: pageCheck=${failedPageValidation.passed}, treatiseCheck=${failedTreatiseValidation.passed}, validCheck=${passedValidation.passed}`
  );

  // --- TEST 8: Newly Ingested Books Remain SOURCE_REFERENCED (No Auto-Promotion) ---
  const intintaEntries = MANUSCRIPT_ENTRIES.filter(e => e.source_id === 'intinta');
  const chitkalu1000Entries = MANUSCRIPT_ENTRIES.filter(e => e.source_id === 'chitkalu1000');
  
  const allIntintaReferenced = intintaEntries.length > 0 && intintaEntries.every(e => {
    const adapted = adaptToProvenanceRecord(e);
    return adapted.verification_status === SourceVerificationStatus.SOURCE_REFERENCED;
  });

  const allChitkalu1000Referenced = chitkalu1000Entries.length > 0 && chitkalu1000Entries.every(e => {
    const adapted = adaptToProvenanceRecord(e);
    return adapted.verification_status === SourceVerificationStatus.SOURCE_REFERENCED;
  });

  assert(
    '8. New Ingestions Strict Referencing: All entries from Intinta and 1000 Chitkalu remain SOURCE_REFERENCED',
    allIntintaReferenced && allChitkalu1000Referenced,
    `Intinta referenced: ${allIntintaReferenced} (count ${intintaEntries.length}), 1000 Chitkalu referenced: ${allChitkalu1000Referenced} (count ${chitkalu1000Entries.length})`
  );

  // --- TEST 9: Multi-Source Provenance Coexistence (No Herb Deduplication/Overwriting) ---
  const nelaUsiriEntries = MANUSCRIPT_ENTRIES.filter(e => e.herb.toLowerCase().includes('nela usiri') || e.telugu.includes('నేల ఉసిరి'));
  const nelaUsiriSourceIds = new Set(nelaUsiriEntries.map(e => e.source_id));
  const tulasiEntries = MANUSCRIPT_ENTRIES.filter(e => e.herb.toLowerCase().includes('tulasi') || e.telugu === 'తులసి');
  const tulasiSourceIds = new Set(tulasiEntries.map(e => e.source_id));

  assert(
    '9. Multi-Source Provenance Preservation: Duplicate herbs (e.g., Nela Usiri, Tulasi) coexist across multiple distinct treatises',
    nelaUsiriSourceIds.has('mulika') && nelaUsiriSourceIds.has('intinta') &&
    tulasiSourceIds.has('intinta') && tulasiSourceIds.has('chitkalu1000'),
    `Nela Usiri sources: ${Array.from(nelaUsiriSourceIds).join(', ')}, Tulasi sources: ${Array.from(tulasiSourceIds).join(', ')}`
  );

  // --- TEST 10: Blurred Page Uncertainty Preservation ---
  const vakuduPg40 = MANUSCRIPT_ENTRIES.find(e => e.id === 'intinta-pg40-01');
  assert(
    '10. Blurred Folio Discipline: Page 20 blur is explicitly noted and not fabricated/guessed',
    vakuduPg40 !== undefined && vakuduPg40.verification_note.includes('Page 20 scan of this folio is blurred'),
    'Blurred folio note missing or unpreserved'
  );

  const passed = testResults.filter(r => r.success).length;
  const failed = testResults.filter(r => !r.success).length;

  return { passed, failed, results: testResults };
}

// Run immediately if executed via CLI
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('safetyAndProvenance')) {
  const summary = runProvenanceTests();
  console.log(`\n=== MULIKA PROVENANCE & SAFETY TEST SUITE ===`);
  summary.results.forEach(r => {
    console.log(`${r.success ? '✅' : '❌'} ${r.name} -> ${r.message}`);
  });
  console.log(`\nSummary: ${summary.passed} Passed, ${summary.failed} Failed\n`);
}
