interface BookMetadata {
  id: string;
  title: string;
  telugu_title: string;
  author: string;
  year_era: string;
  total_scanned_pages: number;
  available_pages: number[];
  description: string;
  category_focus: string;
}

export const BOOKS: BookMetadata[] = [
  {
    id: 'mulika',
    title: 'Ayurveda Mulika Prayogavali',
    telugu_title: 'ఆయుర్వేద మూలికా ప్రయోగవళి',
    author: 'Traditional Vaidya Lineages',
    year_era: 'Classical Telugu Formulary (19th-20th C.)',
    total_scanned_pages: 144,
    available_pages: [3, 4, 5, 6, 8, 9, 10, 18, 22, 28, 30, 32, 64, 78],
    description: 'Systematic Materia Medica arranged alphabetically by Telugu medicinal herb name. Includes single-drug therapies (Ekika Mulika Prayoga), complex decoctions, and emergency revival techniques.',
    category_focus: 'Herbal Formulations & Acute Ailments'
  },
  {
    id: 'chitkalu',
    title: 'Vaidya Rahasya Chitkalu',
    telugu_title: 'వైద్య రహస్య చిట్కాలు',
    author: 'Sri A. Ramayachari',
    year_era: 'Hereditary Clinical Compendium',
    total_scanned_pages: 64,
    available_pages: [7, 12, 29, 50],
    description: 'Practical clinical shortcuts, rapid-action home remedies, and regional folk preparations tested across multiple generations of village physicians.',
    category_focus: 'Folk Remedies & Rapid Clinical Relief'
  },
  {
    id: 'medplants',
    title: 'Aushadha Mokkallo Arogya Rahasyalu',
    telugu_title: 'ఔషధ మొక్కల్లో ఆరోగ్య రహస్యాలు',
    author: 'Dr. C. Madhusudana Sarma (B.A.M.S.)',
    year_era: 'Scholarly Botanical Monograph',
    total_scanned_pages: 158,
    available_pages: [10, 18, 24],
    description: 'Scientific and classical synthesis of Andhra flora, with pharmacognostic descriptions, Dravyaguna energetics, and clinical dosages.',
    category_focus: 'Pharmacognosy & Dravyaguna Vigyan'
  },
  {
    id: 'beauty',
    title: 'Andaniki, Arogyaniki Adbhuta Chitkalu',
    telugu_title: 'అందానికి, ఆరోగ్యానికి అద్భుత చిట్కాలు',
    author: 'Yuvamitra',
    year_era: 'Traditional Rejuvenation & Cosmetic Formulary',
    total_scanned_pages: 80,
    available_pages: [15],
    description: 'Traditional formulations for skin rejuvenation (Varnya), wound healing, hair tonics (Keshya), and daily preventive vitality (Swasthavritta).',
    category_focus: 'Rejuvenation (Rasayana) & Dermatology'
  },
  {
    id: 'intinta',
    title: 'Intinta Mulika Vaidyam',
    telugu_title: 'ఇంటింటా మూలికా వైద్యం',
    author: 'Dr. Kondapalli Narasimha Reddy',
    year_era: 'Systematic Materia Medica & Home Clinical Guide',
    total_scanned_pages: 132,
    available_pages: [27, 29, 30, 31, 32, 33, 34, 36, 37, 40, 42, 81, 84, 95, 96],
    description: 'Comprehensive 7-chapter clinical treatise categorized into herbs, shrubs, vines, trees, and kitchen materia medica with verified symptom index.',
    category_focus: 'Household Phytotherapy & Single Herb Formulations'
  },
  {
    id: 'chitkalu1000',
    title: '1000+ Ayurveda Chitkalu',
    telugu_title: '1000 కి పైగా ఆయుర్వేద చిట్కాలు',
    author: 'K. Srimannarayana (Ed.)',
    year_era: 'Popular Regional Formulary (2011 Edition)',
    total_scanned_pages: 56,
    available_pages: [5, 7, 9, 11, 20, 30],
    description: 'Extensive compendium of Andhra/Telangana folk treatments, seasonal health regimens, dietary tonics, and topical remedies.',
    category_focus: 'Regional Folk Prescriptions & Home Remedies'
  },
  {
    id: 'sadharana',
    title: 'Ayurvedam Sadharana Chikitsalu',
    telugu_title: 'ఆయుర్వేదం సాధారణ చికిత్సలు',
    author: 'N. Subrahmanyam (Amrutham Series)',
    year_era: 'Amrutham Healthcare Series (Success Research Foundation)',
    total_scanned_pages: 64,
    available_pages: [6, 8, 23, 24, 25, 28, 33, 34, 48, 63],
    description: 'Practical clinical manual detailing daily hygiene, Rasayana regimens, household single-herb remedies, and multi-herb compounds for common diseases.',
    category_focus: 'General Therapeutics & Rasayana'
  },
  {
    id: 'herbalmed',
    title: 'Herbal Medicine',
    telugu_title: 'హెర్బల్ మెడిసిన్',
    author: 'Dr. K. Manikyeswara Rao (B.A.M.S.)',
    year_era: 'Suraksha Ayurvedic Clinic & Research Center Monograph',
    total_scanned_pages: 40,
    available_pages: [3, 4, 5, 7, 26],
    description: 'Clinical compendium mapping local Andhra flora to specific disease protocols, emergency snakebite care, and heart therapeutics.',
    category_focus: 'Botanical Medicine & Clinical Phytotherapy'
  },
  {
    id: 'prakruti',
    title: 'Prakruti Varalu',
    telugu_title: 'ప్రకృతి వరాలు',
    author: 'Dr. Gayatri Devi',
    year_era: 'Classical Dravyaguna & Folk Herb Treatise',
    total_scanned_pages: 188,
    available_pages: [74, 76, 79, 81, 83, 90, 108, 126, 163, 178],
    description: 'Exhaustive 50+ herb Materia Medica detailing properties, classical uses, condition indexes (Deniki Edi?), and dietetics.',
    category_focus: 'Phytochemical Materia Medica & Home Remedies'
  },
  {
    id: 'wonder',
    title: 'Wonder Herbals Ayurveda Vignanam',
    telugu_title: 'వండర్ హెర్బల్స్ వారి ఆయుర్వేద విజ్ఞానం',
    author: 'G. Balakrishna',
    year_era: 'Clinical Formulary & Plant Compendium',
    total_scanned_pages: 80,
    available_pages: [23, 38, 46, 49, 51, 58, 60, 73],
    description: 'Practical Telugu formulary featuring single herbs, compound churnas, and clinical applications for diabetes, bone fractures, and liver health.',
    category_focus: 'Compound Formulations & Clinical Remedies'
  },
  {
    id: 'naatu',
    title: 'Sangraha Naatu Vaidyam',
    telugu_title: 'సంగ్రహ నాటువైద్యం',
    author: 'Vaidyashri Lolla Ramachandra Rao',
    year_era: 'Classical & Regional Heritage Formulary',
    total_scanned_pages: 101,
    available_pages: [11, 13, 14, 21, 23, 35, 57],
    description: 'Authentic treasury across 126 ailments covering eye care, fevers, jaundice, and emergency herbal remedies.',
    category_focus: 'Hereditary Clinical Formulas (Sulabha Yogalu)'
  },
  {
    id: 'balu',
    title: 'Ayurveda Arogyam',
    telugu_title: 'ఆయుర్వేద ఆరోగ్యం',
    author: 'Balu Herbals Research Team',
    year_era: 'Balu Herbals Clinical Series',
    total_scanned_pages: 46,
    available_pages: [4, 6, 13, 19, 24, 38, 45],
    description: 'Comprehensive compendium on single-herb powders, medicated oils, classical vatis (Brahmi, Chandraprabha), and Tridosha balancing.',
    category_focus: 'Classical Vatis & Dravyaguna Therapeutics'
  },
  {
    id: 'chitkavaidyam2',
    title: 'Chitka Vaidyam - 2 (1116 Sulabha Yogalu)',
    telugu_title: 'చిట్కా వైద్యం - 2 (1116 సులభ యోగాలు)',
    author: 'Kavishri D.A. Narayana Rao',
    year_era: 'Janapriya Publications Tenali (1116 Formulations Compendium)',
    total_scanned_pages: 63,
    available_pages: [3, 5, 11, 15, 21, 33, 42, 55],
    description: 'Systematically indexed 1116-formula manual across 126 ailments, kitchen spices, medicinal milk decoctions, and therapeutic panakas.',
    category_focus: 'Household Formulations & Therapeutic Panakas'
  }
];

