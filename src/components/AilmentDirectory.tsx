import React, { useState, useMemo } from 'react';
import { AilmentInfo, AyurvedicEntry, HerbMonograph, UserSubmittedRemedy } from '../types';
import {
  Stethoscope,
  Utensils,
  Search,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  BookOpen,
  Sparkles,
  Leaf,
  Plus,
  ThumbsUp,
  AlertTriangle,
  FileText,
  ArrowLeft,
  X,
  ScrollText,
  ExternalLink,
  Bookmark
} from 'lucide-react';

interface AilmentDirectoryProps {
  initialAilmentId?: string;
  ailments: AilmentInfo[];
  herbs: HerbMonograph[];
  manuscriptEntries: AyurvedicEntry[];
  userRemedies: UserSubmittedRemedy[];
  onSelectHerb: (herbId: string) => void;
  onOpenSubmitModal: (ailmentId?: string, ailmentName?: string) => void;
  onVoteUserRemedy: (remedyId: string) => void;
  onNavigateToCodex?: (bookId: string, page: number, entryId?: string) => void;
  onSaveRecipe?: (entry: AyurvedicEntry) => void;
  isRecipeSaved?: (entryId: string) => boolean;
}

const AILMENT_KEYWORD_MAP: Record<string, string[]> = {
  // Classical Categories
  'piles': ['pile', 'arshas', 'moola', 'hemorrhoid', 'fissure', 'fistula', 'anorectal', 'ano-rectal', 'పైల్స్', 'అర్శస్సు', 'మూలశంక', 'మొలలు'],
  'headache': ['headache', 'shira', 'migraine', 'talanopi', 'parshwapu', 'murcha', 'neuralgia', 'cephalalgia', 'suryavarta', 'తలనొప్పి', 'పార్శ్వపు', 'శిరోరోగము'],
  'fever': ['fever', 'jwara', 'chali', 'malaria', 'raktapitta', 'raktasravamu', 'vishamajvara', 'antipyretic', 'జ్వరం', 'చలి జ్వరం', 'విషమజ్వరం', 'సన్నిపాత'],
  'respiratory': ['cough', 'cold', 'kasa', 'jalubu', 'phlegm', 'bronch', 'catarrh', 'expectorant', 'rhinitis', 'peenasa', 'దగ్గు', 'జలుబు', 'కఫం', 'శ్వాసకాసలు', 'పీనసం'],
  'asthma': ['asthma', 'swasa', 'shwasa', 'ubbasam', 'tamakasvasa', 'wheez', 'ayasa', 'dyspnea', 'bronchospasm', 'ఉబ్బసం', 'తమకశ్వాస', 'ఆయాసం'],
  'joints': ['joint', 'arthritis', 'amavata', 'sandhi', 'keell', 'sciatica', 'gridhrasi', 'rheumat', 'sandhigata', 'osteoarthritis', 'gout', 'vatarakta', 'కీళ్ళనొప్పులు', 'ఆమవాతం', 'మోకాళ్ళ', 'గృధ్రసి', 'వాతరక్తం'],
  'jaundice': ['jaundice', 'kamala', 'liver', 'kaamerlu', 'yakrit', 'pleeha', 'hepat', 'cirrhosis', 'icterus', 'కామెర్లు', 'కాలేయ', 'ప్లీహరోగం', 'కామల'],
  'women-health': ['women', 'menstru', 'uter', 'kusuma', 'streela', 'ritu', 'garbha', 'leucorrh', 'white discharge', 'somaroga', 'pradara', 'menorrhagia', 'asrigdhara', 'స్త్రీల', 'రుతుశూల', 'కుసుమ', 'గర్భ', 'ప్రదర'],
  'skin-wounds': ['skin', 'eczema', 'kushta', 'itch', 'gajji', 'tamara', 'dermat', 'pruritus', 'scabies', 'ringworm', 'kandu', 'dadru', 'pama', 'vicharchika', 'చర్మ', 'గజ్జి', 'తామర', 'సోరియాసిస్', 'దురద'],
  'warts-corns': ['corn', 'wart', 'aanelu', 'pulipiri', 'kadara', 'callus', 'charmakeela', 'plantar-corns', 'plantar', 'ఆనెలు', 'పులిపిరులు', 'చర్మపు మొలకలు'],
  'ulcers-burns': ['ulcer', 'wound', 'burn', 'vrana', 'kalina', 'punlu', 'pundu', 'sadyovrana', 'gangrene', 'bedsores', 'dushta vrana', 'dagdha vrana', 'పుండ్లు', 'వ్రణాలు', 'కాలిన గాయాలు'],
  'urinary-calculi': ['urinary', 'stone', 'ashmari', 'mutra', 'calculi', 'kidney', 'gravel', 'renal', 'renal-calculi', 'lithiasis', 'nephrolithiasis', 'రాళ్ళు', 'మూత్రాశ్మరి', 'మూత్రపిండ'],
  'dysuria-uti': ['dysuria', 'mutrakricchra', 'manta', 'burning', 'daha', 'urination', 'uti', 'infection', 'cystitis', 'strangury', 'mutraghata', 'మూత్రంలో మంట', 'మూత్రకృచ్ఛ్రం'],
  'polyuria-diabetes': ['polyuria', 'atimutra', 'prameha', 'frequent urination', 'diabetes insipidus', 'mutra pravritti', 'అతిమూత్ర', 'ప్రమేహము', 'తరచుగా మూత్రం'],
  'diabetes': ['diabetes', 'madhumeha', 'sugar', 'glucose', 'prameha', 'hyperglycemia', 'glycosuria', 'మధుమేహం', 'షుగర్', 'చక్కెర వ్యాధి'],
  'digestive-agni': ['indigestion', 'acidity', 'gas', 'ajeerna', 'appetite', 'bloat', 'flatulence', 'pitta', 'ama', 'pachana', 'gastritis', 'dyspepsia', 'amlapitta', 'deepana', 'అజీర్ణం', 'అగ్నిమాంద్యం', 'పుల్లతేనుపులు', 'కడుపుబ్బరం', 'ఆమ్లపిత్తం'],
  'colic-spasm': ['colic', 'shula', 'udara', 'spasm', 'cramp', 'nopi', 'anaha', 'griping', 'abdominal pain', 'gulma', 'ఉదరశూల', 'కడుపునొప్పి', 'గ్యాస్ నొప్పి', 'గుల్మ'],
  'nausea-vomiting': ['vomit', 'nausea', 'chhardi', 'chardi', 'hrillas', 'vikaram', 'vantulu', 'emesis', 'antiemetic', 'వాంతులు', 'వికారం', 'ఛర్ది'],
  'diarrhea-dysentery': ['diarrhea', 'dysentery', 'atisara', 'grahani', 'loose motion', 'pravahika', 'sprue', 'colitis', 'mucous', 'loose stools', 'antidiarrheal', 'అతిసారము', 'రక్త విరేచనాలు', 'జిగట గ్రహణి', 'విరేచనాలు'],
  'constipation': ['constipation', 'vibandha', 'malabaddhaka', 'bowel', 'straining', 'hard stool', 'laxative', 'anaha', 'malavibandha', 'మలబద్ధకం', 'విబంధము', 'మలబద్దకం'],
  'mouth-ulcers': ['mouth ulcer', 'stomatitis', 'glossitis', 'mukha paka', 'notiputa', 'notipootha', 'tongue', 'aphthous', 'canker', 'oral-teeth', 'నోటిపూత', 'నాలుక పగుళ్ళు', 'ముఖపాకం'],
  'dental-oral': ['tooth', 'teeth', 'oral', 'danta', 'gums', 'kadile', 'bleeding gums', 'panti', 'pyorrhea', 'gingivitis', 'chaladanta', 'dantaharsha', 'oral-teeth', 'పంటి నొప్పి', 'కదిలే పళ్ళు', 'చిగుళ్ళ వాపు', 'దంతరోగం'],
  'hair-scalp': ['hair', 'dandruff', 'khalitya', 'juttu', 'gray', 'chundru', 'indralupta', 'alopecia', 'alopecia-scalp', 'baldness', 'palitya', 'kuntala', 'kesha', 'జుట్టు', 'చుండ్రు', 'నెరవడం', 'తలవెంట్రుకలు'],
  'cardiac-hypertension': ['cardiac', 'heart', 'blood pressure', 'raktapotu', 'hrid', 'palpitation', 'hypertension', 'bp', 'hridroga', 'angina', 'coronary', 'గుండె', 'రక్తపోటు', 'హృద్రోగం'],
  'eye-vision': ['eye', 'blindness', 'drishti', 'timira', 'rechikati', 'andhatva', 'cataract', 'kanti', 'netra', 'ophthalm', 'conjunctivitis', 'abhishyanda', 'arma', 'కంటి', 'రేచీకటి', 'తిమిరం', 'నేత్రరోగం'],
  'ent-throat-ear': ['ear', 'chevi', 'throat', 'gontu', 'mumps', 'gavada', 'hoarseness', 'karna', 'kantha', 'sinus', 'otitis', 'tinnitus', 'టాన్సిల్స్', 'చెవి', 'గొంతు', 'కర్ణ'],
  'throat-tonsils': ['throat', 'gontu', 'tonsil', 'kantha', 'mumps', 'gavada', 'hoarse', 'swarabheda', 'pharyngitis', 'tonsillitis', 'laryngitis', 'గొంతు', 'గవద', 'టాన్సిల్స్', 'కంఠరోగం'],
  'bone-fractures': ['fracture', 'bone', 'asthi', 'virigina', 'bhagna', 'skeletal', 'sandhana', 'calcium', 'sprain', 'dislocation', 'ఎముకలు', 'అస్థిభంగము', 'విరిగిన ఎముకలు'],
  'intestinal-worms': ['worm', 'krimi', 'antrakrimi', 'purugulu', 'parasite', 'nuvvu', 'helminth', 'anthelmintic', 'pinworm', 'roundworm', 'tapeworm', 'పురుగులు', 'నులిపురుగులు', 'క్రిమి', 'కడుపులో పురుగులు'],
  'obesity-weight': ['adiposity', 'weight', 'medoroga', 'fat', 'sthaulya', 'obese', 'obesity-medoroga', 'lipid', 'cholesterol', 'slimming', 'lekhana', 'medas', 'స్థూలకాయం', 'మేదోరోగం', 'బరువు తగ్గడం'],
  'rejuvenation-rasayana': ['rasayana', 'rejuvenat', 'vitality', 'longevity', 'debility', 'ojas', 'medha', 'memory', 'shukra', 'vajikarana', 'balya', 'adaptogen', 'anti-aging', 'dhatupushti', 'బలహీనత', 'జ్ఞాపకశక్తి', 'రసాయన', 'బలవర్ధకం'],
  'insomnia-sleep': ['sleep', 'insomnia', 'anidra', 'nidralemi', 'restless', 'sedative', 'somnolence', 'sleep disorder', 'nidranasha', 'నిద్రలేమి', 'అనిద్ర', 'నిద్రపట్టకపోవడం'],
  'acne-blemishes': ['acne', 'pimple', 'motimalu', 'blemish', 'spot', 'yuvanapidaka', 'vyanga', 'machalu', 'acne-complexion', 'complexion', 'varnya', 'మొటిమలు', 'మచ్చలు', 'యౌవనపిడకలు'],
  'male-vitality': ['semen', 'shukra', 'indriya', 'vitality', 'potency', 'vajikarana', 'aphrodisiac', 'sperm', 'male-fertility', 'erectile', 'klaibya', 'stamina', 'ఇంద్రియాభివృద్ధి', 'శుక్ర', 'వాజీకరణం', 'వీర్యవృద్ధి'],
  'venom-firstaid': ['scorpion', 'bite', 'sting', 'visha', 'telu', 'venom', 'toxic', 'antidote', 'agada', 'poison', 'snake', 'sarpa', 'damsha', 'తేలు', 'విష', 'పాము కాటు'],
  // 20 Added Classical Categories
  'pediatric-balaroga': ['pediatric', 'infant', 'child', 'balaroga', 'bala', 'uggu', 'dentition', 'teething', 'bedwetting', 'shayyamutra', 'dantodbheda', 'stanya', 'ksheeralasaka', 'bala kasa', 'children', 'పసిపిల్లల', 'బాలారోగ్యం', 'ఉగ్గు', 'దంతాలు', 'పిల్లల'],
  'edema-dropsy': ['dropsy', 'edema', 'swelling', 'shotha', 'shopha', 'puffiness', 'fluid retention', 'sarvanga shopha', 'pitting edema', 'keella vapulu', 'vapulu', 'vaapulu', 'శోఫ', 'వాపులు', 'నీరుపట్టడం', 'శరీర వాపు'],
  'ascites-udararoga': ['ascites', 'udararoga', 'jalodara', 'peritoneal', 'abdominal distension', 'pleehodara', 'plihodara', 'yakriddalyodara', 'fluid belly', 'udara', 'kaduplo', 'జలోదరము', 'ఉదర రోగము', 'కడుపులో నీరు'],
  'paralysis-stroke': ['paralysis', 'hemiplegia', 'facial palsy', 'stroke', 'pakshaghata', 'ardita', 'vatavyadhi', 'vata vyadhulu', 'vata disorders', 'motor loss', 'facial droop', 'పక్షవాతము', 'అర్దిత', 'వాత రోగాలు'],
  'sciatica-gridhrasi': ['sciatica', 'gridhrasi', 'lumbar', 'nerve compression', 'shooting pain', 'kati shula', 'leg pain', 'radiculopathy', 'nadumu noppi', 'నడుము నరాల లాగుడు', 'గృధ్రసి', 'సయాటికా', 'నడుమునొప్పి'],
  'vitiligo-leukoderma': ['vitiligo', 'leukoderma', 'white patches', 'shwitra', 'kilasa', 'depigmentation', 'hypopigmentation', 'melanocyte', 'skin infections', 'kushta', 'pigmentation', 'nyacha', 'శ్విత్రము', 'బొల్లి మచ్చలు', 'కోడె మచ్చలు'],
  'psoriasis-eczema': ['psoriasis', 'eczema', 'plaque', 'silvery scales', 'kittibha', 'kitibha', 'vicharchika', 'dadru', 'dermatitis', 'lichenified', 'duradalu', 'kandlu', 'కిట్టభ', 'విచర్ఛిక', 'సోరియాసిస్', 'తామర'],
  'epistaxis-bleeding': ['epistaxis', 'nosebleed', 'bleeding', 'raktapitta', 'urdhwaga', 'nasagata', 'nasal bleeding', 'hemorrhage', 'raktasravamu', 'raktapu vantulu', 'రక్తస్రావం', 'ముక్కు వెంట రక్తం', 'రక్తపిత్తము'],
  'ear-tinnitus-otitis': ['earache', 'tinnitus', 'otitis', 'karnashula', 'karnanada', 'karnapaka', 'badhirya', 'otorrhea', 'ear pain', 'ear discharge', 'chevi potu', 'chevi', 'చెవిపోటు', 'కర్ణనాదం', 'చెవి చీము', 'కర్ణరోగం'],
  'throat-hoarseness': ['hoarseness', 'vocal strain', 'laryngitis', 'swarabheda', 'kantha roga', 'loss of voice', 'aphonia', 'raspy voice', 'gontu bonguru', 'sore throat', 'throat irritation', 'స్వరభేదం', 'గొంతు బొంగురు', 'కంఠరోగం', 'స్వరం'],
  'anorexia-taste': ['anorexia', 'loss of taste', 'aruchi', 'appetite loss', 'tastelessness', 'asyavairasya', 'early satiety', 'mandagni', 'aakali', 'loss of appetite', 'agnimandya', 'అరుచి', 'నోటి చప్పదనం', 'ఆకలి లేకపోవడం', 'అరుచిరోగం'],
  'anemia-pandu': ['anemia', 'pandu', 'iron deficiency', 'pallor', 'alparakta', 'hemoglobin', 'pale conjunctiva', 'fatigue', 'dhatukshaya', 'jeerna jwara', 'ojas kshaya', 'పాండు రోగము', 'రక్తహీనత', 'కళ్ళు పాలిపోవడం', 'పాండు'],
  'leucorrhea-pradara': ['leucorrhea', 'white discharge', 'vaginal discharge', 'shweta pradara', 'pradara', 'somaroga', 'yoni vyapad', 'pelvic discharge', 'raktapradara', 'kusuma rogam', 'adhika raktasrava', 'శ్వేత ప్రదరము', 'తెల్ల మైల', 'యోని స్రావం', 'కుసుమరోగం'],
  'dysmenorrhea-cramps': ['dysmenorrhea', 'menstrual cramps', 'spasmodic', 'kashtartava', 'ritu shula', 'udavartini', 'painful periods', 'menstrual pain', 'menstrual spasms', 'ఋతుశూల', 'బహిష్టు నొప్పులు', 'కష్టార్తవం', 'నెలసరి నొప్పులు'],
  'miscarriage-prevention': ['miscarriage', 'threatened abortion', 'garbhasrava', 'garbhapata', 'garbhasthapana', 'uterine weakness', 'pregnancy nourishment', 'fetal stabilization', 'streela pushtiki', 'female vitality', 'uterine', 'గర్భస్రావ నివారణ', 'గర్భధారణ', 'గర్భరక్ష', 'గర్భస్థాపన'],
  'fistula-fissure': ['fistula', 'fissure', 'bhagandara', 'parikartika', 'anal fistula', 'anal fissure', 'nadi vrana', 'perianal', 'anal fissures', 'క్షారసూత్ర', 'భగందరము', 'పరికర్తిక', 'మలద్వారపు చీలికలు'],
  'insect-scorpion-stings': ['scorpion', 'wasp', 'bee sting', 'centipede', 'kita damsha', 'vrischika', 'shatapadi', 'insect sting', 'antidote', 'sarpavisha', 'snakebite', 'visha', 'తేలు కాటు', 'కందిరీగ', 'జెర్రి కాటు', 'విషకీటకాలు'],
  'vertigo-dizziness': ['vertigo', 'dizziness', 'fainting', 'bhrama', 'murcha', 'murcha vyadhi', 'shirobhrama', 'spinning', 'lightheadedness', 'postural hypotension', 'syncope', 'convulsive spasms', 'భ్రమ', 'తలతిరుగుడు', 'కళ్ళు తిరగడం', 'మూర్ఛ'],
  'halitosis-denta': ['bad breath', 'halitosis', 'pyorrhea', 'loose teeth', 'chaladanta', 'shitada', 'mukhadurgandha', 'dantaharsha', 'bleeding gums', 'gandusha', 'danta chala', 'danta roga', 'నోటి దుర్వాసన', 'దంతహర్షం', 'కదిలే పళ్ళు', 'చిగుళ్ళు'],
  'hiccups-hikka': ['hiccup', 'hiccups', 'hikka', 'diaphragmatic spasm', 'annaja hikka', 'gambhira hikka', 'mahahikka', 'singultus', 'spasmodic flatulence', 'bronchial spasms', 'హిక్కా', 'వెక్కిళ్ళు', 'ఎక్కిళ్ళు', 'వెక్కిళ్లు']
};

