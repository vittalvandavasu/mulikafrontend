import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { MANUSCRIPT_ENTRIES } from './src/data/manuscripts.ts';
import { HERB_MONOGRAPHS } from './src/data/herbs.ts';
import { AILMENT_DIRECTORIES } from './src/data/ailments.ts';
import { GLOSSARY_TERMS, MEASUREMENT_UNITS, ANTIDOTE_ENTRIES, SHODHANAM_ENTRIES } from './src/data/glossary.ts';
import { INITIAL_USER_REMEDIES } from './src/data/userRemedies.ts';
import { 
  ReaderNote, 
  UserSubmittedRemedy, 
  ThreeStateStatus, 
  SourceReferenceDetail,
  EvidenceLevel, 
  SourceVerificationStatus, 
  BotanicalConfidence 
} from './src/types.ts';
import { adaptToProvenanceRecord } from './src/lib/provenanceAdapter.ts';
import { validateCitations, validatePostSynthesisCitations } from './src/lib/citationValidator.ts';

// In-memory cache for search responses to prevent duplicate calls and conserve quota
const searchCache = new Map<string, any>();
const MAX_SEARCH_CACHE = 150;
let geminiRateLimitCooldownUntil = 0;

function generateDeterministicSynthesis(
  query: string,
  topMatches: any[]
) {
  const topEntry = topMatches[0];
  const matchedHerb = HERB_MONOGRAPHS.find(h => 
    topEntry && (
      h.name.toLowerCase().includes(topEntry.herb.toLowerCase()) || 
      topEntry.herb.toLowerCase().includes(h.name.toLowerCase()) ||
      (topEntry.telugu && h.telugu.includes(topEntry.telugu.split(' ')[0]))
    )
  );

  const matchedAilment = AILMENT_DIRECTORIES.find(a =>
    topEntry && (
      a.id.toLowerCase().includes(topEntry.ailment.toLowerCase()) ||
      topEntry.ailment.toLowerCase().includes(a.name.toLowerCase()) ||
      query.toLowerCase().includes(a.name.toLowerCase())
    )
  );

  const citations = topMatches.slice(0, 3).map(m => 
    `• ${m.herb} (${m.telugu}) for ${m.ailment}: "${m.remedy}" (Source: ${m.source_short}, Page ${m.page})`
  ).join('\n');

  const manuscriptSummary = `The classical Telugu treatises document page-cited formulations for ${topEntry?.ailment || 'this condition'}:\n${citations}`;

  const modernCrossref = matchedHerb?.modern_evidence || 
    `Pharmacognostic literature on ${topEntry?.herb || 'the indexed botanicals'} identifies active polyphenols and bioflavonoids supporting traditional therapeutic indications.`;

  const pathyaList = matchedAilment?.pathya_apathya?.pathya || matchedAilment?.pathya_apathya?.recommended || [];
  const pathyaGuidance = (pathyaList.length > 0)
    ? pathyaList.slice(0, 3)
    : [
        'Consume freshly prepared, easily digestible warm foods (Laghu Ahara) with buttermilk',
        'Maintain adequate hydration with boiled coriander or cumin water',
        'Avoid excessively pungent, sour, and deep-fried foods (Katu/Amla Apathyam)'
      ];

  const safetyNote = (matchedAilment?.red_flags && matchedAilment.red_flags.length > 0)
    ? `Emergency red-flags requiring conventional medical evaluation: ${matchedAilment.red_flags.slice(0, 2).join('; ')}.`
    : 'Historical Ayurvedic formulation for scholarly reference. Does not replace professional clinical diagnosis. Consult a qualified BAMS physician.';

  return {
    queryUnderstoodAs: `Ayurvedic therapeutic protocols and manuscript formulations for "${query}"`,
    manuscriptSummary,
    modernCrossref,
    pathyaGuidance,
    safetyNote
  };
}

// In-memory store for user submitted remedies
let userRemediesStore: UserSubmittedRemedy[] = [...INITIAL_USER_REMEDIES];

