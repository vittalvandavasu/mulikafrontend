// --- MULIKA TRUST & PROVENANCE DATA ARCHITECTURE (PHASE 1) ---

// 1. SOURCE EVIDENCE LEVELS (Levels 1 to 4 represent the Nature of the Source)
export enum EvidenceLevel {
  LEVEL_1_PRIMARY_MANUSCRIPT = 'LEVEL_1_PRIMARY_MANUSCRIPT',     // Directly attested in manuscript folio
  LEVEL_2_CLASSICAL_CROSS_REF = 'LEVEL_2_CLASSICAL_CROSS_REF',   // Attested in classical treatise (Charaka, Sushruta, Ashtanga Hridaya, etc.)
  LEVEL_3_INSTITUTIONAL = 'LEVEL_3_INSTITUTIONAL',               // AYUSH Ayurvedic Pharmacopoeia (API), TKDL, CCRAS
  LEVEL_4_MODERN_SCIENTIFIC = 'LEVEL_4_MODERN_SCIENTIFIC'        // Peer-reviewed scientific/phytochemical literature
}

// 2. PROCESSING / SYNTHESIS LAYER (Explicitly NOT Source Evidence)
export enum ProcessingLayer {
  AI_RETRIEVAL_SYNTHESIS = 'AI_RETRIEVAL_SYNTHESIS',             // Algorithmic synthesis / structural extraction
  HUMAN_SCHOLARLY_NOTE = 'HUMAN_SCHOLARLY_NOTE'                  // Expert editorial annotation / Vaidya commentary
}

// 3. SOURCE VERIFICATION STATUS
export enum SourceVerificationStatus {
  SOURCE_VERIFIED = 'SOURCE_VERIFIED',     // Manually checked and corroborated against high-res physical folio scan
  SOURCE_REFERENCED = 'SOURCE_REFERENCED', // Cataloged with book/page citations, pending full editorial collation
  PROVISIONAL = 'PROVISIONAL',             // Raw extraction, OCR pending verification
  UNVERIFIED = 'UNVERIFIED'                // Unreviewed community or unverified transcription
}

// 3.1 PROVENANCE & REFERENCE DETAIL (Secondary status to clarify SOURCE_REFERENCED vs INFERRED)
export enum SourceReferenceDetail {
  SOURCE_VERIFIED_PRIMARY = 'SOURCE_VERIFIED_PRIMARY',                     // Direct verified primary source collation
  SOURCE_REFERENCED_UNCOLLATED = 'SOURCE_REFERENCED_UNCOLLATED',           // Direct manuscript reference — physical folio verification pending
  CORPUS_INFERRED_SYNTHESIS = 'CORPUS_INFERRED_SYNTHESIS',                 // Proposition derived/synthesized from retrieved evidence
  UNKNOWN_INSUFFICIENT = 'UNKNOWN_INSUFFICIENT'                            // Corpus evidence insufficient (abstain)
}

// 4. THREE-STATE AI RESPONSE CLASSIFICATION
export enum ThreeStateStatus {
  SUPPORTED = 'SUPPORTED', // Direct claim-level evidence present in SOURCE_VERIFIED cited source
  INFERRED = 'INFERRED',   // Proposition synthesized strictly from cited corpus records or SOURCE_REFERENCED material
  UNKNOWN = 'UNKNOWN'      // Corpus evidence is insufficient; system abstains safely
}

// 5. BOTANICAL CONFIDENCE MATRIX
export enum BotanicalConfidence {
  VERIFIED = 'VERIFIED',               // Verified against standard botanical flora and AYUSH API
  HIGH_CONFIDENCE = 'HIGH_CONFIDENCE', // Strong classical synonymy and regional consensus
  PROVISIONAL = 'PROVISIONAL',         // Proposed Latin binomial based on vernacular name matching
  UNCERTAIN = 'UNCERTAIN',             // Multiple distinct species known by the same regional name
  UNRESOLVED = 'UNRESOLVED'           // Regional/folk vernacular term not botanically identified
}

// 6. CLAIM-LEVEL EVIDENCE RECORD
export interface ClaimEvidenceRecord {
  claim_text: string;
  claim_type: 'HISTORICAL_TRADITIONAL_USE' | 'PREPARATION_METHOD' | 'DOSAGE_STATEMENT' | 'CONTRAINDICATION_ALERT';
  evidence_level: EvidenceLevel;
  source_id: string;
  source_title: string;
  page_or_folio: number | string;
  verbatim_excerpt_telugu: string;
  transliteration_iso15919?: string;
  translation_en: string;
  verification_status: SourceVerificationStatus;
}

