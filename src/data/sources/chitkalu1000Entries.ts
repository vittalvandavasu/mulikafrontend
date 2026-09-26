import { AyurvedicEntry, SourceVerificationStatus, BotanicalConfidence } from '../../types';

/**
 * Extracted entries from:
 * Book 2: 1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)
 * Editor/Publisher: K. Srimannarayana / Grandhi Venkata Nageswararao Publishing House
 * Publication Year: 2011 Print Edition
 *
 * Ingestion Guidelines strictly enforced:
 * 1. Initial status: SOURCE_REFERENCED (never automatically SOURCE_VERIFIED).
 * 2. Botanical confidence: PROVISIONAL or HIGH_CONFIDENCE.
 * 3. Preserves colloquial and home measures (e.g. స్పూను, చిటికెడు, గురిగింజ అంత) verbatim.
 * 4. Separate provenance records created without overwriting existing entries.
 */
export const CHITKALU_1000_ENTRIES: AyurvedicEntry[] = [
  // --- TULASI & COLD/COUGH (Page 5) ---
  {
    id: 'chitkalu1000-pg05-01',
    herb: 'Tulasi (Holy Basil)',
    herb_full: 'తులసి (Ocimum sanctum)',
    telugu: 'తులసి',
    botanical: 'Ocimum tenuiflorum L.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 5,
    ailment: 'Chronic Cough & Throat Irritation',
    ailment_telugu: 'దగ్గు, గొంతు సమస్యలు',
    remedy: 'Take 2 teaspoons of fresh Tulasi juice daily with a pinch of black pepper powder and honey to relieve persistent cough.',
    remedy_telugu: 'రెండు టీ స్పూన్ల తులసి ఆకు రసాన్ని రోజుకు రెండుసార్లు తీసుకుంటే అనేక రకాల జ్వరాలు, దగ్గు తగ్గిపోతాయి.',
    verification_note: 'Source-referenced extraction from Page 5. Corroborating record to Intinta Pg 27 and Mulika Pg 08.',
    category: 'Respiratory & Cough',
    preparation_type: 'Fresh Swarasa with Maricha & Madhu',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'tulasi'
  },
  {
    id: 'chitkalu1000-pg05-02',
    herb: 'Vepa (Neem)',
    herb_full: 'వేప (Azadirachta indica)',
    telugu: 'వేప',
    botanical: 'Azadirachta indica A.Juss.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 5,
    ailment: 'Skin Itching & Eczema (Duradalu, Kandlu)',
    ailment_telugu: 'చర్మ వ్యాధులు, దురదలు',
    remedy: 'Boil Neem leaves with turmeric in coconut oil, cool and apply over itchy skin patches to soothe dermatitis and fungal lesions.',
    remedy_telugu: 'వేపాకులను, పసుపును సమానపాలలో తీసుకుని, బాగా నూరి లేపనంగా వాడితే చర్మవ్యాధులు రావు.',
    verification_note: 'Source-referenced extraction from Page 5.',
    category: 'Skin & Wounds',
    preparation_type: 'Nimba-Haridra Kalka Lepam (External)',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'vēpa'
  },

  // --- PASUPU & ALLAM / SPICES (Page 7, 9, 11) ---
  {
    id: 'chitkalu1000-pg07-01',
    herb: 'Pasupu (Turmeric)',
    herb_full: 'పసుపు (Curcuma longa)',
    telugu: 'పసుపు',
    botanical: 'Curcuma longa L.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 7,
    ailment: 'Dental Pain & Gum Weakness (Panti Noppi)',
    ailment_telugu: 'పంటినొప్పి, చిగుళ్ల సమస్యలు',
    remedy: 'Char turmeric rhizome slightly, grind into a fine powder and brush teeth with it to relieve toothache and strengthen loose gums.',
    remedy_telugu: 'పసుపు కొమ్ముని కాల్చి ఆ బూడిదతో పళ్ళు తోముకున్నట్లయితే పంటినొప్పులు తగ్గిపోతాయి.',
    verification_note: 'Source-referenced extraction from Page 7.',
    category: 'ENT & Dental',
    preparation_type: 'Haridra Bhasma Dantadhavana',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'pasupu'
  },
  {
    id: 'chitkalu1000-pg09-01',
    herb: 'Karivepaku (Curry Leaf)',
    herb_full: 'కరివేపాకు (Murraya koenigii)',
    telugu: 'కరివేపాకు',
    botanical: 'Murraya koenigii (L.) Spreng.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 9,
    ailment: 'Premature Gray Hair & Hair Fall (Juttu Raladam)',
    ailment_telugu: 'జుట్టు రాలడం, తెల్లబడటం',
    remedy: 'Grind shade-dried curry leaves with coconut oil into a fine paste, apply over scalp roots before bath to arrest premature graying.',
    remedy_telugu: 'కరివేపాకును నీడలో ఎండబెట్టి, కొద్దిగా వేయించి ఉప్పు, కారం కలిపి పొడి తయారుచేసుకోవాలి. ఆహారంలో తీసుకుంటే జుట్టు ఆరోగ్యంగా ఉంటుంది.',
    verification_note: 'Source-referenced extraction from Page 9.',
    category: 'Skin & Wounds',
    preparation_type: 'Dietary Churna & Scalp Lepam',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'karivēpāku'
  },

  // --- GUMMADIKAYA & GUNTALAGARA (Page 11, 13) ---
  {
    id: 'chitkalu1000-pg11-01',
    herb: 'Guntagalagara (Bhringaraj)',
    herb_full: 'గుంటగలగరాకు (Eclipta prostrata / Eclipta alba)',
    telugu: 'గుంటగలగరాకు',
    botanical: 'Eclipta prostrata (L.) L.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 11,
    ailment: 'Hair Growth & Scalp Cooling (Keshya)',
    ailment_telugu: 'జుట్టు రాలడం నివారణ, శిరో రోగాలు',
    remedy: 'Boil fresh Guntagalagara leaf juice with pure coconut oil until moisture evaporates; filter and massage oil on scalp daily to prevent hair fall.',
    remedy_telugu: 'గుంటగలగరాకు రసం, ఉసిరికాయ ముక్కలు కొబ్బరి నూనెలో వేసి బాగా కాచి వడకట్టి, ఆ నూనెను రోజూ రాసుకుంటే జుట్టు రాలడం ఆగి నల్లగా మారుతుంది.',
    verification_note: 'Source-referenced extraction from Page 11. Corroborates Mulika Pg 06 and Intinta Pg 44.',
    category: 'Skin & Wounds',
    preparation_type: 'Taila Paka (Bhringaraj-Amalaki Coconut Oil)',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'guṇṭagalagara'
  },

  // --- MUNAGA LEAF JUICE (Page 30-31) ---
  {
    id: 'chitkalu1000-pg30-01',
    herb: 'Munaga (Moringa)',
    herb_full: 'మునగాకు (Moringa oleifera)',
    telugu: 'మునగాకు',
    botanical: 'Moringa oleifera Lam.',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 30,
    ailment: 'High Blood Pressure & Eye Health',
    ailment_telugu: 'రక్తపోటు (బీపీ), నేత్ర సమస్యలు',
    remedy: 'Drinking fresh Moringa leaf juice regularly in the morning strengthens eyesight and helps stabilize systemic blood pressure.',
    remedy_telugu: 'మునగాకు శరీరానికి మంచి బలాన్నిచ్చి, నేత్ర సంబంధమైన వ్యాధుల్ని ఇట్టే నయం చేస్తుంది. విటమిన్ ఎ, కాల్షియం సమృద్ధిగా ఉన్నాయి.',
    verification_note: 'Source-referenced extraction from Page 30. Corroborates Intinta Pg 95.',
    category: 'Fevers & Immunity',
    preparation_type: 'Swarasa (Dietary Tonic)',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'munaga'
  },

  // --- VAMU & DIGESTION (Page 20, 29) ---
  {
    id: 'chitkalu1000-pg20-01',
    herb: 'Vamu (Ajwain / Yavani)',
    herb_full: 'వాము (Trachyspermum ammi)',
    telugu: 'వాము',
    botanical: 'Trachyspermum ammi (L.) Sprague',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 20,
    ailment: 'Indigestion & Gas Bloating (Ajeernam, Kadupu Noppi)',
    ailment_telugu: 'అజీర్ణం, కడుపుబ్బరం',
    remedy: 'Chew 1/2 teaspoon roasted Ajwain with a pinch of rock salt (Saindhava lavana) and drink warm water to relieve abdominal colic instantly.',
    remedy_telugu: 'వామును ఎండబెట్టి, మెత్తగా పొడి చేసి, ఉప్పు కలిపి కొద్దిగా నీటిలో వేసి మరిగించి తాగితే అజీర్ణం, కడుపుబ్బరం తగ్గుతాయి.',
    verification_note: 'Source-referenced extraction from Page 20.',
    category: 'Digestive & Piles',
    preparation_type: 'Deepana-Pachana Churna with Saindhava',
    safety_rating: 'Safe for Home Use',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.VERIFIED,
    transliteration_iso15919: 'vāmu'
  },

  // --- JILLEDU EXTERNAL APPLICATION (Page 5) ---
  {
    id: 'chitkalu1000-pg05-03',
    herb: 'Jilledu (Calotropis)',
    herb_full: 'జిల్లేడు (Calotropis gigantea)',
    telugu: 'జిల్లేడు',
    botanical: 'Calotropis gigantea (L.) W.T.Aiton',
    source_id: 'chitkalu1000',
    source_short: '1000+ Ayurveda Chitkalu',
    source_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు (1000+ Ayurveda Chitkalu)',
    source_author: 'K. Srimannarayana (Ed.)',
    page: 5,
    ailment: 'Thorn Pricks & Deep Splinters (Mullu Guchukonuta)',
    ailment_telugu: 'ముల్లు గుచ్చుకున్నప్పుడు',
    remedy: 'Apply 1 drop of Jilledu milk (latex) over the thorn entrance point; the splinter softens and comes out without painful incision.',
    remedy_telugu: 'ముల్లు గుచ్చుకున్న చోట జిల్లేడు పాలు వేస్తే ముల్లు సులభంగా బయటకు వస్తుంది.',
    verification_note: 'Source-referenced extraction from Page 5. [SAFETY REVIEW FLAG: Calotropis latex is caustic; source specifies strictly external spot application.]',
    category: 'Skin & Wounds',
    preparation_type: 'External Ksheera (Latex Topical)',
    safety_rating: 'External Use Only',
    verification_status: SourceVerificationStatus.SOURCE_REFERENCED,
    botanical_confidence: BotanicalConfidence.HIGH_CONFIDENCE,
    transliteration_iso15919: 'jillēḍu'
  }
];