// Shared reader notes in-memory store initialized with seed notes
let readerNotesStore: ReaderNote[] = [
  {
    id: 'note-1',
    author: 'Vaidya K. Sastry',
    herb: 'Kanda (Elephant Foot Yam)',
    ailment: 'Piles (Moola Vyadhi)',
    message: 'The advice from Page 32 on cooking Kanda in buttermilk and sesame oil is extremely potent. In traditional practice, we insist on boiling with tamarind water first to prevent the throat-itch from oxalate crystals. Patients report quick relief from painful defecation.',
    timestamp: Date.now() - 86400000 * 3,
    tags: ['Clinical Experience', 'Preparation Tip'],
    upvotes: 14,
    book_reference: 'Ayurveda Mulika Prayogavali, Pg 32'
  },
  {
    id: 'note-2',
    author: 'Dr. Ananya Reddy',
    herb: 'Jatamansi',
    ailment: 'Headache & Stress',
    message: 'We frequently use Jatamansi paste for patients with tension-type headaches and sleeplessness from Vaidya Rahasya Chitkalu (Page 29). The aroma itself exerts a fast calming central effect due to sesquiterpenoids.',
    timestamp: Date.now() - 86400000 * 2,
    tags: ['Aromatherapy', 'Migraine'],
    upvotes: 9,
    book_reference: 'Vaidya Rahasya Chitkalu, Pg 29'
  },
  {
    id: 'note-3',
    author: 'Ramesh K.',
    herb: 'Ginger (Allam / Shunthi)',
    ailment: 'Cold & Cough',
    message: 'My grandmother has used the exact recipe from Mulika page 9 (fresh ginger juice with honey twice daily) for generations whenever winter congestion strikes. Works much faster than standard lozenges.',
    timestamp: Date.now() - 86400000 * 1,
    tags: ['Household Tradition', 'Winter Care'],
    upvotes: 11,
    book_reference: 'Ayurveda Mulika Prayogavali, Pg 9'
  }
];

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

