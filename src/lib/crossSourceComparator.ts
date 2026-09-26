// ============================================================================
// MULIKA — PHASE 2C: CROSS-SOURCE DETERMINISTIC COMPARISON ENGINE
// Deterministic source-text comparison across the 13 indexed Telugu Mulika treatises.
// Compares structured source data without manufacturing medical consensus or clinical claims.
// ============================================================================

import { 
  AyurvedicEntry, 
  SourceVerificationStatus, 
  BotanicalConfidence, 
  TraditionalClaimRelationship,
  SourceComparisonItem,
  HerbComparisonGroup,
  RecordPairComparison
} from '../types';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
import { getGoldCorpusRecord } from '../data/goldCorpusRegistry';

/**
 * Standardized Canonical Herb Entity Dictionary
 * Maps vernacular and textual spelling variants to canonical research entities.
 */
export const CANONICAL_HERB_MAP: { pattern: RegExp; canonical: string; sanskrit: string; telugu: string }[] = [
  { pattern: /tulasi|తులసి|holy basil|ocimum/i, canonical: 'Tulasi', sanskrit: 'Tulasi', telugu: 'తులసి' },
  { pattern: /munaga|మునగ|moringa|shobhanjana/i, canonical: 'Munaga', sanskrit: 'Shobhanjana', telugu: 'మునగ' },
  { pattern: /nela\s*usiri|నేల\s*ఉసిరి|bhumyamalaki|bhumi\s*amalaki|niruri/i, canonical: 'Nela Usiri', sanskrit: 'Bhumyamalaki', telugu: 'నేల ఉసిరి' },
  { pattern: /kalabanda|కలబంద|aloe|musambaram/i, canonical: 'Kalabanda', sanskrit: 'Kumari', telugu: 'కలబంద' },
  { pattern: /uttareni|ఉత్తరేణి|apamarga|achyranth/i, canonical: 'Uttareni', sanskrit: 'Apamarga', telugu: 'ఉత్తరేణి' },
  { pattern: /nalleru|నల్లేరు|asthisamharaka|cissus/i, canonical: 'Nalleru', sanskrit: 'Asthisamharaka', telugu: 'నల్లేరు' },
  { pattern: /\bbrahmi\b|బ్రాహ్మి|బ్రహ్మి|\bbacopa\b|\bcentella\b|\bmandukaparni\b/i, canonical: 'Brahmi', sanskrit: 'Brahmi / Mandukaparni', telugu: 'బ్రహ్మి' },
  { pattern: /\bvepa\b|వేప|\bneem\b|\bnimba\b|\bazadirachta\b/i, canonical: 'Vepa', sanskrit: 'Nimba', telugu: 'వేప' },
  { pattern: /jilledu|జిల్లేడు|arka|calotropis/i, canonical: 'Jilledu', sanskrit: 'Arka', telugu: 'జిల్లేడు' },
  { pattern: /guntagala|గుంటగలగర|గుంటకలగర|bhringaraj|eclipta/i, canonical: 'Guntagalagara', sanskrit: 'Bhringaraja', telugu: 'గుంటగలగర' },
  { pattern: /nela\s*vemu|నేల\s*వేము|kalmegh|bhunimba|andrographis/i, canonical: 'Nela Vemu', sanskrit: 'Kalmegha / Bhunimba', telugu: 'నేలవేము' },
  { pattern: /vaavili|వావిలి|nirgundi|vitex/i, canonical: 'Vaavili', sanskrit: 'Nirgundi', telugu: 'వావిలి' },
  { pattern: /shunti|ardraka|అల్లం|శొంటి|ginger|zingiber/i, canonical: 'Shunti / Ardraka', sanskrit: 'Shunti / Nagara', telugu: 'శొంటి / అల్లం' },
  { pattern: /atimadhuram|అతిమధురం|yashtimadhu|glycyrrhiza|liquorice/i, canonical: 'Atimadhuram', sanskrit: 'Yashtimadhu', telugu: 'అతిమధురం' },
  { pattern: /addasaram|అడ్డసరము|vasa|vasaka|justicia/i, canonical: 'Addasaramu', sanskrit: 'Vasa', telugu: 'అడ్డసరము' },
  { pattern: /avise|అవిసె|sesbania|agastya/i, canonical: 'Avise', sanskrit: 'Agastya', telugu: 'అవిసె' },
  { pattern: /ashoka|అశోక|saraca/i, canonical: 'Ashoka', sanskrit: 'Ashoka', telugu: 'అశోక' },
  { pattern: /jatamansi|జటామాంసి|nardostachys/i, canonical: 'Jatamansi', sanskrit: 'Jatamansi', telugu: 'జటామాంసి' },
  { pattern: /karakkaya|కరక్కాయ|haritaki|terminalia chebula/i, canonical: 'Karakkaya', sanskrit: 'Haritaki', telugu: 'కరక్కాయ' },
  { pattern: /tippateega|తిప్పతీగ|guduchi|tinospora/i, canonical: 'Tippateega', sanskrit: 'Guduchi', telugu: 'తిప్పతీగ' },
  { pattern: /\busiri\b|ఉసిరికాయ|ఉసిరి|\bamalaki\b|emblica/i, canonical: 'Usiri', sanskrit: 'Amalaki', telugu: 'ఉసిరి' },
  { pattern: /pasupu|పసుపు|haridra|curcuma/i, canonical: 'Pasupu', sanskrit: 'Haridra', telugu: 'పసుపు' },
  { pattern: /vamu|వాము|ajwain|trachyspermum|yavani/i, canonical: 'Vamu', sanskrit: 'Yavani', telugu: 'వాము' },
  { pattern: /vakudu|వాకుడు|kantakari|solanum/i, canonical: 'Vakudu', sanskrit: 'Kantakari', telugu: 'వాకుడు' },
  { pattern: /gaddida|గాడిద గడప|aristolochia/i, canonical: 'Gaddida Gadapa', sanskrit: 'Kitamari', telugu: 'గాడిద గడప' },
  { pattern: /aswagandha|అశ్వగంధ|withania|penneru/i, canonical: 'Aswagandha', sanskrit: 'Ashwagandha', telugu: 'అశ్వగంధ' },
  { pattern: /maddi|మద్ది|arjuna|terminalia arjuna/i, canonical: 'Maddi / Arjuna', sanskrit: 'Arjuna', telugu: 'మద్ది' },
  { pattern: /palleru|పల్లేరు|gokshura|tribulus/i, canonical: 'Palleru', sanskrit: 'Gokshura', telugu: 'పల్లేరు' },
  { pattern: /podapatri|పొడపత్రి|gymnema|meshasringi/i, canonical: 'Podapatri', sanskrit: 'Meshashringi', telugu: 'పొడపత్రి' },
  { pattern: /kondapindi|కొండపిండి|aerva|pashanabheda/i, canonical: 'Kondapindi', sanskrit: 'Pashanabheda', telugu: 'కొండపిండి' },
  { pattern: /neredu|నేరేడు|jamun|syzygium/i, canonical: 'Neredu', sanskrit: 'Jambu', telugu: 'నేరేడు' },
  { pattern: /amudam|ఆముదం|ricinus|castor|eranda/i, canonical: 'Amudam', sanskrit: 'Eranda', telugu: 'ఆముదం' }
];

