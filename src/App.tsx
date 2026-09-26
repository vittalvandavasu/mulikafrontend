import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { 
  AyurvedicEntry, 
  HerbMonograph, 
  SearchResult, 
  UserSubmittedRemedy, 
  ReaderNote, 
  GlossaryTerm, 
  MeasurementUnit, 
  AntidoteEntry, 
  ShodhanamEntry,
  CodexNavigationTarget,
  SavedRemedyItem
} from './types';
import { HomeDiscovery } from './components/HomeDiscovery';
import { searchLibrary, request } from './services/api';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { SearchResultsView } from './components/SearchResultsView';
const ManuscriptReader = lazy(() => import('./components/ManuscriptReader').then(m => ({ default: m.ManuscriptReader }))); 
import { HerbEncyclopedia } from './components/HerbEncyclopedia';
import { AilmentDirectory } from './components/AilmentDirectory';
import { GlossaryAndTools } from './components/GlossaryAndTools';
import { CommunityForum } from './components/CommunityForum';
import { SourcesSection } from './components/SourcesSection';
import { SubmitRemedyModal } from './components/SubmitRemedyModal';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { SavedRemediesDrawer } from './components/SavedRemediesDrawer';
import { DosageConverterModal } from './components/DosageConverterModal';
import { MANUSCRIPT_ENTRIES } from './data/manuscripts';
import { HERB_MONOGRAPHS } from './data/herbs';
import { AILMENT_DIRECTORIES } from './data/ailments';
import { GLOSSARY_TERMS, MEASUREMENT_UNITS, ANTIDOTE_ENTRIES, SHODHANAM_ENTRIES } from './data/glossary';
import { INITIAL_USER_REMEDIES } from './data/userRemedies';

