import React, { useId } from 'react';

export interface AilmentContext { enabled: boolean; age: string; gender: string }
export const EMPTY_CONTEXT: AilmentContext = { enabled: false, age: '', gender: '' };

export function SearchContext({ value, onChange }: { value: AilmentContext; onChange: (value: AilmentContext) => void }) {
  const id = useId();
  return <fieldset className="search-demographics"><legend>Personal context <span>optional</span></legend>
    <div className="demographic-grid">
      <label htmlFor={id+'-age'}>Age group<select aria-label="Age group" id={id+'-age'} value={value.age} onChange={e => onChange({...value, enabled:true, age:e.target.value})}><option value="">Not specified</option>{['Under 2','2–12','13–17','18–64','65+'].map(age => <option key={age}>{age}</option>)}</select></label>
      <label htmlFor={id+'-gender'}>Gender<select aria-label="Gender" id={id+'-gender'} value={value.gender} onChange={e => onChange({...value, enabled:true, gender:e.target.value})}><option value="">Not specified</option>{['Woman','Man','Non-binary','Self-described','Prefer not to say'].map(gender => <option key={gender}>{gender}</option>)}</select></label>
    </div><div className="demographic-note"><small>Context for your next step. Source results do not assess personal suitability.</small>{(value.age || value.gender) && <button type="button" onClick={() => onChange(EMPTY_CONTEXT)}>Clear context</button>}</div>
  </fieldset>;
}

export function SearchContextSummary({ value }: { value: AilmentContext }) {
  if (!value.enabled || (!value.age && !value.gender)) return null;
  return <aside className="context-summary" aria-label="Context for these results"><strong>Your search context</strong><p>{[value.age && `Age: ${value.age}`, value.gender && `Gender: ${value.gender}`].filter(Boolean).join(' · ')}</p><p>Source records are not personalized treatment recommendations.</p></aside>;
}