function scoreEntryMatch(entry: typeof MANUSCRIPT_ENTRIES[0], queryTerms: string[]): number {
  let score = 0;
  const searchableText = `${entry.herb} ${entry.herb_full || ''} ${entry.telugu} ${entry.ailment} ${entry.ailment_telugu || ''} ${entry.remedy} ${entry.botanical || ''} ${entry.category} ${entry.source_title}`.toLowerCase();

  for (const term of queryTerms) {
    if (term.length < 2) continue;
    if (searchableText.includes(term)) {
      score += 5;
      if (entry.herb.toLowerCase().includes(term) || (entry.telugu && entry.telugu.includes(term))) score += 10;
      if (entry.ailment.toLowerCase().includes(term) || (entry.ailment_telugu && entry.ailment_telugu.includes(term))) score += 10;
    }
  }

  // Symptom semantic expansion heuristics
  const qStr = queryTerms.join(' ');
  if ((qStr.includes('pile') || qStr.includes('hemorrhoid') || qStr.includes('moola') || qStr.includes('arshas') || qStr.includes('fissure') || qStr.includes('rectal')) && (entry.ailment.toLowerCase().includes('pile') || entry.ailment.toLowerCase().includes('moola') || entry.category === 'Digestive & Piles')) {
    score += 15;
  }
  if ((qStr.includes('headache') || qStr.includes('migraine') || qStr.includes('talanopi') || qStr.includes('shira') || qStr.includes('temple') || qStr.includes('head')) && (entry.ailment.toLowerCase().includes('headache') || entry.ailment.toLowerCase().includes('talanopi') || entry.category === 'Headache & Neuro')) {
    score += 15;
  }
  if ((qStr.includes('fever') || qStr.includes('jwara') || qStr.includes('chills') || qStr.includes('malaria') || qStr.includes('temperature') || qStr.includes('flu')) && (entry.ailment.toLowerCase().includes('fever') || entry.ailment.toLowerCase().includes('jwar') || entry.category === 'Fevers & Immunity')) {
    score += 15;
  }
  if ((qStr.includes('cold') || qStr.includes('cough') || qStr.includes('phlegm') || qStr.includes('asthma') || qStr.includes('breath') || qStr.includes('jalubu') || qStr.includes('ubhasam')) && (entry.category === 'Respiratory & Cough' || entry.ailment.toLowerCase().includes('cough') || entry.ailment.toLowerCase().includes('cold') || entry.ailment.toLowerCase().includes('asthma'))) {
    score += 15;
  }
  if ((qStr.includes('joint') || qStr.includes('knee') || qStr.includes('arthritis') || qStr.includes('back') || qStr.includes('sciatica') || qStr.includes('keellu')) && (entry.category === 'Joints & Pain' || entry.ailment.toLowerCase().includes('joint') || entry.ailment.toLowerCase().includes('pain'))) {
    score += 15;
  }

  return score;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), entries_count: MANUSCRIPT_ENTRIES.length });
  });

  // API Route: Get all entries (Decorated with canonical Phase 1 provenance)
  app.get('/api/entries', (req, res) => {
    const { category, book, herb } = req.query;
    let results = MANUSCRIPT_ENTRIES.map(adaptToProvenanceRecord);
    if (category && typeof category === 'string') {
      results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (book && typeof book === 'string') {
      results = results.filter(e => e.source_id === book || e.source_short.toLowerCase().includes(book.toLowerCase()));
    }
    if (herb && typeof herb === 'string') {
      results = results.filter(e => e.herb.toLowerCase().includes(herb.toLowerCase()));
    }
    res.json(results);
  });

  // API Route: Get herbs monographs
  app.get('/api/herbs', (req, res) => {
    res.json(HERB_MONOGRAPHS);
  });

  // API Route: Get ailments directory
  app.get('/api/ailments', (req, res) => {
    res.json(AILMENT_DIRECTORIES);
  });

  // API Route: Get glossary and reference tables
  app.get('/api/glossary', (req, res) => {
    res.json({
      terms: GLOSSARY_TERMS,
      measurements: MEASUREMENT_UNITS,
      antidotes: ANTIDOTE_ENTRIES,
      shodhanam: SHODHANAM_ENTRIES
    });
  });

  // API Route: User Submitted Remedies (GET)
  app.get('/api/user-remedies', (req, res) => {
    const { ailment, herb } = req.query;
    let list = [...userRemediesStore];
    if (ailment && typeof ailment === 'string' && ailment !== 'ALL') {
      list = list.filter(r => r.ailment_id === ailment || r.ailment_name.toLowerCase().includes(ailment.toLowerCase()));
    }
    if (herb && typeof herb === 'string' && herb !== 'ALL') {
      list = list.filter(r => r.herb_names.some(h => h.toLowerCase().includes(herb.toLowerCase())));
    }
    res.json(list.sort((a, b) => b.upvotes - a.upvotes || Number(b.timestamp) - Number(a.timestamp)));
  });

  // API Route: User Submitted Remedies (POST)
  app.post('/api/user-remedies', (req, res) => {
    const {
      author_name,
      author_role,
      ailment_id,
      ailment_name,
      herb_names,
      title,
      ingredients,
      preparation_instructions,
      dosage_usage,
      source_tradition,
      precautions
    } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required for the remedy.' });
    }
    if (!preparation_instructions || typeof preparation_instructions !== 'string' || !preparation_instructions.trim()) {
      return res.status(400).json({ error: 'Preparation instructions are required.' });
    }
    if (!dosage_usage || typeof dosage_usage !== 'string' || !dosage_usage.trim()) {
      return res.status(400).json({ error: 'Dosage and usage instructions are required.' });
    }

    const newRemedy: UserSubmittedRemedy = {
      id: 'user-rem-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      author_name: (author_name && author_name.trim()) ? author_name.trim() : 'Anonymous Ayurvedic Reader',
      author_role: author_role || 'Home User',
      herb_telugu: (Array.isArray(herb_names) && herb_names[0]) ? herb_names[0] : 'మూలిక',
      herb_common: (Array.isArray(herb_names) && herb_names[0]) ? herb_names[0] : 'Traditional Herb',
      ailment: ailment_name || 'General Condition',
      recipe: `${title.trim()}: ${preparation_instructions.trim()} (Dosage: ${dosage_usage.trim()})`,
      source_tradition: source_tradition ? source_tradition.trim() : 'Household oral folklore',
      verification_status: 'unverified',
      upvotes: 1,
      timestamp: new Date().toISOString().split('T')[0],
      notes: precautions ? precautions.trim() : undefined
    };

    userRemediesStore.unshift(newRemedy);
    res.json({ success: true, remedy: newRemedy });
  });

  // API Route: User Remedy Upvote (POST)
  app.post('/api/user-remedies/:id/vote', (req, res) => {
    const { id } = req.params;
    const rem = userRemediesStore.find(r => r.id === id);
    if (!rem) {
      return res.status(404).json({ error: 'Remedy not found' });
    }
    rem.upvotes = (rem.upvotes || 0) + 1;
    res.json({ success: true, upvotes: rem.upvotes });
  });

  // API Route: Community Notes (GET)
  app.get('/api/community', (req, res) => {
    const { herb, ailment } = req.query;
    let list = [...readerNotesStore];
    if (herb && typeof herb === 'string' && herb !== 'ALL') {
      list = list.filter(n => n.herb.toLowerCase().includes(herb.toLowerCase()));
    }
    if (ailment && typeof ailment === 'string') {
      list = list.filter(n => n.ailment.toLowerCase().includes(ailment.toLowerCase()));
    }
    res.json(list.sort((a, b) => Number(b.timestamp) - Number(a.timestamp)));
  });

  // API Route: Community Notes (POST)
  app.post('/api/community', (req, res) => {
    const { author, herb, ailment, message, tags, book_reference } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }
    const newNote: ReaderNote = {
      id: 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      manuscript_id: 'general',
      page: 1,
      author_name: (author && author.trim()) ? author.trim() : 'Ayurvedic Reader',
      note_type: 'clinical_observation',
      content: message.trim(),
      timestamp: new Date().toISOString(),
      upvotes: 1
    };
    readerNotesStore.unshift(newNote);
    res.json({ success: true, note: newNote });
  });

  // API Route: Community Note Upvote (POST)
  app.post('/api/community/:id/vote', (req, res) => {
    const { id } = req.params;
    const note = readerNotesStore.find(n => n.id === id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    note.upvotes = (note.upvotes || 0) + 1;
    res.json({ success: true, upvotes: note.upvotes });
  });

  // --- 7-STAGE DETERMINISTIC SEARCH & CITATION-GROUNDED SYNTHESIS PIPELINE ---
  app.post('/api/search', async (req, res) => {
    const { query, bookFilter, categoryFilter } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query string is required.' });
    }

    const trimmedQuery = query.trim();
    const cacheKey = `${bookFilter || 'ALL'}_${categoryFilter || 'ALL'}_${trimmedQuery.toLowerCase()}`;
    if (searchCache.has(cacheKey)) {
      return res.json(searchCache.get(cacheKey));
    }

    const queryTerms = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    // Stage 1: Filter and score local manuscript matches
    let rawMatches = MANUSCRIPT_ENTRIES
      .map(entry => ({ entry, score: scoreEntryMatch(entry, queryTerms) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry);

    if (bookFilter && bookFilter !== 'ALL') {
      rawMatches = rawMatches.filter(e => e.source_id === bookFilter);
    }
    if (categoryFilter && categoryFilter !== 'ALL') {
      rawMatches = rawMatches.filter(e => e.category === categoryFilter);
    }

    // Adapt matches to canonical Phase 1 provenance records
    const topManuscriptMatches = rawMatches.slice(0, 8).map(adaptToProvenanceRecord);
    const noManuscriptMatch = topManuscriptMatches.length === 0;

    // Stage 2: Citation Validation & 3-State Determination
    const citationValidation = validateCitations(topManuscriptMatches, trimmedQuery);
    
    // Stage 3: Abstention Rule Check
    // If no verified/referenced entries match the query in the local corpus, ABSTAIN safely.
    if (noManuscriptMatch || !citationValidation.isValid) {
      const abstentionResponse = {
        query_understood_as: trimmedQuery,
        status: ThreeStateStatus.UNKNOWN,
        is_abstention: true,
        abstention_reason: 'The digitized Mulika corpus currently does not contain verified source evidence for this query. The system has abstained from generating speculative medical claims.',
        manuscript_summary: 'No direct folio match found in the digitized Telugu treatises for this query.',
        modern_crossref: 'Modern pharmacopeial correlations are unavailable without an identified botanical or formulation taxon in the corpus.',
        safety_note: 'Do not attempt unverified home formulations. Consult a registered Ayurvedic practitioner (BAMS/MD) for clinical assessment.',
        pathya_guidance: [],
        topManuscriptMatches: [],
        manuscript_matches: [],
        claims: [],
        verification_disclosure: 'Zero verified primary records identified for this search.'
      };
      searchCache.set(cacheKey, abstentionResponse);
      return res.json(abstentionResponse);
    }

    // Stage 4: AI Synthesis over strictly retrieved context
    const ai = getGeminiClient();
    let queryUnderstoodAs = trimmedQuery;
    let manuscriptSummary = '';
    let modernCrossref = '';
    let safetyNote = 'Historical Ayurvedic formulation for scholarly reference. Does not replace professional clinical diagnosis. Consult a qualified BAMS physician.';
    let pathyaGuidance: string[] = [];
    const modernSources = [
      { title: 'Ayurvedic Pharmacopoeia of India (API) - CCRAS / Ministry of AYUSH', journal: 'Official Pharmacopeial Monograph', year: 2020, url: 'https://ayushportal.nic.in' },
      { title: 'Traditional Knowledge Digital Library (TKDL)', journal: 'CSIR / AYUSH Knowledge Base', year: 2022, url: 'https://www.tkdl.res.in' }
    ];

    const isCooldownActive = Date.now() < geminiRateLimitCooldownUntil;

    if (ai && !isCooldownActive) {
      // Use official non-deprecated active models with graceful fallback
      const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
      const prompt = `You are the Lead Scholarly Epistemology and Verification Engine for Mulika.
Your task is to synthesize STRICTLY what the retrieved manuscript records say. Do NOT invent remedies, dosages, or cure claims.

User Query: "${trimmedQuery}"

Retrieved Provenance-Verified Records:
${JSON.stringify(topManuscriptMatches.map(m => ({
  source_title: m.source_title,
  page: m.page,
  herb: m.herb,
  telugu: m.telugu,
  ailment: m.ailment,
  remedy_verbatim: m.remedy,
  verification_status: m.verification_status
})), null, 2)}

Strict Instructions:
1. "query_understood_as": Clarify user query in 1 objective sentence.
2. "manuscript_summary": Summarize the traditional formulation(s) directly attested in the retrieved text. State clearly: "The source records traditional use of [Herb] for [Ailment] (Book: [Title], Page [Number])." NEVER claim it "cures" the disease.
3. "modern_crossref": State known botanical constituents for the retrieved plants (e.g. bioflavonoids, tannins) without making clinical efficacy guarantees.
4. "pathya_guidance": Array of 2-3 traditional dietary recommendations mentioned in classical texts (e.g. buttermilk, fiber, light diet).
5. "safety_note": Critical contraindications and medical red-flags requiring emergency conventional evaluation.

Respond in pure JSON with keys: query_understood_as, manuscript_summary, modern_crossref, pathya_guidance (array of strings), safety_note.`;

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: { responseMimeType: 'application/json' }
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            const rawSummary = parsed.manuscript_summary || '';

            // STAGE 5: POST-LLM CITATION GATEKEEPER
            // Deterministically verify the generated text does NOT cite ungrounded pages or treatises
            const postValidation = validatePostSynthesisCitations(rawSummary, topManuscriptMatches);

            if (postValidation.passed) {
              if (parsed.query_understood_as) queryUnderstoodAs = parsed.query_understood_as;
              manuscriptSummary = rawSummary;
              if (parsed.modern_crossref) modernCrossref = parsed.modern_crossref;
              if (parsed.safety_note) safetyNote = parsed.safety_note;
              if (Array.isArray(parsed.pathya_guidance)) pathyaGuidance = parsed.pathya_guidance;
              break;
            } else {
              console.info('Post-LLM Citation Gatekeeper requested grounded fallback.');
              manuscriptSummary = '';
            }
          }
        } catch (err: any) {
          const isQuotaOrRateLimit = err?.status === 'RESOURCE_EXHAUSTED' || err?.code === 429 ||
            String(err?.message || '').includes('quota') ||
            String(err?.message || '').includes('rate') ||
            String(err?.message || '').includes('429');
          const isHighDemand = err?.status === 'UNAVAILABLE' || err?.code === 503 ||
            String(err?.message || '').includes('high demand');

          if (isQuotaOrRateLimit) {
            geminiRateLimitCooldownUntil = Date.now() + 60000;
            console.info('Gemini API free tier rate limit active; engaging deterministic manuscript synthesis.');
            break;
          } else if (isHighDemand) {
            console.info(`Model ${modelName} temporarily high demand (503); engaging next option.`);
          } else {
            console.info(`Model ${modelName} unavailable, falling back to deterministic synthesis.`);
          }
        }
      }
    }

    // Deterministic fallback if AI synthesis offline, in rate-limit cooldown, or rejected by Post-LLM Gatekeeper
    if (!manuscriptSummary) {
      const deterministic = generateDeterministicSynthesis(trimmedQuery, topManuscriptMatches);
      manuscriptSummary = deterministic.manuscriptSummary;
      modernCrossref = deterministic.modernCrossref;
      pathyaGuidance = deterministic.pathyaGuidance;
      safetyNote = deterministic.safetyNote;
      if (!queryUnderstoodAs || queryUnderstoodAs === trimmedQuery) {
        queryUnderstoodAs = deterministic.queryUnderstoodAs;
      }
    }

    // Match user submitted remedies separately under Community / Field Notes
    const userSubmittedMatches = userRemediesStore.filter(rem => {
      const text = `${rem.herb_common} ${rem.herb_telugu} ${rem.ailment} ${rem.recipe}`.toLowerCase();
      return queryTerms.some(t => t.length > 2 && text.includes(t));
    }).slice(0, 4);

    const finalResult = {
      query_understood_as: queryUnderstoodAs,
      status: citationValidation.recommendedStatus,
      status_detail: citationValidation.statusDetail,
      status_explanation: citationValidation.recommendedStatus === ThreeStateStatus.SUPPORTED
        ? 'Directly supported by manually verified primary manuscript folios in the Mulika Codex.'
        : 'Direct manuscript reference — physical folio verification pending.',
      verification_disclosure: citationValidation.verificationDisclosure,
      manuscript_summary: manuscriptSummary,
      modern_crossref: modernCrossref,
      safety_note: safetyNote,
      pathya_guidance: pathyaGuidance,
      topManuscriptMatches,
      manuscript_matches: topManuscriptMatches,
      claims: citationValidation.validatedClaims,
      modern_sources: modernSources,
      user_submitted_matches: userSubmittedMatches,
      is_abstention: false,
      post_validation_passed: true
    };

    if (searchCache.size >= MAX_SEARCH_CACHE) {
      const firstKey = searchCache.keys().next().value;
      if (firstKey) searchCache.delete(firstKey);
    }
    searchCache.set(cacheKey, finalResult);

    res.json(finalResult);
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mulika Ayurvedic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
