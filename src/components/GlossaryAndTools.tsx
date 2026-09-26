import React, { useState } from 'react';
import { GlossaryTerm, MeasurementUnit, AntidoteEntry, ShodhanamEntry } from '../types';
import { BookMarked, Calculator, ShieldCheck, Flame, Search, ArrowRightLeft, Check, Sparkles } from 'lucide-react';

interface GlossaryAndToolsProps {
  terms: GlossaryTerm[];
  measurements: MeasurementUnit[];
  antidotes: AntidoteEntry[];
  shodhanam: ShodhanamEntry[];
}

export const GlossaryAndTools: React.FC<GlossaryAndToolsProps> = ({
  terms,
  measurements,
  antidotes,
  shodhanam
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'glossary' | 'calculator' | 'antidotes' | 'shodhanam'>('glossary');
  const [searchTerm, setSearchTerm] = useState('');

  // Unit Converter State
  const [calcValue, setCalcValue] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<string>('Tulam');

  const unitRatesInGrams: Record<string, number> = {
    'Gunja / Ratti': 0.125,
    'Tulam (Tola)': 12.0,
    'Palam': 48.0,
    'Gidda (Liquid)': 75.0, // ml
    'Seru': 280.0,
    'Veesha': 1400.0,
    'Kunkudu Seed Bolus': 2.0,
    'Teaspoon (Chencha)': 5.0
  };

  const currentGrams = (calcValue || 0) * (unitRatesInGrams[selectedUnit] || 1);

  const filteredTerms = terms.filter(t =>
    t.telugu.includes(searchTerm) ||
    t.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.english_medical.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
          <BookMarked className="w-4 h-4" />
          <span>Manuscript Reference Appendices</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">
          Tools & reference
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
          Historical medical dictionary (Roga Sabdartha Deepika), traditional weights & measures converter, toxicological antidotes (Virugudu), and herbal purification methods (Shodhanam).
        </p>

        {/* Sub-tab switcher */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'glossary'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Telugu-English Medical Lexicon ({terms.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'calculator'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Traditional Measures Converter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('antidotes')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'antidotes'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Antidote Table (విరుగుడు)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shodhanam')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'shodhanam'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Purification Protocols (శుద్ధి)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Medical Lexicon */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6">
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms e.g. Arshas, Piles, Amavata..."
              className="w-full bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] placeholder-[#6B8E7B]/70 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--line)]"
            />
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term, i) => (
              <div key={i} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
                      {term.telugu}
                    </h4>
                    <p className="text-xs font-mono text-[var(--accent)]">{term.transliteration}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[var(--canvas)] border border-[var(--line)] text-[var(--muted)]">
                    {term.category}
                  </span>
                </div>

                <div className="text-xs font-bold text-[var(--muted)]">
                  Modern Medical: <span className="text-[var(--ink)]">{term.english_medical}</span>
                </div>

                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Traditional Measurement Converter */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6 max-w-4xl">
          {/* Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight Converter */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                <Calculator className="w-4 h-4" />
                <span>Classical Weight & Volume Converter</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-[var(--muted)] block mb-1.5">Quantity</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={calcValue}
                    onChange={(e) => setCalcValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--line)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--muted)] block mb-1.5">Traditional Unit</label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--line)]"
                  >
                    {Object.keys(unitRatesInGrams).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-lg bg-[var(--canvas)] border border-[var(--line)]/40 text-center">
                  <span className="text-[10px] font-mono uppercase text-[var(--muted)] block">Metric Equivalent</span>
                  <span className="text-xl font-serif font-bold text-[var(--accent)]">
                    {currentGrams >= 1000 ? `${(currentGrams / 1000).toFixed(2)} kg` : `${currentGrams.toFixed(2)} grams`}
                    {selectedUnit.includes('Liquid') && ` / ${currentGrams.toFixed(0)} ml`}
                  </span>
                </div>
              </div>
            </div>

            {/* Kwatha (Decoction) Water Reduction Calculator */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                  <Flame className="w-4 h-4" />
                  <span>Kashayam (Decoction) Ratio Calculator</span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Classical Sharangadhara Samhita ratio: 1 part coarse herb churna (Bharad) to 16 parts fresh water, simmered uncovered on mild heat until 1/4th remains.
                </p>

                <div className="p-3.5 bg-[var(--canvas)] rounded-xl border border-[var(--line)] space-y-2 text-xs">
                  <div className="flex justify-between text-[var(--muted)]">
                    <span>Herb Churna:</span>
                    <b className="text-[var(--ink)]">12 grams (1 Tulam)</b>
                  </div>
                  <div className="flex justify-between text-[var(--muted)]">
                    <span>Water to Add (16x):</span>
                    <b className="text-[var(--accent)]">192 ml (approx. 1 glass)</b>
                  </div>
                  <div className="flex justify-between text-[var(--muted)]">
                    <span>Boil Down To (1/4th):</span>
                    <b className="text-emerald-400">48 ml (1 Palam single dose)</b>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[var(--muted)] italic border-t border-[var(--line)] pt-3">
                <b>Vessel Note:</b> Use unglazed earthen or stainless steel pot. Never prepare Kashayam in aluminum or brass without tin lining.
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--canvas)] text-[var(--muted)] font-mono uppercase border-b border-[var(--line)]">
                <tr>
                  <th className="p-3.5">Telugu Unit</th>
                  <th className="p-3.5">Transliteration</th>
                  <th className="p-3.5">Metric Equivalent</th>
                  <th className="p-3.5">Classical Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A3B31] bg-[var(--surface)]">
                {measurements.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[var(--surface)] transition-colors">
                    <td className="p-3.5 font-bold text-[var(--ink)]">{m.telugu_name}</td>
                    <td className="p-3.5 font-mono text-[var(--accent)]">{m.transliteration}</td>
                    <td className="p-3.5 text-[var(--ink)] font-semibold">{m.metric_equivalent}</td>
                    <td className="p-3.5 text-[var(--muted)]">{m.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Antidotes Matrix (Virugudu) */}
      {activeSubTab === 'antidotes' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--surface)] border-l-4 border-[var(--line)] text-xs text-[var(--muted)]">
            Transcribed from manuscript appendix (విషములకు విరుగుడు). Traditional antidotes intended to counteract toxic plant ingestions or dietary incompatibilities.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {antidotes.map((ant, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-red-400">Toxic / Aggravating Substance:</span>
                    <h4 className="font-serif text-lg font-bold text-[var(--ink)]">{ant.substance}</h4>
                    <span className="text-xs text-[var(--accent)] font-semibold">{ant.telugu_substance}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[var(--canvas)] border border-[var(--line)]">
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] block mb-1">Classical Antidote (విరుగుడు):</span>
                  <div className="text-sm font-semibold text-[var(--accent)]">{ant.antidote}</div>
                  <div className="text-xs text-[var(--muted)]">{ant.telugu_antidote}</div>
                </div>

                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {ant.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Shodhanam (Purification Protocols) */}
      {activeSubTab === 'shodhanam' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--surface)] border-l-4 border-[var(--line)] text-xs text-[var(--muted)]">
            Classical purification techniques (శుద్ధి విధానము) ensuring herbs and seeds are biologically softened and detoxified prior to formulation.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shodhanam.map((sh, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[var(--ink)]">{sh.item}</h4>
                  <span className="text-sm font-bold text-[var(--accent)]">{sh.telugu_item}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)]">Shodhana Method (శుద్ధి విధానం):</span>
                  <p className="text-xs text-[var(--ink)] bg-[var(--canvas)] p-3 rounded border border-[var(--line)] leading-relaxed">
                    {sh.method}
                  </p>
                </div>

                <div className="text-xs text-[var(--muted)]">
                  <span className="font-semibold text-[var(--accent)]">Therapeutic Purpose: </span>
                  {sh.purpose}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
