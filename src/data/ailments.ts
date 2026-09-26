import { AilmentInfo } from '../types';

export const AILMENT_DIRECTORIES: AilmentInfo[] = [
  {
    "id": "piles",
    "name": "Piles & Hemorrhoids",
    "telugu_name": "మూలవ్యాధి / అర్శస్సు (పైల్స్)",
    "category": "Digestive & Anorectal",
    "description": "Enlarged, inflamed, and painful vascular cushions in the lower rectum or anal canal. In Ayurveda, classified as Arshas, primarily stemming from Mandagni (sluggish digestive fire) and chronically dry Apana Vata causing hard stool passage.",
    "classical_term": "Arshas (Raktarshas / Shushkarshas)",
    "dosha_involvement": "Vata-Pitta dominant (Bleeding type) or Vata-Kapha (Hard mass type)",
    "pathya_apathya": {
      "recommended": [
        "Cooked Elephant Foot Yam (Kanda / Surana) with sesame oil",
        "Fresh churned buttermilk (Majjiga) with cumin and rock salt",
        "Soaked black raisins (Kishmish) and prunes",
        "Adequate warm water and high soluble fiber foods (lauki, ridge gourd, oats)"
      ],
      "avoid": [
        "Excessive red chillies, raw garlic, deep-fried snacks",
        "Prolonged sitting on hard surfaces",
        "Excessive straining during defecation",
        "Dry, stale, or astringent un-oiled foods"
      ]
    },
    "red_flags": [
      "Active bright red spurting arterial bleeding from the rectum",
      "Sudden excruciating unbearable perianal pain with hard bluish lump (Thrombosed external pile)",
      "Black tarry stools (Melena - indicates upper GI bleed)",
      "High fever with perianal heat and pus drainage (Abscess / Fistula)"
    ],
    "indexed_remedies_count": 9
  },
  {
    "id": "headache",
    "name": "Headaches & Migraines",
    "telugu_name": "తలనొప్పి / పార్శ్వపు నొప్పి (మైగ్రేన్)",
    "category": "Headache & Neuro",
    "description": "Cranial pain ranging from tension headache, sinusitis congestion, to unilateral throbbing migraines (Ardhavabhedaka / Suryavarta). In Ayurveda, caused by irregular sleep, suppressed natural urges, eye strain, or Pitta-Vata vitiation in the head channels (Shiro-srotas).",
    "classical_term": "Shirashula / Ardhavabhedaka / Suryavarta",
    "dosha_involvement": "Vata-Pitta (Migraine/burning) or Vata-Kapha (Sinus congestion/heaviness)",
    "pathya_apathya": {
      "recommended": [
        "Cooling sweet fruits (sweet grapes, pomegranate, fresh coconut water)",
        "Applying cooling herbal pastes (Shunthi/Jatamansi/Vaavili lepam) to forehead",
        "Regular sleep timing and gentle oil massage (Shiroabhyanga)",
        "Drinking lukewarm water and having meals on time"
      ],
      "avoid": [
        "Skipping meals or fasting excessively",
        "Direct harsh midday sun exposure without head covering",
        "Loud noise, excessive screen time in dark rooms",
        "Pungent, sour, fermented, and excessively salty foods"
      ]
    },
    "red_flags": [
      "Sudden \"thunderclap\" severe headache (worst headache of life)",
      "Headache accompanied by stiff neck, fever, confusion, or photophobia (Meningitis sign)",
      "Headache with focal neurological deficits, slurred speech, or weakness on one side",
      "Headache following recent head trauma or progressive worsening over weeks"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "fever",
    "name": "Fevers & Chills",
    "telugu_name": "జ్వరము / చలి జ్వరం (మలేరియా, వైరల్)",
    "category": "Fevers & Immunity",
    "description": "Systemic elevation of body temperature resulting from the displacement of digestive fire (Jatharagni) into circulating tissues by Ama (toxins). Encompasses seasonal viral flu, chill-fevers (Chali Jwaram), and chronic low-grade fevers (Jeerna Jwara).",
    "classical_term": "Jwara (Vataja, Pittaja, Kaphaja, Sannipataja, Vishama Jwara)",
    "dosha_involvement": "Tridoshic with circulating Ama toxins",
    "pathya_apathya": {
      "recommended": [
        "Langhana (light therapeutic fasting) or warm thin rice/mung gruel (Peya/Yavagu)",
        "Boiled Shadanga paniya water (water boiled with Musta, Ushira, Ginger)",
        "Fresh Tulsi and black pepper warm infusions",
        "Adequate rest in a draft-free warm room"
      ],
      "avoid": [
        "Heavy oily foods, dairy, sweets, and solid meals during acute fever spike",
        "Cold drafts, air conditioners, chilled drinks, and cold baths",
        "Physical exertion, excessive talking, or emotional stress",
        "Suppression of perspiration"
      ]
    },
    "red_flags": [
      "High temperature above 103°F (39.5°C) or fever not responding to basic measures",
      "Fever accompanied by severe shortness of breath, chest pain, or blue lips",
      "Fever in infants under 3 months old",
      "Persistent fever lasting more than 48-72 hours without clear etiology (needs malaria/dengue/typhoid labs)"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "respiratory",
    "name": "Cough, Cold & Asthma",
    "telugu_name": "దగ్గు, జలుబు, ఉబ్బసము (శ్వాసకాసలు)",
    "category": "Respiratory & Cough",
    "description": "Disorders of the respiratory channels (Pranavaha Srotas) characterized by airway reactivity, spasmodic cough (Kasa), wheezing, and mucosal secretions (Kapha).",
    "classical_term": "Kasa / Shwasa / Pratishyaya",
    "dosha_involvement": "Vata and Kapha dominant",
    "pathya_apathya": {
      "recommended": [
        "Ginger-honey syrup, warm turmeric milk, and black pepper decoctions",
        "Steam inhalation with Tulsi or Nirgundi leaves",
        "Warm, freshly prepared light soups with cumin and garlic",
        "Sitting upright and sleeping with elevated pillows"
      ],
      "avoid": [
        "Ice cream, cold refrigerated water, yogurt, bananas at night",
        "Exposure to cold winds, dust, smoke, and chemical aerosols",
        "Daytime sleeping (increases Kapha obstruction)",
        "Suppression of coughing or sneezing"
      ]
    },
    "red_flags": [
      "Inability to speak in full sentences due to severe breathlessness",
      "Stridor, chest wall retraction, or cyanosis around fingernails/mouth",
      "Coughing up frank blood (Hemoptysis)",
      "Oxygen saturation dropping below 94%"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "joints",
    "name": "Joint Pain & Rheumatism",
    "telugu_name": "కీళ్ళనొప్పులు / ఆమవాతం / సంధివాతం",
    "category": "Joints & Pain",
    "description": "Pain, swelling, stiffness, and restricted movement in joints. Differentiated in Ayurveda between Amavata (autoimmune inflammatory arthritis with morning stiffness) and Sandhivata (degenerative osteoarthritis due to dry Vata).",
    "classical_term": "Amavata / Sandhivata / Kroshtukashirsha",
    "dosha_involvement": "Vata dominant with metabolic Ama (Amavata) or Vata decay (Osteoarthritis)",
    "pathya_apathya": {
      "recommended": [
        "Warm dry-ginger and castor oil formulations (for Amavata)",
        "Dry hot fomentation (Valuka Sweda / warm salt pouch massage)",
        "Light, easily digestible warm soups seasoned with garlic, ginger, and turmeric",
        "Gentle non-weight-bearing mobility exercises within pain-free range"
      ],
      "avoid": [
        "Cold, damp environments and cold water bathing during acute flare-ups",
        "Heavy curds, black gram (urad), fermented bakery items, and cold drinks",
        "Immobilization without gentle range-of-motion movements",
        "Day sleeping after heavy meals"
      ]
    },
    "red_flags": [
      "Single hot, swollen, intensely red joint with fever (Septic arthritis emergency)",
      "Joint deformity following acute trauma (fracture or dislocation)",
      "Loss of bladder or bowel control accompanying severe back/leg pain (Cauda equina syndrome)"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "jaundice",
    "name": "Jaundice & Liver Health",
    "telugu_name": "కామెర్లు / కాలేయ వ్యాధులు",
    "category": "Digestive & Liver",
    "description": "Yellow discoloration of sclera and skin caused by Pitta stagnation and hepatic canalicular impairment. Classified in Ayurveda as Kamala (Kosthashrita or Shakhashrita) resulting from excessive fiery foods, alcohol, and un-cooled anger.",
    "classical_term": "Kamala / Yakritodara / Pandu",
    "dosha_involvement": "Pitta and Rakta vitiation with sluggish Agni",
    "pathya_apathya": {
      "recommended": [
        "Bhumyamalaki (Nela Usiri) or Guduchi decoction with honey",
        "Sugarcane juice, sweet grapes, tender coconut water, pomegranate",
        "Easily digestible old shali rice with mung bean soup",
        "Abundant physical and mental resting"
      ],
      "avoid": [
        "All oils, deep-fried snacks, ghee, and spicy pickles during active jaundice",
        "Alcohol, smoking, and heavy physical labor in hot sun",
        "Sour curds, mustard, tamarind, and fermented foods",
        "Daytime sleeping and suppression of natural urges"
      ]
    },
    "red_flags": [
      "Severe abdominal distension with fluid accumulation (Ascites)",
      "Confusion, altered sleep-wake cycle, or flapping hand tremor (Hepatic encephalopathy)",
      "Vomiting blood or passing black tarry stools"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "women-health",
    "name": "Women's Reproductive Health",
    "telugu_name": "స్త్రీల రోగాలు / రుతుశూల / కుసుమ రోగం",
    "category": "Women's Health",
    "description": "Menstrual irregularities, spasmodic dysmenorrhea, abnormal vaginal discharge (leukorrhea/Shwetapradara), and post-partum recovery. Handled through tonifying and astringent herbs like Ashoka, Shatavari, and Lodhra.",
    "classical_term": "Yonivyapad / Asrigdhara / Kashtartava",
    "dosha_involvement": "Apana Vata and Pitta vitiation",
    "pathya_apathya": {
      "recommended": [
        "Warm Ashoka bark decoctions and Shatavari with milk",
        "Iron and calcium rich foods (dates, soaked figs, sesame seeds, cooked greens)",
        "Abdominal warmth with hot water bag during painful menses",
        "Adequate rest during the first two days of menstruation"
      ],
      "avoid": [
        "Excessively spicy, pungent, and sour foods that aggravate bleeding",
        "Intense strenuous physical exhaustion during menstrual days",
        "Excessive stress and irregular eating schedules",
        "Suppression of urinary and defecation urges"
      ]
    },
    "red_flags": [
      "Soaking through one or more sanitary pads every hour for consecutive hours",
      "Severe pelvic pain with fever and foul-smelling vaginal discharge",
      "Sudden sharp abdominal pain in reproductive-age female (Ectopic pregnancy risk)",
      "Post-menopausal bleeding of any amount"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "skin-wounds",
    "name": "Skin Diseases, Eczema & Wounds",
    "telugu_name": "చర్మ రోగాలు / గజ్జి, తామర, పుండ్లు",
    "category": "Skin & Wounds",
    "description": "Inflammatory dermopathy, chronic itching (Kandu), ringworm (Dadru), eczema (Vicharchika), and non-healing ulcers (Dushta Vrana). Handled via bitter blood purifiers (Raktashodhaka) such as Neem, Manjistha, Khadira, and Wild Turmeric.",
    "classical_term": "Kushta / Kshudraroga / Vrana",
    "dosha_involvement": "Pitta-Kapha vitiation residing in Twak (Skin), Rakta (Blood), and Mamsa (Muscle)",
    "pathya_apathya": {
      "recommended": [
        "Bitter greens (bitter gourd, neem leaves, fenugreek)",
        "Boiled Shadanga paniya or water boiled with Khadira bark",
        "Applying fresh neem and wild turmeric paste topically",
        "Wearing loose, breathable, pure cotton garments"
      ],
      "avoid": [
        "Combining milk with fish or sour fruits (Viruddhahara / incompatible foods)",
        "Heavy jaggery, excessive salt, fermented batter, and curds at night",
        "Scratching lesions with dirty fingernails",
        "Chemical soaps and artificial synthetic clothes"
      ]
    },
    "red_flags": [
      "Rapidly spreading redness, heat, and severe pain around a wound (Cellulitis/Necrotizing infection)",
      "Skin lesions accompanied by high fever or systemic toxicity",
      "Non-healing ulcer persisting over 4 weeks without improvement (needs biopsy)"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "urinary-calculi",
    "name": "Kidney Stones & Dysuria",
    "telugu_name": "మూత్రపిండాల్లో రాళ్ళు / మూత్రంలో మంట",
    "category": "Urinary & Renal",
    "description": "Renal colic, formation of urinary calculi (Ashmari), and painful/burning urination (Mutrakrichhra) resulting from dehydration, mineral accretion, and obstructed Apana Vata flow.",
    "classical_term": "Mutrashmari / Mutrakrichhra",
    "dosha_involvement": "Vata and Pitta dominant with crystalline Kapha binding",
    "pathya_apathya": {
      "recommended": [
        "Banana stem juice (Arati Doota rasam) and boiled barley water (Yava toya)",
        "Punarnava and Gokshura decoctions",
        "Drinking plenty of lukewarm boiled water throughout the day",
        "Culinary intake of kulthi (Horse gram / Ulavalu) soup"
      ],
      "avoid": [
        "Excessive tomato seeds, spinach, red meat, and oxalate-heavy nuts",
        "Withholding urine when urge arises (Vegadharana)",
        "Dry hot climates without adequate rehydration",
        "Excessive alcoholic drinks and sour vinegar"
      ]
    },
    "red_flags": [
      "Complete inability to pass urine (Acute urinary retention)",
      "Severe intractable flank pain radiating to groin with vomiting",
      "Visible frank blood clots in urine (Hematuria) with high fever and rigors"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "digestive-agni",
    "name": "Indigestion, Acidity & Gas",
    "telugu_name": "అజీర్ణం / కడుపు ఉబ్బరం / గ్యాస్ / పుల్లతేనుపులు",
    "category": "Digestive & Gastric",
    "description": "Impairment of gastric metabolic enzymes (Jatharagni Mandya) leading to sour belching (Amlapitta), flatulence (Anaha), and sluggish bowel evacuation.",
    "classical_term": "Ajeerna / Amlapitta / Agnimandya / Anaha",
    "dosha_involvement": "Samana Vata, Pachaka Pitta, and Kledaka Kapha imbalance",
    "pathya_apathya": {
      "recommended": [
        "Ginger-cumin-coriander warm tea (CCF tea) 20 mins before meals",
        "Sipping lukewarm water with meals instead of chilled beverages",
        "Eating only when genuine hunger (Kshut) is felt",
        "Adding hing (asafoetida), roasted cumin, and black salt to foods"
      ],
      "avoid": [
        "Eating before the previous meal is fully digested (Adhyashana)",
        "Heavy late-night dinners directly before sleeping",
        "Carbonated sodas, deep-fried snacks, and stale leftovers",
        "Excessive mental tension or anger while eating"
      ]
    },
    "red_flags": [
      "Unexplained progressive difficulty in swallowing solid food (Dysphagia)",
      "Persistent vomiting or involuntary weight loss over 1 month",
      "Severe epigastric pain radiating directly to the back"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "hair-scalp",
    "name": "Hair Fall, Dandruff & Premature Greying",
    "telugu_name": "జుట్టు రాలడం / చుండ్రు / నెరవడం",
    "category": "Hair & Scalp",
    "description": "Excessive shedding of hair follicles (Khalitya), premature graying (Palitya), and dry/flaky scalp lesions (Darunaka) driven by Pitta heat drying the scalp roots and Vata constriction.",
    "classical_term": "Khalitya / Palitya / Darunaka",
    "dosha_involvement": "Pitta aggravated at the root of hairs with Vata drying",
    "pathya_apathya": {
      "recommended": [
        "Bhringraj and Amla medicated coconut oil head massage",
        "Washing hair with natural reetha (soapnut) and shikakai infusion",
        "Consuming soaked almonds, amla juice, and curry leaves daily",
        "Adequate restful sleep at night"
      ],
      "avoid": [
        "Excessive spicy, sour, salty, and burning foods that spike Pitta",
        "Washing hair with excessively hot boiling water",
        "Harsh chemical dyes, bleaches, and daily heated blow-drying",
        "Chronic stress and irregular night shifts"
      ]
    },
    "red_flags": [
      "Sudden localized coin-shaped smooth bald patches (Alopecia areata)",
      "Severe scalp inflammation with weeping crusts, boils, and foul odor"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "dental-oral",
    "name": "Toothache, Bleeding Gums & Mouth Ulcers",
    "telugu_name": "పంటి నొప్పి / చిగుళ్ళ వాపు / నోటి పుండ్లు",
    "category": "Dental & Oral",
    "description": "Periodontal inflammation (Dantaveshta), toothache from decay (Dantashula), and burning aphthous stomatitis ulcers (Mukharoga) relieved by astringent and styptic bark rinses.",
    "classical_term": "Dantashula / Dantaveshta / Mukhadaha",
    "dosha_involvement": "Vata in dental marrow and Pitta-Rakta in gingival tissue",
    "pathya_apathya": {
      "recommended": [
        "Gargling with warm decoction of Triphala, Babool, or Acacia catechu (Khadira)",
        "Applying pure Clove oil or clove powder paste directly on painful cavity",
        "Oil pulling (Gandusha) with warm sesame oil for 5 minutes in the morning",
        "Chewing tender neem or babool twigs for natural antimicrobial cleaning"
      ],
      "avoid": [
        "Excessive refined sugary sweets and sticky confectionery",
        "Very cold ice drinks immediately followed by hot liquids",
        "Chewing tobacco or smoking",
        "Rough brushing with hard bristles"
      ]
    },
    "red_flags": [
      "Facial or submandibular swelling spreading to throat (Ludwig angina risk)",
      "High fever with inability to open mouth (Trismus)",
      "Persistent oral ulcer lasting greater than 3 weeks without healing"
    ],
    "indexed_remedies_count": 9
  },
  {
    "id": "diabetes",
    "name": "Diabetes Mellitus & Polyuria",
    "telugu_name": "మధుమేహం / అతిమూత్ర వ్యాధి (షుగర్)",
    "category": "Metabolic & Endocrine",
    "description": "Chronic metabolic disorder manifesting as turbid, sweet urine (Madhumeha), frequent excessive micturition (Prameha / Atimootramu), burning extremities, and fatigue. Rooted in Medas (adipose) tissue vitiation, sedentary lifestyle, and impaired Agni.",
    "classical_term": "Madhumeha / Prameha",
    "dosha_involvement": "Tridoshic with Kaphaja and Vataja chronicity affecting Medas and Kleda",
    "pathya_apathya": {
      "recommended": [
        "Bitter gourds (Karela), fenugreek seeds (Menthulu), and Amla powder",
        "Decoctions of Guduchi (Tippateega) and Vijaysar (Yegisa)",
        "Barley (Yava), horse gram (Ulavalu), and finger millet (Ragi)",
        "Daily brisk walking and active morning lifestyle"
      ],
      "avoid": [
        "Refined sugars, jaggery, pastries, and confectionery",
        "Excessive polished white rice and new harvest grains",
        "Daytime sleeping (increases Kapha and Medas)",
        "Sedentary habits and sweet fruit juices in large quantities"
      ]
    },
    "red_flags": [
      "Diabetic ketoacidosis signs: deep rapid breathing, fruity breath odor, persistent vomiting",
      "Non-healing deep foot ulcer or blackened gangrenous toe",
      "Sudden blurred vision, confusion, or loss of consciousness (Hypoglycemic or Hyperosmolar coma)"
    ],
    "indexed_remedies_count": 14
  },
  {
    "id": "cardiac-hypertension",
    "name": "Cardiac Health, Palpitations & Hypertension",
    "telugu_name": "గుండెజబ్బులు / గుండెదడ / అధిక రక్తపోటు (బీపీ)",
    "category": "Cardiac & Circulation",
    "description": "Myocardial weakness, palpitations (Hritkampa / Hrid-Dada), dyslipidemia, and elevated arterial blood pressure (Raktachapa / Raktapotu). Managed classical formulations emphasize cardioprotective (Hridya) barks and calming nervines.",
    "classical_term": "Hridroga / Hritkampa / Raktavata",
    "dosha_involvement": "Prana Vata, Vyana Vata, and Sadhaka Pitta imbalance with Rasa tissue blockage",
    "pathya_apathya": {
      "recommended": [
        "Arjuna bark ksheerapaka (decoction boiled with cow milk)",
        "Garlic cloves steeped in milk, pomegranate juice, and bottle gourd soup",
        "Gentle regular walks and pranayama (Anuloma Viloma)",
        "Low-sodium meals flavored with rock salt (Saindhava Lavana) in moderation"
      ],
      "avoid": [
        "Excessive dietary table salt, deep-fried snacks, and saturated animal fats",
        "Intense mental stress, chronic anger, and suppressed emotional grief",
        "Smoking, tobacco chewing, and heavy alcohol consumption",
        "Strenuous unconditioned heavy weightlifting or sudden sprint exertion"
      ]
    },
    "red_flags": [
      "Crushing retrosternal chest pain radiating to left arm, neck, or jaw",
      "Chest tightness accompanied by diaphoresis (cold sweats), dizziness, or nausea",
      "Sudden loss of consciousness or acute breathlessness at rest"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "eye-vision",
    "name": "Eye Health, Visual Obscuration & Night Blindness",
    "telugu_name": "కంటి సమస్యలు / రేచీకటి / చూపు మందగించడం",
    "category": "Ophthalmic & Sensory",
    "description": "Ocular disorders involving visual blurring (Timira), night blindness (Ratri Andhatvam / Rechikati), conjunctival burning, and progressive visual acuity decline. Governed by Alochaka Pitta residing in the pupil and lens.",
    "classical_term": "Netraroga / Timira / Linganasha / Ratri Andhatva",
    "dosha_involvement": "Alochaka Pitta vitiation with circulating Vata dry wind",
    "pathya_apathya": {
      "recommended": [
        "Triphala ghrita or daily eye washes with filtered Triphala water",
        "Culinary consumption of drumstick leaves (Munaga aaku), spinach, and carrots",
        "Pure cow ghee applied to soles of feet at bedtime (Padabhyanga)",
        "Regular ocular relaxation breaks during screen viewing"
      ],
      "avoid": [
        "Staring directly at glaring screens in pitch-dark rooms",
        "Rubbing itchy eyes with unwashed hands",
        "Excessive spicy, sour, and burning foods that provoke Pitta in the eyes",
        "Sudden exposure to hot sun after cold water face washing"
      ]
    },
    "red_flags": [
      "Sudden painless or painful unilateral vision loss",
      "Halos around lights with severe eye pain and headache (Acute angle-closure glaucoma)",
      "Traumatic eye injury or chemical foreign body splash"
    ],
    "indexed_remedies_count": 4
  },
  {
    "id": "rejuvenation-rasayana",
    "name": "General Debility, Memory & Rasayana Rejuvenation",
    "telugu_name": "శరీర బలహీనత / జ్ఞాపకశక్తి / రసాయన వృద్ధి",
    "category": "Rejuvenation & Vitality",
    "description": "Age-related tissue depletion (Dhatukshaya), chronic nervous exhaustion, mental brain fog, and lack of concentration. Classical Telugu texts document potent Medhya (intellect-promoting) and Rasayana (cellular longevity) recipes.",
    "classical_term": "Rasayana / Medhadhatu Vardhaka / Ojas Kshaya",
    "dosha_involvement": "Vata dominance with depletion of the seven Sapta Dhatus and Ojas vitality",
    "pathya_apathya": {
      "recommended": [
        "Brahmi (Saraswati aaku), Shankhapushpi, and Ashwagandha with warm milk and ghee",
        "Soaked almonds, walnuts, dates, and fresh Indian gooseberry (Amla)",
        "Adequate undisturbed 7-8 hours of nighttime sleep",
        "Mindful meditation and regular daily intellectual exercise"
      ],
      "avoid": [
        "Excessive late-night awakenings and chronic sleep deprivation",
        "Excessive mental overstrain, anxiety, and continuous multitasking",
        "Dry, stale, packaged junk food lacking nutritional prana",
        "Intoxication and excessive sensory overstimulation"
      ]
    },
    "red_flags": [
      "Rapid unintended weight loss and progressive muscle wasting without known cause",
      "Sudden cognitive disorientation, speech changes, or memory blackout spells",
      "Extreme physical exhaustion preventing basic daily self-care"
    ],
    "indexed_remedies_count": 13
  },
  {
    "id": "bone-fractures",
    "name": "Bone Fractures & Musculoskeletal Weakness",
    "telugu_name": "విరిగిన ఎముకలు / అస్థిభంగము / బలహీన కీళ్ళు",
    "category": "Musculoskeletal & Bones",
    "description": "Traumatic bone fractures (Asthibhanga), delayed union of broken bone fragments, and osteoporotic skeletal weakness. Handled historically through bone-knitting botanical poultices and Asthisamharaka (Cissus quadrangularis).",
    "classical_term": "Asthibhanga / Sandhimukta / Asthikshaya",
    "dosha_involvement": "Asthi Dhatu depletion with severe local Vata trauma",
    "pathya_apathya": {
      "recommended": [
        "Cissus quadrangularis (Nalleru) stem cooked with black gram and sesame oil",
        "Calcium-rich foods (Ragi, sesame seeds / Nuvvulu, warm milk)",
        "Topical application of warm medicated Murivenna or Laksha tailam around stabilized limb",
        "Strict structural immobilization until radiological bridging"
      ],
      "avoid": [
        "Weight-bearing on unsplinted or unhealed bone fracture site",
        "Excessive carbonated sodas and acidic beverages that deplete bone calcium",
        "Smoking (significantly retards osteoblast bone union)",
        "Violent unguided joint manipulation or bone setting by unqualified practitioners"
      ]
    },
    "red_flags": [
      "Open compound fracture where bone pierces skin (surgical emergency)",
      "Absence of distal pulse, coldness, or numbness in fingers/toes beyond injury site (Compartment syndrome)",
      "Severe spinal fracture with neurological loss of sensation below waist"
    ],
    "indexed_remedies_count": 3
  },
  {
    "id": "ent-throat-ear",
    "name": "Earache, Sore Throat & Glandular Swelling",
    "telugu_name": "చెవిపోటు / గొంతు నొప్పి / గవద బిళ్ళలు (టాన్సిల్స్)",
    "category": "ENT & Throat",
    "description": "Otic earache (Karnashula), painful pharyngitis, tonsillar inflammation, and parotid glandular swellings (Gavada Billalu / Galaganda) relieved through warm herbal ear drops (Karnapoorana) and astringent gargles.",
    "classical_term": "Karnaroga / Galaganda / Kantharoga",
    "dosha_involvement": "Vata in ear canal, Kapha-Pitta in throat and cervical lymphatics",
    "pathya_apathya": {
      "recommended": [
        "Warm salt water or Triphala water gargling 3 times daily for sore throat",
        "Warm garlic or Nirgundi medicated sesame oil drops for non-perforated earache",
        "Ginger and long pepper (Pippali) honey paste for pharyngeal irritation",
        "Warm flannel compress over swollen jaw and neck"
      ],
      "avoid": [
        "Inserting unsterilized sharp objects (hairpins, matchsticks) into ear canal",
        "Cold refrigerated beverages, ice cream, and chilled curds",
        "Swimming in unhygienic water during active ear discharge",
        "Excessive loud earphone volumes"
      ]
    },
    "red_flags": [
      "Foul-smelling ear discharge with vertigo or drooping of facial muscles (Mastoiditis / Cholesteatoma)",
      "Severe difficulty breathing or swallowing saliva (Epiglottitis / Peritonsillar abscess)",
      "Blood oozing from ear canal following head trauma"
    ],
    "indexed_remedies_count": 29
  },
  {
    "id": "intestinal-worms",
    "name": "Intestinal Worms & Parasitic Infestation",
    "telugu_name": "కడుపులో పురుగులు / నులిపురుగులు (క్రిమి రోగం)",
    "category": "Gastrointestinal & Parasites",
    "description": "Helminthic intestinal parasite infections (Antrakrimi) causing abdominal cramping, pruritus ani, poor nutrient absorption, and nocturnal teeth grinding in children.",
    "classical_term": "Krimiroga / Purishaja Krimi",
    "dosha_involvement": "Kaphaja and Purishaja vitiation producing fertile ground for parasites",
    "pathya_apathya": {
      "recommended": [
        "Vidanga (Vayuvidangalu) and dried ginger decoction with warm water",
        "Fresh tender neem leaf paste and raw papaya seeds",
        "Light bitter vegetables (bitter gourd, pointed gourd)",
        "Boiled warm drinking water and strict fingernail hygiene"
      ],
      "avoid": [
        "Excessive sweets, jaggery, milk confectioneries, and pastries",
        "Eating raw unwashed salads or soil-contaminated vegetables",
        "Consuming unboiled tap water while traveling",
        "Daytime sleeping and heavy fermented dough"
      ]
    },
    "red_flags": [
      "Passing large ball of tangled worms with severe intestinal obstruction and vomiting",
      "Severe anemia, pale conjunctiva, and rapid emaciation",
      "High spiking fever with severe localized right upper quadrant abdominal tenderness"
    ],
    "indexed_remedies_count": 2
  },
  {
    "id": "obesity-weight",
    "name": "Metabolic Adiposity & Weight Management",
    "telugu_name": "స్థూలకాయం / పొట్టలో కొవ్వు / మేదోరోగం",
    "category": "Metabolic & Endocrine",
    "description": "Excessive accumulation of subcutaneous and visceral fat (Medas) with sluggish lymphatic circulation and dyslipidemia. Treated through scraping (Lekhana) herbs and hot metabolic tonics.",
    "classical_term": "Medoroga / Sthaulya / Atisthaulya",
    "dosha_involvement": "Kapha and Medas tissue accumulation blocking Vata movement",
    "pathya_apathya": {
      "recommended": [
        "Warm water with raw honey and lemon first thing in the morning",
        "Horse gram (Ulavalu) soup seasoned with black pepper and cumin",
        "Dry ginger powder, long pepper (Pippali), and Triphala",
        "Regular brisk physical activity and resistance workouts"
      ],
      "avoid": [
        "Excessive sweets, creamy dairy, ghee, and deep-fried savory items",
        "Daytime sleeping immediately after lunch",
        "Sedentary lifestyle and continuous sitting without standing breaks",
        "Late-night heavy carbohydrate dinners"
      ]
    },
    "red_flags": [
      "Severe daytime somnolence and waking up gasping for air (Obstructive sleep apnea)",
      "Rapid sudden fluid gain accompanied by bilateral leg pitting edema and shortness of breath",
      "Severe breathlessness upon minimal exertion"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "asthma",
    "name": "Bronchial Asthma & Wheezing Dyspnea",
    "telugu_name": "ఉబ్బసము / తమకశ్వాస / ఆయాసము",
    "category": "Respiratory & Cough",
    "description": "Paroxysmal respiratory distress characterized by wheezing, chest tightness, and bronchial constriction. In classical Ayurveda, identified as Tamakasvasa, caused by vitiated Vata obstructed by Kapha phlegm in the Pranavaha srotas (respiratory tract).",
    "classical_term": "Tamakasvasa / Shwasaroga / Kaphaja Shwasa",
    "dosha_involvement": "Prana Vata obstructed by Kledaka Kapha in respiratory channels",
    "pathya_apathya": {
      "recommended": [
        "Warm water with freshly ground black pepper (Miriyalu) and raw honey",
        "Boiled ginger and tulsi decoction taken warm twice daily",
        "Light, easily digestible warm soups (kulattha/horsegram soup)",
        "Gentle chest steaming with eucalyptus or camphor"
      ],
      "avoid": [
        "Chilled refrigerated liquids, curd, and heavy creamy dairy",
        "Direct cold breeze, smoke, industrial dust, and damp environments",
        "Daytime sleeping, which increases Kapha stagnation in the lungs",
        "Heavy, fried, oily, and mucus-generating foods"
      ]
    },
    "red_flags": [
      "Inability to speak in full sentences due to extreme shortness of breath",
      "Bluish discoloration of lips or fingernails (Cyanosis - emergency hypoxia)",
      "Subcostal and intercostal chest retractions with silent chest on auscultation",
      "Peak expiratory flow rate dropping below 50% of personal best"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "warts-corns",
    "name": "Corns, Calluses & Cutaneous Warts",
    "telugu_name": "ఆనెలు / పులిపిరులు / చర్మపు మొలకలు",
    "category": "Dermatology & Skin Care",
    "description": "Hyperkeratotic localized skin thickenings, plantar corns (Aanelu), viral papillomas, and cutaneous warts (Pulipirulu). Classical treatises prescribe caustic latexes (such as Calotropis/Jilledu milk or Euphorbia/Brahmadandi) for gradual painless chemical desquamation.",
    "classical_term": "Kadara (Corns) / Charmakeela (Warts) / Masaka",
    "dosha_involvement": "Vata-Kapha vitiation causing localized Medas-Twak hyperkeratinization",
    "pathya_apathya": {
      "recommended": [
        "Topical spot-application of fresh Calotropis (Jilledu) latex or Euphorbia sap precisely onto the corn center",
        "Soaking affected feet in warm salt water before gentle pumice stone exfoliation",
        "Wearing comfortable, wide-toed cushioned footwear to eliminate pressure points",
        "Moisturizing dry callused skin with castor oil (Aamudam) before sleep"
      ],
      "avoid": [
        "Walking barefoot on hard, sharp, or stony surfaces",
        "Attempting to violently excise or cut corns with unsterilized blades at home",
        "Wearing tight, narrow-pointed high-heeled footwear",
        "Applying caustic latex to normal surrounding healthy skin without petroleum protection"
      ]
    },
    "red_flags": [
      "Diabetic foot ulceration developing beneath a callus (requires urgent diabetic wound care)",
      "Spreading cellulitis redness, warmth, and purulent discharge around corn margins",
      "Rapidly growing, pigmented, ulcerated, or irregularly bordered cutaneous lesion"
    ],
    "indexed_remedies_count": 4
  },
  {
    "id": "ulcers-burns",
    "name": "Non-Healing Ulcers, Wounds & Burn Injuries",
    "telugu_name": "మానని పుండ్లు / వ్రణాలు / కాలిన గాయాలు",
    "category": "Skin & Wounds",
    "description": "Chronic non-healing dermal ulcers (Dushta Vrana), traumatic lacerations, and burn wounds. Classical texts emphasize sequential cleansing (Shodhana) with astringent Kashayas followed by granulation promotion (Ropana) using medicated ghee and herbal washes.",
    "classical_term": "Dushta Vrana / Sadyovrana / Dagdhavrana",
    "dosha_involvement": "Pitta-Rakta vitiation with secondary Kapha slough or Vata ulceration",
    "pathya_apathya": {
      "recommended": [
        "Washing wounds with Triphala or Neem (Vepa) leaf decoction for sterile debridement",
        "Topical dressing with Jatyadi tailam or Shatadhouta ghrita (100x washed ghee)",
        "Turmeric and honey sterile poultice for active antimicrobial granulation",
        "Consuming light vitamin C rich foods (Amla) and protein-rich lentils for tissue regeneration"
      ],
      "avoid": [
        "Applying unsterilized dirt, cow dung, or contaminated ashes to open wounds",
        "Excessively hot, spicy, fermented, and sour foods that aggravate Pitta inflammation",
        "Scratching or peeling off healing scabs prematurely",
        "Exposing active wounds to stagnant contaminated water"
      ]
    },
    "red_flags": [
      "Black necrotic tissue spreading with foul putrid odor (Gangrene)",
      "Ascending red streaks along the limb with high fever and rigors (Lymphangitis / Sepsis)",
      "Extensive second or third-degree burns involving >10% total body surface area",
      "Deep penetrating puncture wound from rusty nail or animal bite"
    ],
    "indexed_remedies_count": 34
  },
  {
    "id": "dysuria-uti",
    "name": "Burning Micturition & Urinary Tract Infections",
    "telugu_name": "మూత్రంలో మంట / మూత్రకృచ్ఛ్రం / ఇన్ఫెక్షన్",
    "category": "Urinary & Renal",
    "description": "Painful, scalding urination (Mutradaha), burning dysuria, and acute lower urinary tract infections (Mutrakrichra). Addressed through lithotriptic, diuretic (Mutrala), and cooling Pitta-pacifying botanicals such as Gokshura, Dhanyaka (coriander), and Punarnava.",
    "classical_term": "Mutrakrichra / Mutradaha / Pittaja Mutrakrichra",
    "dosha_involvement": "Pitta-Vata aggravation in Mutravaha srotas (urinary tract)",
    "pathya_apathya": {
      "recommended": [
        "Drinking plenty of tender coconut water and barley water throughout the day",
        "Coriander seed (Dhaniyalu) cold infusion (Hima) with rock sugar for burning relief",
        "Cucumber, watermelon, and cooling seasonal melons",
        "Gokshura (Palleru) decoction with goat milk or warm water"
      ],
      "avoid": [
        "Excessive green chillies, spicy curries, and pungent mustard pickles",
        "Holding or suppressing the natural urge to urinate (Mutravegarodha)",
        "Excessive alcohol, dark roast coffee, and carbonated caffeinated beverages",
        "Heavy physical exertion under scorching midday sun without rehydration"
      ]
    },
    "red_flags": [
      "High spiking fever with costovertebral flank angle pain and shaking chills (Pyelonephritis)",
      "Frank gross visible blood clots in urine (Hematuria - requires cystoscopy/urological workup)",
      "Complete inability to pass urine with painful palpable suprapubic bladder distension"
    ],
    "indexed_remedies_count": 10
  },
  {
    "id": "polyuria-diabetes",
    "name": "Polyuria & Excessive Urination",
    "telugu_name": "అతిమూత్ర వ్యాధి / ప్రమేహము",
    "category": "Metabolic & Endocrine",
    "description": "Abnormally large volume and frequency of urination, particularly nocturnal urination (Nocturia). In Ayurveda, classified under the 20 subtypes of Prameha, stemming from Medas (fat) and Kleda (metabolic moisture) overload weakening the urinary bladder.",
    "classical_term": "Prameha / Atimutra / Udakameha",
    "dosha_involvement": "Kapha-Vata dominant with excessive fluid transudation into urinary channels",
    "pathya_apathya": {
      "recommended": [
        "Amla (Usiri) juice mixed with turmeric powder (Nisha-Amalaki combination)",
        "Barley (Yava) flatbreads and whole grain millets",
        "Fenugreek seed (Menthulu) water consumed on an empty stomach",
        "Bitter gourds, drumsticks, and astringent green leafy vegetables"
      ],
      "avoid": [
        "Cane sugar sweets, jaggery, honey candies, and artificial syrups",
        "Excessive intake of freshly harvested polished rice and refined flours",
        "Sedentary lifestyle and sleeping during the daytime",
        "Cold, sweet milk beverages before bedtime"
      ]
    },
    "red_flags": [
      "Kussmaul deep rapid breathing with fruity acetone breath odor (Diabetic ketoacidosis)",
      "Extreme polyuria accompanied by severe dehydration and altered mental state",
      "Uncontrolled rapid weight loss despite excessive appetite and food intake"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "colic-spasm",
    "name": "Abdominal Colic, Flatulence & Spasmodic Cramps",
    "telugu_name": "ఉదరశూల / కడుపునొప్పి / గ్యాస్ నొప్పి",
    "category": "Digestive & Gastric",
    "description": "Acute paroxysmal griping abdominal pain, intestinal flatulence, and entrapment of gut gases (Anaha / Udara Shula). Resolved historically with carminative Deepana-Pachana seeds including Ajwain (Vamu), Asafoetida (Inguva), and Rock Salt (Saindhava Lavana).",
    "classical_term": "Udarashula / Anaha / Vataja Shula",
    "dosha_involvement": "Samana and Apana Vata obstruction by accumulated Ama toxins",
    "pathya_apathya": {
      "recommended": [
        "Warm water with pinch of roasted Ajwain (Vamu) and Rock Salt (Saindhavalavanam)",
        "Asafoetida (Hingu) paste applied topically around the naval with warm compress",
        "Sipping warm cumin (Jeera) boiled water after meals",
        "Light steamed rice gruel (Peya/Vilepi) seasoned with ginger"
      ],
      "avoid": [
        "Cold refrigerated water and iced soft drinks",
        "Gas-producing legumes (black gram, kidney beans, chick peas) without digestive spices",
        "Fasting or irregular skipping of scheduled meals",
        "Suppression of flatus (Apana Vata vegarodha)"
      ]
    },
    "red_flags": [
      "Rigid, board-like abdomen with severe rebound tenderness (Acute peritonitis / perforation)",
      "Severe localized right lower quadrant pain with fever and vomiting (Acute appendicitis)",
      "Severe radiating back pain with hypotension (Ruptured abdominal aortic aneurysm)"
    ],
    "indexed_remedies_count": 11
  },
  {
    "id": "nausea-vomiting",
    "name": "Nausea, Bilious Vomiting & Morning Sickness",
    "telugu_name": "వాంతులు / వికారం / ఛర్ది / పిత్త పైత్యం",
    "category": "Digestive & Gastric",
    "description": "Retrograde expulsion of gastric contents, bilious regurgitation, and visceral nausea (Chhardi). Classical formulations utilize cooling, anti-emetic aromatics such as Cardamom (Elachi), Clove (Lavanga), and Pomegranate (Danimma) to re-establish Udana Vata downward movement.",
    "classical_term": "Chhardiroga / Pittaja Chhardi / Hrillas",
    "dosha_involvement": "Udana and Samana Vata reversal aggravated by Pitta or Kapha",
    "pathya_apathya": {
      "recommended": [
        "Puffed rice water (Laja Peya) with a pinch of roasted cumin and cardamom",
        "Pomegranate juice with a small amount of rock candy sugar",
        "Chewing a small piece of fresh ginger with a grain of rock salt",
        "Sipping cool liquids in small frequent tablespoons rather than large gulps"
      ],
      "avoid": [
        "Heavy, oily, creamy, and greasy gravies that delay gastric emptying",
        "Strong offensive odors, smoke, and stuffy poorly ventilated rooms",
        "Eating large full meals all at once",
        "Lying flat immediately after consuming food or drink"
      ]
    },
    "red_flags": [
      "Vomiting frank red blood or coffee-ground dark material (Hematemesis)",
      "Persistent vomiting >24 hours with dry sunken eyes and inability to retain any liquids",
      "Projectile vomiting accompanied by severe morning headache without nausea (Raised ICP)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "diarrhea-dysentery",
    "name": "Diarrhea, Amoebic Dysentery & Sprue / IBS",
    "telugu_name": "అతిసారము / రక్త విరేచనాలు / జిగట గ్రహణి",
    "category": "Digestive & Gastric",
    "description": "Frequent watery or mucus-laden loose evacuations (Atisara), dysenteric tenesmus with bloody stool (Raktatisara), and malabsorption syndrome (Grahani). Managed classically using astringent (Grahi) and gut-drying herbs such as Kutaja (Koduchekka), Bilva, and Majjiga.",
    "classical_term": "Atisara / Raktatisara / Pravahika / Grahani",
    "dosha_involvement": "Samana Vata and Pachaka Pitta breakdown with liquid Kapha overflow in intestine",
    "pathya_apathya": {
      "recommended": [
        "Fresh buttermilk (Majjiga) churned with roasted cumin, curry leaves, and ginger",
        "Unripe Bael (Maredu) fruit pulp or syrup for astringent gut binding",
        "Pomegranate rind decoction or Kutaja bark (Koduchekka) powder",
        "Oral rehydration electrolyte water (ORS), rice kanji with rock salt"
      ],
      "avoid": [
        "Fresh milk, cheese, paneer, and rich cream dairy products",
        "Raw leafy salads, street food, and unpasteurized beverages",
        "Castor oil and purgative medicines",
        "Deep-fried snacks and highly spiced gravies"
      ]
    },
    "red_flags": [
      "Stool resembling rice-water with rapid, profound circulatory collapse (Cholera sign)",
      "High septic fever, delirium, and involuntary loose stools (Severe enteric bacteremia)",
      "Severe dehydration with sunken fontanelle in infants or anuria in adults"
    ],
    "indexed_remedies_count": 10
  },
  {
    "id": "constipation",
    "name": "Chronic Constipation & Bowel Sluggishness",
    "telugu_name": "దీర్ఘకాలిక మలబద్ధకం / విబంధము",
    "category": "Digestive & Gastric",
    "description": "Infrequent, hard, and painful bowel evacuation resulting from dried fecal matter in the large intestine. In Ayurveda termed Vibandha, caused by aggravated Apana Vata drying up moisture (Sneha) in the Pakvashaya (colon).",
    "classical_term": "Vibandha / Malabaddhata / Purishasanga",
    "dosha_involvement": "Ruksha (dry) Apana Vata dominance in Pakvashaya colon",
    "pathya_apathya": {
      "recommended": [
        "Warm milk with a teaspoon of pure cow ghee or Castor oil at bedtime",
        "Soaked black raisins (Kishmish), figs (Anjeer), and ripe papaya",
        "Triphala powder taken with lukewarm water before sleeping",
        "Adequate warm fluid intake throughout the day with dietary soluble fibers"
      ],
      "avoid": [
        "Excessive consumption of refined white flour (Maida), bakery biscuits, and dry bread",
        "Straining forcefully against hard impacted stool (triggers hemorrhoids)",
        "Excessive astringent, dry, and cold snacks (popcorn, dry crackers)",
        "Sedentary desk work without daily abdominal walking exercise"
      ]
    },
    "red_flags": [
      "Obstipation (failure to pass both feces and gas) with severe vomiting and abdominal distension",
      "Unexplained change in bowel habits lasting >4 weeks in individuals over 50 years of age",
      "Fecal impaction with paradoxical watery diarrhea overflow and confusion in elderly patients"
    ],
    "indexed_remedies_count": 12
  },
  {
    "id": "mouth-ulcers",
    "name": "Mouth Ulcers, Glossitis & Aphthous Stomatitis",
    "telugu_name": "నోటిపూత / నాలుక పగుళ్ళు / ముఖపాకం / అరుచి",
    "category": "Dental & Oral",
    "description": "Painful erythematous mucosal erosions on the buccal mucosa, tongue cracks, and loss of taste perception. Classified in classical codices as Mukha Paka, arising from excessive systemic Pitta heat, nutritional deficiencies, and sluggish digestion.",
    "classical_term": "Mukha Paka / Jihva Paka / Pittaja Mukhapaka",
    "dosha_involvement": "Aggravated Pitta manifesting in the oral mucosal lining",
    "pathya_apathya": {
      "recommended": [
        "Gargling with Triphala decoction or cold infusion of Yashtimadhu (Licorice)",
        "Applying fresh coconut milk or pure ghee gently onto oral ulcers",
        "Consuming cooling foods: butter, fresh curd, cucumber, and tender coconut water",
        "Consuming nutrient-dense green leafy vegetables and B-complex rich sprouts"
      ],
      "avoid": [
        "Very spicy curries, raw red chillies, and sharp acidic sour fruits",
        "Chewing betel nut (Gutkha), smoking, and hot alcoholic beverages",
        "Eating excessively hot-temperature soups that burn oral mucosa",
        "Aggressive brushing with hard-bristled toothbrushes"
      ]
    },
    "red_flags": [
      "A solitary mouth ulcer that fails to heal after 3 weeks (requires urgent biopsy to rule out oral squamous cell carcinoma)",
      "Ulcer accompanied by painless indurated neck lymphadenopathy",
      "Severe difficulty swallowing even liquids or opening mouth (Trismus)"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "throat-tonsils",
    "name": "Sore Throat, Tonsillitis & Mumps Glands",
    "telugu_name": "గొంతు నొప్పి / గవద బిళ్ళలు / టాన్సిల్స్ వాపు",
    "category": "ENT & Throat",
    "description": "Erythematous pharyngeal pain, swollen tonsils (Tundikeri), and parotid glandular enlargements (Gavada Billalu). Treated with warm astringent gargles (Gandusha) and antimicrobial topical herbal neck applications.",
    "classical_term": "Kantharoga / Tundikeri / Galaganda / Pashanagardabha",
    "dosha_involvement": "Kapha-Rakta-Pitta vitiation in the pharyngeal and cervical lymph nodes",
    "pathya_apathya": {
      "recommended": [
        "Warm salt water gargle with turmeric powder 3 to 4 times daily",
        "Licking honey mixed with Sitopaladi or Pippali and ginger juice",
        "Warm external fomentation over the neck and jaw with flannel cloth",
        "Drinking lukewarm water and light, non-greasy broths"
      ],
      "avoid": [
        "Cold drinks, ice creams, refrigerated milk, and frozen desserts",
        "Sour curds, tamarind rasam, and deep-fried savory snacks",
        "Speaking loudly, shouting, or straining the voice",
        "Exposure to air-conditioned cold drafts directly on neck"
      ]
    },
    "red_flags": [
      "Inability to swallow saliva leading to drooling (Signs of peritonsillar abscess / Quinsy)",
      "Severe inspiratory stridor or breathing distress (Laryngeal obstruction)",
      "High spiking fever with severe unilateral neck swelling and jaw lock"
    ],
    "indexed_remedies_count": 9
  },
  {
    "id": "insomnia-sleep",
    "name": "Chronic Insomnia, Restlessness & Anxiety",
    "telugu_name": "నిద్రలేమి / అనిద్ర / మానసిక అలసట",
    "category": "Rejuvenation & Vitality",
    "description": "Inability to fall or stay asleep, nocturnal agitation, and hyperactive cognitive fatigue. Classical treatises view Anidra as an imbalance of Vata and Pitta with depletion of Tarpaka Kapha and Ojas in the cranial sensors (Mano-vaha srotas).",
    "classical_term": "Anidra / Nidranasha / Chittodvega",
    "dosha_involvement": "Ruksha Vata and Tikshna Pitta disrupting Mano-srotas",
    "pathya_apathya": {
      "recommended": [
        "Massaging warm Brahmi oil or sesame oil onto the soles of feet (Padabhyanga) before bedtime",
        "Warm milk infused with nutmeg (Jajikaya) and Ashwagandha 30 minutes before sleep",
        "Calm breathing exercises (Anuloma Viloma pranayama) in dim lighting",
        "Maintaining a regular bedtime and wake-up schedule every single day"
      ],
      "avoid": [
        "Using smartphones, tablets, and bright LED screens in bed before sleeping",
        "Consuming coffee, strong black tea, or chocolate in the evening",
        "Heavy spicy dinners eaten within 2 hours of bedtime",
        "Stimulating, argumentative, or stressful conversations at night"
      ]
    },
    "red_flags": [
      "Severe clinical depression with active suicidal ideation or auditory hallucinations",
      "Severe daytime micro-sleeps while driving or operating heavy machinery",
      "Insomnia following recent severe head concussion or stroke"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "acne-blemishes",
    "name": "Facial Acne, Dark Spots & Blemishes",
    "telugu_name": "ముఖంపై మొటిమలు / మచ్చలు / యువనపిడకలు / వ్యంగం",
    "category": "Dermatology & Skin Care",
    "description": "Adolescent and adult inflammatory pustules, comedones, and hyperpigmented facial patches (Vyanga/Nyacha). Ayurvedic texts highlight hormonal Pitta-Rakta vitiation and excessive sebum production treated through blood-purifying (Raktashodhaka) and complexion-enhancing (Varnya) lepams.",
    "classical_term": "Yuvanapidaka (Mukhadushika) / Vyanga / Nyacha",
    "dosha_involvement": "Vitiated Rakta (blood) and Pitta combined with Kapha in facial sebaceous glands",
    "pathya_apathya": {
      "recommended": [
        "Topical application of sandalwood (Chandana), Lodhra, and coriander seed paste",
        "Washing face twice daily with warm neem leaf water or mild besan (gram flour)",
        "Drinking adequate water and eating fresh fruits (sweet apples, amla, pomegranates)",
        "Blood-purifying bitters such as Manjistha, Sariva, and Neem"
      ],
      "avoid": [
        "Squeezing, picking, or popping pimples (causes scarring and secondary bacterial infection)",
        "Greasy oil-based cosmetic creams and heavy mineral-oil foundations",
        "Excessive deep-fried, oily snacks, junk chocolate, and bakery sweets",
        "Touching face with unwashed hands throughout the day"
      ]
    },
    "red_flags": [
      "Deep, painful fluctuating facial cysts that cause keloidal scarring (Acne conglobata)",
      "Sudden eruptive acne accompanied by hirsutism and irregular menses (PCOS workup needed)",
      "Severe facial cellulitis swelling spreading towards the periorbital danger triangle"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "male-vitality",
    "name": "Seminal Weakness & Reproductive Strength",
    "telugu_name": "ఇంద్రియాభివృద్ధి / శుక్ర పుష్టి / వాజీకరణం",
    "category": "Rejuvenation & Vitality",
    "description": "Oligospermia, diminished stamina, premature ejaculation, and general reproductive debility. Treated historically through Vajikarana rasayana herbs such as Ashwagandha, Kapikacchu (Dulagondi), Nelatadi, and Godugdha (cow milk).",
    "classical_term": "Klaibya / Shukrakshaya / Dhatukshaya / Vajikarana",
    "dosha_involvement": "Shukra Dhatu depletion under chronic Vata-Pitta stress and fatigue",
    "pathya_apathya": {
      "recommended": [
        "Ashwagandha and Nelatadi powder with warm milk and rock sugar",
        "Soaked almonds, dates, raisins, and pure cow ghee",
        "Adequate undisturbed restful sleep to allow tissue synthesis",
        "Balanced, nutrient-rich diet with whole grains and legumes"
      ],
      "avoid": [
        "Excessive tobacco smoking and alcohol intake (depresses spermatogenesis)",
        "Chronic mental anxiety, performance stress, and excessive fatigue",
        "Excessively sour, pungent, and salty diet",
        "Exposure of scrotum to high heat (hot saunas, tight synthetic undergarments)"
      ]
    },
    "red_flags": [
      "Painless testicular mass or enlargement (must rule out testicular malignancy)",
      "Severe sudden testicular pain with swelling (Testicular torsion - surgical emergency)",
      "Hematuria or hematospermia (blood in semen) in patients over 45 years"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "venom-firstaid",
    "name": "Venomous Stings & Bites First Aid",
    "telugu_name": "తేలు కాటు / విషకీటకాల కాటు / విష శాంతి",
    "category": "First Aid & Toxicology",
    "description": "Emergency neutralizations for scorpion stings (Vrischika Damsha), insect bites, and minor animal venom exposures documented in Agada Tantra and traditional folk manuals. Includes topical counter-irritant poultices and herbal antidotes.",
    "classical_term": "Damsharoga / Vrischika Visha / Kita Visha",
    "dosha_involvement": "Acute Pitta-Vata crisis provoked by Tikshna-Ushna external poison",
    "pathya_apathya": {
      "recommended": [
        "Immediate calm immobilization of affected limb below heart level",
        "Topical application of fresh turmeric, lime, and alum paste over sting puncture",
        "Sniffing or local application of crushed garlic or onion juice for localized pain relief",
        "Transporting the patient immediately to hospital for antivenom evaluation"
      ],
      "avoid": [
        "Cutting wound with razors or attempting to suck venom with the mouth",
        "Applying tight arterial tourniquets that induce limb gangrene",
        "Panicking or running which accelerates venom circulation",
        "Administering sedatives or alcohol to victim"
      ]
    },
    "red_flags": [
      "Systemic neurotoxic signs: ptosis (eyelid droop), slurred speech, respiratory paralysis",
      "Systemic hemotoxic signs: spontaneous bleeding from gums or bite site",
      "Severe anaphylactic shock, stridor, or profound hypotension"
    ],
    "indexed_remedies_count": 5
  },
  {
    "id": "pediatric-balaroga",
    "name": "Pediatric Disorders & Teething Ailments",
    "telugu_name": "బాల రోగాలు / పసిపిల్లల జబ్బులు / ఉగ్గు పాలు (బాలారోగ్యం)",
    "category": "Pediatrics (Kaumarbhritya)",
    "description": "Classical pediatric regimens and ailments documented in Balu Arogyam and Intinta Mulika Vaidyam. Covers infant teething fever (Dantodbheda Jwara), green diarrhea, colic crying, nocturnal bedwetting (Shayyamutra), and traditional digestive carminative drops (Uggu Palu).",
    "classical_term": "Bala Roga / Dantodbheda Jwara / Ksheeralasaka / Shayyamutra",
    "dosha_involvement": "Pitta-Vata irritability during infant dentition, Kaphaja mucus congestion",
    "pathya_apathya": {
      "recommended": [
        "Fresh mother's breast milk (Stanya) exclusively for infants",
        "Gentle daily sesame or olive oil infant massage (Bala Abhyanga)",
        "Traditional digestive carminative ghrita with Acorus calamus (Vasa) and honey in micro-doses",
        "Diluted boiled water cooled to lukewarm for toddlers"
      ],
      "avoid": [
        "Heavy cow milk or commercial formula during acute infant diarrhea",
        "Artificial sweet pacifiers and unsterilized teething toys",
        "Exposure to cold drafts and damp floors",
        "Administering adult medications or heavy spices to young infants"
      ]
    },
    "red_flags": [
      "Sunken fontanelle with dry tongue and absence of tears (Severe dehydration)",
      "High fever (>102°F) accompanied by lethargy, neck rigidity, or febrile convulsions",
      "Continuous inconsolable crying with drawing legs to abdomen (Intussusception / acute surgical abdomen)",
      "Persistent rapid grunting respiration or chest wall retractions"
    ],
    "indexed_remedies_count": 9
  },
  {
    "id": "edema-dropsy",
    "name": "Dropsy, Edema & Fluid Swelling",
    "telugu_name": "శోఫ / శరీర వాపులు / నీరుపట్టడం",
    "category": "Cardio-Renal & Fluid Balance",
    "description": "Systemic or localized fluid accumulation causing pitting swelling of feet, ankles, face, or abdomen. Regarded in classical Andhra treatises as Shotha / Shopha, primarily stemming from Kapha-Pitta obstruction in water-transporting channels (Udakavaha Srotas).",
    "classical_term": "Shotha / Shopha / Sarvanga Shopha",
    "dosha_involvement": "Tridoshic with Kapha-Vata dominance obstructing fluid micro-channels",
    "pathya_apathya": {
      "recommended": [
        "Punarnava (Boerhavia diffusa) leaf soup and root decoction",
        "Barley water (Yava Manda) and old rice porridge",
        "Restricting sodium and processed salt intake",
        "Warm dry ginger water (Shunthi Jala)"
      ],
      "avoid": [
        "Excess table salt, pickles, papads, and processed snacks",
        "Daytime sleeping (increases Kapha water retention)",
        "Heavy, creamy dairy and fermented curds",
        "Sitting with legs hanging dependent for prolonged hours"
      ]
    },
    "red_flags": [
      "Sudden facial puffiness with dark cola-colored urine (Acute glomerulonephritis)",
      "Severe shortness of breath when lying flat (Orthopnea / Pulmonary edema / Heart failure)",
      "Unilateral swollen, tender, warm calf or leg (Deep vein thrombosis - urgent Doppler)",
      "Rapidly accumulating abdominal swelling with jaundice (Decompensated liver cirrhosis)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "ascites-udararoga",
    "name": "Abdominal Ascites & Visceral Enlargement",
    "telugu_name": "జలోదరము / ఉదర రోగము / కడుపులో నీరు చేరడం",
    "category": "Hepatic & Spleen",
    "description": "Progressive accumulation of serous fluid in the peritoneal cavity due to liver cirrhosis, portal hypertension, or chronic splenomegaly. Detailed extensively in Mulika Prayogavali and Sadharana Chikitsalu as Jalodara.",
    "classical_term": "Jalodara / Udara Roga / Pleehodara",
    "dosha_involvement": "Mandagni causing fluid stagnation with severe Prana-Apana Vata blockage",
    "pathya_apathya": {
      "recommended": [
        "Strict exclusive indigenous cow milk diet (Dugdha Kalpa) under Ayurvedic physician supervision",
        "Punarnava, Kutki, and Rohitaka liver decongestive decoctions",
        "Light easily digestible dry barley porridge",
        "Strict salt-free diet (Lavana Varjanam)"
      ],
      "avoid": [
        "All table salt, sea salt, and sodium compounds",
        "Alcohol in any quantity (strictly contraindicated)",
        "Oily, heavy, fried, and meat dishes",
        "Excess fluid drinking that worsens abdominal girth"
      ]
    },
    "red_flags": [
      "Spontaneous bacterial peritonitis signs: sudden fever with severe generalized abdominal tenderness",
      "Vomiting fresh blood or black tarry stools (Bleeding esophageal varices)",
      "Confusion, disorientation, or flapping tremors (Hepatic encephalopathy)",
      "Marked oliguria or complete cessation of urine output (Hepatorenal syndrome)"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "paralysis-stroke",
    "name": "Paralysis, Hemiplegia & Facial Palsy",
    "telugu_name": "పక్షవాతము / అర్దిత / ముఖ పక్షవాతం (వాత రోగాలు)",
    "category": "Neurological & Motor",
    "description": "Loss of voluntary motor movement in half the body (Hemiplegia / Pakshaghata) or acute unilateral facial nerve distortion (Facial palsy / Ardita). Treated historically through neuro-protective medicated oil therapies (Ksheerabala, Mahanarayana) and Bala root broths.",
    "classical_term": "Pakshaghata / Ardita / Vatavyadhi",
    "dosha_involvement": "Severely aggravated Vata desiccating motor channels (Snayu / Kandara)",
    "pathya_apathya": {
      "recommended": [
        "Warm medicated sesame oil massage (Abhyanga) followed by mild steam (Nadi Sweda)",
        "Masha (black gram) soup cooked with garlic and cow ghee",
        "Warm easily digestible gruels with Shunthi and Pippali",
        "Active and passive physiotherapy exercises daily"
      ],
      "avoid": [
        "Cold baths, AC drafts, and cold drinking water",
        "Heavy, dry, gas-forming pulses (chana, peas)",
        "High emotional grief, stress, and sleep deprivation",
        "Fasting or erratic skipping of meals"
      ]
    },
    "red_flags": [
      "Sudden onset of facial droop, arm weakness, or slurred speech (Acute ischemic stroke - FAST protocol)",
      "Sudden severe headache with loss of consciousness or vomiting (Intracerebral hemorrhage)",
      "Difficulty swallowing secretions with choking (Aspiration risk - immediate ICU referral)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "sciatica-gridhrasi",
    "name": "Sciatica & Lumbar Nerve Compression",
    "telugu_name": "గృధ్రసి / సయాటికా / నడుము నరాల లాగుడు",
    "category": "Joints & Rheumatism",
    "description": "Radiating shooting pain originating from the lumbar spine traveling down the buttock, thigh, calf, and foot along the sciatic nerve pathway. Classical Telugu texts compare the gait to that of a vulture (Gridhrasi).",
    "classical_term": "Gridhrasi / Kati Shula / Vatavyadhi",
    "dosha_involvement": "Vata or Vata-Kapha entrapment at the lumbar nerve roots (Kandara-stha)",
    "pathya_apathya": {
      "recommended": [
        "Castor oil (Eranda Taila) with warm ginger milk at bedtime for gentle downward Apana Vata clearance",
        "Warm Rasna, Nirgundi, and Shallaki poultices applied over lumbar region",
        "Sleeping on a firm, supportive mattress",
        "Gentle lumbar extension exercises"
      ],
      "avoid": [
        "Lifting heavy weights or bending forward abruptly from the waist",
        "Riding two-wheelers on bumpy potholed roads",
        "Sitting on soft sinking sofas for prolonged hours",
        "Cold wind exposure and cold water baths"
      ]
    },
    "red_flags": [
      "Loss of bowel or bladder sphincter control (Cauda Equina syndrome - surgical emergency)",
      "Bilateral progressive leg weakness with foot drop (Acute nerve compression)",
      "Numbness in the saddle (perianal / genital) area",
      "Fever accompanied by localized spinal tenderness (Epidural abscess / vertebral discitis)"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "vitiligo-leukoderma",
    "name": "Vitiligo, Leukoderma & White Patches",
    "telugu_name": "శ్విత్రము / బొల్లి మచ్చలు / కోడె మచ్చలు",
    "category": "Dermatology & Skin",
    "description": "Autoimmune depigmentation of the skin characterized by chalky white patches resulting from melanocyte loss. Regarded in Charaka and Telugu codices as Shwitra or Kilasa, treated primarily with photo-sensitizing herbs like Bakuchi (Psoralea corylifolia).",
    "classical_term": "Shwitra / Kilasa / Daruna / Charuna",
    "dosha_involvement": "Vitiation of Rakta, Mamsa, and Medas by deep-seated Pitta-Kapha imbalance",
    "pathya_apathya": {
      "recommended": [
        "Bakuchi seed powder or oil applied topically followed by 5-10 minutes of gentle early morning sun exposure",
        "Bitter digestive vegetables (bitter gourd, pointed gourd, neem flowers)",
        "Old aged rice, barley, and green gram (moong dal)",
        "Adequate sleep and stress reduction practices"
      ],
      "avoid": [
        "Simultaneous consumption of fish and milk (Viruddha Ahara - classical cause)",
        "Excess sour, salty, and fermented foods (vinegar, sour curd, pickles)",
        "Direct harsh midday sun exposure that causes blistering burns on depigmented skin",
        "Harsh chemical bleaches, hair dyes, and abrasive soaps"
      ]
    },
    "red_flags": [
      "Rapidly spreading lesions with severe erythema and bullous blistering after sun exposure",
      "Patches accompanied by thyroid swelling, extreme fatigue, or vitiligo associated with Addison's disease",
      "Lesions with sensory loss to light touch and pinprick (Must rule out Leprosy / Hansen's disease)"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "psoriasis-eczema",
    "name": "Psoriasis, Eczema & Chronic Plaque Dermatitis",
    "telugu_name": "కిట్టభ / విచర్ఛిక / తామర / గజ్జి / సోరియాసిస్",
    "category": "Dermatology & Skin",
    "description": "Chronic itchy inflammatory skin conditions presenting with silvery scales, lichenified plaques, or weeping exudative dermatitis. Classical Telugu manuscripts classify these under Kshudra Kushtha as Kittibha, Vicharchika, and Dadru.",
    "classical_term": "Kittibha / Vicharchika / Dadru / Kshudra Kushtha",
    "dosha_involvement": "Vata-Kapha dominance with profound Rakta (blood) toxin involvement",
    "pathya_apathya": {
      "recommended": [
        "Topical application of Wrightia tinctoria (Dantapala) or Neem infused coconut oil",
        "Bitter decoctions containing Manjistha, Khadira, and Sariva",
        "Gentle cotton clothing and mild colloidal oatmeal or gram flour baths",
        "Drinking plenty of boiled and cooled water"
      ],
      "avoid": [
        "Violent scratching that damages skin integrity (Koebner phenomenon)",
        "Excess red chillies, vinegar, tamarind, and fermented foods",
        "Commercial soaps with synthetic dyes and heavy perfumes",
        "Hot boiling water baths that strip dermal lipids"
      ]
    },
    "red_flags": [
      "Erythrodermic flare: more than 90% of body surface area red, peeling, with fever (Dermatological emergency)",
      "Pustular psoriasis with widespread sterile pustules and high leukocytosis",
      "Secondary impetigo infection with golden crusts and spreading cellulitis"
    ],
    "indexed_remedies_count": 9
  },
  {
    "id": "epistaxis-bleeding",
    "name": "Epistaxis, Nosebleeds & Vascular Bleeding",
    "telugu_name": "ముక్కు వెంట రక్తం కారడం / రక్తపిత్తము",
    "category": "Cardio-Renal & Fluid Balance",
    "description": "Acute or recurrent bleeding from nasal mucosa (Urdhwaga Raktapitta) caused by excessive heat, dry air, arterial hypertension, or vascular fragility. Classical management utilizes cooling astringent herb juices instilled as nasal drops (Nasya) and sweet cold drinks (Panakas).",
    "classical_term": "Urdhwaga Raktapitta / Nasagata Raktasrava",
    "dosha_involvement": "High Pitta liquifying blood (Rakta Dhatu) and directing it upward",
    "pathya_apathya": {
      "recommended": [
        "Applying fresh pomegranate petal juice or Durva grass juice as nasal drops",
        "Cold wet cloth or ice pack applied over nasal bridge and forehead",
        "Sipping cold milk, lotus petal tea, or sweet grape juice",
        "Sitting upright with head tilted slightly forward while pinching soft nostrils"
      ],
      "avoid": [
        "Tilting head backward (causes blood swallowing and nausea/aspiration)",
        "Hot spicy curries, mustard, garlic, and alcohol",
        "Direct exposure to blazing summer heat and dry desert winds",
        "Vigorous nose-blowing or picking after a bleeding episode"
      ]
    },
    "red_flags": [
      "Severe persistent posterior nosebleed that does not stop after 20 minutes of firm nasal compression",
      "Nosebleed accompanied by hematemesis, melena, or widespread cutaneous bruising (Coagulopathy)",
      "Epistaxis following significant facial or head trauma (Skull base fracture risk)",
      "Bleeding associated with hypertensive crisis (BP > 180/110 mmHg)"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "ear-tinnitus-otitis",
    "name": "Earache, Tinnitus & Otitis Discharge",
    "telugu_name": "చెవిపోటు / కర్ణనాదం / చెవి చీము (కర్ణ రోగాలు)",
    "category": "ENT (Ear, Nose, Throat)",
    "description": "Ailments of the auditory canal including acute ear pain (Karnashula), ringing tinnitus (Karnanada), and purulent discharge (Karnapaka / Karnasrava). Addressed in Telugu folios with medicated oil drops (Karna Poorana) prepared with Bilva, garlic, or Tulasi.",
    "classical_term": "Karnashula / Karnanada / Karnapaka / Badhirya",
    "dosha_involvement": "Vata aggravated in auditory passages, complicated by Kapha-Pitta infection",
    "pathya_apathya": {
      "recommended": [
        "Warm sesame oil infused with garlic or Bilva dropped gently in intact ear canal (Karna Poorana)",
        "Keeping ear dry and protected during hair washing with cotton earplugs",
        "Warm dry compress against outer ear for soothing pain relief",
        "Chewing gently to equalize eustachian tube pressure"
      ],
      "avoid": [
        "Instilling oils or drops if the eardrum has a known tear or perforation",
        "Inserting cotton buds, hairpins, or matchsticks into ear canal",
        "Swimming in contaminated pond or river water",
        "Exposure to blast noises and loud earphones"
      ]
    },
    "red_flags": [
      "Redness, swelling, and severe tenderness over mastoid bone behind ear (Acute mastoiditis)",
      "Clear fluid draining after head injury (Cerebrospinal fluid otorrhea - emergency)",
      "Sudden unilateral sensorineural hearing loss within 72 hours",
      "Ear pain accompanied by facial asymmetry or weakness (Facial nerve involvement)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "throat-hoarseness",
    "name": "Hoarseness, Vocal Strain & Laryngitis",
    "telugu_name": "స్వరభేదం / గొంతు బొంగురు / కంఠరోగం",
    "category": "ENT (Ear, Nose, Throat)",
    "description": "Loss or raspiness of voice, vocal cord strain, and chronic laryngeal irritation common among speakers, teachers, and singers. Treated with soothing demulcents such as Yashtimadhu (Licorice), Khadiradi Vati, and warm gargles.",
    "classical_term": "Swarabheda / Kantha Roga / Gala Shundika",
    "dosha_involvement": "Vata-Kapha obstruction in vocal channels (Swara-vaha Srotas)",
    "pathya_apathya": {
      "recommended": [
        "Sucking on pure Yashtimadhu (Licorice) root pieces or Khadiradi lozenges",
        "Warm salt-water gargle with a pinch of turmeric powder twice daily",
        "Complete vocal rest (avoiding whispering as it strains vocal cords further)",
        "Drinking warm ginger-honey water or licorice milk"
      ],
      "avoid": [
        "Shouting, loud screaming, or prolonged straining of vocal cords",
        "Cold refrigerated drinks, ice creams, and aerated soda",
        "Tobacco smoking and passive cigarette smoke inhalation",
        "Clearing throat violently (aggravates mucosal friction)"
      ]
    },
    "red_flags": [
      "Hoarseness persisting longer than 3 weeks without improvement (Requires laryngoscopy to rule out vocal cord malignancy)",
      "Hoarseness accompanied by difficulty swallowing (Dysphagia) or hemoptysis",
      "Stridor or noisy breathing at rest (Laryngeal airway obstruction - emergency)",
      "Unexplained rapid weight loss with enlarged non-tender neck lymph nodes"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "anorexia-taste",
    "name": "Loss of Taste, Anorexia & Early Satiety",
    "telugu_name": "అరుచి / నోటి చప్పదనం / ఆకలి లేకపోవడం (అగ్నిమాంద్యం)",
    "category": "Digestive & Anorectal",
    "description": "Aversion to food, complete absence of appetite, or foul perverted taste in the mouth resulting from coating of taste buds by toxic metabolic waste (Ama). Classical Telugu remedies utilize mouthwashes (Kavala) and pungent appetizers (Dipana-Pachana).",
    "classical_term": "Aruchi / Agnimandya / Asyavairasya",
    "dosha_involvement": "Bodhaka Kapha and Jatharagni impairment accompanied by mental stress",
    "pathya_apathya": {
      "recommended": [
        "Chewing a slice of fresh ginger sprinkled with rock salt and lemon juice 10 minutes before meals",
        "Warm pomegranate juice soup or coriander-cumin seed broth",
        "Pleasant, clean, un-hurried dining environment",
        "Rinsing mouth with warm lemon water or clove infusion"
      ],
      "avoid": [
        "Force-feeding heavy, oily meals when appetite is completely absent",
        "Daytime napping immediately following food",
        "Excess commercial bakery sweets and deep-fried snacks",
        "Eating while stressed, hurried, or emotionally upset"
      ]
    },
    "red_flags": [
      "Severe unintentional progressive weight loss (>10% body weight in 3 months)",
      "Anorexia accompanied by persistent painless jaundice (Rule out pancreatic head tumor)",
      "Early satiety accompanied by persistent vomiting of partially digested food (Gastric outlet obstruction)",
      "Palpable epigastric abdominal mass or left supraclavicular lymph node (Virchow's node)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "anemia-pandu",
    "name": "Anemia, Pale Blood & Iron Deficiency",
    "telugu_name": "పాండు రోగము / రక్తహీనత / కళ్ళు పాలిపోవడం",
    "category": "Cardio-Renal & Fluid Balance",
    "description": "Systemic pallor, easy fatigability, exertional breathlessness, and paleness of the conjunctiva, tongue, and nails. Classified in Charaka and Telugu codices as Pandu Roga, treated with iron-rich botanicals (Punarnava Mandura, Dhatri Lauha, Draksha).",
    "classical_term": "Pandu Roga / Alparakta / Dhatukshaya",
    "dosha_involvement": "Pitta vitiation impacting the Sadhaka Pitta and Yakrit (liver-spleen) blood-forming tissue",
    "pathya_apathya": {
      "recommended": [
        "Amla (Indian Gooseberry) fresh juice taken with jaggery or pure honey",
        "Black raisins (Draksha) soaked overnight in water and consumed with water",
        "Iron-rich leafy greens (drumstick leaves / Munaga aaku, fenugreek leaves)",
        "Pomegranate and sweet dark grape juice"
      ],
      "avoid": [
        "Drinking strong tea or coffee immediately with meals (polyphenols inhibit iron absorption)",
        "Excessively sour, pungent, and salty pickle diets",
        "Heavy un-oiled chalk, clay, or raw rice ingestion (Pica / Mrittika Bhakshana)",
        "Strenuous physical overexertion until hemoglobin levels normalize"
      ]
    },
    "red_flags": [
      "Severe breathlessness or angina chest pain on minimal exertion (Critical anemia - Hb < 7 g/dL)",
      "Black tarry stools or visible rectal bleeding (Gastrointestinal blood loss source)",
      "Splenomegaly with high fever and petechial skin rashes (Hematological malignancy screen)",
      "Sudden jaundice with dark urine (Acute hemolytic anemia crisis)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "leucorrhea-pradara",
    "name": "Leucorrhea, White Discharge & Pelvic Irritation",
    "telugu_name": "శ్వేత ప్రదరము / తెల్ల మైల / యోని స్రావం",
    "category": "Women's Health",
    "description": "Excessive non-bloody vaginal discharge accompanied by pelvic heaviness, weakness, and lower backache. Addressed in Andhra classical manuscripts with cooling, astringent uterine tonics such as Lodhra, Ashoka, and rice-washed water (Tandulodaka).",
    "classical_term": "Shweta Pradara / Kaphaja Yoni Vyapad",
    "dosha_involvement": "Aggravated Kapha and Apana Vata causing hyper-secretion from uterine channels",
    "pathya_apathya": {
      "recommended": [
        "Rice-washed water (Tandulodaka) taken with Lodhra or Nagakeshara powder",
        "Amla fruit powder with pure honey and warm water",
        "Maintaining strict intimate hygiene and wearing breathable cotton underwear",
        "Light, easily digestible, warm meals"
      ],
      "avoid": [
        "Excessive sweet, sugary, and heavy bakery pastries (feeds fungal candida)",
        "Tight non-breathable synthetic nylon undergarments",
        "Harsh chemical intimate washes and perfumed vaginal sprays",
        "Excessive sexual indulgence during active infection"
      ]
    },
    "red_flags": [
      "Foul-smelling, curd-like, or greenish-yellow discharge with severe pruritus and pelvic pain (PID / STI workup)",
      "Watery, blood-tinged discharge in post-menopausal women (Cervical / Endometrial carcinoma screen)",
      "High fever with lower abdominal rigidity and cervical motion tenderness (Acute pelvic infection)",
      "Ulcerative lesions or exophytic growths visible on external genitalia"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "dysmenorrhea-cramps",
    "name": "Dysmenorrhea & Spasmodic Menstrual Cramps",
    "telugu_name": "ఋతుశూల / బహిష్టు నొప్పులు / కష్టార్తవం",
    "category": "Women's Health",
    "description": "Painful spasmodic cramping in the lower abdomen and lumbosacral spine occurring before or during menstruation. Detailed in Telugu gynaecological folios as Ritu Shula or Kashtartava, treated with antispasmodic herbs (Hingu, Methi, Aloe).",
    "classical_term": "Kashtartava / Udavartini Yoni Vyapad / Ritu Shula",
    "dosha_involvement": "Apana Vata moving upward (Udavarta) causing painful uterine muscle contraction",
    "pathya_apathya": {
      "recommended": [
        "Fresh aloe vera gel (Kumari) taken with a pinch of black pepper and jaggery on empty stomach",
        "Warm ginger and jaggery tea brewed with cumin seeds during bleeding days",
        "Hot water bottle or warm herbal pack placed over lower abdomen",
        "Gentle restorative yoga postures (Baddha Konasana, Balasana)"
      ],
      "avoid": [
        "Cold, refrigerated drinks and raw iced salads before and during menses",
        "Heavy strenuous physical labor or intense workouts during peak flow",
        "Excessive consumption of refined white flour and deep-fried foods",
        "Suppressing natural urges to urinate or defecate"
      ]
    },
    "red_flags": [
      "Progressive worsening pelvic pain that does not respond to standard antispasmodics (Endometriosis / Adenomyosis)",
      "Menstrual cramps accompanied by heavy bleeding soaking more than 1 pad per hour",
      "Sudden agonizing unilateral pelvic pain with vomiting (Ovarian cyst torsion - surgical emergency)",
      "Pelvic pain accompanied by fever and abnormal purulent discharge"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "miscarriage-prevention",
    "name": "Threatened Miscarriage & Uterine Support",
    "telugu_name": "గర్భస్రావ నివారణ / గర్భధారణ పోషణ (గర్భస్థాపన)",
    "category": "Women's Health",
    "description": "Traditional phytotherapeutic protocols to nourish and stabilize pregnancy, soothe uterine contractions, and prevent habitual abortion (Garbhasrava). Uses Garbhasthapana rasayana herbs like Shatavari, Bala, Shringataka, and Yashtimadhu.",
    "classical_term": "Garbhasrava / Garbhapata / Garbhasthapana",
    "dosha_involvement": "Aggravated Vata and Pitta destabilizing the uterine bed and placenta",
    "pathya_apathya": {
      "recommended": [
        "Medicated cow milk boiled with Shatavari root or sweet lotus petals",
        "Cooked Water Chestnut (Singhara) flour porridge with milk and rock candy",
        "Complete physical rest in left lateral recumbent posture",
        "Calm, stress-free emotional environment"
      ],
      "avoid": [
        "Raw papaya, pineapple, sesame seeds, and excessive fenugreek (uterine stimulants)",
        "Strenuous lifting, jumping, or fast vehicle travel over bumpy roads",
        "Hot, spicy, fermented foods and unpasteurized cheeses",
        "Emotional shocks, anger, and violent panic"
      ]
    },
    "red_flags": [
      "Active vaginal bleeding with passage of clots or tissue (Threatened / Inevitable miscarriage)",
      "Severe rhythmic cramping accompanied by rupture of membranes",
      "Persistent dizziness, syncope, or shoulder-tip pain (Ruptured ectopic pregnancy - emergency)",
      "High maternal fever with uterine tenderness"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "fistula-fissure",
    "name": "Anal Fistula, Fissures & Perianal Sinus",
    "telugu_name": "భగందరము / పరికర్తిక / మలద్వారపు చీలికలు",
    "category": "Digestive & Anorectal",
    "description": "Chronic discharging tract communicating between anal canal and perianal skin (Fistula / Bhagandara) or razor-sharp tearing perianal cracks (Fissure / Parikartika). Classical Telugu manuals feature Kshara Sutra therapy, medicated sitz baths (Avagaha), and healing Jatyadi oil.",
    "classical_term": "Bhagandara / Parikartika / Nadi Vrana",
    "dosha_involvement": "Vata (cutting tear) combined with Pitta-Kapha purulent abscess formation",
    "pathya_apathya": {
      "recommended": [
        "Warm water sitz bath with Triphala decoction for 15 minutes twice daily",
        "Topical application of pure Jatyadi Taila or castor oil inside anal verge",
        "High-fiber diet with plenty of water to ensure effortless soft bowel movement",
        "Triphala Guggulu to clear perianal inflammation and encourage sinus closure"
      ],
      "avoid": [
        "Straining hard at stool or delaying bowel urges",
        "Dry, hard, spicy snacks, hot chillies, and fried foods",
        "Sitting on hard surfaces or riding motorcycles for long durations",
        "Using rough toilet paper (use lukewarm water spray instead)"
      ]
    },
    "red_flags": [
      "Severe indurated painful perianal swelling with high fever and chills (Perianal abscess requiring urgent surgical drainage)",
      "Continuous passage of stool, gas, or pus from external skin opening",
      "Incontinence to gas or liquid stool",
      "Profuse continuous arterial bleeding from anal canal"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "insect-scorpion-stings",
    "name": "Scorpion, Wasp & Centipede Stings",
    "telugu_name": "తేలు కాటు / కందిరీగ / జెర్రి కాటు / విషకీటకాలు",
    "category": "First Aid & Toxicology",
    "description": "Immediate herbal first-aid measures for painful stings from scorpions, hornets, wasps, and centipedes documented in classical Agada Tantra. Employs alkaline herbal pastes (Apamarga, onion, lime) to neutralize stinging acids and reduce excruciating burning pain.",
    "classical_term": "Kita Damsha / Vrischika Damsha / Shata Padi Damsha",
    "dosha_involvement": "Acute local Pitta-Vata flare induced by penetrating acidic poison",
    "pathya_apathya": {
      "recommended": [
        "Applying crushed fresh onion juice mixed with rock salt immediately over the sting site",
        "Lime paste (Sunnam) or Apamarga leaf poultice to neutralize acidic toxin",
        "Keeping patient calm and warm to prevent neuro-cardiac distress",
        "Cold compress over sting area to delay local venom absorption"
      ],
      "avoid": [
        "Squeezing or cutting the sting area with dirty blades",
        "Applying electric shocks or burning embers",
        "Panicking, running, or consuming stimulants (accelerates heart rate)",
        "Ignoring symptoms if a young child or elderly person is stung"
      ]
    },
    "red_flags": [
      "Severe systemic scorpion sting toxicity: excessive sweating, hypersalivation, priapism, pulmonary edema",
      "Anaphylactic allergic reaction to wasp/bee sting: facial swelling, stridor, wheezing, vascular collapse",
      "Multiple simultaneous hornet stings (>20 stings - risk of acute renal failure)",
      "Uncontrolled vomiting with altered sensorium"
    ],
    "indexed_remedies_count": 7
  },
  {
    "id": "vertigo-dizziness",
    "name": "Vertigo, Dizziness & Postural Fainting",
    "telugu_name": "భ్రమ / తలతిరుగుడు / కళ్ళు తిరగడం (మూర్ఛ)",
    "category": "Headache & Neuro",
    "description": "Sensation of spinning, postural instability, or impending syncope (Bhrama / Murcha). Regarded in classical texts as an imbalance of Pitta and Vata with Rajasic mental disturbance, treated with cooling herbs like Amalaki, Brahmi, and cooling scalp oil applications.",
    "classical_term": "Bhrama / Murcha / Shirobhrama",
    "dosha_involvement": "Pitta vitiation circulating in the cranial sensory vessels with Vata instability",
    "pathya_apathya": {
      "recommended": [
        "Fresh Amla juice with pure cow ghee and rock candy",
        "Cooling coconut oil or Brahmi oil applied gently to crown of head (Shiro-talam)",
        "Slow postural transitions when getting up from lying or sitting position",
        "Adequate hydration and timely meals to prevent hypoglycemia"
      ],
      "avoid": [
        "Sudden jerky neck movements or spinning amusement rides",
        "Prolonged staring at bright screens in complete darkness",
        "Fasting, dehydration, and skipping breakfast",
        "Heavy intake of pungent, salty, and fermented foods"
      ]
    },
    "red_flags": [
      "Vertigo accompanied by diplopia (double vision), facial numbness, dysarthria, or ataxia (Brainstem / Cerebellar stroke)",
      "Sudden loss of consciousness (Syncope) with cardiac palpitations or chest discomfort",
      "Vertigo following severe head injury or accompanied by unilateral ear hearing loss and discharge",
      "Inability to stand or walk unaided without veering to one side"
    ],
    "indexed_remedies_count": 6
  },
  {
    "id": "halitosis-denta",
    "name": "Bad Breath, Pyorrhea & Loose Teeth",
    "telugu_name": "నోటి దుర్వాసన / దంతహర్షం / కదిలే పళ్ళు (ముఖ రోగాలు)",
    "category": "Dental & Oral",
    "description": "Oral malodor (Mukhadurgandha), periodontal pocketing, spongy bleeding gums, and tooth mobility (Chaladanta). Addressed in Telugu Vaidya manuals through astringent herbal twigs (Babul, Neem) and medicated oil pulling (Gandusha) with Irimedadi or Sesame oil.",
    "classical_term": "Mukhadurgandha / Shitada / Chaladanta / Danta Harsha",
    "dosha_involvement": "Kapha-Pitta putrefaction in gums complicated by Vata gum recession",
    "pathya_apathya": {
      "recommended": [
        "Daily morning oil pulling (Gandusha) with cold-pressed sesame oil for 5-10 minutes",
        "Brushing teeth with herbal powder containing Babool bark, Clove, Alum, and Triphala",
        "Chewing fresh mint leaves, cardamom pods, or roasted fennel seeds after food",
        "Scraping tongue daily with a copper or stainless-steel scraper"
      ],
      "avoid": [
        "Sugary toffees, sticky candies, and carbonated sodas",
        "Sleeping with uncleaned mouth or food particles lodged between teeth",
        "Tobacco chewing (Gutkha, Khaini) and cigarette smoking",
        "Using excessively abrasive charcoal powders that wear down tooth enamel"
      ]
    },
    "red_flags": [
      "Non-healing oral ulcer or white/red mucosal patch (Leukoplakia/Erythroplakia) persisting >2 weeks (Biopsy mandatory)",
      "Spontaneous uncontrolled gum bleeding without trauma (Leukemia / Platelet disorder workup)",
      "Rapidly spreading swelling of floor of mouth or submandibular neck (Ludwig's angina - airway emergency)",
      "Fever with severe throbbing facial pain and trismus (inability to open mouth)"
    ],
    "indexed_remedies_count": 8
  },
  {
    "id": "hiccups-hikka",
    "name": "Intractable Hiccups & Diaphragmatic Spasms",
    "telugu_name": "హిక్కా / వెక్కిళ్ళు / డయాఫ్రమ్ స్పాజమ్స్",
    "category": "Respiratory & Cough",
    "description": "Involuntary spasmodic contractions of the diaphragm followed by sudden glottic closure. Classical treatises place Hikka alongside Shwasa (asthma) as a Pranavaha Srotas crisis, successfully resolved with Peacock feather ash (Mayurapiccha Bhasma) with honey, or Kapittha and Black pepper.",
    "classical_term": "Hikka / Annaja / Gambhira / Mahahikka",
    "dosha_involvement": "Prana and Udana Vata violently moving upward combined with Kapha obstruction",
    "pathya_apathya": {
      "recommended": [
        "Kapittha (Wood Apple) fruit pulp with honey and a pinch of black pepper",
        "Slowly swallowing a teaspoon of pure cow ghee or castor oil with warm water",
        "Holding breath for a few seconds or breathing into a paper bag to elevate CO2",
        "Sipping ice-cold water in rapid succession"
      ],
      "avoid": [
        "Eating large, dry, hurried meals without adequate chewing",
        "Drinking ice-cold water immediately following burning hot chili food",
        "Violent emotional laughing or talking while swallowing food",
        "Alcoholic beverages and heavy tobacco smoking"
      ]
    },
    "red_flags": [
      "Hiccups persisting continuously for more than 48 hours without relief (Intractable hiccups)",
      "Hiccups accompanied by chest pain, shortness of breath, or cardiac palpitations (Myocardial infarction sign)",
      "Hiccups with focal weakness, numbness, or visual disturbances (Central nervous system lesion / stroke)",
      "Hiccups in patients with advanced renal failure (Uremic encephalopathy)"
    ],
    "indexed_remedies_count": 7
  }
];