/**
 * Returns canonical entity name for a given entry or query string.
 */
export function getCanonicalHerbName(queryOrEntry: string | AyurvedicEntry): string {
  const text = typeof queryOrEntry === 'string'
    ? queryOrEntry.toLowerCase()
    : `${queryOrEntry.herb} ${queryOrEntry.herb_full} ${queryOrEntry.telugu}`.toLowerCase();

  for (const item of CANONICAL_HERB_MAP) {
    if (item.pattern.test(text)) {
      return item.canonical;
    }
  }

  if (typeof queryOrEntry === 'string') {
    return queryOrEntry.trim();
  }
  return queryOrEntry.herb.split('(')[0].trim();
}

/**
 * Standardized Traditional Indication Category Matchers
 * Deterministically aligns classical indications across Telugu and English without AI speculation.
 */
export const INDICATION_CATEGORY_PATTERNS: { category: string; pattern: RegExp }[] = [
  { category: 'Urinary Stones / Calculi', pattern: /calculi|stone|ashmari|mutrapinda|ratlu|rallu|renal/i },
  { category: 'Cough & Respiratory', pattern: /cough|cold|kasa|jalubu|daggu|throat|swasa|bonguru|phlegm/i },
  { category: 'Jaundice & Liver Disorders', pattern: /jaundice|kamarla|hepatitis|liver|yakrit|kaamerlu/i },
  { category: 'Fevers (Jvara)', pattern: /fever|jvara|jwara|vishama/i },
  { category: 'Hemorrhoids & Piles', pattern: /pile|piles|hemorrhoid|arshas|arsha|moola|moolashankha/i },
  { category: 'Joints & Bone Fractures', pattern: /joint|vata|sandhi|keella|amavata|asthi|fracture|bone|virigina/i },
  { category: 'Skin, Wounds & Burns', pattern: /skin|itching|eczema|kandlu|durada|kushta|wound|vrana|burn|ulcer|kalina/i },
  { category: 'Headache & Cephalea', pattern: /headache|shirashula|talanopi/i },
  { category: 'Dental & Oral Disorders', pattern: /tooth|teeth|gum|mouth|mukha|danta|dantadhavanam/i },
  { category: 'Digestive & Bowel Conditions', pattern: /constipation|malabaddhaka|indigestion|agnimandya|appetite|stomach|pitta|atyushnam/i },
  { category: 'Eye & Vision Disorders', pattern: /eye|netra|kanti|drishti|blindness/i }
];