// 7. GRANULAR PROVENANCE RECORD
export interface ProvenanceRecord {
  source_id: string;
  source_title: string;
  source_author?: string;
  page_or_folio: number | string;
  original_telugu_text: string;
  transliteration_iso15919?: string;
  transliteration_iast?: string; // Used specifically for Sanskrit technical terms
  verbatim_translation_en: string;
  botanical_identity?: {
    latin_binomial: string;
    authority?: string;
    confidence: BotanicalConfidence;
    vernacular_term: string;
    notes?: string;
  };
  evidence_level: EvidenceLevel;
  verification_status: SourceVerificationStatus;
  review_trail?: {
    stage: 'OCR' | 'TRANSLITERATION' | 'TRANSLATION' | 'BOTANICAL_MAPPING' | 'CLINICAL_REVIEW';
    status: 'PENDING' | 'VERIFIED' | 'FLAGGED';
    reviewer_role?: string;
    timestamp?: string;
    notes?: string;
  }[];
}

// 8. TRADITIONAL SOURCE-TEXT RELATIONSHIP (Explicitly NOT Medical Consensus)
export enum TraditionalClaimRelationship {
  SIMILAR_TRADITIONAL_CLAIM = 'SIMILAR_TRADITIONAL_CLAIM',       // Multiple sources describe identical traditional indication
  MATCHING_FORMULATION = 'MATCHING_FORMULATION',                 // Sources share identical botanical parts and adjuvants
  FORMULATION_VARIATION = 'FORMULATION_VARIATION',               // Same core herb, differing anupana/vehicle or preparation
  UNIQUE_SOURCE_CLAIM = 'UNIQUE_SOURCE_CLAIM',                   // Unique to a single historical treatise
  CONFLICTING_SOURCE_CLAIM = 'CONFLICTING_SOURCE_CLAIM',         // Divergent traditional indications or methods
  INSUFFICIENT_INFORMATION = 'INSUFFICIENT_INFORMATION'          // Textual records insufficient for comparative alignment
}

// --- LEGACY EXTENSIONS (STRICTLY BACKWARD-COMPATIBLE) ---

export interface AyurvedicEntry {
  // Legacy Core Fields
  id: string;
  herb: string;
  herb_full: string;
  telugu: string;
  botanical: string;
  source_id: string;
  source_short: string;
  source_title: string;
  source_author: string;
  page: number;
  ailment: string;
  ailment_telugu: string;
  remedy: string;
  remedy_telugu?: string;
  verification_note: string;
  category: string;
  preparation_type: string;
  safety_rating: 'Safe for Home Use' | 'Moderate / Caution' | 'Use Under Vaidya Guidance' | 'External Use Only' | 'Safe Food/Herb' | 'Use Measured Dose' | 'Specialist/Rasashastra Caution' | string;

  // Phase 1 Provenance & Verification Extensions
  evidence_level?: EvidenceLevel;
  verification_status?: SourceVerificationStatus;
  botanical_confidence?: BotanicalConfidence;
  transliteration_iso15919?: string;
  transliteration_iast?: string;
  provenance?: ProvenanceRecord;

  // Phase 2A Gold Corpus Enrichment Fields
  is_gold_corpus?: boolean;
  plant_part_used?: string;             // e.g. 'Patra (Leaves)', 'Mula (Root)', 'Twak (Bark)', 'Not stated in source'
  anupana_vehicle?: string;             // e.g. 'Honey (Madhu)', 'Cow Milk (Godugdha)', 'Takra (Buttermilk)', 'Not stated in source'
  dosage_verbatim?: string;             // Explicit textual dosage or 'Not stated in source'
  ingredients_structured?: string[];    // Structured ingredient breakdown parsed faithfully from text
  review_flags?: string[];              // e.g. ['REQUIRES_SAFETY_REVIEW', 'BLURRED_FOLIO_PARTIAL']
  scholarly_notes?: string;             // Editorial and philological notes
}

export interface HerbMonograph {
  id: string;
  name: string;
  telugu: string;
  botanical: string;
  sanskrit: string;
  family: string;
  common_names: string[];
  description?: string;
  rasa: string[] | string;
  virya: string;
  vipaka: string;
  dosha_effect: string;
  parts_used: string[] | string;
  traditional_uses: string[];
  associated_ailments?: string[];
  modern_evidence: string;
  contraindications: string[];
  remedy_count: number;
  
  // Phase 1 Additions
  botanical_confidence?: BotanicalConfidence;
  evidence_level?: EvidenceLevel;
  botanical_authority?: string;
  ingredient_category?: 'Botanical (Audbhida)' | 'Animal & Organic (Jangama)' | 'Minerals & Salts (Parthiva)' | 'Vehicles & Solvents (Anupana)' | string;
  chemical_formula?: string;
  shodhana_protocol?: string;
}

export interface CodexNavigationTarget {
  bookId: string;
  page: number;
  entryId?: string;
  returnTab?: string;
  initialViewMode?: 'grid' | 'folio' | 'compare';
  initialCompareHerb?: string;
}

export interface AilmentInfo {
  id: string;
  name: string;
  telugu_name: string;
  category: string;
  description?: string;
  classical_term: string;
  dosha_involvement: string;
  pathya_apathya: {
    pathya?: string[];
    apathya?: string[];
    recommended?: string[];
    avoid?: string[];
  };
  red_flags: string[];
  indexed_remedies_count: number;
}