export function App() {
  const [selectedHerbId, setSelectedHerbId] = useState<string | undefined>();
  const [selectedAilmentId, setSelectedAilmentId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<string>('search');
  const [query, setQuery] = useState<string>('');
  const [bookFilter, setBookFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [actionError, setActionError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchController = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const [entries, setEntries] = useState<AyurvedicEntry[]>(MANUSCRIPT_ENTRIES);
  const [herbs, setHerbs] = useState<HerbMonograph[]>(HERB_MONOGRAPHS);
  const [ailments, setAilments] = useState<any[]>(AILMENT_DIRECTORIES);
  const [userRemedies, setUserRemedies] = useState<UserSubmittedRemedy[]>(INITIAL_USER_REMEDIES);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>(GLOSSARY_TERMS);
  const [measurements, setMeasurements] = useState<MeasurementUnit[]>(MEASUREMENT_UNITS);
  const [antidotes, setAntidotes] = useState<AntidoteEntry[]>(ANTIDOTE_ENTRIES);
  const [shodhanam, setShodhanam] = useState<ShodhanamEntry[]>(SHODHANAM_ENTRIES);
  const [notes, setNotes] = useState<ReaderNote[]>([]);

  // Codex Reader Deep Linking Target State
  const [codexTarget, setCodexTarget] = useState<CodexNavigationTarget | null>(null);

  // Modal & Drawer States
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isDosageConverterOpen, setIsDosageConverterOpen] = useState(false);

  const [modalDefaultAilmentId, setModalDefaultAilmentId] = useState<string | undefined>();
  const [modalDefaultAilmentName, setModalDefaultAilmentName] = useState<string | undefined>();
  const [modalDefaultHerb, setModalDefaultHerb] = useState<string | undefined>();

  // Saved Remedies State with localStorage Persistence
  const [savedRemedies, setSavedRemedies] = useState<SavedRemedyItem[]>(() => {
    try {
      const stored = localStorage.getItem('mulika_saved_shelf');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Recent Searches State with localStorage Persistence
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mulika_recent_searches');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Parse URL hash on mount and hashchange for direct deep linking
  const parseUrlHash = () => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const [tab, queryString] = hash.split('?');
      if (tab === 'codex' || tab === 'compare') {
        const params = new URLSearchParams(queryString || '');
        const compareHerb = params.get('compare') || params.get('herb') || undefined;
        const isCompareMode = tab === 'compare' || !!compareHerb || params.get('view') === 'compare';
        const book = params.get('book') || params.get('source') || 'mulika';
        const page = parseInt(params.get('page') || '3', 10);
        const entryId = params.get('entry') || undefined;

        setCodexTarget({
          bookId: book,
          page: isNaN(page) ? 3 : page,
          entryId,
          returnTab: params.get('return') || 'search',
          initialViewMode: isCompareMode ? 'compare' : undefined,
          initialCompareHerb: compareHerb
        });
        setActiveTab('codex');
      } else if (['search', 'herbs', 'ailments', 'glossary', 'community', 'sources'].includes(tab)) {
        setActiveTab(tab);
      }
    } catch (e) {
      console.warn('Could not parse URL hash:', e);
    }
  };

  useEffect(() => {
    parseUrlHash();
    window.addEventListener('hashchange', parseUrlHash);
    return () => window.removeEventListener('hashchange', parseUrlHash);
  }, []);

  // Sync hash whenever tab or codexTarget changes
  const updateUrlHash = (tab: string, target?: CodexNavigationTarget | null) => {
    try {
      if (tab === 'codex' && target) {
        if (target.initialViewMode === 'compare') {
          const queryPart = target.initialCompareHerb ? `compare=${encodeURIComponent(target.initialCompareHerb)}` : 'view=compare';
          window.history.replaceState(null, '', `#codex?${queryPart}&return=${encodeURIComponent(target.returnTab || 'search')}`);
        } else {
          const queryPart = `book=${encodeURIComponent(target.bookId)}&page=${target.page}${target.entryId ? `&entry=${encodeURIComponent(target.entryId)}` : ''}`;
          window.history.replaceState(null, '', `#codex?${queryPart}&return=${encodeURIComponent(target.returnTab || 'search')}`);
        }
      } else {
        window.history.replaceState(null, '', `#${tab}`);
      }
    } catch {
      // safe fallback
    }
  };

  // Fetch all initial metadata from server
  useEffect(() => {
    // 1. Fetch entries
    fetch('/api/entries')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setEntries(data))
      .catch(() => setEntries(MANUSCRIPT_ENTRIES));

    // 2. Fetch herbs
    fetch('/api/herbs')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setHerbs(data))
      .catch(() => setHerbs(HERB_MONOGRAPHS));

    // 3. Fetch ailments
    fetch('/api/ailments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setAilments(data))
      .catch(() => setAilments(AILMENT_DIRECTORIES));

    // 4. Fetch user remedies
    fetch('/api/user-remedies')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setUserRemedies(data))
      .catch(() => setUserRemedies(INITIAL_USER_REMEDIES));

    // 5. Fetch glossary
    fetch('/api/glossary')
      .then(res => res.json())
      .then(data => {
        if (data.terms) setGlossaryTerms(data.terms);
        if (data.measurements) setMeasurements(data.measurements);
        if (data.antidotes) setAntidotes(data.antidotes);
        if (data.shodhanam) setShodhanam(data.shodhanam);
      })
      .catch(() => {});

    // 6. Fetch community notes
    fetch('/api/community')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setNotes(data))
      .catch(() => {});


  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setActiveTab('search');
    updateUrlHash('search');

    // Update recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== searchQuery.trim().toLowerCase());
      const updated = [searchQuery.trim(), ...filtered].slice(0, 6);
      try {
        localStorage.setItem('mulika_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    setSearchError(null);
    setSearchResult(null);
    setQuery(searchQuery);
    try {
      const result = await searchLibrary(searchQuery, bookFilter, categoryFilter, controller.signal);
      if (!controller.signal.aborted) setSearchResult(result);
    } catch (err) {
      if (!controller.signal.aborted) setSearchError('We couldn’t reach the Mulika library. Please try again.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  // Save recipe to shelf toggle
  const handleSaveRecipe = (entry: AyurvedicEntry) => {
    setSavedRemedies((prev) => {
      const exists = prev.some(item => item.id === entry.id);
      let updated: SavedRemedyItem[];
      if (exists) {
        updated = prev.filter(item => item.id !== entry.id);
      } else {
        const newItem: SavedRemedyItem = {
          id: entry.id,
          savedAt: Date.now(),
          entry,
          notes: ''
        };
        updated = [newItem, ...prev];
      }
      try {
        localStorage.setItem('mulika_saved_shelf', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isRecipeSaved = (entryId: string): boolean => {
    return savedRemedies.some(item => item.id === entryId);
  };

  const handleDeleteSavedRemedy = (id: string) => {
    setSavedRemedies((prev) => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('mulika_saved_shelf', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearAllSaved = () => {
    setSavedRemedies([]);
    try {
      localStorage.removeItem('mulika_saved_shelf');
    } catch {}
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('mulika_recent_searches');
    } catch {}
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    updateUrlHash(tabId);
  };

  // Navigates directly into Codex Reader pointing to a specific book and folio page
  const handleNavigateToSource = (bookId: string, page: number, entryId?: string) => {
    const target: CodexNavigationTarget = {
      bookId,
      page,
      entryId,
      returnTab: activeTab === 'codex' ? 'search' : activeTab
    };
    setCodexTarget(target);
    setActiveTab('codex');
    updateUrlHash('codex', target);
    setIsSavedDrawerOpen(false);
  };

  // Navigates directly into Codex Comparative Matrix for a given herb
  const handleNavigateToCompare = (herbName: string) => {
    const target: CodexNavigationTarget = {
      bookId: 'mulika',
      page: 3,
      returnTab: activeTab,
      initialViewMode: 'compare',
      initialCompareHerb: herbName
    };
    setCodexTarget(target);
    setActiveTab('codex');
    updateUrlHash('codex', target);
  };

  // Handles return navigation from Codex Reader back to previous view
  const handleReturnToSearch = () => {
    const returnTo = codexTarget?.returnTab || 'search';
    setActiveTab(returnTo);
    updateUrlHash(returnTo);
  };

  // Modals & User Actions
  const handleOpenSubmitModal = (ailmentId?: string, ailmentName?: string, herb?: string) => {
    setModalDefaultAilmentId(ailmentId);
    setModalDefaultAilmentName(ailmentName);
    setModalDefaultHerb(herb);
    setIsSubmitModalOpen(true);
  };

  const handleUserRemedyCreated = (newRemedy: UserSubmittedRemedy) => {
    setUserRemedies(prev => [newRemedy, ...prev]);
  };

  const handleVoteUserRemedy = async (remedyId: string) => {
    try {
      const result = await request<{ upvotes: number }>(`/api/user-remedies/${remedyId}/vote`, { method: 'POST' });
      setUserRemedies(prev => prev.map(r => r.id === remedyId ? { ...r, upvotes: result.upvotes } : r));
    } catch { setActionError('Your vote could not be saved. Please try again.'); }
  };

  const handleAddNote = async (newNote: { author: string; herb: string; ailment: string; message: string; book_reference?: string }) => {
    const result = await request<{ note: ReaderNote }>('/api/community', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newNote) });
    setNotes(prev => [result.note, ...prev]);
  };
  const handleVoteNote = async (noteId: string) => {
    try {
      const result = await request<{ upvotes: number }>(`/api/community/${noteId}/vote`, { method: 'POST' });
      setNotes(prev => prev.map(n => n.id === noteId ? { ...n, upvotes: result.upvotes } : n));
    } catch { setActionError('Your vote could not be saved. Please try again.'); }
  };
  const herbOptions = herbs.map(h => h.name);
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0B130E]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        totalEntriesCount={entries.length}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenSubmitModal={() => handleOpenSubmitModal()}
        savedCount={savedRemedies.length}
        onOpenSavedRemedies={() => setIsSavedDrawerOpen(true)}
        onOpenConverter={() => setIsDosageConverterOpen(true)}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 pb-24 lg:pb-16">
        {actionError && <div role="alert" className="error-state">{actionError}<button onClick={() => setActionError(null)}>Dismiss</button></div>}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <SearchHero
              compact={!!searchResult || loading || !!searchError}
              query={query}
              setQuery={setQuery}
              onSearch={(q) => handleSearch(q)}
              loading={loading}
              bookFilter={bookFilter}
              setBookFilter={setBookFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              recentSearches={recentSearches}
              onClearRecentSearches={handleClearRecentSearches}
              onOpenSavedRemedies={() => setIsSavedDrawerOpen(true)}
              savedCount={savedRemedies.length}
              onOpenConverter={() => setIsDosageConverterOpen(true)}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {searchError && <div className="error-state" role="alert"><h2>We couldn’t reach the Mulika library.</h2><p>No answer has been generated. {searchError}</p><button className="primary-button" onClick={() => handleSearch(query)}>Retry search</button></div>}
              {!searchResult && !loading && !searchError && <HomeDiscovery entries={entries} herbs={herbs} navigate={handleTabChange} search={handleSearch}/>}
              <SearchResultsView
                searchResult={searchResult}
                loading={loading}
                onSelectHerb={(herbName) => {
                  setQuery(herbName);
                  handleSearch(herbName);
                }}
                onSearch={(q) => {
                  setQuery(q);
                  handleSearch(q);
                }}
                onOpenSubmitModal={(condition) => {
                  handleOpenSubmitModal(undefined, condition, undefined);
                }}
                onVoteUserRemedy={handleVoteUserRemedy}
                onNavigateToSource={handleNavigateToSource}
                onNavigateToCompare={handleNavigateToCompare}
                onSaveRecipe={handleSaveRecipe}
                isRecipeSaved={isRecipeSaved}
                onOpenConverter={() => setIsDosageConverterOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'codex' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<p role="status" className="loading-state">Opening the manuscript reader…</p>}><ManuscriptReader
              entries={entries}
              onSelectHerb={(herbName) => {
                setQuery(herbName);
                handleSearch(herbName);
              }}
              targetBookId={codexTarget?.bookId}
              targetPage={codexTarget?.page}
              targetEntryId={codexTarget?.entryId}
              initialViewMode={codexTarget?.initialViewMode === 'compare' ? 'compare' : undefined}
              initialCompareHerb={codexTarget?.initialCompareHerb}
              returnTab={codexTarget?.returnTab}
              onReturnToSearch={handleReturnToSearch}
              onNavigatePage={(bookId, page, entryId) => {
                const updated: CodexNavigationTarget = {
                  bookId,
                  page,
                  entryId,
                  returnTab: codexTarget?.returnTab || 'search'
                };
                setCodexTarget(updated);
                updateUrlHash('codex', updated);
              }}
            /></Suspense>
          </div>
        )}

        {activeTab === 'herbs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HerbEncyclopedia
              initialHerbId={selectedHerbId}
              onNavigateToSource={handleNavigateToSource}
              onNavigateToCompare={handleNavigateToCompare}
              herbs={herbs}
              entries={entries}
              userRemedies={userRemedies}
              onSelectHerbForSearch={(herbQuery) => {
                setQuery(herbQuery);
                handleSearch(herbQuery);
              }}
              onSelectAilment={(ailmentId) => {
                  setSelectedAilmentId(ailmentId);
                setActiveTab('ailments');
                updateUrlHash('ailments');
              }}
              onVoteUserRemedy={handleVoteUserRemedy}
            />
          </div>
        )}

        {activeTab === 'ailments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AilmentDirectory
              initialAilmentId={selectedAilmentId}
              ailments={ailments}
              herbs={herbs}
              manuscriptEntries={entries}
              userRemedies={userRemedies}
              onSelectHerb={(herbId) => {
                setSelectedHerbId(herbId);
                setActiveTab('herbs');
                updateUrlHash('herbs');
              }}
              onOpenSubmitModal={handleOpenSubmitModal}
              onVoteUserRemedy={handleVoteUserRemedy}
              onNavigateToCodex={handleNavigateToSource}
              onSaveRecipe={handleSaveRecipe}
              isRecipeSaved={isRecipeSaved}
            />
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlossaryAndTools
              terms={glossaryTerms}
              measurements={measurements}
              antidotes={antidotes}
              shodhanam={shodhanam}
            />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CommunityForum
              notes={notes}
              userRemedies={userRemedies}
              onAddNote={handleAddNote}
              onVoteNote={handleVoteNote}
              onVoteUserRemedy={handleVoteUserRemedy}
              onOpenSubmitRemedyModal={() => handleOpenSubmitModal()}
              herbOptions={herbOptions}
            />
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SourcesSection
              onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
              onNavigateToCodex={() => {
                setActiveTab('codex');
                updateUrlHash('codex');
              }}
              onNavigateToSource={handleNavigateToSource}
            />
          </div>
        )}
      </main>

      {/* Saved Remedies Drawer */}
      <SavedRemediesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedRemedies={savedRemedies}
        onRemoveRemedy={handleDeleteSavedRemedy}
        onClearAll={handleClearAllSaved}
        onConsultRemedy={(q) => {
          setQuery(q);
          handleSearch(q);
          setIsSavedDrawerOpen(false);
        }}
        onOpenFolio={handleNavigateToSource}
      />

      {/* Classical Measurement Unit Converter Modal */}
      <DosageConverterModal
        isOpen={isDosageConverterOpen}
        onClose={() => setIsDosageConverterOpen(false)}
      />

      {/* Submit Remedy Modal */}
      <SubmitRemedyModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        defaultAilmentId={modalDefaultAilmentId}
        defaultAilmentName={modalDefaultAilmentName}
        defaultHerb={modalDefaultHerb}
        onSuccess={handleUserRemedyCreated}
      />

      {/* Technical Architecture & API Diagnostics Modal */}
      <SystemArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}

export default App;
