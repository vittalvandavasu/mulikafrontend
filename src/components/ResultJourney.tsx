import React, { useState } from 'react';
import { BookOpen, ShoppingBag, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { AyurvedicEntry } from '../types';
import { AilmentContext, SearchContext } from './SearchContext';
import { Sheet } from './Sheet';
import { englishHerbName } from '../lib/herbNames';

export type ResultIntent = 'prepare' | 'buy' | 'customize';
export function ResultActions({ onChoose }: { onChoose: (intent: ResultIntent) => void }) {
  return <div className="result-next-steps" aria-label="Choose your next step">
    <button onClick={() => onChoose('prepare')}><BookOpen size={18}/><span>Prepare yourself<small>Read the recorded preparation</small></span><ArrowRight size={16}/></button>
    <button onClick={() => onChoose('buy')}><ShoppingBag size={18}/><span>Buy herbs and/or concoction<small>Choose what you would like to order</small></span><ArrowRight size={16}/></button>
    <button onClick={() => onChoose('customize')}><SlidersHorizontal size={18}/><span>Customize for me<small>Age, gender & pre-existing ailments</small></span><ArrowRight size={16}/></button>
  </div>;
}

export function ResultJourney({ entry, intent, context, onClose, onSource }: {
  entry: AyurvedicEntry; intent: ResultIntent; context: AilmentContext; onClose: () => void; onSource: () => void;
}) {
  const [profile, setProfile] = useState<AilmentContext>({...context});
  const [product, setProduct] = useState('Both herbs and concoction');
  const [step, setStep] = useState<'choose' | 'context' | 'review'>('choose');
  const [ailments, setAilments] = useState('');
  const [noAilments, setNoAilments] = useState(false);
  const title = intent === 'prepare' ? 'Prepare yourself' : intent === 'customize' ? 'Customize your preparation' : 'Buy herbs and/or concoction';
  return <Sheet title={title} onClose={onClose}><div className="result-journey">
    <p className="eyebrow">{englishHerbName(entry)} · {entry.source_short} · p. {entry.page}</p>
    {intent === 'prepare' ? <>
      <h3>Preparation recorded in the source</h3><p className="journey-recipe">{entry.remedy || 'Preparation details are not stated in this record.'}</p>
      <p className="journey-caution">This is a historical preparation. Its suitability and safe use need qualified review.</p>
      {entry.safety_rating && <p>Source safety label: {entry.safety_rating}</p>}
      <button className="primary-button" onClick={onSource}>Read full source <ArrowRight size={16}/></button>
    </> : <>
      <p className="journey-availability">Ordering is being prepared. You can review a draft here; no purchase or clinical review is submitted.</p>
      <ol className="journey-progress" aria-label="Order preparation steps">{['Choose','Your context','Review draft'].map((label,index) => <li key={label} aria-current={index === ['choose','context','review'].indexOf(step) ? 'step' : undefined}>{index+1}. {label}</li>)}</ol>
      {step === 'choose' && <>
        <fieldset className="journey-products"><legend>What would you like?</legend>{['Herbs only','Prepared concoction','Both herbs and concoction'].map(value => <label key={value}><input type="radio" name="order-product" value={value} checked={product === value} onChange={() => setProduct(value)}/>{value}</label>)}</fieldset>
        <SearchContext value={profile} onChange={setProfile}/>
        {intent === 'customize' && <p className="muted">Age, gender and health context are collected for a future suitability review. The historical recipe will not be adjusted automatically.</p>}
        <button className="primary-button" onClick={() => setStep('context')}>{intent === 'customize' ? 'Order customized preparation' : 'Order'} <ArrowRight size={16}/></button>
      </>}
      {step === 'context' && <form onSubmit={event => { event.preventDefault(); setStep('review'); }}>
        <h3>Pre-existing ailments</h3><p>Add the conditions you want a qualified reviewer to consider.</p>
        <label className="journey-field" htmlFor="order-ailments">Pre-existing ailments <span>optional</span><textarea id="order-ailments" rows={4} maxLength={1500} placeholder="List any diagnosed conditions you would like reviewed…" disabled={noAilments} value={ailments} onChange={event => setAilments(event.target.value)}/></label>
        <label className="journey-none"><input type="checkbox" checked={noAilments} onChange={event => {setNoAilments(event.target.checked); if(event.target.checked) setAilments('');}}/>No pre-existing ailments to disclose</label>
        <p className="muted">These details stay in this open form only. Closing it clears them. Gender is not used to infer biological sex.</p>
        <div className="button-row"><button type="button" onClick={() => setStep('choose')}>Back</button><button type="submit" className="primary-button">Review draft <ArrowRight size={16}/></button></div>
      </form>}
      {step === 'review' && <section className="journey-review" aria-label="Order draft">
        <h3>Your order draft</h3><dl><dt>Source record</dt><dd>{englishHerbName(entry)} · {entry.source_short} · p. {entry.page}</dd><dt>Requested format</dt><dd>{product}</dd><dt>Age group</dt><dd>{profile.age || 'Not specified'}</dd><dt>Gender</dt><dd>{profile.gender || 'Not specified'}</dd><dt>Pre-existing ailments</dt><dd>{noAilments ? 'None disclosed' : ailments.trim() || 'Not specified'}</dd></dl>
        <p role="status">Draft only. Product availability, pricing, qualified suitability review and checkout are not available yet.</p>
        <div className="button-row"><button onClick={() => setStep('context')}>Edit context</button><button onClick={() => setStep('choose')}>Edit selection</button><button className="primary-button" onClick={onClose}>Done</button></div>
      </section>}
    </>}
  </div></Sheet>;
}
