import React, { useId } from 'react';
import { BookOpen, Library, Landmark, Microscope, Cpu } from 'lucide-react';

const tiers = [
  { level: 1, title: 'Primary Manuscript', text: 'Directly attested Telugu folios with exact page and transcription coordinates.', icon: BookOpen },
  { level: 2, title: 'Classical Cross-Ref', text: 'Corroboration in Brihat Trayi & Laghu Trayi (Charaka, Sushruta, Bhavaprakasha).', icon: Library },
  { level: 3, title: 'Institutional API', text: 'Ayurvedic Pharmacopoeia of India (API) & TKDL regulatory standards.', icon: Landmark },
  { level: 4, title: 'Modern Science', text: 'Peer-reviewed phytochemical and pharmacological journal monographs.', icon: Microscope },
];

export function EvidenceArchitecture() {
  const id = useId();
  return <section className="evidence-architecture" aria-labelledby={id}>
    <header><p className="eyebrow">ACTIVE CORPUS & EVIDENCE TIERING STANDARD</p><h2 id={id}>Epistemological Methodology &amp; Provenance Architecture</h2><p>Mulika organizes regional Telugu medical heritage through verified provenance, claim-level evidence classification, and strict deterministic retrieval guardrails.</p></header>
    <h3 className="evidence-architecture-heading">The Mulika 5-Tier Evidence &amp; Processing Architecture</h3>
    <ol className="evidence-tier-grid">{tiers.map(({level,title,text,icon:Icon}) => <li key={level}><div className="evidence-tier-label"><Icon size={22} strokeWidth={1.5} aria-hidden="true"/><span>LEVEL {level} · SOURCE</span></div><h4>{title}</h4><p>{text}</p></li>)}</ol>
    <div className="evidence-processing"><Cpu size={26} aria-hidden="true"/><div><span>PROCESSING LAYER</span><h4>AI Synthesis (Level 5)</h4><p>Algorithmic dietetics and structural formatting. Not treated as source evidence.</p></div></div>
    <p className="evidence-scope-note">These tiers define the evidence architecture. Coverage and verification depend on each cited record; the framework does not imply that every tier is available for every claim or that institutional services are connected. API here means Ayurvedic Pharmacopoeia of India.</p>
  </section>;
}