/**
 * Checks if two textual indications materially overlap.
 */
export function doIndicationsOverlap(ailmentA: string, ailmentB: string): boolean {
  if (!ailmentA || !ailmentB) return false;
  const la = ailmentA.toLowerCase().trim();
  const lb = ailmentB.toLowerCase().trim();
  if (la === lb || la.includes(lb) || lb.includes(la)) return true;

  for (const cat of INDICATION_CATEGORY_PATTERNS) {
    if (cat.pattern.test(la) && cat.pattern.test(lb)) {
      return true;
    }
  }
  return false;
}
export function normalizeLatinBinomial(rawBotanical?: string): string {
  if (!rawBotanical) return 'Unresolved taxon';
  const clean = rawBotanical
    .split('(')[0]
    .replace(/\b(L\.|Lam\.|Nees|Burm\.f\.|Schumach\.|Thonn\.|W\.T\.Aiton|Roxb\.|DC\.|Hook\.)/g, '')
    .trim();
  return clean || rawBotanical.trim();
}

/**
 * Extracts structured dimensions for comparison from canonical entry and Gold Corpus.
 */
export function extractComparisonDimensions(entry: AyurvedicEntry) {
  const gold = getGoldCorpusRecord(entry.id);

  // 1. Plant Part
  let plantPart = gold?.plant_part_used || entry.plant_part_used;
  if (!plantPart || plantPart === 'Not stated in source') {
    const text = `${entry.remedy} ${entry.verification_note} ${entry.herb_full}`.toLowerCase();
    if (/leaves|leaf|patra|ఆకులు|చిగురు/i.test(text)) plantPart = 'Patra (Leaves)';
    else if (/root|mula|వేరు|వేర్లు|గడ్డ/i.test(text)) plantPart = 'Mula (Root)';
    else if (/bark|twak|బెరడు|పట్ట/i.test(text)) plantPart = 'Twak (Bark)';
    else if (/gum|resin|జిగురు/i.test(text)) plantPart = 'Niryasa (Resin/Gum)';
    else if (/seed|seeds|విత్తనాలు|గింజలు/i.test(text)) plantPart = 'Beeja (Seeds)';
    else if (/flower|flowers|పువ్వులు|పుష్పం/i.test(text)) plantPart = 'Pushpa (Flowers)';
    else if (/fruit|కాయ|పండు|drumstick|కాయలు/i.test(text)) plantPart = 'Phala (Fruit)';
    else if (/whole plant|panchanga|సమగ్ర/i.test(text)) plantPart = 'Panchanga (Whole Plant)';
    else plantPart = 'Not stated in source';
  }

  // 2. Preparation Method
  let preparation = entry.preparation_type;
  if (!preparation || preparation === 'Classical') {
    const text = `${entry.remedy} ${entry.category}`.toLowerCase();
    if (/juice|swarasa|రసం/i.test(text)) preparation = 'Swarasa (Fresh Juice)';
    else if (/decoction|kashayam|కషాయం|boiled/i.test(text)) preparation = 'Kashayam (Decoction)';
    else if (/paste|lepam|లేపనం|poultice/i.test(text)) preparation = 'Lepam (External Paste)';
    else if (/powder|churna|చూర్ణం/i.test(text)) preparation = 'Churna (Herbal Powder)';
    else if (/oil|tailam|తైలం/i.test(text)) preparation = 'Tailam (Medicated Oil)';
    else if (/curry|soup|ఆహారం|కూర|చారు/i.test(text)) preparation = 'Ahara (Dietary Preparation)';
    else preparation = 'Not stated in source';
  }

  // 3. Anupana / Vehicle
  let anupana = gold?.anupana_vehicle || entry.anupana_vehicle;
  if (!anupana || anupana === 'Not stated in source') {
    const text = entry.remedy.toLowerCase();
    if (/honey|తేనె|madhu/i.test(text)) anupana = 'Honey (Madhu)';
    else if (/milk|పాలు|dugdha|godugdha/i.test(text)) anupana = 'Cow Milk (Godugdha)';
    else if (/buttermilk|takra|మజ్జిగ/i.test(text)) anupana = 'Buttermilk (Takra)';
    else if (/ghee|ghrita|నెయ్యి/i.test(text)) anupana = 'Cow Ghee (Ghritha)';
    else if (/warm water|hot water|ఉష్ణోదకం/i.test(text)) anupana = 'Warm Water (Ushnodaka)';
    else if (/sugar|sugar candy|పంచదార|కలకండ/i.test(text)) anupana = 'Sugar / Rock Candy';
    else if (/castor oil|ఆముదం/i.test(text)) anupana = 'Castor Oil (Eranda Tailam)';
    else if (/external|lepam|no oral vehicle/i.test(text)) anupana = 'External application (No oral vehicle)';
    else anupana = 'Not stated in source';
  }

  // 4. Dosage
  const dosage = gold?.dosage_verbatim || entry.dosage_verbatim || 'Not stated in source';

  // 5. Structured Ingredients
  const ingredients = gold?.ingredients_structured || entry.ingredients_structured || [entry.herb];

  // 6. Review Flags
  const reviewFlags = gold?.review_flags || entry.review_flags || [];

  return {
    plantPart,
    preparation,
    anupana,
    dosage,
    ingredients,
    reviewFlags,
    isGoldCorpus: !!gold
  };
}

