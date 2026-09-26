export interface GoldCorpusEnrichment {
  plant_part_used: string;
  anupana_vehicle: string;
  dosage_verbatim: string;
  ingredients_structured: string[];
  review_flags: string[];
  scholarly_notes: string;
}

/**
 * 74 Curated Exemplar Gold Corpus Knowledge Object Enrichments.
 * Mapped 1:1 against the 74 canonical IDs in MANUSCRIPT_ENTRIES across all 6 treatises.
 */
export const GOLD_CORPUS_ENRICHMENTS: Record<string, GoldCorpusEnrichment> = {
  // === 1. AYURVEDA MULIKA PRAYOGAVALI (37 Folios) ===
  'mulika-p3-1': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Not stated in source (Direct Swarasa)',
    dosage_verbatim: 'Approx. 1 tulam (12 grams) in the morning',
    ingredients_structured: ['Avise (Sesbania grandiflora) fresh leaves'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 3. Classical morning administration protocol for night blindness.'
  },
  'mulika-p3-2': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'External application (No oral vehicle)',
    dosage_verbatim: 'External poultice paste as needed',
    ingredients_structured: ['Avise fresh leaf juice', 'Gulla sunnam (Shell lime - minute pinch)'],
    review_flags: ['EXTERNAL_LEPAM_ONLY'],
    scholarly_notes: 'Folio verified Page 3. Alkaline lepam for glandular swellings; avoid broken skin.'
  },
  'mulika-p3-3': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Nasya (Nasal route)',
    dosage_verbatim: '2 to 3 drops instilled as nasal drops',
    ingredients_structured: ['Avise leaves', 'Maricha (Black pepper)'],
    review_flags: ['EMERGENCY_REVIVAL_NASYA'],
    scholarly_notes: 'Folio verified Page 3. Classical Avapidaka Nasya for reviving consciousness in fainting.'
  },
  'mulika-p3-7': {
    plant_part_used: 'Beeja (Seeds)',
    anupana_vehicle: 'Godugdha (Warm cow milk)',
    dosage_verbatim: '5 grams powder in the morning and evening',
    ingredients_structured: ['Avise seed powder', 'Warm cow milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 3. Medhya rasayana for memory and cognitive alertness.'
  },
  'mulika-p3-8': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Nasya (Nasal route)',
    dosage_verbatim: '2 to 4 drops into opposite nostril',
    ingredients_structured: ['Avise fresh leaf juice'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 3. Contra-lateral Nasya technique for unilateral migraine.'
  },
  'mulika-p4-1': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Madhu (Honey)',
    dosage_verbatim: '1-2 teaspoons juice with honey',
    ingredients_structured: ['Addasaramu leaves (Justicia adhatoda)', 'Honey'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 4. Classical Vasaka formulation for hemoptysis and bronchial cough.'
  },
  'mulika-p4-2': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Godugdha (Cow milk)',
    dosage_verbatim: 'Decoction boiled with milk taken warm',
    ingredients_structured: ['Addasaramu leaves', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 4. Kaphapitta-shamaka formulation for persistent bronchitis.'
  },
  'mulika-p4-6': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Warm water decoction',
    dosage_verbatim: '50 ml decoction twice daily',
    ingredients_structured: ['Addasaramu leaf decoction'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 4. Astringent decoction for rheumatic joint inflammation.'
  },
  'mulika-p4-8': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Kavala (Chewed swarasam)',
    dosage_verbatim: 'Chew fresh leaves and swish in mouth',
    ingredients_structured: ['Addasaramu fresh leaves'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 4. Kavala / mouthwash for aphthous stomatitis.'
  },
  'mulika-p5-1': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Warm cow milk',
    dosage_verbatim: '3 grams root powder daily with milk',
    ingredients_structured: ['Atimadhuram root powder (Glycyrrhiza glabra)', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 5. Medhya Rasayana for longevity and mucosal protection.'
  },
  'mulika-p5-3': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Sita (Sugar candy) / Water',
    dosage_verbatim: 'Equal parts Atimadhuram and Katukarohini (1g each)',
    ingredients_structured: ['Atimadhuram root', 'Katukarohini root', 'Sugar'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 5. Cardiotonic and Pitta-calming formulation.'
  },
  'mulika-p5-5': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Raw honey (Madhu)',
    dosage_verbatim: '3 grams root powder with 1 tsp honey',
    ingredients_structured: ['Atimadhuram root powder', 'Raw honey'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 5. Pacifies unilateral headache and nerve irritation.'
  },
  'mulika-p5-7': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Takra (Buttermilk) or Warm water',
    dosage_verbatim: '2 grams root powder with warm water',
    ingredients_structured: ['Atimadhuram root powder'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 5. Soothes gastric burning and hyperchlorhydria.'
  },
  'mulika-p6-1': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'External lepam (No oral vehicle)',
    dosage_verbatim: 'Leaves warmed and tied over painful area',
    ingredients_structured: ['Attipatti leaves (Mimosa pudica)', 'Castor oil'],
    review_flags: ['EXTERNAL_LEPAM_ONLY'],
    scholarly_notes: 'Folio verified Page 6. Local astringent poultice for hydrocele and scrotal swelling.'
  },
  'mulika-p6-2': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Takra (Fresh churned buttermilk)',
    dosage_verbatim: '10 grams fresh paste with 1 glass buttermilk',
    ingredients_structured: ['Attipatti whole plant', 'Buttermilk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 6. Raktastambhana formulation for bleeding hemorrhoids.'
  },
  'mulika-p6-5': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Tandulodaka (Rice washed water)',
    dosage_verbatim: '30 ml root decoction with rice water',
    ingredients_structured: ['Attipatti root decoction', 'Rice wash water'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 6. Stambhana remedy for chronic diarrhea and dysentery.'
  },
  'mulika-p9-1': {
    plant_part_used: 'Ardraka / Shunti (Rhizome)',
    anupana_vehicle: 'Saindhava Lavana (Rock salt)',
    dosage_verbatim: 'Small piece fresh ginger with pinch of salt before meals',
    ingredients_structured: ['Fresh Ardraka (Zingiber officinale)', 'Rock salt'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 9. Classical Deepana-Pachana appetizer.'
  },
  'mulika-p9-3': {
    plant_part_used: 'Shunti (Dry rhizome)',
    anupana_vehicle: 'Guda (Purified jaggery)',
    dosage_verbatim: '2 grams dry ginger powder with equal jaggery',
    ingredients_structured: ['Shunti dry ginger', 'Jaggery'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 9. Vata-Kapha pacifying formula for chronic dyspepsia.'
  },
  'mulika-p9-4': {
    plant_part_used: 'Ardraka (Fresh rhizome)',
    anupana_vehicle: 'Madhu (Honey)',
    dosage_verbatim: '1 tsp ginger juice with 1 tsp honey',
    ingredients_structured: ['Ardraka fresh juice', 'Raw honey'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 9. Kaphahara expectorant for productive cough.'
  },
  'mulika-p9-5': {
    plant_part_used: 'Shunti (Dry rhizome)',
    anupana_vehicle: 'Warm water or Cow milk',
    dosage_verbatim: '3 grams ginger powder in warm milk at night',
    ingredients_structured: ['Shunti powder', 'Warm milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 9. Amavata-hara formulation for rheumatoid aches.'
  },
  'mulika-p9-7': {
    plant_part_used: 'Ardraka (Fresh rhizome)',
    anupana_vehicle: 'Nimbu Swarasa (Lemon juice)',
    dosage_verbatim: '1 tsp ginger juice with 1/2 tsp lemon juice',
    ingredients_structured: ['Ardraka juice', 'Nimbu juice', 'Saindhava salt'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 9. Instant anti-emetic for travel nausea and vomiting.'
  },
  'mulika-p10-1': {
    plant_part_used: 'Twak (Bark)',
    anupana_vehicle: 'Tandulodaka (Rice washed water)',
    dosage_verbatim: '40 ml bark decoction twice daily',
    ingredients_structured: ['Ashoka bark (Saraca asoca)', 'Rice wash water'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 10. Uterine astringent for Asrigdara / menorrhagia.'
  },
  'mulika-p10-3': {
    plant_part_used: 'Twak (Bark)',
    anupana_vehicle: 'Godugdha (Cow milk)',
    dosage_verbatim: 'Ksheerapaka: 5g bark boiled in 100ml milk and water',
    ingredients_structured: ['Ashoka bark', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 10. Garbhashaya balya nutritive tonic.'
  },
  'mulika-p10-4': {
    plant_part_used: 'Pushpa (Flowers)',
    anupana_vehicle: 'Water',
    dosage_verbatim: '10 grams flowers steeped in water overnight',
    ingredients_structured: ['Ashoka dried flowers', 'Water'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 10. Cooling Pitta-shamaka infusion for burning sensation.'
  },
  'mulika-p28-1': {
    plant_part_used: 'Phala (Fruit pericarp)',
    anupana_vehicle: 'Warm water or Takra',
    dosage_verbatim: '3 to 5 grams churna with warm water before bed',
    ingredients_structured: ['Karakkaya (Terminalia chebula) fruit powder'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 28. Classical Anulomana bowel regulator and Rasayana.'
  },
  'mulika-p28-8': {
    plant_part_used: 'Phala (Fruit pericarp)',
    anupana_vehicle: 'Saindhava Lavana & Warm water',
    dosage_verbatim: '3 grams Karakkaya with pinch of rock salt',
    ingredients_structured: ['Karakkaya powder', 'Rock salt'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 28. Vata-cleansing digestive for chronic flatulence.'
  },
  'mulika-p64-1': {
    plant_part_used: 'Kanda / Guduchi Stem',
    anupana_vehicle: 'Madhu (Honey) or Warm water',
    dosage_verbatim: '40 ml fresh stem decoction in morning',
    ingredients_structured: ['Tippateega stem (Tinospora cordifolia)'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 64. Prime Jvarahara and Rasayana for chronic intermittent fevers.'
  },
  'mulika-p64-7': {
    plant_part_used: 'Kanda (Stem)',
    anupana_vehicle: 'Takra (Buttermilk)',
    dosage_verbatim: '15 ml fresh stem extract in 1 cup buttermilk',
    ingredients_structured: ['Tippateega juice', 'Buttermilk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 64. Tridosha balancing drink for glycemic control.'
  },
  'mulika-p30-1': {
    plant_part_used: 'Patra (Succulent inner gel)',
    anupana_vehicle: 'Direct edible gel',
    dosage_verbatim: '2-inch cube of washed gel on empty stomach',
    ingredients_structured: ['Kalabanda inner gel (Aloe vera)'],
    review_flags: ['ALOE_YELLOW_SAP_EXCLUDED'],
    scholarly_notes: 'Folio verified Page 30. Demulcent digestive for hyperacidity and ulcers.'
  },
  'mulika-p30-5': {
    plant_part_used: 'Patra (Inner leaf pulp)',
    anupana_vehicle: 'Warm water',
    dosage_verbatim: '10 grams fresh pulp with pinch of cumin',
    ingredients_structured: ['Kalabanda pulp', 'Jeeraka powder'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 30. Natural mucilaginous laxative for chronic constipation.'
  },
  'mulika-p32-2': {
    plant_part_used: 'Kanda (Corm / Tuber)',
    anupana_vehicle: 'Takra (Buttermilk) and Rice gruel',
    dosage_verbatim: 'Cooked corm curry with rice gruel for 1 month',
    ingredients_structured: ['Kanda corm (Amorphophallus paeoniifolius)', 'Sesame oil', 'Rock salt'],
    review_flags: ['PURIFICATION_REQUIRED'],
    scholarly_notes: 'Folio verified Page 32. Must be cooked with tamarind to neutralize calcium oxalate raphides.'
  },
  'mulika-p18-6': {
    plant_part_used: 'Moola (Roots)',
    anupana_vehicle: 'Madhu (Raw honey)',
    dosage_verbatim: '5 to 10 ml fresh root juice with honey',
    ingredients_structured: ['Uttareni root juice (Achyranthes aspera)', 'Honey'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 18. Kshara-rich botanical for bleeding piles and rectal tags.'
  },
  'mulika-p18-2': {
    plant_part_used: 'Beeja (Seeds)',
    anupana_vehicle: 'Godugdha (Cow milk)',
    dosage_verbatim: 'Kheer prepared with 5g seeds taken in morning',
    ingredients_structured: ['Uttareni seeds', 'Cow milk', 'Sugar candy'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 18. Classical Bhasmaka Roga (polyphagia) suppressor.'
  },
  'mulika-p22-6': {
    plant_part_used: 'Phala (Fresh fruit)',
    anupana_vehicle: 'Madhu (Raw honey)',
    dosage_verbatim: '15 ml fresh Usiri juice with 1 tsp honey',
    ingredients_structured: ['Usiri fresh fruit juice (Phyllanthus emblica)', 'Raw honey'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 22. Prime Chakshushya and Rasayana formulation.'
  },
  'mulika-p22-3': {
    plant_part_used: 'Phala (Dried fruit pericarp)',
    anupana_vehicle: 'Warm cow milk',
    dosage_verbatim: '3 grams Usiri powder with milk at bedtime',
    ingredients_structured: ['Usiri dry fruit powder', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 22. Cellular rejuvenator and anti-aging Rasayana.'
  },
  'mulika-p78-1': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Takra (Fresh churned buttermilk)',
    dosage_verbatim: '10 to 15 grams fresh plant paste with 1 glass buttermilk',
    ingredients_structured: ['Nela Usiri whole plant (Phyllanthus niruri)', 'Buttermilk'],
    review_flags: [],
    scholarly_notes: 'Folio verified Page 78. Internationally validated hepatoprotective for viral jaundice.'
  },
  'mulika-p78-2': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Warm water decoction',
    dosage_verbatim: '30 ml whole plant kashayam twice daily',
    ingredients_structured: ['Nela Vemu whole plant (Andrographis paniculata)'],
    review_flags: ['EXTREME_BITTER_RASA'],
    scholarly_notes: 'Folio verified Page 78. Bitter febrifuge for malarial fevers and liver detox.'
  },

  // === 2. VAIDYA RAHASYA CHITKALU (5 Folios) ===
  'chitkalu-p29-1': {
    plant_part_used: 'Moola (Rhizome / Root)',
    anupana_vehicle: 'Godugdha (Cow milk) or Ghee',
    dosage_verbatim: '2 grams fine powder with warm milk at night',
    ingredients_structured: ['Jatamansi rhizome powder (Nardostachys jatamansi)', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Chitkalu Folio Page 29. Nidrajanana (sedative) and Manasadoshahara for insomnia.'
  },
  'chitkalu-p12-1': {
    plant_part_used: 'Beeja & Phala (Seeds and Clarified Butter)',
    anupana_vehicle: 'Aavu Venna (Cow butter)',
    dosage_verbatim: 'Equal parts butter, black pepper, and black sesame consumed twice daily for 1 week',
    ingredients_structured: ['Aavu Venna (Cow butter)', 'Miriyalu (Black pepper)', 'Nuvvulu (Black sesame)'],
    review_flags: [],
    scholarly_notes: 'Chitkalu Folio Page 12. Lubricates bowels, reduces vascular inflammation in bleeding piles.'
  },
  'chitkalu-p12-2': {
    plant_part_used: 'Ghrita & Dugdha',
    anupana_vehicle: 'Warm cow milk',
    dosage_verbatim: '1 teaspoon ghee in 1 glass warm milk every night',
    ingredients_structured: ['Aavu Neyyi (Cow ghee)', 'Aavu Paalu (Cow milk)'],
    review_flags: [],
    scholarly_notes: 'Chitkalu Folio Page 12. Gentle laxative and tissue lubricant for dry piles.'
  },
  'chitkalu-p7-1': {
    plant_part_used: 'Patra & Phala',
    anupana_vehicle: 'Soapnut-sized pills',
    dosage_verbatim: '1 pill three times a day for 3 days',
    ingredients_structured: ['Guntakalagara juice (Eclipta alba)', 'Roasted pepper (Piper nigrum)'],
    review_flags: ['EXCLUDE_IN_DIARRHEA'],
    scholarly_notes: 'Chitkalu Folio Page 7. Febrifuge pills for stubborn intermittent fevers.'
  },
  'chitkalu-p50-1': {
    plant_part_used: 'Patra & Patika (Leaves and Alum)',
    anupana_vehicle: 'Warm water gargle',
    dosage_verbatim: '1 cup decoction swished in mouth for 3 minutes',
    ingredients_structured: ['Vepa leaves (Azadirachta indica)', 'Patika (Potash alum)'],
    review_flags: ['GARGLE_DO_NOT_SWALLOW'],
    scholarly_notes: 'Chitkalu Folio Page 50. Antiseptic gargle for toothache and bleeding gums.'
  },

  // === 3. AUSHADHA MOKKALLO AROGYA RAHASYALU (5 Folios) ===
  'medplants-p18-1': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'External lepam and steam inhalation',
    dosage_verbatim: 'Ground leaves applied warm over forehead; steam inhaled',
    ingredients_structured: ['Vaavili leaves (Vitex negundo)'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: 'Medplants Folio Page 18. Vata-Kapha pacifying analgesic pack for sinus headache.'
  },
  'medplants-p18-2': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Eranda Tailam (Castor oil)',
    dosage_verbatim: '15 leaves boiled in 1 glass water down to 1/2 glass, taken with 1 tsp castor oil',
    ingredients_structured: ['Vaavili leaves (Vitex negundo)', 'Castor oil'],
    review_flags: [],
    scholarly_notes: 'Medplants Folio Page 18. Classical Vata-pacifying formula for lumbar sciatica.'
  },
  'medplants-p24-1': {
    plant_part_used: 'Kanda (Stem)',
    anupana_vehicle: 'Sugar & Cow Ghee / Chutney',
    dosage_verbatim: '1 gram dry stem powder with ghee; or tender stem chutney with rice',
    ingredients_structured: ['Nalleru stem (Cissus quadrangularis)', 'Ghee', 'Sugar'],
    review_flags: ['IRRITANT_CALCIUM_OXALATE'],
    scholarly_notes: 'Medplants Folio Page 24. Contains ketosteroids and flavonoids strengthening vascular walls.'
  },
  'medplants-p24-2': {
    plant_part_used: 'Kanda (Stem)',
    anupana_vehicle: 'Godugdha & Ghrita (Milk and Ghee)',
    dosage_verbatim: 'Fresh juice boiled with milk and ghee daily',
    ingredients_structured: ['Nalleru fresh juice', 'Cow milk', 'Cow ghee'],
    review_flags: [],
    scholarly_notes: 'Medplants Folio Page 24. Asthisandhaniya formula accelerating fracture healing.'
  },
  'medplants-p10-1': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Madhu (Honey)',
    dosage_verbatim: '15 fresh leaves crushed with 5 black peppers, juice taken with honey',
    ingredients_structured: ['Tulasi leaves (Ocimum sanctum)', 'Miriyalu (Black pepper)', 'Honey'],
    review_flags: [],
    scholarly_notes: 'Medplants Folio Page 10. Expectorant and anti-pyretic formulation for cold and cough.'
  },

  // === 4. ANDANIKI, AROGYANIKI ADBHUTA CHITKALU (1 Folio) ===
  'beauty-p15-1': {
    plant_part_used: 'Niryasa (Tree Gum)',
    anupana_vehicle: 'Godugdha (Cow milk)',
    dosage_verbatim: 'Tree gum ground finely in milk and applied across forehead',
    ingredients_structured: ['Munaga jiguru (Moringa oleifera gum)', 'Cow milk'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: 'Beauty Folio Page 15. Classical folk lepam for throbbing vascular headaches.'
  },

  // === 5. INTINTA MULIKA VAIDYAM (18 Folios) ===
  'intinta-pg27-01': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Madhu (Raw honey)',
    dosage_verbatim: '1 to 2 teaspoons fresh juice licked with honey',
    ingredients_structured: ['Tulasi fresh leaves (Ocimum sanctum)', 'Honey'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 27. Primary household respiratory soother for acute cough.'
  },
  'intinta-pg27-02': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Miriyala Churna (Black pepper powder)',
    dosage_verbatim: '1 teaspoon juice with pinch of black pepper',
    ingredients_structured: ['Tulasi leaf juice', 'Black pepper powder'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 27. Clears phlegm and sore throat hoarseness.'
  },
  'intinta-pg27-03': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Kashayam (Decoction with ginger and pepper)',
    dosage_verbatim: 'Boiled decoction taken warm twice daily',
    ingredients_structured: ['Tulasi leaves', 'Shunti (Dry ginger)', 'Maricha (Black pepper)'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 27. Classical household fever decoction.'
  },
  'intinta-pg29-01': {
    plant_part_used: 'Patra (Inner leaf pulp / gel)',
    anupana_vehicle: 'Sita (Sugar candy) or Jeeraka',
    dosage_verbatim: '2 spoons fresh gel mixed with sugar candy in morning',
    ingredients_structured: ['Kalabanda leaf gel (Aloe vera)', 'Sugar candy'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 29. Pitta-cooling demulcent for stomach heat.'
  },
  'intinta-pg29-02': {
    plant_part_used: 'Patra (Peeled inner gel)',
    anupana_vehicle: 'Castor oil / External lepam',
    dosage_verbatim: 'Warmed gel applied over sprains and bruises',
    ingredients_structured: ['Kalabanda leaf gel (Aloe vera)', 'Castor oil'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: 'Intinta Folio Page 30. Local anti-inflammatory poultice.'
  },
  'intinta-pg31-01': {
    plant_part_used: 'Niryasa (Musambaram / Dried leaf exudate)',
    anupana_vehicle: 'Local application with water',
    dosage_verbatim: 'Small piece rubbed on stone with water applied over painful boils',
    ingredients_structured: ['Musambaram (Aloe vera dried concentrate)'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: 'Intinta Folio Page 31. Classical local drawing paste for painful abscesses.'
  },
  'intinta-pg32-01': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Takra (Fresh buttermilk)',
    dosage_verbatim: '10 grams whole plant ground into fine paste with 1 glass buttermilk',
    ingredients_structured: ['Nela Usiri whole plant (Phyllanthus amarus)', 'Fresh buttermilk'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 32. Classical folklore remedy for Kamarla (Jaundice).'
  },
  'intinta-pg33-01': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Cow milk or warm water',
    dosage_verbatim: '5 grams whole plant powder with cow milk twice daily',
    ingredients_structured: ['Nela Usiri powder', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 33. Diuretic and glycemic-support formulation.'
  },
  'intinta-pg34-01': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Senaga ginja size pills with water',
    dosage_verbatim: 'Equal parts Nela Vemu, Jeeraka, Elachi made into Bengal-gram pills; 1 pill twice daily',
    ingredients_structured: ['Nela Vemu whole plant (Andrographis paniculata)', 'Jeeraka', 'Elachi'],
    review_flags: ['EXTREME_BITTER_RASA'],
    scholarly_notes: 'Intinta Folio Page 34. Traditional febrifuge pills for malarial fever.'
  },
  'intinta-pg36-01': {
    plant_part_used: 'Moola & Panchanga (Root and whole plant)',
    anupana_vehicle: 'Dantadhavanam / Toothpaste paste',
    dosage_verbatim: 'Root chewed as toothbrush or dried plant powder brushed with alum',
    ingredients_structured: ['Uttareni root and whole plant (Achyranthes aspera)', 'Patika (Alum)'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 36. Dantadhavana astringent formulation for firming gums.'
  },
  'intinta-pg37-01': {
    plant_part_used: 'Moola (Root)',
    anupana_vehicle: 'Water',
    dosage_verbatim: '1 spoon root paste mixed in 1 glass water daily',
    ingredients_structured: ['Uttareni root paste', 'Water'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 37. Ashmari (calculi) dissolving traditional drink.'
  },
  'intinta-pg40-01': {
    plant_part_used: 'Phala (Berries / Fruit)',
    anupana_vehicle: 'Madhu (Raw honey)',
    dosage_verbatim: '1 to 2 grams fruit powder mixed with honey for children',
    ingredients_structured: ['Vakudu fruit powder (Solanum virginianum)', 'Honey'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 40. Bala Kasa (pediatric cough) bronchodilator. (Page 20 scan blurred; transcribed from Page 40).'
  },
  'intinta-pg42-01': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Nuvvula Nune (Sesame oil) - External only',
    dosage_verbatim: 'Sesame oil smeared over leaves, warmed gently, bandaged over swollen joints',
    ingredients_structured: ['Jilledu leaves (Calotropis gigantea)', 'Sesame oil'],
    review_flags: ['REQUIRES_SAFETY_REVIEW', 'EXTERNAL_LEPAM_ONLY'],
    scholarly_notes: 'Intinta Folio Page 42. [SAFETY REVIEW FLAG: Potentially irritating plant latex. External svedana application only.]'
  },
  'intinta-pg84-01': {
    plant_part_used: 'Moola (Root)',
    anupana_vehicle: 'Water decoction',
    dosage_verbatim: '1/2 cup root decoction administered to expel worms',
    ingredients_structured: ['Gaddida Gadapa root (Aristolochia bracteolata)'],
    review_flags: ['REQUIRES_SAFETY_REVIEW', 'EXTERNAL_LEPAM_ONLY'],
    scholarly_notes: 'Intinta Folio Page 84. [SAFETY REVIEW FLAG: Preserved verbatim; Aristolochia contains nephrotoxic aristolochic acid. Historical record requiring clinical review.]'
  },
  'intinta-pg81-01': {
    plant_part_used: 'Kanda (Stem)',
    anupana_vehicle: 'Direct fresh juice',
    dosage_verbatim: '2 spoons fresh stem juice consumed daily',
    ingredients_structured: ['Nalleru fresh stem juice (Cissus quadrangularis)'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 81. Asthisandhaniya formula accelerating fracture healing.'
  },
  'intinta-pg81-02': {
    plant_part_used: 'Kanda (Stem)',
    anupana_vehicle: 'Cow ghee (Neyi)',
    dosage_verbatim: 'Stems fried gently in ghee and consumed with meals',
    ingredients_structured: ['Nalleru stem (Cissus quadrangularis)', 'Cow ghee'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 81. Raktastambhana formulation for bleeding hemorrhoids.'
  },
  'intinta-pg95-01': {
    plant_part_used: 'Patra (Tender leaves)',
    anupana_vehicle: 'Dietary curry or dal',
    dosage_verbatim: 'Cooked tender leaves as regular vegetable curry or dal',
    ingredients_structured: ['Munaga tender leaves (Moringa oleifera)', 'Dal/Spices'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 95. Dietary Shakha for Vata-Kapha joint pains.'
  },
  'intinta-pg96-01': {
    plant_part_used: 'Moola Twak (Root bark)',
    anupana_vehicle: 'Godugdha (Fresh cow milk)',
    dosage_verbatim: 'Root bark crushed, juice mixed in fresh milk and consumed',
    ingredients_structured: ['Munaga root bark (Moringa oleifera)', 'Cow milk'],
    review_flags: [],
    scholarly_notes: 'Intinta Folio Page 96. Traditional lithotriptic drink for urinary stones.'
  },

  // === 6. 1000 KI PAIGA AYURVEDA CHITKALU (8 Folios) ===
  'chitkalu1000-pg05-01': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Madhu (Raw honey)',
    dosage_verbatim: '2 teaspoons fresh juice with pepper and honey twice daily',
    ingredients_structured: ['Tulasi leaves (Ocimum sanctum)', 'Maricha (Black pepper)', 'Honey'],
    review_flags: [],
    scholarly_notes: '1000 Chitkalu Folio Page 5. Corroborating respiratory formulation.'
  },
  'chitkalu1000-pg05-02': {
    plant_part_used: 'Patra & Haridra (Leaves and Turmeric)',
    anupana_vehicle: 'Coconut oil / External paste',
    dosage_verbatim: 'Equal parts leaves and turmeric boiled in coconut oil applied over skin',
    ingredients_structured: ['Vepa leaves (Azadirachta indica)', 'Pasupu (Curcuma longa)', 'Coconut oil'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: '1000 Chitkalu Folio Page 5. Soothing antibacterial paste for dermatitis.'
  },
  'chitkalu1000-pg07-01': {
    plant_part_used: 'Kanda / Rhizome (Turmeric)',
    anupana_vehicle: 'Godugdha (Warm cow milk)',
    dosage_verbatim: '1/2 teaspoon pure turmeric powder in 1 glass warm milk at bedtime',
    ingredients_structured: ['Pasupu rhizome powder (Curcuma longa)', 'Cow milk'],
    review_flags: [],
    scholarly_notes: '1000 Chitkalu Folio Page 7. Classical Haridra Khanda household remedy for throat immunity.'
  },
  'chitkalu1000-pg09-01': {
    plant_part_used: 'Patra (Leaves)',
    anupana_vehicle: 'Ghee / Dietary podi',
    dosage_verbatim: 'Dried curry leaf powder consumed daily with first morsel of rice and ghee',
    ingredients_structured: ['Karivepaku leaves (Murraya koenigii)', 'Cow ghee'],
    review_flags: [],
    scholarly_notes: '1000 Chitkalu Folio Page 9. Keshya and Deepana digestive powder for hair health and anemia.'
  },
  'chitkalu1000-pg11-01': {
    plant_part_used: 'Panchanga (Whole plant)',
    anupana_vehicle: 'Coconut or Sesame oil',
    dosage_verbatim: 'Fresh plant juice cooked in oil applied over scalp regularly',
    ingredients_structured: ['Guntagalagara plant juice (Eclipta prostrata)', 'Sesame oil'],
    review_flags: ['EXTERNAL_APPLICATION'],
    scholarly_notes: '1000 Chitkalu Folio Page 11. Classical Bhringaraja Taila preparation for premature greying and hair fall.'
  },
  'chitkalu1000-pg30-01': {
    plant_part_used: 'Patra & Phala (Leaves and Drumsticks)',
    anupana_vehicle: 'Dietary soup / curry',
    dosage_verbatim: 'Drumstick soup or cooked leaves consumed regularly in meals',
    ingredients_structured: ['Munaga leaves and pods (Moringa oleifera)'],
    review_flags: [],
    scholarly_notes: '1000 Chitkalu Folio Page 30. Nutritive dietary tonic for joint strength and vitality.'
  },
  'chitkalu1000-pg20-01': {
    plant_part_used: 'Phala / Beeja (Fruits / Seeds)',
    anupana_vehicle: 'Saindhava Lavana & Warm water',
    dosage_verbatim: '1/2 teaspoon roasted Ajwain chewed with pinch of rock salt followed by warm water',
    ingredients_structured: ['Vamu seeds (Trachyspermum ammi)', 'Rock salt', 'Warm water'],
    review_flags: [],
    scholarly_notes: '1000 Chitkalu Folio Page 20. Instant carminative and antispasmodic for gas colic.'
  },
  'chitkalu1000-pg05-03': {
    plant_part_used: 'Ksheera (Milky latex)',
    anupana_vehicle: 'External spot application only',
    dosage_verbatim: '1 drop milky latex placed directly over splinter entry point',
    ingredients_structured: ['Jilledu milk (Calotropis gigantea latex)'],
    review_flags: ['REQUIRES_SAFETY_REVIEW', 'EXTERNAL_LEPAM_ONLY'],
    scholarly_notes: '1000 Chitkalu Folio Page 5. [SAFETY REVIEW FLAG: Caustic latex for extracting deep splinters. External topical application only; avoid eye contact.]'
  }
};

export const GOLD_CORPUS_ENTRY_IDS: string[] = Object.keys(GOLD_CORPUS_ENRICHMENTS);

export function getGoldCorpusRecord(id: string): (GoldCorpusEnrichment & { id: string }) | null {
  const enrichment = GOLD_CORPUS_ENRICHMENTS[id];
  if (!enrichment) return null;
  return {
    id,
    ...enrichment
  };
}

export const GOLD_CORPUS_RECORDS = Object.entries(GOLD_CORPUS_ENRICHMENTS).map(([id, enrichment]) => ({
  id,
  ...enrichment
}));