const AILMENT_ALIASES: Record<string, string[]> = {
  'dental-oral': ['oral-teeth', 'dental', 'teeth'],
  'hair-scalp': ['alopecia-scalp', 'hair-loss', 'dandruff'],
  'warts-corns': ['plantar-corns', 'corns'],
  'urinary-calculi': ['renal-calculi', 'kidney-stones'],
  'male-vitality': ['male-fertility', 'vajikarana'],
  'obesity-weight': ['obesity-medoroga', 'weight-loss'],
  'insomnia-sleep': ['insomnia', 'sleep-disorders'],
  'acne-blemishes': ['acne-complexion', 'complexion'],
  'respiratory': ['cough', 'cold', 'bronchitis'],
  'asthma': ['swasa', 'shwasa'],
  'joints': ['arthritis', 'amavata', 'sandhigata-vata'],
  'fever': ['jwara', 'pyrexia'],
  'skin-wounds': ['dermatitis', 'eczema', 'kushtha'],
  'psoriasis-eczema': ['skin-wounds', 'eczema', 'psoriasis'],
  'pediatric-balaroga': ['pediatrics', 'balaroga', 'infant-care'],
  'edema-dropsy': ['edema', 'shotha', 'fluid-retention'],
  'sciatica-gridhrasi': ['sciatica', 'gridhrasi', 'joints'],
  'paralysis-stroke': ['paralysis', 'vatavyadhi', 'neurological'],
  'vitiligo-leukoderma': ['leukoderma', 'shwitra', 'skin-wounds'],
  'throat-hoarseness': ['hoarseness', 'kantha-roga', 'throat-tonsils'],
  'ear-tinnitus-otitis': ['earache', 'otitis', 'ent-throat-ear'],
  'anorexia-taste': ['anorexia', 'aruchi', 'digestive-agni'],
  'anemia-pandu': ['anemia', 'pandu', 'cardiac-hypertension'],
  'leucorrhea-pradara': ['leucorrhea', 'pradara', 'women-health'],
  'dysmenorrhea-cramps': ['dysmenorrhea', 'women-health'],
  'fistula-fissure': ['fistula', 'fissure', 'piles'],
  'insect-scorpion-stings': ['venom-firstaid', 'scorpion-sting', 'insect-bite'],
  'halitosis-denta': ['dental-oral', 'oral-teeth', 'bad-breath'],
  'hiccups-hikka': ['hiccups', 'respiratory']
};