/**
 * Deterministic Pairwise Comparison between two canonical source records.
 * Follows conservative, source-text rules without manufacturing consensus.
 */
export function compareTwoRecords(a: AyurvedicEntry, b: AyurvedicEntry): RecordPairComparison {
  // RULE 1: INSUFFICIENT INFORMATION
  // If either record has missing indication or empty remedy text
  if (!a.ailment || !b.ailment || 
      a.ailment === 'Not stated in source' || b.ailment === 'Not stated in source' ||
      !a.remedy || !b.remedy || a.remedy.trim().length < 5 || b.remedy.trim().length < 5) {
    return {
      relationship: TraditionalClaimRelationship.INSUFFICIENT_INFORMATION,
      reason: 'Source records lack sufficient structured detail (indication or remedy description) for deterministic alignment.'
    };
  }

  const dimA = extractComparisonDimensions(a);
  const dimB = extractComparisonDimensions(b);

  const ailmentA = a.ailment.toLowerCase();
  const ailmentB = b.ailment.toLowerCase();

  // RULE 2: CONFLICTING SOURCE CLAIM
  // Check for route contradictions (External-only vs internal ingestion)
  const isExternalStrictA = /strictly external|external\s*(?:application|lepam)\s*only|do not ingest/i.test(a.remedy) || 
                            dimA.reviewFlags.includes('EXTERNAL_LEPAM_ONLY');
  const isExternalStrictB = /strictly external|external\s*(?:application|lepam)\s*only|do not ingest/i.test(b.remedy) || 
                            dimB.reviewFlags.includes('EXTERNAL_LEPAM_ONLY');

  const isInternalA = /drink|swallow|internally|oral|take 1|take 2|empty stomach/i.test(a.remedy) || 
                      dimA.anupana.includes('Milk') || dimA.anupana.includes('Honey') || dimA.anupana.includes('Buttermilk');
  const isInternalB = /drink|swallow|internally|oral|take 1|take 2|empty stomach/i.test(b.remedy) || 
                      dimB.anupana.includes('Milk') || dimB.anupana.includes('Honey') || dimB.anupana.includes('Buttermilk');

  if (doIndicationsOverlap(a.ailment, b.ailment)) {
    if ((isExternalStrictA && isInternalB) || (isExternalStrictB && isInternalA)) {
      return {
        relationship: TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM,
        reason: 'Material textual contradiction: one treatise prescribes internal ingestion while the other specifies strict external application only.',
        sharedIndication: a.ailment,
        differingDimensions: ['Administration Route', 'Vehicle (Anupana)']
      };
    }
  }

  // Check for explicit contraindication conflict in review flags or safety text
  const contraA = dimA.reviewFlags.filter(f => f.includes('EXCLUDE') || f.includes('CAUTION') || f.includes('SAFETY'));
  const contraB = dimB.reviewFlags.filter(f => f.includes('EXCLUDE') || f.includes('CAUTION') || f.includes('SAFETY'));
  if (contraA.length > 0 && !contraB.length && (ailmentA === ailmentB)) {
    // If one source has strict safety exclusions while another applies it freely to that condition
    if (dimA.reviewFlags.includes('EXCLUDE_IN_DIARRHEA') && /diarrhea|atisara|loose/i.test(b.ailment)) {
      return {
        relationship: TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM,
        reason: 'Material textual contradiction: one treatise excludes use in diarrhea while the other prescribes it.',
        sharedIndication: a.ailment
      };
    }
  }

  // Determine indication similarity using deterministic category patterns
  const indicationsOverlap = doIndicationsOverlap(a.ailment, b.ailment);

  const samePlantPart = dimA.plantPart !== 'Not stated in source' && 
                        dimB.plantPart !== 'Not stated in source' &&
                        dimA.plantPart === dimB.plantPart;

  // RULE 3: MATCHING FORMULATION
  // Substantially same plant part, preparation, and adjuvant
  const samePreparation = dimA.preparation !== 'Not stated in source' && 
                          dimB.preparation !== 'Not stated in source' &&
                          dimA.preparation === dimB.preparation;
  const sameAnupana = dimA.anupana !== 'Not stated in source' && 
                      dimB.anupana !== 'Not stated in source' &&
                      (dimA.anupana === dimB.anupana || 
                       (dimA.anupana.includes('Honey') && dimB.anupana.includes('Honey')) ||
                       (dimA.anupana.includes('Milk') && dimB.anupana.includes('Milk')) ||
                       (dimA.anupana.includes('Buttermilk') && dimB.anupana.includes('Buttermilk')));

  if (indicationsOverlap && samePlantPart && samePreparation && sameAnupana) {
    return {
      relationship: TraditionalClaimRelationship.MATCHING_FORMULATION,
      reason: `Treatises share substantially identical plant part (${dimA.plantPart}), preparation (${dimA.preparation}), and adjuvant (${dimA.anupana}) for a compatible indication.`,
      sharedIndication: a.ailment
    };
  }

  // RULE 4: FORMULATION VARIATION
  // Same or overlapping indication context, but differing plant part, preparation, or vehicle
  if (indicationsOverlap) {
    const differing: string[] = [];
    if (dimA.plantPart !== dimB.plantPart && dimA.plantPart !== 'Not stated in source' && dimB.plantPart !== 'Not stated in source') {
      differing.push(`Plant Part (${dimA.plantPart} vs ${dimB.plantPart})`);
    }
    if (dimA.preparation !== dimB.preparation && dimA.preparation !== 'Not stated in source' && dimB.preparation !== 'Not stated in source') {
      differing.push(`Preparation (${dimA.preparation} vs ${dimB.preparation})`);
    }
    if (dimA.anupana !== dimB.anupana && dimA.anupana !== 'Not stated in source' && dimB.anupana !== 'Not stated in source') {
      differing.push(`Vehicle/Anupana (${dimA.anupana} vs ${dimB.anupana})`);
    }

    if (differing.length > 0) {
      return {
        relationship: TraditionalClaimRelationship.FORMULATION_VARIATION,
        reason: `Treatises address a similar traditional indication (${a.ailment}) but prescribe distinct formulation dimensions: ${differing.join(', ')}.`,
        sharedIndication: a.ailment,
        differingDimensions: differing
      };
    }
  }

  // RULE 5: SIMILAR TRADITIONAL CLAIM
  // Both sources describe a materially similar indication
  if (indicationsOverlap) {
    return {
      relationship: TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM,
      reason: `Treatises document a materially similar traditional indication (${a.ailment}) for this botanical entity.`,
      sharedIndication: a.ailment
    };
  }

  // If different indications within the same herb: each source has a distinct claim
  return {
    relationship: TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM,
    reason: `The specific indication and formulation (${a.ailment}) appears only in this source among the compared records within the currently indexed Mulika corpus.`
  };
}

