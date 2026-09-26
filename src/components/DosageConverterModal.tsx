import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { X, Scale, Calculator, ArrowRight, Info, Check, Sparkles } from 'lucide-react';

interface DosageConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UnitRatio {
  name: string;
  telugu: string;
  modernGrams: number;
  description: string;
}

const AYURVEDIC_UNITS: UnitRatio[] = [
  { name: 'Ratti (Gunja)', telugu: 'గురిగింజ / రత్తి', modernGrams: 0.12, description: 'Approx. 1 red seed of Abrus precatorius (120 mg)' },
  { name: 'Masha', telugu: 'మాషము', modernGrams: 0.97, description: 'Equal to 8 Rattis (approx. 1 gram)' },
  { name: 'Karsha (Tola)', telugu: 'కర్షము / తులము', modernGrams: 11.66, description: 'Standard apothecary unit (approx. 12 grams or 1 tola)' },
  { name: 'Shukti', telugu: 'శుక్తి', modernGrams: 24, description: 'Equal to 2 Karshas / half Pala (approx. 24 grams)' },
  { name: 'Pala', telugu: 'పలము', modernGrams: 48, description: 'Equal to 4 Karshas (approx. 48 grams)' },
  { name: 'Kudava', telugu: 'కుడవము', modernGrams: 192, description: 'Equal to 4 Palas (approx. 192 grams or ml)' },
  { name: 'Prastha', telugu: 'ప్రస్థము', modernGrams: 768, description: 'Equal to 4 Kudavas (approx. 768 ml / grams)' }
];

export const DosageConverterModal: React.FC<DosageConverterModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(2); // Default Tola (11.66g)

  const dialogRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  const currentUnit = AYURVEDIC_UNITS[selectedUnitIndex];
  const calculatedGrams = (inputValue * currentUnit.modernGrams).toFixed(2);
  const calculatedMg = (inputValue * currentUnit.modernGrams * 1000).toFixed(0);

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Traditional unit converter" className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-[var(--ink)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1C2E24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--surface)] border border-[var(--line)]/40 flex items-center justify-center text-[var(--accent)]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[var(--ink)]">
                Classical Measurement Converter
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono">
                AYUSH Pharmacopoeia of India (API) Metric Equivalents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Converter Calculator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[#213528] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
            <Calculator className="w-4 h-4" />
            <span>Instant Unit Calculator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[var(--muted)] mb-1">
                Quantity:
              </label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={inputValue}
                onChange={(e) => setInputValue(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[var(--canvas)] border border-[#2B4434] rounded-xl px-3.5 py-2.5 text-[var(--ink)] font-mono text-sm focus:outline-none focus:border-[var(--line)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[var(--muted)] mb-1">
                Classical Vedic Unit:
              </label>
              <select
                value={selectedUnitIndex}
                onChange={(e) => setSelectedUnitIndex(parseInt(e.target.value))}
                className="w-full bg-[var(--canvas)] border border-[#2B4434] rounded-xl px-3 py-2.5 text-[var(--ink)] text-xs font-mono focus:outline-none focus:border-[var(--line)]"
              >
                {AYURVEDIC_UNITS.map((u, i) => (
                  <option key={u.name} value={i}>
                    {u.name} ({u.telugu})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[#1A2C21] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--muted)]">
              Modern Metric Standard:
            </span>
            <div className="text-right">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[var(--accent)]">
                {parseFloat(calculatedGrams) >= 1 ? `${calculatedGrams} g` : `${calculatedMg} mg`}
              </span>
              <span className="block text-[10px] font-mono text-[var(--muted)]">
                (≈ {calculatedGrams} grams / {calculatedMg} mg)
              </span>
            </div>
          </div>
        </div>

        {/* Reference Table of Classical Weights */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider block">
            Standard Canonical Conversion Table:
          </span>
          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
            {AYURVEDIC_UNITS.map((u) => (
              <div
                key={u.name}
                className="p-2.5 rounded-xl bg-[var(--surface)] border border-[#1F3327] flex items-center justify-between text-xs hover:border-[var(--line)]/40 transition-colors"
              >
                <div>
                  <strong className="text-[var(--ink)] font-medium">{u.name}</strong>
                  <span className="text-xs text-[var(--accent)] ml-2 font-serif">({u.telugu})</span>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">{u.description}</p>
                </div>
                <div className="text-right font-mono text-[var(--accent)] font-semibold shrink-0 ml-3">
                  {u.modernGrams >= 1 ? `${u.modernGrams} g` : `${u.modernGrams * 1000} mg`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Note */}
        <div className="p-3 rounded-xl bg-[var(--surface)] border border-amber-900/40 text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Always adhere strictly to the exact dosage specified in classical codices. Never double traditional doses or take potent mineral rasashastras without supervision of a registered Ayurvedic doctor.
          </span>
        </div>
      </div>
    </div>
  );
};
