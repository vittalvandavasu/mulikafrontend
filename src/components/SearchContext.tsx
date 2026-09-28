import React from 'react';

export interface AilmentContext { enabled: boolean; age: string; gender: string }
export const EMPTY_CONTEXT: AilmentContext = { enabled: false, age: '', gender: '' };

export function SearchContext({ value, onChange }: { value: AilmentContext; onChange: (value: AilmentContext) => void }) {
  return <section className="ailment-context" aria-label="Optional ailment search context">
    <label className="context-toggle"><input type="checkbox" checked={value.enabled} onChange={e => onChange({ ...value, enabled: e.target.checked })}/><span>Searching for an ailment?<small>Add age and gender context · optional</small></span></label>
    {value.enabled && <div className="context-fields"><label htmlFor="ailment-age">Age group</label><select id="ailment-age" aria-describedby="context-explanation" value={value.age} onChange={e => onChange({ ...value, age: e.target.value })}><option value="">Not specified</option>{['Under 2','2–12','13–17','18–64','65+'].map(age => <option key={age}>{age}</option>)}</select><label htmlFor="ailment-gender">Gender</label><select id="ailment-gender" aria-describedby="context-explanation" value={value.gender} onChange={e => onChange({ ...value, gender: e.target.value })}><option value="">Not specified</option>{['Woman','Man','Non-binary','Self-described','Prefer not to say'].map(gender => <option key={gender}>{gender}</option>)}</select><p id="context-explanation">Kept with this search on this page only. These details do not filter the source records or assess whether a formulation is suitable for you. Gender is not used to infer biological sex.</p><button type="button" onClick={() => onChange(EMPTY_CONTEXT)}>Clear context</button></div>}
  </section>;
}

export function SearchContextSummary({ value }: { value: AilmentContext }) {
  if (!value.enabled || (!value.age && !value.gender)) return null;
  return <aside className="context-summary" aria-label="Context for these results"><strong>Your search context</strong><p>{[value.age && `Age: ${value.age}`, value.gender && `Gender: ${value.gender}`].filter(Boolean).join(' · ')}</p><p>Source records are not personalized treatment recommendations.</p></aside>;
}
