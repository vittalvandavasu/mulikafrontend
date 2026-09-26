import React, { useState, useMemo } from 'react';
import { 
  AyurvedicEntry, 
  TraditionalClaimRelationship,
  HerbComparisonGroup,
  SourceComparisonItem
} from '../types';
import { 
  getVerificationStatusLabel, 
  getBotanicalConfidenceLabel,
  getTraditionalClaimRelationshipLabel 
} from '../lib/provenanceLabels';
import { 
  getAllMultiSourceHerbs, 
  buildHerbComparisonGroup, 
  getCanonicalHerbName,
  compareTwoRecords 
} from '../lib/crossSourceComparator';
import { 
  GitCompare, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Layers, 
  Sparkles,
  Info,
  Scale,
  ArrowRight
} from 'lucide-react';

interface CrossSourceComparatorViewProps {
  entries: AyurvedicEntry[];
  initialHerb?: string;
  onNavigateToFolio: (bookId: string, page: number, entryId: string) => void;
}

export const CrossSourceComparatorView: React.FC<CrossSourceComparatorViewProps> = ({
  entries,
  initialHerb,
  onNavigateToFolio
}) => {
  // All multi-source herb groups across the corpus
  const multiSourceGroups = useMemo(() => {
    return getAllMultiSourceHerbs(entries);
  }, [entries]);

  // Selected herb state
  const [selectedHerb, setSelectedHerb] = useState<string>(() => {
    if (initialHerb) {
      return getCanonicalHerbName(initialHerb);
    }
    return multiSourceGroups.length > 0 ? multiSourceGroups[0].canonicalEntity : 'Tulasi';
  });

  const [searchFilter, setSearchFilter] = useState<string>('');

  // Active comparison group
  const activeGroup = useMemo<HerbComparisonGroup | null>(() => {
    return buildHerbComparisonGroup(selectedHerb, entries);
  }, [selectedHerb, entries]);

  // Filtered herb list for selector
  const displayedHerbs = useMemo(() => {
    if (!searchFilter.trim()) {
      return multiSourceGroups;
    }
    const q = searchFilter.toLowerCase();
    return multiSourceGroups.filter(g => 
      g.canonicalEntity.toLowerCase().includes(q) ||
      g.vernacularNames.some(v => v.toLowerCase().includes(q)) ||
      g.records.some(r => r.traditionalIndication.toLowerCase().includes(q))
    );
  }, [multiSourceGroups, searchFilter]);

  const primaryRelMeta = activeGroup 
    ? getTraditionalClaimRelationshipLabel(activeGroup.primaryRelationship)
    : null;

  return (
    <div className="comparison-editorial space-y-8 animate-fadeIn">
      {/* Header & Philological Scope Notice */}
      <div className="p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
              <Scale className="w-4 h-4" />
              <span>TRADITIONAL SOURCE COMPARISON</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--ink)]">
              Compare sources
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-3xl leading-relaxed">
              Compare how the 13 indexed Telugu Mulika treatises document the same botanical entity, formulation, plant part, and vehicle (anupana). Collation is rule-based and derived directly from source texts.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] flex items-center gap-2 self-start md:self-center shrink-0">
            <Layers className="w-4 h-4" />
            <span>{multiSourceGroups.length} Multi-Source Herbs Cataloged</span>
          </div>
        </div>

        {/* Mandatory Corpus Scope Disclosure */}
        <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--line)]/30 text-xs text-[var(--muted)] flex items-start gap-3">
          <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[var(--ink)] block">
              Agreement between texts is not clinical proof
            </span>
            <p className="leading-relaxed">
              Comparisons are conducted strictly across the <strong>13 indexed Telugu Mulika treatises</strong> (135 source-linked records). Classifications such as &ldquo;Appears only in this indexed source&rdquo; or &ldquo;Similar traditional claim&rdquo; describe the indexed corpus only and do not infer modern clinical consensus or assert that a remedy does not exist in unindexed historical literature.
            </p>
          </div>
        </div>
      </div>

      {/* Herb Quick-Selector Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <label className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
            Choose a herb to compare:
          </label>
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter multi-source herbs or indications..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--ink)] placeholder-[#6B8E7B] focus:outline-none focus:border-[var(--line)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {displayedHerbs.map((g) => {
            const isSelected = g.canonicalEntity === selectedHerb;
            const relMeta = getTraditionalClaimRelationshipLabel(g.primaryRelationship);
            return (
              <button
                key={g.canonicalEntity}
                onClick={() => setSelectedHerb(g.canonicalEntity)}
                className={`px-3 py-2 rounded-xl text-left border transition-all shrink-0 flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#0B130E] border-[var(--line)] shadow-md'
                    : 'bg-[var(--canvas)] border-[var(--line)] text-[var(--ink)] hover:border-[#4A6355]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-xs font-bold">{g.canonicalEntity}</span>
                    {g.vernacularNames[0] && (
                      <span className={`text-[10px] ${isSelected ? 'text-[#0B130E]/70' : 'text-[var(--accent)]'}`}>
                        {g.vernacularNames[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`text-[9px] font-mono px-1 rounded ${
                      isSelected ? 'bg-[var(--canvas)]/20 text-[#0B130E]' : 'bg-[var(--surface)] text-[var(--muted)]'
                    }`}>
                      {g.treatisesCount} sources
                    </span>
                    <span className={`text-[9px] font-mono px-1 rounded ${
                      isSelected ? 'bg-[var(--canvas)]/20 text-[#0B130E]' : 'bg-[var(--surface)] text-[var(--muted)]'
                    }`}>
                      {g.sourceRecordsCount} records
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Herb Active Comparative View */}
      {activeGroup ? (
        <div className="space-y-6">
          {/* Herb Overview Card */}
          <div className="p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--line)]">
                    Canonical Entity
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    Documented across {activeGroup.treatisesCount} treatises ({activeGroup.sourceRecordsCount} canonical records)
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-[var(--ink)]">
                  {activeGroup.canonicalEntity}
                  {activeGroup.vernacularNames.length > 0 && (
                    <span className="text-xl font-normal text-[var(--accent)] ml-3">
                      ({activeGroup.vernacularNames.join(', ')})
                    </span>
                  )}
                </h3>
              </div>

              {/* Primary Relationship Badge */}
              {primaryRelMeta && (
                <div className="lg:text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-1">
                    How the sources relate
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${primaryRelMeta.badgeClass}`}>
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>{primaryRelMeta.label}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Botanical Taxon & Safety Disclosure */}
            <div className="pt-4 border-t border-[var(--line)] space-y-2">
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block">
                Botanical Identity Audit:
              </span>
              
              {activeGroup.isBotanicallyAmbiguous ? (
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Botanical Homonym / Multi-Candidate Precaution</span>
                  </div>
                  <p className="leading-relaxed">
                    {activeGroup.botanicalAmbiguityNote}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeGroup.botanicalIdentities.map(b => {
                      const confLabel = getBotanicalConfidenceLabel(b.confidence);
                      return (
                        <div key={b.latin} className="px-2.5 py-1 rounded-lg bg-[var(--canvas)] border border-amber-500/30 flex items-center gap-2 text-[11px]">
                          <span className="font-mono italic text-[var(--ink)]">{b.latin}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] border ${confLabel.badgeClass}`}>
                            {confLabel.shortLabel}
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">({b.sourcesCount} records)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {activeGroup.botanicalIdentities.map(b => {
                    const confLabel = getBotanicalConfidenceLabel(b.confidence);
                    return (
                      <div key={b.latin} className="px-3 py-1 rounded-lg bg-[var(--surface)] border border-[var(--line)] flex items-center gap-2 text-xs">
                        <span className="font-mono italic text-[var(--ink)]">{b.latin}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] border ${confLabel.badgeClass}`}>
                          {confLabel.shortLabel}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">({b.sourcesCount} records)</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Relationship Plain-Language Summary */}
            <div className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--line)] text-xs text-[var(--muted)]">
              <span className="font-semibold text-[var(--ink)] mr-1.5">Collation Summary:</span>
              <span>{activeGroup.relationshipSummary}</span>
            </div>
          </div>

          {/* Individual Source Record Comparison Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                <span>Indexed Treatise Source Records ({activeGroup.records.length})</span>
              </h4>
              <span className="text-xs font-mono text-[var(--muted)]">
                Open a record to inspect its indexed transcription
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeGroup.records.map((rec) => {
                const verLabel = getVerificationStatusLabel(rec.verificationStatus);
                const relLabel = getTraditionalClaimRelationshipLabel(rec.relationshipToGroup);
                const botLabel = getBotanicalConfidenceLabel(rec.botanicalConfidence);

                return (
                  <div
                    key={rec.entryId}
                    className="p-5 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] hover:border-[#4A6355] transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Bar: Source Title & Page */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--line)]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C5A059] text-[#0B130E] font-bold">
                              Folio Pg {rec.page}
                            </span>
                            {rec.isGoldCorpus && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--line)]/40">
                                Gold Corpus
                              </span>
                            )}
                          </div>
                          <h5 className="font-serif text-base font-bold text-[var(--ink)] mt-1">
                            {rec.sourceTitle}
                          </h5>
                        </div>

                        {/* Source Verification Badge */}
                        <div className="text-right shrink-0">
                          <span 
                            className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded border ${verLabel.badgeClass}`}
                            title={verLabel.description}
                          >
                            {verLabel.shortLabel}
                          </span>
                        </div>
                      </div>

                      {/* Relationship to Group Badge */}
                      <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[var(--muted)] uppercase">
                            Source-Text Alignment:
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${relLabel.badgeClass}`}>
                            {relLabel.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--muted)] leading-snug">
                          {rec.relationshipNotes}
                        </p>
                      </div>

                      {/* Traditional Indication */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-0.5">
                          Traditional Indication (Ailment):
                        </span>
                        <p className="font-serif text-sm font-bold text-[var(--ink)]">
                          {rec.traditionalIndication}
                        </p>
                      </div>

                      {/* Structured Dimensions Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                          <span className="text-[9px] font-mono text-[var(--muted)] block uppercase">Plant Part Used:</span>
                          <span className="text-[var(--ink)] font-medium">{rec.plantPart}</span>
                        </div>

                        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                          <span className="text-[9px] font-mono text-[var(--muted)] block uppercase">Preparation Method:</span>
                          <span className="text-[var(--ink)] font-medium">{rec.preparation}</span>
                        </div>

                        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                          <span className="text-[9px] font-mono text-[var(--muted)] block uppercase">Vehicle / Anupana:</span>
                          <span className="text-[var(--ink)] font-medium">{rec.anupana}</span>
                        </div>

                        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                          <span className="text-[9px] font-mono text-[var(--muted)] block uppercase">Verbatim Dosage:</span>
                          <span className="text-[var(--ink)] font-medium">{rec.dosage}</span>
                        </div>
                      </div>

                      {/* Ingredients */}
                      {rec.ingredients && rec.ingredients.length > 0 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-1">
                            Structured Ingredients:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {rec.ingredients.map((ing, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted)] border border-[var(--line)]">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Review Flags */}
                      {rec.reviewFlags && rec.reviewFlags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {rec.reviewFlags.map((flag, idx) => (
                            <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-950/50 text-rose-300 border border-rose-800/40">
                              ⚠️ {flag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA: Folio Deep Link */}
                    <div className="pt-3 border-t border-[var(--line)] mt-3">
                      <button
                        onClick={() => onNavigateToFolio(rec.sourceId, rec.page, rec.entryId)}
                        className="w-full py-2 px-3 rounded-xl bg-[var(--surface)] border border-[var(--line)]/40 hover:bg-[#C5A059] hover:text-[#0B130E] text-xs font-mono text-[var(--accent)] transition-all flex items-center justify-center gap-2 group"
                      >
                        <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        <span>Inspect in Codex (Folio Pg {rec.page})</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-[var(--canvas)] border border-[var(--line)] text-[var(--muted)]">
          No matching records found for "{selectedHerb}".
        </div>
      )}
    </div>
  );
};
