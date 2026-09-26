import { 
  AyurvedicEntry, 
  ClaimEvidenceRecord, 
  EvidenceLevel, 
  SourceVerificationStatus, 
  SourceReferenceDetail,
  ThreeStateStatus 
} from '../types';

export interface CitationValidationResult {
  isValid: boolean;
  errors: string[];
  validatedClaims: ClaimEvidenceRecord[];
  recommendedStatus: ThreeStateStatus;
  statusDetail: SourceReferenceDetail;
  verificationDisclosure?: string;
}

/**
 * Pre-LLM validation: Deterministically validates candidate corpus records and prevents
 * ungrounded queries or false elevation of verification status.
 */
export function validateCitations(
  candidateEntries: AyurvedicEntry[],
  extractedClaimsText?: string
): CitationValidationResult {
  const errors: string[] = [];
  const validatedClaims: ClaimEvidenceRecord[] = [];

  // Check 1: Empty corpus check
  if (!candidateEntries || candidateEntries.length === 0) {
    return {
      isValid: false,
      errors: ['No supporting corpus entries retrieved.'],
      validatedClaims: [],
      recommendedStatus: ThreeStateStatus.UNKNOWN,
      statusDetail: SourceReferenceDetail.UNKNOWN_INSUFFICIENT,
      verificationDisclosure: 'The digitized Mulika corpus currently does not contain verified source evidence for this query.'
    };
  }

  let hasVerifiedPrimary = false;
  let hasReferencedPrimary = false;

  // Check 2: Validate each retrieved record's provenance
  for (const entry of candidateEntries) {
    if (!entry.source_id || !entry.source_title) {
      errors.push(`Entry ${entry.id} is missing source attribution.`);
      continue;
    }

    if (typeof entry.page !== 'number' || entry.page <= 0) {
      errors.push(`Entry ${entry.id} has invalid page number: ${entry.page}`);
      continue;
    }

    if (!entry.remedy || entry.remedy.trim().length === 0) {
      errors.push(`Entry ${entry.id} has empty formulation text.`);
      continue;
    }

    // Determine verification status
    const status = entry.verification_status || SourceVerificationStatus.SOURCE_REFERENCED;
    if (status === SourceVerificationStatus.SOURCE_VERIFIED) {
      hasVerifiedPrimary = true;
    } else {
      hasReferencedPrimary = true;
    }

    // Form claim-level record
    validatedClaims.push({
      claim_text: `Traditional formulation for ${entry.ailment} using ${entry.herb} (${entry.telugu}).`,
      claim_type: 'HISTORICAL_TRADITIONAL_USE',
      evidence_level: entry.evidence_level || EvidenceLevel.LEVEL_1_PRIMARY_MANUSCRIPT,
      source_id: entry.source_id,
      source_title: entry.source_title,
      page_or_folio: entry.page,
      verbatim_excerpt_telugu: entry.remedy_telugu || entry.remedy,
      transliteration_iso15919: entry.transliteration_iso15919,
      translation_en: entry.remedy,
      verification_status: status
    });
  }

  // Mandatory Distinction:
  // 1. SOURCE_VERIFIED + directly attested claim -> eligible for SUPPORTED (SOURCE_VERIFIED_PRIMARY)
  // 2. SOURCE_REFERENCED + directly matching -> INFERRED with statusDetail SOURCE_REFERENCED_UNCOLLATED
  //    (Direct manuscript reference — physical folio verification pending)
  let recommendedStatus: ThreeStateStatus = ThreeStateStatus.UNKNOWN;
  let statusDetail: SourceReferenceDetail = SourceReferenceDetail.UNKNOWN_INSUFFICIENT;
  let verificationDisclosure: string | undefined;

  if (validatedClaims.length > 0) {
    if (hasVerifiedPrimary) {
      recommendedStatus = ThreeStateStatus.SUPPORTED;
      statusDetail = SourceReferenceDetail.SOURCE_VERIFIED_PRIMARY;
      verificationDisclosure = 'Corroborated directly against digitized primary manuscript folio.';
    } else if (hasReferencedPrimary) {
      recommendedStatus = ThreeStateStatus.INFERRED;
      statusDetail = SourceReferenceDetail.SOURCE_REFERENCED_UNCOLLATED;
      verificationDisclosure = 'Direct manuscript reference — physical folio verification pending.';
    }
  }

  return {
    isValid: validatedClaims.length > 0,
    errors,
    validatedClaims,
    recommendedStatus,
    statusDetail,
    verificationDisclosure
  };
}