/**
 * Builds a derived cross-source comparison group for a given herb entity.
 * Preserves every canonical source record, maintains exact provenance, and avoids medical consensus claims.
 */
export function buildHerbComparisonGroup(herbQuery: string, allEntries?: AyurvedicEntry[]): HerbComparisonGroup | null {
  const corpus = allEntries || MANUSCRIPT_ENTRIES;
  const canonicalName = getCanonicalHerbName(herbQuery);

  // Filter all records matching this canonical entity
  const matchingRecords = corpus.filter(e => {
    return getCanonicalHerbName(e) === canonicalName;
  });

  if (matchingRecords.length === 0) {
    return null;
  }

  // Collect distinct treatises
  const treatiseSet = new Set(matchingRecords.map(r => r.source_id));
  const treatisesCount = treatiseSet.size;

  // Collect vernacular names
  const vernacularNames = Array.from(new Set(matchingRecords.map(r => r.telugu || r.herb).filter(Boolean)));

  // Collect and audit botanical identities for botanical safety
  const botanicalCounts: Record<string, { latin: string; confidence: BotanicalConfidence; count: number }> = {};
  matchingRecords.forEach(r => {
    const rawLatin = r.botanical || 'Unresolved taxon';
    const norm = normalizeLatinBinomial(rawLatin);
    const conf = r.botanical_confidence || BotanicalConfidence.PROVISIONAL;
    if (!botanicalCounts[norm]) {
      botanicalCounts[norm] = { latin: norm, confidence: conf, count: 0 };
    }
    botanicalCounts[norm].count++;
  });

  const botanicalIdentities = Object.values(botanicalCounts).map(b => ({
    latin: b.latin,
    confidence: b.confidence,
    sourcesCount: b.count
  }));

  // Botanical safety check: Check for distinct botanical species (homonyms)
  const isBotanicallyAmbiguous = botanicalIdentities.length > 1 || 
    botanicalIdentities.some(b => b.confidence === BotanicalConfidence.UNCERTAIN || b.confidence === BotanicalConfidence.UNRESOLVED);

  const botanicalAmbiguityNote = isBotanicallyAmbiguous
    ? `Botanical identity caution: Vernacular term "${canonicalName}" maps to ${botanicalIdentities.length} distinct botanical taxa or carries uncertain classification across regional traditions (${botanicalIdentities.map(b => b.latin).join(', ')}). Sources are preserved independently and are not asserted to represent a single botanical species.`
    : undefined;

  // If records exist in only 1 treatise:
  if (treatisesCount === 1) {
    const records: SourceComparisonItem[] = matchingRecords.map(entry => {
      const dim = extractComparisonDimensions(entry);
      return {
        entryId: entry.id,
        sourceId: entry.source_id,
        sourceTitle: entry.source_title,
        page: entry.page,
        traditionalIndication: entry.ailment,
        plantPart: dim.plantPart,
        preparation: dim.preparation,
        ingredients: dim.ingredients,
        dosage: dim.dosage,
        anupana: dim.anupana,
        verificationStatus: entry.verification_status || SourceVerificationStatus.SOURCE_REFERENCED,
        botanicalConfidence: entry.botanical_confidence || BotanicalConfidence.PROVISIONAL,
        botanicalLatin: normalizeLatinBinomial(entry.botanical),
        relationshipToGroup: TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM,
        relationshipNotes: 'Unique within the currently indexed Mulika corpus (documented in 1 treatise).',
        isGoldCorpus: dim.isGoldCorpus,
        reviewFlags: dim.reviewFlags
      };
    });

    return {
      canonicalEntity: canonicalName,
      vernacularNames,
      botanicalIdentities,
      isBotanicallyAmbiguous,
      botanicalAmbiguityNote,
      treatisesCount: 1,
      sourceRecordsCount: matchingRecords.length,
      primaryRelationship: TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM,
      relationshipSummary: 'Documented in a single treatise within the currently indexed Mulika corpus.',
      records,
      indexedCorpusNotice: 'Source comparison is conducted strictly across the indexed Mulika corpus (13 treatises, 135 source-linked records). Unique claims and similarities reflect the indexed corpus only and do not infer modern clinical consensus.'
    };
  }

  // Multi-source comparison:
  // Determine relationship for each record relative to its peers from other treatises
  let hasConflict = false;
  let hasMatching = false;
  let hasVariation = false;
  let hasSimilar = false;
  let conflictSummary = '';

  const records: SourceComparisonItem[] = matchingRecords.map((entry, idx) => {
    const dim = extractComparisonDimensions(entry);
    const otherSourceRecords = matchingRecords.filter(other => other.source_id !== entry.source_id);

    let bestRelationship = TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM;
    let bestNotes = 'Unique indication within the currently indexed Mulika corpus (appears only in this source).';

    for (const peer of otherSourceRecords) {
      const pair = compareTwoRecords(entry, peer);
      if (pair.relationship === TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM) {
        bestRelationship = TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM;
        bestNotes = `Sources differ: ${pair.reason}`;
        hasConflict = true;
        conflictSummary = pair.reason;
        break;
      } else if (pair.relationship === TraditionalClaimRelationship.MATCHING_FORMULATION) {
        bestRelationship = TraditionalClaimRelationship.MATCHING_FORMULATION;
        bestNotes = `Matching formulation with ${peer.source_title} (Pg ${peer.page}): ${pair.reason}`;
        hasMatching = true;
      } else if (pair.relationship === TraditionalClaimRelationship.FORMULATION_VARIATION && bestRelationship !== TraditionalClaimRelationship.MATCHING_FORMULATION) {
        bestRelationship = TraditionalClaimRelationship.FORMULATION_VARIATION;
        bestNotes = `Formulation differs from ${peer.source_title} (Pg ${peer.page}): ${pair.reason}`;
        hasVariation = true;
      } else if (pair.relationship === TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM && 
                 bestRelationship !== TraditionalClaimRelationship.MATCHING_FORMULATION &&
                 bestRelationship !== TraditionalClaimRelationship.FORMULATION_VARIATION) {
        bestRelationship = TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM;
        bestNotes = `Similar traditional claim to ${peer.source_title} (Pg ${peer.page}): ${pair.reason}`;
        hasSimilar = true;
      }
    }

    return {
      entryId: entry.id,
      sourceId: entry.source_id,
      sourceTitle: entry.source_title,
      page: entry.page,
      traditionalIndication: entry.ailment,
      plantPart: dim.plantPart,
      preparation: dim.preparation,
      ingredients: dim.ingredients,
      dosage: dim.dosage,
      anupana: dim.anupana,
      verificationStatus: entry.verification_status || SourceVerificationStatus.SOURCE_REFERENCED,
      botanicalConfidence: entry.botanical_confidence || BotanicalConfidence.PROVISIONAL,
      botanicalLatin: normalizeLatinBinomial(entry.botanical),
      relationshipToGroup: bestRelationship,
      relationshipNotes: bestNotes,
      isGoldCorpus: dim.isGoldCorpus,
      reviewFlags: dim.reviewFlags
    };
  });

  // Determine group's primary relationship
  let primaryRelationship = TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM;
  let relationshipSummary = '';

  if (hasConflict) {
    primaryRelationship = TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM;
    relationshipSummary = `Treatises make divergent or contradictory statements regarding administration or safety: ${conflictSummary}`;
  } else if (hasMatching) {
    primaryRelationship = TraditionalClaimRelationship.MATCHING_FORMULATION;
    relationshipSummary = `Treatises document matching traditional formulations sharing plant parts, vehicle (anupana), and preparation method.`;
  } else if (hasVariation) {
    primaryRelationship = TraditionalClaimRelationship.FORMULATION_VARIATION;
    relationshipSummary = `Treatises share traditional indications but document variations in plant parts used, preparation methods, or vehicle (anupana).`;
  } else if (hasSimilar) {
    primaryRelationship = TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM;
    relationshipSummary = `Treatises document similar traditional indications for this botanical entity.`;
  } else {
    primaryRelationship = TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM;
    relationshipSummary = `Documented across multiple treatises, with each source reporting distinct traditional applications.`;
  }

  return {
    canonicalEntity: canonicalName,
    vernacularNames,
    botanicalIdentities,
    isBotanicallyAmbiguous,
    botanicalAmbiguityNote,
    treatisesCount,
    sourceRecordsCount: matchingRecords.length,
    primaryRelationship,
    relationshipSummary,
    records,
    indexedCorpusNotice: 'Source comparison is conducted strictly across the indexed Mulika corpus (13 treatises, 135 source-linked records). Unique claims and similarities reflect the indexed corpus only and do not infer modern clinical consensus.'
  };
}

