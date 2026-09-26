// ============================================================================
// MULIKA — Human-Readable Provenance & Verification Labels
// Plain-language translation layer for rigorous presentation without modifying enums
// ============================================================================

import { 
  SourceVerificationStatus, 
  EvidenceLevel, 
  ThreeStateStatus, 
  BotanicalConfidence,
  TraditionalClaimRelationship
} from '../types';

export interface HumanReadableProvenance {
  label: string;
  badgeClass: string;
  description: string;
  shortLabel: string;
}

export function getVerificationStatusLabel(status?: SourceVerificationStatus | string): HumanReadableProvenance {
  switch (status) {
    case SourceVerificationStatus.SOURCE_VERIFIED:
    case 'SOURCE_VERIFIED':
      return {
        label: 'Direct Attestation — Physical Source Collated',
        shortLabel: 'Physical Source Collated',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
        description: 'Transcribed directly from high-resolution digital scans and physically collated against classical Telugu folios.'
      };
    case SourceVerificationStatus.SOURCE_REFERENCED:
    case 'SOURCE_REFERENCED':
    case 'SOURCE_REFERENCED_UNCOLLATED':
      return {
        label: 'Cataloged Source Reference — Folio Collation Pending',
        shortLabel: 'Folio Collation Pending',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700',
        description: 'Cataloged from digitized Ayurvedic treatise bibliographic registry. Physical scan collation in progress.'
      };
    case SourceVerificationStatus.PROVISIONAL:
    case 'PROVISIONAL':
      return {
        label: 'Provisional Vernacular Transcription',
        shortLabel: 'Provisional',
        badgeClass: 'bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-700',
        description: 'Raw extraction awaiting manual scholarly collation.'
      };
    default:
      return {
        label: 'Cataloged Source Reference',
        shortLabel: 'Reference',
        badgeClass: 'bg-stone-50 text-stone-700 border-stone-300 dark:bg-stone-900/40 dark:text-stone-300 dark:border-stone-700',
        description: 'Historical textual record.'
      };
  }
}

export function getEvidenceLevelLabel(level?: EvidenceLevel | string): HumanReadableProvenance {
  switch (level) {
    case EvidenceLevel.LEVEL_1_PRIMARY_MANUSCRIPT:
    case 'LEVEL_1_PRIMARY_MANUSCRIPT':
    case '1':
      return {
        label: 'Level 1: Primary Manuscript Attestation',
        shortLabel: 'Level 1 Primary',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-600',
        description: 'Directly sourced from classical digitized palm-leaf or lithograph medical manuscripts.'
      };
    case EvidenceLevel.LEVEL_2_CLASSICAL_CROSS_REF:
    case 'LEVEL_2_CLASSICAL_CROSS_REF':
    case '2':
      return {
        label: 'Level 2: Classical Printed Compilation',
        shortLabel: 'Level 2 Classical',
        badgeClass: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-600',
        description: 'Sourced from standardized printed Ayurvedic pharmacopeias and traditional regional compendia.'
      };
    case EvidenceLevel.LEVEL_3_INSTITUTIONAL:
    case 'LEVEL_3_INSTITUTIONAL':
    case '3':
      return {
        label: 'Level 3: Institutional Pharmacopoeia Standard',
        shortLabel: 'Level 3 API',
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-600',
        description: 'Standards validated by AYUSH Ayurvedic Pharmacopoeia of India (API).'
      };
    case EvidenceLevel.LEVEL_4_MODERN_SCIENTIFIC:
    case 'LEVEL_4_MODERN_SCIENTIFIC':
    case '4':
    default:
      return {
        label: 'Level 4: Modern Scientific Literature',
        shortLabel: 'Level 4 Scientific',
        badgeClass: 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-700',
        description: 'Peer-reviewed phytochemical and botanical research.'
      };
  }
}

export function getGroundingStatusLabel(status?: ThreeStateStatus | string): HumanReadableProvenance {
  switch (status) {
    case ThreeStateStatus.SUPPORTED:
    case 'SUPPORTED':
      return {
        label: 'Supported by verified source',
        shortLabel: 'Source Supported',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
        description: 'Verbatim alignment found in physically collated digitized manuscript folios.'
      };
    case ThreeStateStatus.INFERRED:
    case 'INFERRED':
      return {
        label: 'Synthesized from cited source material',
        shortLabel: 'Synthesized Analysis',
        badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-700',
        description: 'Synthesized cross-reference linking classical formulations with botanical taxa.'
      };
    case ThreeStateStatus.UNKNOWN:
    case 'UNKNOWN':
    default:
      return {
        label: 'Insufficient source evidence',
        shortLabel: 'Insufficient Evidence',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700',
        description: 'No verified manuscript attestation found in the digitized Ayurvedic corpus.'
      };
  }
}