export function matchEntryToAilment(ailmentId: string, entry: AyurvedicEntry): boolean {
  const text = `${entry.ailment} ${entry.ailment_telugu || ''} ${entry.category} ${entry.remedy} ${entry.verification_note || ''}`.toLowerCase();
  const keywords = AILMENT_KEYWORD_MAP[ailmentId] || [ailmentId];
  return keywords.some(kw => text.includes(kw.toLowerCase()));
}

export function matchHerbToAilment(ailment: AilmentInfo, herb: HerbMonograph): boolean {
  const term = ailment.id.toLowerCase();
  const aliases = AILMENT_ALIASES[ailment.id] || [];
  
  if (herb.associated_ailments) {
    if (herb.associated_ailments.includes(ailment.id)) return true;
    if (aliases.some(alias => herb.associated_ailments.includes(alias))) return true;
  }
  
  if (herb.description && herb.description.toLowerCase().includes(term)) return true;
  if (herb.traditional_uses.some(u => u.toLowerCase().includes(ailment.name.toLowerCase()) || u.toLowerCase().includes(term))) return true;

  const herbText = `${herb.name} ${herb.telugu} ${herb.botanical} ${herb.sanskrit} ${herb.traditional_uses.join(' ')} ${herb.description || ''}`.toLowerCase();
  const keywords = AILMENT_KEYWORD_MAP[ailment.id] || [ailment.id];
  return keywords.some(kw => herbText.includes(kw.toLowerCase()));
}