/**
 * Returns comparison groups for all herbs that appear across 2 or more treatises.
 */
export function getAllMultiSourceHerbs(allEntries?: AyurvedicEntry[]): HerbComparisonGroup[] {
  const corpus = allEntries || MANUSCRIPT_ENTRIES;
  const canonicalEntities = Array.from(new Set(corpus.map(e => getCanonicalHerbName(e))));

  const multiGroups: HerbComparisonGroup[] = [];
  for (const name of canonicalEntities) {
    const group = buildHerbComparisonGroup(name, corpus);
    if (group && group.treatisesCount > 1) {
      multiGroups.push(group);
    }
  }

  // Sort descending by treatise count, then records count
  return multiGroups.sort((a, b) => {
    if (b.treatisesCount !== a.treatisesCount) {
      return b.treatisesCount - a.treatisesCount;
    }
    return b.sourceRecordsCount - a.sourceRecordsCount;
  });
}

/**
 * Returns all comparison groups across the corpus (including single-source).
 */
export function getAllComparisonHerbs(allEntries?: AyurvedicEntry[]): HerbComparisonGroup[] {
  const corpus = allEntries || MANUSCRIPT_ENTRIES;
  const canonicalEntities = Array.from(new Set(corpus.map(e => getCanonicalHerbName(e))));

  const groups: HerbComparisonGroup[] = [];
  for (const name of canonicalEntities) {
    const group = buildHerbComparisonGroup(name, corpus);
    if (group) {
      groups.push(group);
    }
  }

  return groups.sort((a, b) => b.treatisesCount - a.treatisesCount);
}