export interface UserSubmittedRemedy {
  id: string;
  author_name?: string;
  user_name?: string;
  author_role?: string;
  user_role?: string;
  ailment_id?: string;
  ailment_name?: string;
  ailment?: string;
  herb_names?: string[];
  herb_telugu?: string;
  herb_common?: string;
  title?: string;
  recipe?: string;
  ingredients?: string[];
  preparation_instructions?: string;
  dosage_usage?: string;
  source_tradition: string;
  precautions?: string;
  timestamp: string | number;
  upvotes: number;
  verified?: boolean;
  verification_status: 'unverified' | 'under_review' | 'community_verified' | 'user-submitted' | string;
  notes?: string;
}

export interface ReaderNote {
  id: string;
  manuscript_id?: string;
  page?: number;
  author_name?: string;
  author?: string;
  author_credential?: string;
  note_type?: 'botanical_correction' | 'preparation_insight' | 'clinical_observation' | 'transcription_query' | string;
  content?: string;
  message?: string;
  tags?: string[];
  book_reference?: string;
  timestamp: string | number;
  upvotes: number;
  herb?: string;
  ailment?: string;
}

export interface GlossaryTerm {
  telugu?: string;
  term_telugu?: string;
  term_sanskrit?: string;
  transliteration: string;
  english_medical?: string;
  meaning_en?: string;
  description?: string;
  category: string;
  classical_definition?: string;
}

export interface MeasurementUnit {
  unit_name?: string;
  telugu_name: string;
  transliteration?: string;
  category?: string;
  metric_equivalent: string;
  classical_context?: string;
  explanation?: string;
}

export interface AntidoteEntry {
  substance?: string;
  telugu_substance?: string;
  substance_telugu?: string;
  substance_common?: string;
  botanical_or_mineral?: string;
  toxic_effects?: string;
  antidote?: string;
  telugu_antidote?: string;
  classical_antidote?: string;
  antidote_preparation?: string;
  notes?: string;
  source?: string;
}

export interface ShodhanamEntry {
  item?: string;
  telugu_item?: string;
  substance?: string;
  substance_telugu?: string;
  type?: string;
  purification_media?: string;
  process_description?: string;
  classical_reference?: string;
  method?: string;
  purpose?: string;
}

// Upgraded Phase 1 Search Contract
export interface SearchResult {
  query_understood_as: string;
  status: ThreeStateStatus; // 'SUPPORTED' | 'INFERRED' | 'UNKNOWN'
  status_detail?: SourceReferenceDetail;
  manuscript_summary: string;
  modern_crossref: string;
  safety_note: string;
  pathya_guidance?: string[] | string;
  topManuscriptMatches?: AyurvedicEntry[];
  manuscript_matches?: AyurvedicEntry[];
  user_submitted_matches?: any[];
  no_manuscript_match?: boolean;
  
  // Phase 1 Enhanced Fields
  status_explanation?: string;
  claims?: ClaimEvidenceRecord[];
  is_abstention?: boolean;
  abstention_reason?: string;
  verification_disclosure?: string;
  post_validation_passed?: boolean;
  modern_sources?: Array<{
    title: string;
    journal?: string;
    year?: number;
    url: string;
  }>;
}

// --- PHASE 2C: CROSS-SOURCE COMPARISON TYPES ---

export interface SourceComparisonItem {
  entryId: string;
  sourceId: string;
  sourceTitle: string;
  page: number;
  traditionalIndication: string;
  plantPart: string;
  preparation: string;
  ingredients: string[];
  dosage: string;
  anupana: string;
  verificationStatus: SourceVerificationStatus;
  botanicalConfidence: BotanicalConfidence;
  botanicalLatin: string;
  relationshipToGroup: TraditionalClaimRelationship;
  relationshipNotes: string;
  isGoldCorpus: boolean;
  reviewFlags: string[];
}

export interface HerbComparisonGroup {
  canonicalEntity: string;
  vernacularNames: string[];
  botanicalIdentities: {
    latin: string;
    confidence: BotanicalConfidence;
    sourcesCount: number;
  }[];
  isBotanicallyAmbiguous: boolean;
  botanicalAmbiguityNote?: string;
  treatisesCount: number;
  sourceRecordsCount: number;
  primaryRelationship: TraditionalClaimRelationship;
  relationshipSummary: string;
  records: SourceComparisonItem[];
  indexedCorpusNotice: string;
}

export interface RecordPairComparison {
  relationship: TraditionalClaimRelationship;
  reason: string;
  sharedIndication?: string;
  differingDimensions?: string[];
}

// --- USER SAVED REMEDIES SHELF ---
export interface SavedRemedyItem {
  id: string;
  savedAt: number;
  entry: AyurvedicEntry;
  notes?: string;
}