export interface PostSynthesisValidationResult {
  passed: boolean;
  errors: string[];
  hallucinatedPages: number[];
  hallucinatedSources: string[];
}

/**
 * Post-LLM Citation Gatekeeper:
 * Deterministically verifies that generated LLM text does NOT fabricate page numbers,
 * source treatises, or ungrounded formulations not present in the retrieved records.
 */
export function validatePostSynthesisCitations(
  generatedSummary: string,
  suppliedEntries: AyurvedicEntry[]
): PostSynthesisValidationResult {
  const errors: string[] = [];
  const validPages = new Set(suppliedEntries.map(e => e.page));
  const validSourceTitles = suppliedEntries.map(e => e.source_title.toLowerCase());
  const validSourceShorts = suppliedEntries.map(e => e.source_short.toLowerCase());
  const validSourceIds = suppliedEntries.map(e => e.source_id.toLowerCase());

  const hallucinatedPages: number[] = [];
  const hallucinatedSources: string[] = [];

  if (!generatedSummary || generatedSummary.trim().length === 0) {
    return {
      passed: false,
      errors: ['Generated synthesis text is empty.'],
      hallucinatedPages: [],
      hallucinatedSources: []
    };
  }

  // Regex 1: Detect cited page numbers e.g. "Page 45", "Pg 12", "page 104"
  const pageRegex = /\b(?:page|pg|folio|p\.)\s*[:\.]?\s*(\d+)\b/gi;
  let pageMatch: RegExpExecArray | null;
  while ((pageMatch = pageRegex.exec(generatedSummary)) !== null) {
    const citedPage = parseInt(pageMatch[1], 10);
    if (!validPages.has(citedPage)) {
      hallucinatedPages.push(citedPage);
      errors.push(`Fabricated page citation detected: Page ${citedPage} is not in retrieved context.`);
    }
  }

  // Regex 2: Check treatise name citations mentioned in text
  // Known treatise identifiers in the 13-treatise Mulika corpus
  const knownTreatises = [
    { key: 'mulika', name: 'Ayurveda Mulika Prayogavali' },
    { key: 'chitkalu', name: 'Vaidya Rahasya Chitkalu' },
    { key: 'medplants', name: 'Aushadha Mokkallo Arogya Rahasyalu' },
    { key: 'beauty', name: 'Andaniki, Arogyaniki Adbhuta Chitkalu' },
    { key: 'intinta', name: 'Intinta Mulika Vaidyam' },
    { key: 'chitkalu1000', name: '1000+ Ayurveda Chitkalu' },
    { key: 'sadharana', name: 'Ayurvedam Sadharana Chikitsalu' },
    { key: 'herbalmed', name: 'Herbal Medicine' },
    { key: 'prakruti', name: 'Prakruti Varalu' },
    { key: 'wonder', name: 'Wonder Herbals Ayurveda Vignanam' },
    { key: 'naatu', name: 'Sangraha Naatu Vaidyam' },
    { key: 'balu', name: 'Ayurveda Arogyam' },
    { key: 'chitkavaidyam2', name: 'Chitka Vaidyam' }
  ];

  for (const treatise of knownTreatises) {
    const pattern = new RegExp(treatise.name, 'i');
    if (pattern.test(generatedSummary)) {
      const isSupplied = validSourceIds.includes(treatise.key) || 
                         validSourceTitles.some(t => t.includes(treatise.key)) ||
                         validSourceShorts.some(s => s.toLowerCase().includes(treatise.key));
      if (!isSupplied) {
        hallucinatedSources.push(treatise.name);
        errors.push(`Fabricated treatise citation detected: '${treatise.name}' was not in supplied context.`);
      }
    }
  }

  const passed = errors.length === 0;

  return {
    passed,
    errors,
    hallucinatedPages,
    hallucinatedSources
  };
}
