import { useDialog } from '../hooks/useDialog';
import React, { useState, useMemo } from 'react';
import { HerbMonograph, AyurvedicEntry, UserSubmittedRemedy } from '../types';
import { BotanicalConfidenceBadge } from './ProvenanceDrawer';
import { Search, Leaf, Sparkles, BookOpen, ShieldAlert, X, ChevronRight, CheckCircle2, AlertTriangle, ThumbsUp, Tag } from 'lucide-react';

interface HerbEncyclopediaProps {
  initialHerbId?: string;
  onNavigateToSource?: (book: string, page: number, entry?: string) => void;
  onNavigateToCompare?: (herb: string) => void;
  herbs: HerbMonograph[];
  entries: AyurvedicEntry[];
  userRemedies?: UserSubmittedRemedy[];
  onSelectHerbForSearch: (herbName: string) => void;
  onSelectAilment?: (ailmentId: string) => void;
  onVoteUserRemedy?: (remedyId: string) => void;
}

export const HerbEncyclopedia: React.FC<HerbEncyclopediaProps> = ({
  initialHerbId, onNavigateToSource, onNavigateToCompare,
  herbs,
  entries,
  userRemedies = [],
  onSelectHerbForSearch,
  onSelectAilment,
  onVoteUserRemedy
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<HerbMonograph | null>(() => herbs.find(h => h.id === initialHerbId) || null);
  const dialogRef = useDialog(!!selectedHerb, () => setSelectedHerb(null));

  const filteredHerbs = herbs.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.telugu.includes(searchTerm) ||
    h.botanical.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (h.common_names && h.common_names.some(cn => cn.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const herbRemedies = selectedHerb
    ? entries.filter(e => {
        const herbLower = selectedHerb.name.toLowerCase();
        const eHerbLower = e.herb.toLowerCase();
        const root = selectedHerb.name.split(' ')[0].toLowerCase();
        const teluguClean = selectedHerb.telugu.replace(/[()]/g, ' ').trim().split(/\s+/)[0];
        
        // Match by botanical species genus/species
        const botMatch = selectedHerb.botanical && e.botanical && 
          e.botanical.toLowerCase().includes(selectedHerb.botanical.toLowerCase().split(' ')[0]);
        
        // Match by telugu substring
        const teluguMatch = teluguClean && (e.telugu?.includes(teluguClean) || e.ailment_telugu?.includes(teluguClean));
        
        // Match by english names
        const nameMatch = eHerbLower.includes(root) || herbLower.includes(eHerbLower);

        // Check common names
        const commonMatch = selectedHerb.common_names?.some(cn => {
          const cnRoot = cn.toLowerCase().split(' ')[0];
          return cnRoot.length > 3 && (eHerbLower.includes(cnRoot) || e.remedy.toLowerCase().includes(cnRoot));
        });

        return Boolean(botMatch || teluguMatch || nameMatch || commonMatch);
      })
    : [];

  const herbUserRemedies = selectedHerb
    ? userRemedies.filter(rem => {
        const root = selectedHerb.name.split(' ')[0].toLowerCase();
        return (rem.herb_names || []).some(hn => hn.toLowerCase().includes(root)) ||
          (rem.ingredients || []).some(ing => ing.toLowerCase().includes(root)) ||
          (rem.title || '').toLowerCase().includes(root);
      })
    : [];

  // Dynamic count map for all herbs against digitized entries
  const herbRecipeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    herbs.forEach(herb => {
      const herbLower = herb.name.toLowerCase();
      const root = herb.name.split(' ')[0].toLowerCase();
      const teluguClean = herb.telugu.replace(/[()]/g, ' ').trim().split(/\s+/)[0];

      const matches = entries.filter(e => {
        const eHerbLower = e.herb.toLowerCase();
        const botMatch = herb.botanical && e.botanical && 
          e.botanical.toLowerCase().includes(herb.botanical.toLowerCase().split(' ')[0]);
        const teluguMatch = teluguClean && (e.telugu?.includes(teluguClean) || e.ailment_telugu?.includes(teluguClean));
        const nameMatch = eHerbLower.includes(root) || herbLower.includes(eHerbLower);
        const commonMatch = herb.common_names?.some(cn => {
          const cnRoot = cn.toLowerCase().split(' ')[0];
          return cnRoot.length > 3 && (eHerbLower.includes(cnRoot) || e.remedy.toLowerCase().includes(cnRoot));
        });
        return Boolean(botMatch || teluguMatch || nameMatch || commonMatch);
      }).length;

      counts[herb.id] = matches;
    });
    return counts;
  }, [herbs, entries]);

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
            <Leaf className="w-4 h-4" />
            <span>Ayurvedic Dravyaguna Botanical Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">
            Explore herbs & ingredients
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">
            Transcribed profiles from digitized Telugu manuscripts detailing botanical classifications, classical energetics (Rasa, Virya, Vipaka), associated ailments, and recipe citations.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search plant, botanical, Sanskrit, Telugu..."
            className="w-full bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] placeholder-[#6B8E7B]/70 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[var(--line)]"
          />
          <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Herbs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredHerbs.map((herb) => (
          <div
            key={herb.id}
            role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedHerb(herb); } }}
            onClick={() => setSelectedHerb(herb)}
            className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line)] cursor-pointer transition-all flex flex-col justify-between group shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {herb.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--canvas)] border border-[var(--line)] text-[var(--accent)] shrink-0">
                  {herbRecipeCounts[herb.id] ?? 0} remedies
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[var(--accent)] font-serif">{herb.telugu}</span>
                <span className="text-xs text-[var(--muted)] font-mono">({herb.sanskrit})</span>
              </div>

              <p className="text-xs italic text-[var(--muted)] font-serif truncate">
                {herb.botanical}
              </p>
              <BotanicalConfidenceBadge confidence={herb.botanical_confidence}/>

              <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                {herb.description}
              </p>

              {/* Associated Ailments preview chips */}
              {herb.associated_ailments && herb.associated_ailments.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {herb.associated_ailments.slice(0, 3).map((ailId, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--canvas)] text-[var(--muted)] border border-[var(--line)]">
                      #{ailId}
                    </span>
                  ))}
                  {herb.associated_ailments.length > 3 && (
                    <span className="text-[10px] text-[var(--muted)] self-center">
                      +{herb.associated_ailments.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[var(--muted)]">
                {herb.virya} • {(Array.isArray(herb.rasa) ? herb.rasa[0] : herb.rasa.split(',')[0])}
              </span>
              <span className="text-[var(--accent)] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                <span>Monograph</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredHerbs.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          No herbs found matching "{searchTerm}".
        </div>
      )}

      {/* Monograph Detail Modal */}
      {selectedHerb && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Herb profile" className="fixed inset-0 z-50 bg-[var(--canvas)]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="p-6"><BotanicalConfidenceBadge confidence={selectedHerb.botanical_confidence}/><div className="button-row"><button onClick={() => { onNavigateToCompare?.(selectedHerb.name); setSelectedHerb(null); }}>Compare sources</button></div><details><summary>Manuscript references ({herbRemedies.length})</summary>{herbRemedies.map(e => <button className="source-link" key={e.id} onClick={() => { onNavigateToSource?.(e.source_id,e.page,e.id); setSelectedHerb(null); }}>{e.source_short} · Page {e.page} · {e.ailment}</button>)}</details></div>{/* Modal Header */}
            <div className="sticky top-0 bg-[var(--canvas)] p-6 border-b border-[var(--line)] flex items-start justify-between z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                  <span>{selectedHerb.family}</span>
                  <span>•</span>
                  <span>{selectedHerb.sanskrit}</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[var(--ink)] mt-1">
                  {selectedHerb.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[var(--accent)] font-serif">{selectedHerb.telugu}</span>
                  <span className="text-sm italic text-[var(--muted)] font-serif">{selectedHerb.botanical}</span>
                </div>
              </div>

              <button
                aria-label="Close herb profile" onClick={() => setSelectedHerb(null)}
                className="p-2 rounded-lg bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Botanical Description */}
              <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                {selectedHerb.description}
              </p>

              {/* Classical Ayurvedic Energetics Matrix (Dravyaguna) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider block">Rasa (Taste)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">{selectedHerb.rasa}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider block">Virya (Potency)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--accent)]">{selectedHerb.virya}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider block">Vipaka (Post-Digestive)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">{selectedHerb.vipaka}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider block">Dosha Balance</span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--muted)]">{selectedHerb.dosha_effect}</span>
                </div>
              </div>

              {/* Associated Ailments Section with Links */}
              {selectedHerb.associated_ailments && selectedHerb.associated_ailments.length > 0 && (
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    <Tag className="w-4 h-4" />
                    <span>Linked Ailments & Classical Applications</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedHerb.associated_ailments.map((ailmentId, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onSelectAilment) {
                            setSelectedHerb(null);
                            onSelectAilment(ailmentId);
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs font-mono text-[var(--ink)] hover:border-[var(--line)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
                      >
                        <span>{ailmentId.replace(/-/g, ' ')}</span>
                        <ChevronRight className="w-3 h-3 text-[var(--muted)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Parts Used & Traditional Uses */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  Traditional uses & formulations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedHerb.traditional_uses.map((use, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--ink)] p-2.5 rounded bg-[var(--surface)] border border-[var(--line)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Scientific Evidence */}
              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                  <Sparkles className="w-4 h-4" />
                  <span>Modern references · separate from manuscript evidence</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                  {selectedHerb.modern_evidence}
                </p>
              </div>

              {/* Contraindications */}
              {selectedHerb.contraindications.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Contraindications & Clinical Cautions</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-200/90">
                    {selectedHerb.contraindications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Verified Manuscript Citations */}
              {herbRemedies.length > 0 && (
                <div className="space-y-3 border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                      Traditional manuscript references ({herbRemedies.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {herbRemedies.map((remedy) => (
                      <div
                        key={remedy.id}
                        className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[var(--ink)]">{remedy.ailment}</span>
                            <span className="text-[var(--accent)] font-mono text-[11px]">({remedy.source_short}, Page {remedy.page})</span>
                          </div>
                          <p className="text-[var(--muted)] italic">"{remedy.remedy}"</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedHerb(null);
                            onSelectHerbForSearch(remedy.herb + ' for ' + remedy.ailment);
                          }}
                          className="px-3 py-1.5 rounded bg-[var(--canvas)] border border-[var(--line)] text-[var(--accent)] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-semibold shrink-0"
                        >
                          Run Cross-Ref
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Community Remedies */}
              {herbUserRemedies.length > 0 && (
                <div className="space-y-3 border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      Community Remedies Using {selectedHerb.name} (Unverified)
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {herbUserRemedies.map((rem) => (
                      <div
                        key={rem.id}
                        className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[var(--ink)]">{rem.title}</span>
                          {onVoteUserRemedy && (
                            <button
                              onClick={() => onVoteUserRemedy(rem.id)}
                              className="text-[11px] text-[var(--accent)] flex items-center gap-1 hover:underline"
                            >
                              <ThumbsUp className="w-3 h-3" /> {rem.upvotes}
                            </button>
                          )}
                        </div>
                        <p className="text-[var(--muted)]">{rem.preparation_instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--surface)] border-t border-[var(--line)] flex justify-end gap-3">
              <button
                onClick={() => setSelectedHerb(null)}
                className="px-4 py-2 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface)]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const herbName = selectedHerb.name;
                  setSelectedHerb(null);
                  onSelectHerbForSearch(herbName);
                }}
                className="px-5 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all"
              >
                Search all {selectedHerb.name} remedies
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