export const AilmentDirectory: React.FC<AilmentDirectoryProps> = ({
  initialAilmentId,
  ailments,
  herbs,
  manuscriptEntries,
  userRemedies,
  onSelectHerb,
  onOpenSubmitModal,
  onVoteUserRemedy,
  onNavigateToCodex,
  onSaveRecipe,
  isRecipeSaved
}) => {
  const [selectedAilmentId, setSelectedAilmentId] = useState<string | null>(initialAilmentId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [directoryTab, setDirectoryTab] = useState<'guides' | 'codex_all'>('guides');

  const selectedAilment = useMemo(() => {
    return ailments.find(a => a.id === selectedAilmentId) || null;
  }, [ailments, selectedAilmentId]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(ailments.map(a => a.category));
    return ['ALL', ...Array.from(set)];
  }, [ailments]);

  // Filtered ailments for Clinical Guides View
  const filteredAilments = useMemo(() => {
    return ailments.filter(ailment => {
      const matchesCat = categoryFilter === 'ALL' || ailment.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        ailment.name.toLowerCase().includes(q) ||
        ailment.telugu_name.toLowerCase().includes(q) ||
        ailment.classical_term.toLowerCase().includes(q) ||
        (ailment.description && ailment.description.toLowerCase().includes(q)) ||
        (AILMENT_KEYWORD_MAP[ailment.id] && AILMENT_KEYWORD_MAP[ailment.id].some(k => k.includes(q)));
      return matchesCat && matchesSearch;
    });
  }, [ailments, categoryFilter, searchQuery]);

  // Filtered raw manuscript formulas for All Codex Entries View
  const filteredManuscriptEntries = useMemo(() => {
    return manuscriptEntries.filter(entry => {
      const matchesCat = categoryFilter === 'ALL' ||
        entry.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (categoryFilter === 'Digestive & Gastric' && entry.category.includes('Digestive')) ||
        (categoryFilter === 'Skin & Wounds' && entry.category.includes('Skin'));

      const q = searchQuery.toLowerCase().trim();
      const text = `${entry.ailment} ${entry.ailment_telugu || ''} ${entry.herb} ${entry.telugu} ${entry.botanical || ''} ${entry.source_title} ${entry.source_short} ${entry.remedy}`.toLowerCase();
      const matchesSearch = !q || text.includes(q);

      return matchesCat && matchesSearch;
    });
  }, [manuscriptEntries, categoryFilter, searchQuery]);

  // Associated herbs for selected ailment
  const associatedHerbs = useMemo(() => {
    if (!selectedAilment) return [];
    return herbs.filter(h => matchHerbToAilment(selectedAilment, h));
  }, [selectedAilment, herbs]);

  // Verified manuscript entries for selected ailment
  const associatedManuscripts = useMemo(() => {
    if (!selectedAilment) return [];
    return manuscriptEntries.filter(entry => matchEntryToAilment(selectedAilment.id, entry));
  }, [selectedAilment, manuscriptEntries]);

  // Dynamic count calculation mapping manuscript entries per ailment
  const ailmentManuscriptCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ailments.forEach(ailment => {
      counts[ailment.id] = manuscriptEntries.filter(entry => matchEntryToAilment(ailment.id, entry)).length;
    });
    return counts;
  }, [ailments, manuscriptEntries]);

  // Dynamic count calculation mapping associated herbs per ailment
  const ailmentHerbCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ailments.forEach(ailment => {
      counts[ailment.id] = herbs.filter(h => matchHerbToAilment(ailment, h)).length;
    });
    return counts;
  }, [ailments, herbs]);

  // User submitted remedies for selected ailment
  const associatedUserRemedies = useMemo(() => {
    if (!selectedAilment) return [];
    return userRemedies.filter(rem =>
      rem.ailment_id === selectedAilment.id ||
      (rem.ailment_name && rem.ailment_name.toLowerCase().includes(selectedAilment.name.toLowerCase())) ||
      (rem.ailment_name && rem.ailment_name.toLowerCase().includes(selectedAilment.id))
    );
  }, [selectedAilment, userRemedies]);

  return (
    <div className="py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* If an ailment is selected, show the rich deep-dive page */}
      {selectedAilment ? (
        <div className="space-y-6 sm:space-y-8">
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={() => setSelectedAilmentId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line)] transition-all min-h-[44px] sm:min-h-0 self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Conditions</span>
            </button>

            <button
              onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all shadow-md min-h-[44px] sm:min-h-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Recipe for {selectedAilment.name}</span>
            </button>
          </div>

          {/* Ailment Header Banner */}
          <div className="p-5 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--canvas)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                  {selectedAilment.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--canvas)] border border-[var(--line)] text-xs font-mono text-[var(--muted)]">
                  Classical: {selectedAilment.classical_term}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--canvas)] border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  {associatedManuscripts.length} Codex Recipes
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--canvas)] border border-[#3E4226] text-xs font-mono text-[var(--accent)]">
                  {associatedHerbs.length} Herbs
                </span>
              </div>

              <div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[var(--ink)] leading-tight">
                  {selectedAilment.name}
                </h1>
                <p className="text-base sm:text-xl font-medium text-[var(--accent)] mt-1 font-serif">
                  {selectedAilment.telugu_name}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-4xl font-sans">
                {selectedAilment.description}
              </p>

              <div className="inline-flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--ink)]">
                <span className="font-bold text-[var(--accent)]">Dosha Pathology (Nidana):</span>
                <span className="text-[var(--muted)]">{selectedAilment.dosha_involvement}</span>
              </div>
            </div>
          </div>

            {/* Red Flag Symptoms */}
            <div className="p-5 rounded-xl bg-red-950/30 border border-red-800/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>Emergency Red-Flag Symptoms (Seek Immediate Medical Care)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-red-200/90">
                {selectedAilment.red_flags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">⚠️</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          {/* Section: Associated Herbs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="font-serif text-xl sm:text-2xl text-[var(--ink)]">
                  Associated Medicinal Herbs ({associatedHerbs.length})
                </h2>
              </div>
              <span className="text-xs text-[var(--muted)]">Click any herb for full Materia Medica monograph</span>
            </div>

            {associatedHerbs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {associatedHerbs.map(herb => (
                  <button
                    key={herb.id}
                    onClick={() => onSelectHerb(herb.id)}
                    className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line)] text-left transition-all group flex flex-col justify-between shadow-sm min-h-[120px]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {herb.name}
                        </h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--canvas)] text-[var(--accent)] border border-[var(--line)] shrink-0 font-serif">
                          {herb.telugu}
                        </span>
                      </div>
                      <p className="text-xs italic text-[var(--muted)] mt-0.5 font-serif">
                        {herb.botanical}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-2 line-clamp-2">
                        {herb.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[var(--line)] flex items-center justify-between text-[11px] text-[var(--muted)]">
                      <span>Virya: <b className="text-[var(--ink)]">{herb.virya}</b></span>
                      <span className="text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Monograph <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--muted)]">
                Formulations for this condition utilize complex multi-ingredient classical compounds. Explore the verified manuscript recipes below.
              </div>
            )}
          </div>

          {/* Section: Traditional source formulations */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[var(--ink)]">
                    Verified Classical Manuscript Recipes ({associatedManuscripts.length})
                  </h2>
                  <p className="text-xs text-[var(--muted)]">Page-cited traditional preparations directly transcribed from the 13 Telugu codices</p>
                </div>
              </div>
            </div>

            {associatedManuscripts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {associatedManuscripts.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-5 rounded-xl bg-[#FDFBF7] text-[#1A2620] border-l-4 border-l-[#C5A059] border border-[#E0D8C8] shadow-md space-y-3 relative flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-[#E0D8C8] pb-2.5">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EDE6D6] text-[11px] font-mono font-bold text-[#8C6D23]">
                            <span>{entry.source_short}</span>
                            <span>•</span>
                            <span>Page {entry.page}</span>
                          </div>
                          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A2620] mt-1">
                            {entry.herb} <span className="text-[#8C6D23] font-normal font-serif">({entry.telugu})</span>
                          </h3>
                        </div>

                        {entry.preparation_type && (
                          <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-[#E4DCB8] text-[#544317] font-mono shrink-0">
                            {entry.preparation_type}
                          </span>
                        )}
                      </div>

                      {/* Indication */}
                      <div className="text-xs font-mono text-[var(--muted)]">
                        <span className="font-bold text-[#1A2620]">Indication: </span>
                        <span>{entry.ailment}</span>
                        {entry.ailment_telugu && <span className="ml-1 text-[#8C6D23] font-serif">({entry.ailment_telugu})</span>}
                      </div>

                      {/* Verbatim Classical Recipe */}
                      <div className="p-3 rounded-lg bg-[#F4EFE6] border border-[#E0D8C8] text-xs leading-relaxed text-[#2B3B32]">
                        <span className="font-bold text-[#1A2620] block mb-1">📜 Manuscript Formulation:</span>
                        {entry.remedy}
                      </div>

                      {/* Telugu transcription snippet if available */}
                      {entry.remedy_telugu && (
                        <div className="text-xs text-[var(--muted)] italic border-l-2 border-[var(--line)] pl-2 font-serif">
                          {entry.remedy_telugu}
                        </div>
                      )}
                    </div>

                    {/* Verification and Folio Action */}
                    <div className="pt-2.5 border-t border-[#E0D8C8] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-emerald-800 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Verified from scan Page {entry.page}
                        </span>

                        {onSaveRecipe && (
                          <button
                            onClick={() => onSaveRecipe(entry)}
                            className="inline-flex items-center gap-1 text-[#8C6D23] hover:text-[#544317] font-medium"
                            title="Save to shelf"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isRecipeSaved && isRecipeSaved(entry.id) ? 'fill-[#8C6D23]' : ''}`} />
                            <span>{isRecipeSaved && isRecipeSaved(entry.id) ? 'Saved' : 'Save'}</span>
                          </button>
                        )}
                      </div>

                      {onNavigateToCodex ? (
                        <button
                          onClick={() => onNavigateToCodex(entry.source_id, entry.page, entry.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--accent)] font-bold text-xs hover:bg-[var(--surface)] transition-colors"
                        >
                          <ScrollText className="w-3 h-3" />
                          <span>View Folio in Codex</span>
                        </button>
                      ) : (
                        <span className="font-mono text-[#8C6D23]">
                          {entry.safety_rating || 'Verified Traditional'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--muted)]">
                No direct single-herb entry transcribed for this condition in the initial batch. Check related categories or community submissions.
              </div>
            )}
          </div>

          {/* Section: Community Submitted Remedies */}
          <div className="space-y-4 pt-4 border-t border-[var(--line)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[var(--ink)]">
                    Community Field Notes & Submitted Remedies ({associatedUserRemedies.length})
                  </h2>
                  <p className="text-xs text-amber-400/90">Reader-contributed traditional recipes — unverified by historical manuscripts</p>
                </div>
              </div>

              <button
                onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--surface)] border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-950/40 transition-colors self-start sm:self-auto min-h-[44px] sm:min-h-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your Remedy</span>
              </button>
            </div>

            {/* Prominent Community Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <b className="text-amber-300">Important Notice: </b>
                The recipes in this section are contributed by platform readers and practitioners. They have <u>not</u> been verified against physical palm-leaf folios. Always consult a licensed Ayurvedic practitioner (BAMS) before undertaking self-treatment.
              </div>
            </div>

            {associatedUserRemedies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {associatedUserRemedies.map(rem => (
                  <div
                    key={rem.id}
                    className="p-5 rounded-xl bg-[var(--surface)] border border-amber-500/40 shadow-lg space-y-3.5 text-[var(--ink)]"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[var(--line)] pb-2.5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>User-Submitted (Unverified)</span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--ink)] mt-1.5">
                          {rem.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => onVoteUserRemedy(rem.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--accent)] hover:bg-[#C5A059]/10 transition-colors min-h-[36px]"
                        title="Helpful submission"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono">{rem.upvotes}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                      <span>By <b className="text-[var(--ink)]">{rem.author_name}</b> ({rem.author_role || 'Contributor'})</span>
                      {rem.source_tradition && (
                        <>
                          <span>•</span>
                          <span className="italic text-[var(--accent)]">{rem.source_tradition}</span>
                        </>
                      )}
                    </div>

                    {rem.ingredients && rem.ingredients.length > 0 && (
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-1">
                          Ingredients:
                        </span>
                        <ul className="space-y-1 text-xs text-[var(--ink)] bg-[var(--canvas)] p-2.5 rounded-lg border border-[var(--line)]">
                          {rem.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-xs text-[var(--ink)] leading-relaxed">
                      <b className="text-[var(--accent)] block mb-0.5">Preparation:</b>
                      {rem.preparation_instructions || rem.recipe}
                    </div>

                    {rem.dosage_usage && (
                      <div className="text-xs text-[var(--ink)] bg-[var(--canvas)] p-2.5 rounded-lg border border-[var(--line)]">
                        <b className="text-[var(--accent)]">Dosage & Timing: </b>
                        <span>{rem.dosage_usage}</span>
                      </div>
                    )}

                    {rem.precautions && (
                      <div className="text-[11px] text-amber-300/80 bg-amber-950/20 p-2 rounded border border-amber-900/40">
                        <b>Precaution: </b>{rem.precautions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-center space-y-3">
                <p className="text-xs text-[var(--muted)]">
                  No user remedies have been submitted yet for {selectedAilment.name}.
                </p>
                <button
                  onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
                  className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all min-h-[44px]"
                >
                  Be the first to submit a recipe
                </button>
              </div>
            )}
          </div>

          {/* Section: Pathya / Apathya and Red Flags */}
          <div className="space-y-6 pt-4 border-t border-[var(--line)]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
              <Utensils className="w-4 h-4 text-[var(--accent)]" />
              <span>Dietary Protocol (Pathya & Apathya)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pathyam */}
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pathyam (Recommended Foods & Practices)</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--ink)]">
                  {(selectedAilment.pathya_apathya.recommended || selectedAilment.pathya_apathya.pathya || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apathyam */}
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300 uppercase">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Apathyam (Foods & Behaviors to Avoid)</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--ink)]">
                  {(selectedAilment.pathya_apathya.avoid || selectedAilment.pathya_apathya.apathya || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </div>
      ) : (
        /* Main Directory View */
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
                <Stethoscope className="w-4 h-4" />
                <span>TRADITIONAL SOURCE COLLECTION</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl text-[var(--ink)]">
                Explore conditions
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 max-w-3xl leading-relaxed">
                Explore conditions recorded in the indexed Telugu sources, with traditional terminology, dietary context, safety cautions, and manuscript references.
              </p>
            </div>

            <button
              onClick={() => onOpenSubmitModal()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all shrink-0 self-start md:self-auto shadow-md min-h-[44px] sm:min-h-0"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Community Remedy</span>
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[var(--surface)] border border-[var(--line)] rounded-xl overflow-x-auto">
            <button
              onClick={() => setDirectoryTab('guides')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                directoryTab === 'guides'
                  ? 'bg-[#C5A059] text-[#0B130E] shadow'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Clinical Treatment Guides ({ailments.length})</span>
            </button>

            <button
              onClick={() => setDirectoryTab('codex_all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                directoryTab === 'codex_all'
                  ? 'bg-[#C5A059] text-[#0B130E] shadow'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>All Codex Formulas ({manuscriptEntries.length})</span>
            </button>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
            <div className="flex items-center flex-1 px-3 py-2 rounded-lg bg-[var(--canvas)] border border-[var(--line)] gap-2 min-h-[44px]">
              <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={directoryTab === 'guides'
                  ? "Search ailments by English or Telugu (e.g. Piles, Headache, Fever, ఉబ్బసం, కామెర్లు)..."
                  : "Search all manuscript recipes by ailment, herb, or text..."
                }
                className="w-full bg-transparent text-xs sm:text-sm text-[var(--ink)] placeholder-[#6B8E7B]/70 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-[var(--muted)] uppercase hidden sm:inline">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--line)] min-h-[44px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* VIEW MODE 1: Classical Clinical Monographs Grid */}
          {directoryTab === 'guides' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAilments.map((ailment) => (
                  <div
                    key={ailment.id}
                    onClick={() => setSelectedAilmentId(ailment.id)}
                    className="p-5 sm:p-6 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line)] transition-all flex flex-col justify-between group shadow-lg cursor-pointer hover:-translate-y-0.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                            {ailment.name}
                          </h2>
                          <div className="text-sm font-semibold text-[var(--accent)] mt-0.5 font-serif">
                            {ailment.telugu_name}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas)] border border-[var(--line)] text-[var(--muted)] shrink-0">
                          {ailment.category}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[var(--muted)]">
                        <span className="text-[var(--muted)]">Classical Term: </span>
                        <span className="text-[var(--ink)]">{ailment.classical_term}</span>
                      </div>

                      <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
                        {ailment.description}
                      </p>

                      <div className="p-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-[11px] text-[var(--muted)]">
                        <span className="font-bold text-[var(--accent)]">Dosha: </span>
                        <span>{ailment.dosha_involvement}</span>
                      </div>

                      {/* Codex Counts Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] border border-[#2A4B35] text-emerald-300">
                          {ailmentManuscriptCounts[ailment.id] || 0} Manuscript Recipes
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] border border-[#3E4226] text-[var(--accent)]">
                          {ailmentHerbCounts[ailment.id] || 0} Herbs
                        </span>
                      </div>
                    </div>

                    {/* Footer action */}
                    <div className="mt-5 pt-3.5 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--accent)] font-semibold group-hover:text-[var(--accent)]">
                      <span>Explore herbs & recipes</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredAilments.length === 0 && (
                <div className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-center space-y-2">
                  <p className="text-sm text-[var(--ink)]">No clinical guides matched your search.</p>
                  <p className="text-xs text-[var(--muted)]">Try searching in the "All Codex Formulas" tab to search across raw manuscript entries.</p>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: All 135+ Raw Codex Formulas from the 13 Treatises */}
          {directoryTab === 'codex_all' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Showing {filteredManuscriptEntries.length} authenticated recipes from all 13 codices</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredManuscriptEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line)]/60 transition-all flex flex-col justify-between shadow-md space-y-3"
                  >
                    <div className="space-y-2.5">
                      {/* Top Bar with Book Citation */}
                      <div className="flex items-start justify-between gap-2 border-b border-[var(--line)] pb-2">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--canvas)] text-[10px] font-mono text-[var(--accent)] border border-[var(--line)]">
                            <span>{entry.source_short}</span>
                            <span>•</span>
                            <span>Page {entry.page}</span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-[var(--ink)] mt-1">
                            {entry.ailment}
                            {entry.ailment_telugu && (
                              <span className="text-[var(--accent)] font-normal font-serif ml-1.5">
                                ({entry.ailment_telugu})
                              </span>
                            )}
                          </h3>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas)] text-[var(--muted)] border border-[var(--line)] shrink-0">
                          {entry.category}
                        </span>
                      </div>

                      {/* Primary Herb */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[var(--muted)] font-mono">Core Plant:</span>
                        <span className="font-bold text-[var(--ink)]">{entry.herb}</span>
                        <span className="text-[var(--accent)] font-serif">({entry.telugu})</span>
                        {entry.botanical && (
                          <span className="text-[var(--muted)] italic text-[11px] hidden sm:inline">
                            [{entry.botanical}]
                          </span>
                        )}
                      </div>

                      {/* Recipe Snippet */}
                      <div className="p-3 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-xs text-[var(--muted)] leading-relaxed">
                        <span className="font-bold text-[var(--ink)] block mb-0.5">Recipe & Application:</span>
                        {entry.remedy}
                      </div>

                      {entry.remedy_telugu && (
                        <div className="text-xs text-[var(--accent)]/90 italic font-serif border-l-2 border-[var(--line)]/40 pl-2">
                          {entry.remedy_telugu}
                        </div>
                      )}
                    </div>

                    {/* Actions: View in Reader or Open Guide */}
                    <div className="pt-3 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[11px] font-mono text-[var(--muted)]">
                        Rating: <span className="text-[var(--ink)]">{entry.safety_rating || 'Verified Traditional'}</span>
                      </span>

                      {onNavigateToCodex && (
                        <button
                          onClick={() => onNavigateToCodex(entry.source_id, entry.page, entry.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)]/40 text-[var(--accent)] font-semibold hover:bg-[#D4AF37] hover:text-[#0B130E] transition-all"
                        >
                          <ScrollText className="w-3.5 h-3.5" />
                          <span>Open Folio {entry.page}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredManuscriptEntries.length === 0 && (
                <div className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-center space-y-2">
                  <p className="text-sm text-[var(--ink)]">No manuscript recipes matched your query.</p>
                  <p className="text-xs text-[var(--muted)]">Try clearing filters or searching for alternative plant or ailment terms.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