export function getBotanicalConfidenceLabel(conf?: BotanicalConfidence | string): HumanReadableProvenance {
  switch (conf) {
    case BotanicalConfidence.VERIFIED:
    case 'VERIFIED':
      return {
        label: 'Botanically Verified Taxon',
        shortLabel: 'Verified Taxon',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
        description: 'Cross-referenced with Ayurvedic Pharmacopoeia of India (API) botanical standards.'
      };
    case BotanicalConfidence.HIGH_CONFIDENCE:
    case 'HIGH_CONFIDENCE':
      return {
        label: 'High Confidence Taxon',
        shortLabel: 'High Confidence',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
        description: 'Strong classical synonymy and regional consensus.'
      };
    case BotanicalConfidence.PROVISIONAL:
    case 'PROVISIONAL':
      return {
        label: 'Provisional Vernacular Attribution',
        shortLabel: 'Provisional Attribution',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700',
        description: 'Regional Telugu vernacular name mapped provisionally; requires taxonomist verification.'
      };
    case BotanicalConfidence.UNCERTAIN:
    case 'UNCERTAIN':
      return {
        label: 'Multiple Botanical Candidates (Homonym)',
        shortLabel: 'Multiple Candidates',
        badgeClass: 'bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-700',
        description: 'Traditional Telugu name refers to distinct botanical species across regional traditions.'
      };
    case BotanicalConfidence.UNRESOLVED:
    case 'UNRESOLVED':
    default:
      return {
        label: 'Unresolved Botanical Identity',
        shortLabel: 'Unresolved Taxon',
        badgeClass: 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-700',
        description: 'Vernacular plant name unrecorded in modern standard botanical indices.'
      };
  }
}

/**
 * Translates TraditionalClaimRelationship enum to researcher-friendly UI labels
 * Strictly avoids medical consensus claims or unwarranted efficacy assertions.
 */
export function getTraditionalClaimRelationshipLabel(rel?: TraditionalClaimRelationship | string): HumanReadableProvenance {
  switch (rel) {
    case TraditionalClaimRelationship.SIMILAR_TRADITIONAL_CLAIM:
    case 'SIMILAR_TRADITIONAL_CLAIM':
      return {
        label: 'Similar traditional claim',
        shortLabel: 'Similar Claim',
        badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
        description: 'Multiple treatises document a materially similar traditional indication.'
      };
    case TraditionalClaimRelationship.MATCHING_FORMULATION:
    case 'MATCHING_FORMULATION':
      return {
        label: 'Matching formulation',
        shortLabel: 'Matching Formulation',
        badgeClass: 'bg-teal-950/60 text-teal-300 border-teal-500/40',
        description: 'Treatises share substantially identical plant parts, adjuvants (anupana), and preparation method.'
      };
    case TraditionalClaimRelationship.FORMULATION_VARIATION:
    case 'FORMULATION_VARIATION':
      return {
        label: 'Formulation differs',
        shortLabel: 'Formulation Differs',
        badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
        description: 'Shared therapeutic context but materially different preparation, vehicle (anupana), or plant part.'
      };
    case TraditionalClaimRelationship.UNIQUE_SOURCE_CLAIM:
    case 'UNIQUE_SOURCE_CLAIM':
      return {
        label: 'Appears only in this indexed source',
        shortLabel: 'Unique in Indexed Corpus',
        badgeClass: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40',
        description: 'Unique within the currently indexed Mulika corpus (does not imply uniqueness across all unindexed historical literature).'
      };
    case TraditionalClaimRelationship.CONFLICTING_SOURCE_CLAIM:
    case 'CONFLICTING_SOURCE_CLAIM':
      return {
        label: 'Sources differ',
        shortLabel: 'Sources Differ',
        badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
        description: 'Indexed treatises make materially contradictory traditional claims or divergent administration instructions.'
      };
    case TraditionalClaimRelationship.INSUFFICIENT_INFORMATION:
    case 'INSUFFICIENT_INFORMATION':
    default:
      return {
        label: 'Insufficient information to compare',
        shortLabel: 'Insufficient Info',
        badgeClass: 'bg-stone-900 text-stone-300 border-stone-700',
        description: 'Source records lack sufficient structured detail for deterministic comparative alignment.'
      };
  }
}
