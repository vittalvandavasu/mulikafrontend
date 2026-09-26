import React, { useState, useMemo, useEffect } from 'react';
import { AyurvedicEntry, SourceVerificationStatus, BotanicalConfidence } from '../types';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowLeft, 
  AlertTriangle, 
  Info,
  Layers,
  FileQuestion,
  ExternalLink,
  GitCompare
} from 'lucide-react';
import { getGoldCorpusRecord } from '../data/goldCorpusRegistry';
import { 
  getVerificationStatusLabel, 
  getEvidenceLevelLabel, 
  getBotanicalConfidenceLabel 
} from '../lib/provenanceLabels';
import { CrossSourceComparatorView } from './CrossSourceComparatorView';

interface ManuscriptReaderProps {
  entries: AyurvedicEntry[];
  onSelectHerb: (herbName: string) => void;
  targetBookId?: string;
  targetPage?: number;
  targetEntryId?: string;
  returnTab?: string;
  onReturnToSearch?: () => void;
  onNavigatePage?: (bookId: string, page: number, entryId?: string) => void;
  initialViewMode?: 'parallel' | 'cards' | 'audit' | 'compare';
  initialCompareHerb?: string;
}

import { BOOKS } from '../data/books';
export { BOOKS } from '../data/books';

export const ManuscriptReader: React.FC<ManuscriptReaderProps> = ({ 
  entries, 
  onSelectHerb,
  targetBookId,
  targetPage,
  targetEntryId,
  returnTab,
  onReturnToSearch,
  onNavigatePage,
  initialViewMode,
  initialCompareHerb
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>('mulika');
  const [activePage, setActivePage] = useState<number>(3);
  const [highlightEntryId, setHighlightEntryId] = useState<string | null>(null);
  const [pageSearchQuery, setPageSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'parallel' | 'cards' | 'audit' | 'compare'>(initialViewMode || 'parallel');
  const [selectedCompareHerb, setSelectedCompareHerb] = useState<string | undefined>(initialCompareHerb);
  const [textScale, setTextScale] = useState(100);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Sync with initialViewMode and initialCompareHerb if provided
  useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
    if (initialCompareHerb) {
      setSelectedCompareHerb(initialCompareHerb);
    }
  }, [initialViewMode, initialCompareHerb]);

  // Sync with targetBookId & targetPage whenever props change (Deep Linking)
  useEffect(() => {
    if (targetBookId) {
      const matchedBook = BOOKS.find(b => b.id === targetBookId);
      const validBookId = matchedBook ? matchedBook.id : 'mulika';
      setSelectedBookId(validBookId);

      const targetBookObj = BOOKS.find(b => b.id === validBookId) || BOOKS[0];
      if (targetPage && (targetBookObj.available_pages.includes(targetPage) || entries.some(e => e.source_id === validBookId && e.page === targetPage))) {
        setActivePage(targetPage);
      } else if (targetBookObj.available_pages.length > 0) {
        setActivePage(targetBookObj.available_pages[0]);
      }
    }
    if (targetEntryId) {
      setHighlightEntryId(targetEntryId);
    }
  }, [targetBookId, targetPage, targetEntryId]);

  const currentBook = useMemo(() => {
    const book = BOOKS.find(b => b.id === selectedBookId) || BOOKS[0];
    return { ...book, available_pages: Array.from(new Set([...book.available_pages, ...entries.filter(e => e.source_id === book.id).map(e => e.page)])).sort((a,b) => a-b) };
  }, [selectedBookId, entries]);

  // When book changes, switch active page to first available page of that book
  const handleBookChange = (bookId: string) => {
    setSelectedBookId(bookId);
    const targetBook = BOOKS.find(b => b.id === bookId);
    const newPage = (targetBook && targetBook.available_pages.length > 0) ? targetBook.available_pages[0] : 1;
    setActivePage(newPage);
    setHighlightEntryId(null);
    if (onNavigatePage) {
      onNavigatePage(bookId, newPage);
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setActivePage(pageNumber);
    setHighlightEntryId(null);
    if (onNavigatePage) {
      onNavigatePage(selectedBookId, pageNumber);
    }
  };

  // Get all entries for the selected book
  const bookEntries = useMemo(() => {
    return entries.filter(e => e.source_id === selectedBookId);
  }, [entries, selectedBookId]);

  // Get all entries on the current page
  const currentPageEntries = useMemo(() => {
    return bookEntries.filter(e => e.page === activePage);
  }, [bookEntries, activePage]);

  // Filtered entries for search inside book
  const filteredBookEntries = useMemo(() => {
    if (!pageSearchQuery.trim()) return bookEntries;
    const q = pageSearchQuery.toLowerCase();
    return bookEntries.filter(e =>
      e.herb.toLowerCase().includes(q) ||
      e.telugu.includes(q) ||
      e.ailment.toLowerCase().includes(q) ||
      e.remedy.toLowerCase().includes(q) ||
      (e.ailment_telugu && e.ailment_telugu.includes(q))
    );
  }, [bookEntries, pageSearchQuery]);

  // Handle previous and next page navigation
  const handlePrevPage = () => {
    const pages = currentBook.available_pages;
    const currentIndex = pages.indexOf(activePage);
    if (currentIndex > 0) {
      handlePageSelect(pages[currentIndex - 1]);
    }
  };

  const handleNextPage = () => {
    const pages = currentBook.available_pages;
    const currentIndex = pages.indexOf(activePage);
    if (currentIndex < pages.length - 1) {
      handlePageSelect(pages[currentIndex + 1]);
    }
  };

  const handleCopyCitation = () => {
    const citation = `Source: ${currentBook.title} (${currentBook.telugu_title}), Page ${activePage}. Indexed Telugu manuscript reference. Indexed remedies: ${currentPageEntries.map(e => `${e.herb} for ${e.ailment}`).join('; ')}.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 3000);
  };

  return (
    <div className="archive-shell py-8 space-y-8 animate-fadeIn">
      {/* Header & Return Navigation Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          {returnTab && onReturnToSearch && (
            <button
              onClick={onReturnToSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--surface)] border border-[var(--line)]/40 text-xs font-mono text-[var(--accent)] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{returnTab === 'search' ? 'Return to search results' : 'Return to previous view'}</span>
            </button>
          )}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>THE MANUSCRIPT LIBRARY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">
            Manuscript reader
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">
            Read indexed Telugu transcriptions alongside translation, source references, and editorial review.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setViewMode('parallel')}
            className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
              viewMode === 'parallel'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            Read
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
              viewMode === 'cards'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            Records
          </button>
          <button
            onClick={() => setViewMode('audit')}
            className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
              viewMode === 'audit'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            Editorial review
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 min-h-[36px] ${
              viewMode === 'compare'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Book Shelf Selector (Hidden in Audit Log and Cross-Source Comparison modes) */}
      {viewMode !== 'audit' && viewMode !== 'compare' && (
        <div className="reader-selection"><label>Manuscript<select value={selectedBookId} onChange={e => handleBookChange(e.target.value)}>{BOOKS.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}</select></label><details><summary>Source metadata</summary><p>{currentBook.author} · {currentBook.year_era}</p><p>{currentBook.description}</p></details></div>
      )}

      {/* Main Page Viewer Section */}
      {viewMode !== 'audit' && viewMode !== 'compare' && (
        <div className="space-y-6">
          {/* Page Bar Controller */}
          <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            {/* Page Jumper */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrevPage}
                disabled={currentBook.available_pages.indexOf(activePage) === 0}
                className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[#C5A059] hover:text-[#0B130E] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:hover:text-[var(--ink)] transition-all"
                title="Previous Digitized Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[var(--muted)] uppercase">Page:</span>
                <select aria-label="Jump to page" value={activePage} onChange={e => handlePageSelect(Number(e.target.value))} className="reader-page-select">{currentBook.available_pages.map(p => <option key={p} value={p}>Page {p}</option>)}</select>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentBook.available_pages.indexOf(activePage) === currentBook.available_pages.length - 1}
                className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[#C5A059] hover:text-[#0B130E] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:hover:text-[var(--ink)] transition-all"
                title="Next Digitized Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <label className="text-xs text-[var(--muted)]">Text size<select aria-label="Manuscript text size" className="reader-page-select" value={textScale} onChange={e => setTextScale(Number(e.target.value))}><option value={100}>100%</option><option value={125}>125%</option><option value={150}>150%</option></select></label>{/* Quick In-Book Search & Citation Tools */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={pageSearchQuery}
                  onChange={(e) => setPageSearchQuery(e.target.value)}
                  placeholder={`Search inside ${currentBook.title.split(' ')[0]}...`}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--ink)] placeholder-[#6B8E7B] focus:outline-none focus:border-[var(--line)]"
                />
              </div>

              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--accent)] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all shrink-0 font-medium"
                title="Copy academic manuscript citation"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Citation Copied' : 'Cite Folio'}</span>
              </button>
            </div>
          </div>

          {/* Parallel Codex View (Source-First Primary vs Apparatus) */}
          {viewMode === 'parallel' && (
            <div className="space-y-6">
              {/* Scan Availability & Authenticity Disclosure Banner */}
              <div className="p-4 rounded-xl bg-[var(--canvas)] border border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2.5">
                  <FileQuestion className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div>
                    <strong className="text-[var(--ink)]">Physical Scan Status: </strong>
                    <span>Source scan unavailable in this collection. Showing the indexed transcription and source metadata.</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--line)] shrink-0">
                  {currentBook.id} · Folio {activePage}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Historical Primary Source Material (Telugu Script & Transliteration) */}
                <div style={{'--reader-scale': textScale / 100} as React.CSSProperties} className="reader-transcription lg:col-span-6 bg-[#FBF8EE] text-[#1A2620] rounded-2xl p-6 sm:p-8 border border-[#DFD5BE] shadow-2xl space-y-6 relative overflow-hidden">
                  {/* Primary Source Header */}
                  <div className="border-b border-[#D5C9AE] pb-4 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C5A20] block font-bold">
                        A. PRIMARY SOURCE MATERIAL & TRANSCRIPTION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A2620]">
                        {currentBook.telugu_title}
                      </h3>
                      <p className="text-xs text-[#5E513D]">{currentBook.title} — {currentBook.author}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-[var(--surface)] text-[#FBF8EE] font-mono text-xs px-3 py-1 rounded font-bold">
                        పుట {activePage} (Page {activePage})
                      </span>
                    </div>
                  </div>

                  {/* Page Telugu Content Stream */}
                  <div className="space-y-6 text-sm leading-relaxed">
                    {currentPageEntries.length === 0 ? (
                      <div className="py-12 text-center text-[#7C5A20] italic font-serif">
                        No direct recipes indexed for Page {activePage} in the current transcription batch.
                      </div>
                    ) : (
                      currentPageEntries.map((entry, idx) => {
                        const isTargeted = highlightEntryId === entry.id;
                        const goldRecord = getGoldCorpusRecord(entry.id);
                        const verificationProvenance = getVerificationStatusLabel(entry.verification_status);

                        return (
                          <div 
                            key={entry.id} 
                            id={`entry-${entry.id}`}
                            className={`p-5 rounded-xl border transition-all space-y-3 ${
                              isTargeted 
                                ? 'bg-[#F5ECCF] border-[#7C5A20] ring-2 ring-[#7C5A20]/40' 
                                : 'bg-[#F2EBD9] border-[#D5C9AE]'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-[#DFD5BE] pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#7C5A20] text-[#FBF8EE] font-mono text-[10px] flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <span className="font-serif font-bold text-lg text-[#1A2620]">
                                  {entry.telugu} ({entry.herb})
                                </span>
                              </div>
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E4D9C2] text-[#5E513D] font-bold">
                                {entry.ailment_telugu || entry.ailment}
                              </span>
                            </div>

                            {/* Telugu Verbatim Formula / Recipe Description */}
                            <div className="space-y-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C5A20] block">
                                మూల శ్లోకం / వచనం (Telugu Transcription):
                              </span>
                              <p className="text-[#1A2620] font-serif leading-relaxed text-sm font-medium">
                                "{entry.remedy_telugu || entry.remedy}"
                              </p>
                            </div>

                            {/* ISO 15919 Transliteration */}
                            {entry.transliteration_iso15919 && (
                              <div className="p-2.5 rounded bg-[#E8DEC7] border border-[#D5C9AE]/60 space-y-0.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C5A20] block font-bold">
                                  C. ISO 15919 Transliteration:
                                </span>
                                <p className="text-xs font-mono italic text-[#3E3426]">
                                  {entry.transliteration_iso15919}
                                </p>
                              </div>
                            )}

                            {/* Provenance Verification Badge */}
                            <div className="flex items-center justify-between text-xs text-[#5E513D] pt-1">
                              <span><b>స్వరూపం (Form):</b> {entry.preparation_type || 'Churna/Kashaya'}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0D4BA] text-[#4A3C26] font-bold">
                                {verificationProvenance.shortLabel}
                              </span>
                            </div>

                            {/* Cross-Source Treatise Comparison Quick-Link */}
                            <div className="pt-2 border-t border-[#D5C9AE]/60 flex items-center justify-between text-xs">
                              <span className="text-[10px] font-mono text-[#7C5A20]/80">Mulika Collation</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCompareHerb(entry.herb);
                                  setViewMode('compare');
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#7C5A20] hover:text-[#0B130E] hover:underline"
                                title="Compare how this herb is described across all indexed treatises"
                              >
                                <GitCompare className="w-3 h-3 text-[#7C5A20]" />
                                <span>Compare Across Treatises →</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Folio Footer Note */}
                  <div className="pt-4 border-t border-[#D5C9AE] flex items-center justify-between text-[11px] text-[#7C5A20]">
                    <span>Cataloged from Public Domain Palm-Leaf & Printed Treatises</span>
                    <span className="font-mono">Citation: {selectedBookId}-p{activePage}</span>
                  </div>
                </div>

                {/* Right Column: Translation & Structured Knowledge Interpretation */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                        <Sparkles className="w-4 h-4" />
                        <span>D. Translation & E. Structured Knowledge</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas)] border border-[var(--line)] text-[var(--muted)]">
                        {currentPageEntries.length} Formulations on Page
                      </span>
                    </div>

                    {currentPageEntries.map((entry) => {
                      const goldRecord = getGoldCorpusRecord(entry.id);
                      const isTargeted = highlightEntryId === entry.id;
                      const verificationProvenance = getVerificationStatusLabel(entry.verification_status);
                      const evidenceProvenance = getEvidenceLevelLabel(entry.evidence_level);
                      const botanicalProvenance = getBotanicalConfidenceLabel(entry.botanical_confidence);

                      return (
                        <div
                          key={entry.id}
                          className={`p-5 rounded-xl border transition-all space-y-4 ${
                            isTargeted
                              ? 'bg-[var(--surface)] border-[var(--line)] shadow-lg ring-1 ring-[#C5A059]'
                              : 'bg-[var(--canvas)] border-[var(--line)] hover:border-[#4A6355]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
                                  {entry.herb} <span className="text-sm font-normal text-[var(--accent)]">({entry.telugu})</span>
                                </h4>
                                {goldRecord && (
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[var(--accent)] border border-[var(--line)]/40 font-bold">
                                    Gold Corpus Record
                                  </span>
                                )}
                              </div>
                              {entry.botanical && (
                                <p className="text-xs text-[var(--muted)] italic font-sans">{entry.botanical}</p>
                              )}
                            </div>

                            <button
                              onClick={() => onSelectHerb(entry.herb)}
                              className="text-xs px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--line)] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-medium shrink-0"
                            >
                              Herb Dossier →
                            </button>
                          </div>

                          {/* Plain-Language Provenance & Evidence Header */}
                          <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--line)] space-y-1.5 text-xs">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${verificationProvenance.badgeClass}`}>
                                {verificationProvenance.label}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${evidenceProvenance.badgeClass}`}>
                                {evidenceProvenance.shortLabel}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${botanicalProvenance.badgeClass}`}>
                                {botanicalProvenance.shortLabel}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                              {verificationProvenance.description}
                            </p>
                          </div>

                          {/* English Translation */}
                          <div className="text-xs text-[var(--ink)] bg-[var(--surface)] p-3 rounded-lg border border-[var(--line)] space-y-1">
                            <span className="font-semibold text-[var(--accent)] block">Target Indication: {entry.ailment}</span>
                            <p className="text-[var(--ink)]/90 leading-relaxed font-sans">{entry.remedy}</p>
                          </div>

                          {/* Structured Interpretation Table (Gold Corpus & Full Knowledge Breakdown) */}
                          <div className="p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] space-y-2 text-xs font-mono text-[var(--muted)]">
                            <div className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-bold border-b border-[#1A2C22] pb-1 font-sans">
                              <Layers className="w-3.5 h-3.5" />
                              <span>Structured Clinical & Philological Apparatus:</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                              <div>
                                <span className="text-[var(--muted)] block">Plant Part Used:</span>
                                <strong className="text-[var(--ink)] font-sans">
                                  {goldRecord?.plant_part_used || (Array.isArray(entry.plant_part_used) ? entry.plant_part_used.join(', ') : entry.plant_part_used) || 'Not stated in source'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-[var(--muted)] block">Anupana (Vehicle):</span>
                                <strong className="text-[var(--ink)] font-sans">
                                  {goldRecord?.anupana_vehicle || entry.anupana_vehicle || 'Not stated in source'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-[var(--muted)] block">Verbatim Dosage:</span>
                                <strong className="text-[var(--ink)] font-sans">
                                  {goldRecord?.dosage_verbatim || entry.dosage_verbatim || 'Not stated in source'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-[var(--muted)] block">Preparation Type:</span>
                                <strong className="text-[var(--ink)] font-sans">
                                  {entry.preparation_type || 'Not stated in source'}
                                </strong>
                              </div>
                            </div>

                            {/* Structured Ingredients List */}
                            {goldRecord?.ingredients_structured && goldRecord.ingredients_structured.length > 0 && (
                              <div className="pt-2 border-t border-[#1A2C22]">
                                <span className="text-[var(--muted)] text-[10px] block mb-1">Structured Formulation Ingredients:</span>
                                <div className="flex flex-wrap gap-1">
                                  {goldRecord.ingredients_structured.map((ing, idx) => (
                                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)]">
                                      {ing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Review Flags & Cautions */}
                            {goldRecord?.review_flags && goldRecord.review_flags.length > 0 && (
                              <div className="pt-2 border-t border-[#1A2C22]">
                                <span className="text-amber-400 text-[10px] font-bold block mb-1">Specialist Review Flags:</span>
                                <div className="flex flex-wrap gap-1">
                                  {goldRecord.review_flags.map((flag, idx) => (
                                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
                                      ⚠ {flag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Scholarly Notes */}
                            {goldRecord?.scholarly_notes && (
                              <div className="pt-2 border-t border-[#1A2C22] text-[11px] font-sans text-[var(--muted)]">
                                <span className="text-[var(--accent)] font-semibold block">Collation & Scholarly Note:</span>
                                <p className="mt-0.5 leading-relaxed italic">{goldRecord.scholarly_notes}</p>
                              </div>
                            )}
                          </div>

                          {entry.verification_note && (
                            <div className="text-[11px] text-[var(--muted)] flex items-start gap-1.5 pt-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                              <span><b>Manuscript Annotation:</b> {entry.verification_note}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Summary & Dosage Notice */}
                    <div className="p-4 rounded-xl bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-2">
                      <div className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Formulation Preparation Standards</span>
                      </div>
                      <p className="leading-relaxed">
                        All classical swarasas (fresh juices) must be prepared from cleaned, de-stemmed fresh plant parts. For kashayams (decoctions), the standard manuscript reduction ratio is 16 parts fresh water boiled down to 4 parts unless specified otherwise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards View: Grid of all recipes in current book */}
          {viewMode === 'cards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--muted)] uppercase">
                  Showing {filteredBookEntries.length} Verified Formulations across all digitized pages of {currentBook.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-4 shadow-xl flex flex-col justify-between hover:border-[var(--line)] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                        <button
                          onClick={() => {
                            setActivePage(item.page);
                            setHighlightEntryId(item.id);
                            setViewMode('parallel');
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas)] text-[var(--accent)] border border-[var(--line)] font-bold hover:bg-[#C5A059] hover:text-[#0B130E] transition-all"
                        >
                          Page {item.page.toString().padStart(2, '0')} (Open Folio)
                        </button>
                        <span className="text-[11px] font-mono text-[var(--muted)]">
                          {item.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold text-[var(--ink)]">
                          {item.herb}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--accent)]">{item.telugu}</span>
                        {item.botanical && (
                          <p className="text-[11px] text-[var(--muted)] italic">{item.botanical.split('(')[0]}</p>
                        )}
                      </div>

                      <div className="p-3 bg-[var(--canvas)] rounded-lg border border-[var(--line)] text-xs space-y-1">
                        <span className="font-bold text-[var(--ink)] block">Ailment: {item.ailment}</span>
                        <p className="text-[var(--ink)]/80 italic">"{item.remedy}"</p>
                      </div>

                      {item.verification_note && (
                        <p className="text-[11px] text-[var(--muted)] italic">
                          <b>Note:</b> {item.verification_note}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setSelectedCompareHerb(item.herb);
                          setViewMode('compare');
                        }}
                        className="text-[var(--accent)] font-mono text-[11px] hover:underline inline-flex items-center gap-1"
                        title="Compare across indexed treatises"
                      >
                        <GitCompare className="w-3 h-3" />
                        <span>Compare Sources</span>
                      </button>
                      <button
                        onClick={() => onSelectHerb(item.herb)}
                        className="text-[var(--accent)] font-medium hover:underline"
                      >
                        Herb Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editorial review View */}
      {viewMode === 'audit' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[var(--ink)] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
              <span>Full Manuscript Digitization & Verification Protocol</span>
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
              Every single entry in the Mulika repository undergoes a four-stage digital transcription protocol: High-Resolution Optical Capture → Verbatim Telugu OCR Transliteration → Vaidya Editorial Verification → Modern Botanical Taxon & AYUSH TKDL Cross-Referencing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOOKS.map((b) => {
              const entriesInBook = entries.filter(e => e.source_id === b.id);
              return (
                <div key={b.id} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[var(--ink)]">{b.title}</h4>
                      <p className="text-xs text-[var(--accent)] font-semibold">{b.telugu_title} • {b.author}</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)]">
                      {entriesInBook.length} Active Records
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--canvas)] rounded-xl border border-[var(--line)] text-xs space-y-2">
                    <div className="flex justify-between text-[var(--muted)]">
                      <span>Total Book Volume:</span>
                      <b className="text-[var(--ink)]">{b.total_scanned_pages} Pages</b>
                    </div>
                    <div className="flex justify-between text-[var(--muted)]">
                      <span>Digitized Batch Pages:</span>
                      <b className="text-[var(--accent)]">Pages {b.available_pages.join(', ')}</b>
                    </div>
                    <div className="flex justify-between text-[var(--muted)]">
                      <span>Catalog Era:</span>
                      <span className="text-[var(--ink)]">{b.year_era}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--muted)]">
                    <span className="font-semibold text-[var(--ink)] block mb-1">Indexed Medicinal Species:</span>
                    <p className="line-clamp-2">
                      {Array.from(new Set(entriesInBook.map(e => e.herb))).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cross-Source Comparison View */}
      {viewMode === 'compare' && (
        <CrossSourceComparatorView
          entries={entries}
          initialHerb={selectedCompareHerb}
          onNavigateToFolio={(bookId, page, entryId) => {
            const targetBook = BOOKS.find(b => b.id === bookId);
            if (targetBook) {
              setSelectedBookId(targetBook.id);
              setActivePage(page);
              setHighlightEntryId(entryId);
              setViewMode('parallel');
              if (onNavigatePage) {
                onNavigatePage(bookId, page, entryId);
              }
            }
          }}
        />
      )}
    </div>
  );
};
