import { useDialog } from '../hooks/useDialog';
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Sparkles, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserSubmittedRemedy } from '../types';

interface SubmitRemedyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (remedy: UserSubmittedRemedy) => void;
  defaultAilmentId?: string;
  defaultAilmentName?: string;
  defaultHerb?: string;
}

export const SubmitRemedyModal: React.FC<SubmitRemedyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultAilmentId,
  defaultAilmentName,
  defaultHerb
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Home Practitioner / Reader');
  const [ailmentId, setAilmentId] = useState(defaultAilmentId || 'piles');
  const [ailmentName, setAilmentName] = useState(defaultAilmentName || 'Piles & Hemorrhoids');
  const [herbInput, setHerbInput] = useState(defaultHerb || '');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [preparationInstructions, setPreparationInstructions] = useState('');
  const [dosageUsage, setDosageUsage] = useState('');
  const [sourceTradition, setSourceTradition] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) { if (defaultAilmentId) setAilmentId(defaultAilmentId); if (defaultAilmentName) setAilmentName(defaultAilmentName); if (defaultHerb) setHerbInput(defaultHerb); }
  }, [isOpen, defaultAilmentId, defaultAilmentName, defaultHerb]);
  const dialogRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  const ailmentOptions = [
    { id: 'piles', name: 'Piles & Hemorrhoids (Arshas)' },
    { id: 'headache', name: 'Headaches & Migraines (Shirashula)' },
    { id: 'fever', name: 'Fevers & Chills (Jwara / Chali Jwaram)' },
    { id: 'respiratory', name: 'Cough, Cold & Asthma (Kasa/Shwasa)' },
    { id: 'joints', name: 'Joint Pain & Rheumatism (Amavata)' },
    { id: 'jaundice', name: 'Jaundice & Liver Care (Kamala)' },
    { id: 'women-health', name: 'Women\'s Reproductive Health' },
    { id: 'skin-wounds', name: 'Skin Diseases, Eczema & Wounds' },
    { id: 'urinary-calculi', name: 'Kidney Stones & Burning Urination' },
    { id: 'digestive-agni', name: 'Indigestion, Acidity & Gastric Gas' },
    { id: 'hair-scalp', name: 'Hair Fall & Dandruff (Khalitya)' },
    { id: 'dental-oral', name: 'Toothache & Bleeding Gums' },
    { id: 'general', name: 'Other / General Vitality' }
  ];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleIngredientChange = (index: number, val: string) => {
    const updated = [...ingredients];
    updated[index] = val;
    setIngredients(updated);
  };

  const handleAilmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = ailmentOptions.find(o => o.id === e.target.value);
    if (selected) {
      setAilmentId(selected.id);
      setAilmentName(selected.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a descriptive title for your remedy.');
      return;
    }
    if (!preparationInstructions.trim()) {
      setErrorMsg('Please describe how to prepare this remedy.');
      return;
    }
    if (!dosageUsage.trim()) {
      setErrorMsg('Please specify recommended dosage and timing.');
      return;
    }
    if (!agreedToDisclaimer) {
      setErrorMsg('You must acknowledge that this submission is unverified community knowledge.');
      return;
    }

    setSubmitting(true);
    try {
      const filteredIngredients = ingredients.map(i => i.trim()).filter(Boolean);
      const herbNames = herbInput
        ? herbInput.split(',').map(h => h.trim()).filter(Boolean)
        : ['Traditional Herb'];

      const res = await fetch('/api/user-remedies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: authorName.trim() || 'Community Ayurvedic Contributor',
          author_role: authorRole,
          ailment_id: ailmentId,
          ailment_name: ailmentName,
          herb_names: herbNames,
          title: title.trim(),
          ingredients: filteredIngredients.length > 0 ? filteredIngredients : [title.trim()],
          preparation_instructions: preparationInstructions.trim(),
          dosage_usage: dosageUsage.trim(),
          source_tradition: sourceTradition.trim() || undefined,
          precautions: precautions.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit remedy');
      }

      onSuccess(data.remedy);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Submit community contribution" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[var(--surface)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--line)] bg-[var(--canvas)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[var(--accent)] border border-[var(--line)]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-[var(--ink)]">Submit Community Ayurvedic Remedy</h2>
              <p className="text-xs text-[var(--muted)]">Share traditional family recipes or folk formulations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-[var(--ink)]">
          {/* Mandatory Unverified Community Notice Banner */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Community Submission & Verification Policy</span>
            </div>
            <p>
              Submissions through this form will be clearly badged across the platform as <b>&apos;User-Submitted (Unverified)&apos;</b>. They are not extracted from the audited Telugu classical manuscripts. All readers are advised to consult a qualified Ayurvedic physician (BAMS/MD) before preparing or consuming any formulation.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Author info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Your Name / Vaidya Title
              </label>
              <input
                type="text"
                aria-label="Contributor name" value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Smt. Lakshmi Rao / Vaidya Krishna"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Contributor Background
              </label>
              <select
                aria-label="Contributor background" value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--line)]"
              >
                <option value="Home Practitioner / Reader">Home Practitioner / Reader</option>
                <option value="Traditional Ayurvedic Elder">Traditional Ayurvedic Elder</option>
                <option value="BAMS Student / Researcher">BAMS Student / Researcher</option>
                <option value="Practicing Vaidya (Physician)">Practicing Vaidya (Physician)</option>
              </select>
            </div>
          </div>

          {/* Target Ailment & Herbs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Target Ailment / Condition *
              </label>
              <select
                aria-label="Target condition" value={ailmentId}
                onChange={handleAilmentChange}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--line)]"
              >
                {ailmentOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Primary Herb(s) Involved *
              </label>
              <input
                type="text"
                aria-label="Primary herbs" value={herbInput}
                onChange={(e) => setHerbInput(e.target.value)}
                placeholder="e.g. Nirgundi, Shunthi, Castor Oil"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
              />
            </div>
          </div>

          {/* Remedy Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Remedy Title / Short Summary *
            </label>
            <input
              type="text"
              aria-label="Remedy title" value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Warm Nirgundi Leaf & Castor Oil Poultice for Chronic Knee Pain"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
            />
          </div>

          {/* Ingredients list */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                Ingredients & Proportions (e.g. 50g fresh leaves, 1 tsp cumin)
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Ingredient
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    placeholder={`Ingredient ${idx + 1} with measurement`}
                    className="flex-1 px-3 py-2 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/50 focus:outline-none focus:border-[var(--line)]"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-2 text-[var(--muted)] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Instructions */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Preparation Instructions *
            </label>
            <textarea
              rows={3}
              aria-label="Preparation instructions" value={preparationInstructions}
              onChange={(e) => setPreparationInstructions(e.target.value)}
              placeholder="Step-by-step method (e.g., Wash leaves, boil in 2 cups water until reduced to half, filter through clean muslin cloth...)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
            />
          </div>

          {/* Dosage & Usage */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Dosage, Timing & Carrier (Anupana) *
            </label>
            <input
              type="text"
              aria-label="Recorded dosage and timing" value={dosageUsage}
              onChange={(e) => setDosageUsage(e.target.value)}
              placeholder="e.g. 50ml lukewarm decoction twice daily with 1 tsp raw honey before food"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
            />
          </div>

          {/* Lineage & Precautions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Lineage / Tradition (Optional)
              </label>
              <input
                type="text"
                aria-label="Source tradition" value={sourceTradition}
                onChange={(e) => setSourceTradition(e.target.value)}
                placeholder="e.g. Rayalaseema family recipe"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Precautions / Contraindications
              </label>
              <input
                type="text"
                aria-label="Precautions" value={precautions}
                onChange={(e) => setPrecautions(e.target.value)}
                placeholder="e.g. Avoid during pregnancy, external use only"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder-[#6B8E7B]/60 focus:outline-none focus:border-[var(--line)]"
              />
            </div>
          </div>

          {/* Disclaimer Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--canvas)] border border-[var(--line)] cursor-pointer hover:border-[var(--line)]/50 transition-colors">
            <input
              type="checkbox"
              checked={agreedToDisclaimer}
              onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[var(--accent)] border-[var(--line)] focus:ring-[#C5A059]"
            />
            <span className="text-xs text-[var(--muted)] leading-relaxed">
              I understand that this remedy will be published as an <b>Unverified Community Submission</b> with prominent medical disclaimers, and does not claim historical manuscript validation from the platform.
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)] text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !agreedToDisclaimer}
              className="px-6 py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] font-bold text-sm hover:bg-[#d9a441] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#0B130E] border-t-transparent animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Remedy</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
