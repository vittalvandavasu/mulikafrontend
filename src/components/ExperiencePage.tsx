import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';
import { AyurvedicEntry, HerbMonograph } from '../types';
import { Journey, JourneyContext, ServiceResult, Product, Physician, commerceGateway, consultationGateway, ingredientHerb } from '../lib/experience';
import { SearchContext } from './SearchContext';
import { VerificationBadge } from './ProvenanceDrawer';
import { englishHerbName } from '../lib/herbNames';

export function ExperiencePage({ journey, context, entries, herbs, back, source, herb, move }: {
  journey: Journey; context: JourneyContext; entries: AyurvedicEntry[]; herbs: HerbMonograph[];
  back: () => void; source: (entry: AyurvedicEntry) => void; herb: (id: string) => void; move: (journey: Journey, ingredient?: string) => void;
}) {
  const [products,setProducts] = useState<ServiceResult<Product> | null>(null);
  const [physicians,setPhysicians] = useState<ServiceResult<Physician> | null>(null);
  const [error,setError] = useState('');
  const [retry,setRetry] = useState(0);
  const [concern,setConcern] = useState(context.query || context.entity.label);
  const [profile,setProfile] = useState(context.demographics);
  const [health,setHealth] = useState('');
  const [review,setReview] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); setError(''); setProducts(null); setPhysicians(null);
    const load = journey === 'buy' ? commerceGateway.products(context,controller.signal).then(value => {if(!controller.signal.aborted) setProducts(value);}) : journey === 'consult' ? consultationGateway.physicians(controller.signal).then(value => {if(!controller.signal.aborted) setPhysicians(value);}) : Promise.resolve();
    void load.catch(() => {if(!controller.signal.aborted) setError('This service could not be loaded. Please try again.');});
    return () => controller.abort();
  },[journey,context,retry]);
  const reviewRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (review) reviewRef.current?.focus();
  }, [review]);
  const records = entries.filter(entry => context.entity.recordIds.includes(entry.id));
  const title = journey === 'make' ? 'Make Yourself' : journey === 'buy' ? 'Buy herbs & ingredients' : 'Consult a Physician';
  return <section className="experience-page">
    <button className="experience-back" onClick={back}><ArrowLeft size={17}/>Back to {context.returnTab === 'search' ? 'your results' : 'discovery'}</button>
    <header><span className="eyebrow">{journey === 'make' ? 'RESEARCH A PREPARATION' : journey === 'buy' ? 'PRODUCT DISCOVERY' : 'PROFESSIONAL GUIDANCE'}</span><h1>{title}</h1><p>{context.ingredient || context.entity.label}</p></header>
    {journey === 'make' && <>
      <p className="experience-notice">Explore historical preparations and their documented ingredients. A source mention does not establish suitability for home preparation or personal use.</p>
      {!records.length && <div className="experience-empty"><BookOpen/><h2>Find a preparation first.</h2><p>{context.entity.kind === 'query' ? 'Search for a herb or preparation, then choose Make Yourself from a supported record.' : 'No linked preparations are available for this selection in the current corpus.'}</p><button className="primary-button" onClick={back}>Return to discovery</button><button onClick={() => move('consult')}>Ask about professional guidance</button></div>}
      <div className="preparation-records">{records.map(entry => <article key={entry.id}><h2>{englishHerbName(entry)}</h2><p>{entry.preparation_type} · Recorded for {entry.ailment}</p><VerificationBadge status={entry.verification_status}/><p className="record-safety">Source safety label: {entry.safety_rating || 'Not stated'}</p><h3>Recorded preparation</h3><p className="record-preparation">{entry.remedy || 'Preparation method not stated in this record.'}</p><h3>Documented ingredients</h3>{entry.ingredients_structured?.length ? <ul className="documented-ingredients">{entry.ingredients_structured.map((name,i) => {const linked=ingredientHerb(name,herbs);return <li key={name+i}><span>{name}</span>{linked && <button onClick={() => herb(linked.id)}>View herb</button>}<button onClick={() => move('buy',name)}>Check availability <ArrowRight size={14}/></button></li>;})}</ul> : <p>Structured ingredient information is not available. The original source text remains accessible below.</p>}<p className="muted">Quantities and dosage: {entry.dosage_verbatim || 'Not stated in structured record; no quantity or dose inferred.'}</p><div className="button-row"><button className="primary-button" onClick={() => source(entry)}>View source <BookOpen size={16}/></button><button onClick={() => move('consult')}>Consult a Physician</button></div></article>)}</div>
    </>}
    {error && <div className="error-state" role="alert"><p>{error}</p><button onClick={() => setRetry(value=>value+1)}>Retry</button></div>}
    {journey === 'buy' && !error && <>
      {!products ? <p role="status">Checking product availability…</p> : products.status === 'unavailable' ? <div className="experience-empty"><ShoppingBag/><h2>Purchasing is coming soon.</h2><p>{products.reason}</p><p>No products, prices or stock availability can be confirmed yet.</p>{context.ingredient && <p>Ingredient carried from your preparation: <strong>{context.ingredient}</strong></p>}<div className="button-row"><button onClick={back}>Return to your selection</button><button onClick={() => move('make')}>Explore recorded preparations</button></div></div> : !products.items.length ? <p className="experience-notice">No matching products are currently available.</p> : <div className="product-grid">{products.items.map(product => <article key={product.id}>{product.imageUrl && <img src={product.imageUrl} alt={product.name}/>}<h2>{product.name}</h2><p>{product.packSize}</p><p>{new Intl.NumberFormat('en-IN',{style:'currency',currency:product.currency}).format(product.priceMinor/100)}</p><p>{product.available ? 'Available' : 'Unavailable'}</p>{product.available && <a className="primary-button" href={product.purchaseUrl}>View product & purchase</a>}</article>)}</div>}
    </>}
    {journey === 'consult' && <>
      <p className="consult-intro">Prepare your questions for a qualified Ayurvedic physician.</p>
      {!error && (!physicians ? <p role="status">Checking consultation availability…</p> : physicians.status === 'unavailable' ? <p className="consult-unavailable" role="status">{physicians.reason} No appointment will be booked or shared here.</p> : <p>{physicians.items.filter(item => item.verification === 'verified').length} verified physicians available. Booking integration is required to select an appointment.</p>)}
      {!review && <form className="consult-context" onSubmit={event => {event.preventDefault();setReview(true);}}>
        <h2>Prepare your questions</h2><p className="muted">A private note to help you plan a conversation.</p><label>Your concern<textarea aria-label="Your concern" value={concern} onChange={event => {setConcern(event.target.value);setReview(false);}} rows={3} maxLength={1000}/></label>
        <details className="consult-optional" open={profile.enabled || undefined}><summary>Personal context <span>optional</span></summary><SearchContext value={profile} onChange={value => {setProfile(value);setReview(false);}}/>
        <label>Health context <span>optional</span><textarea aria-label="Health context" value={health} onChange={event => {setHealth(event.target.value);setReview(false);}} rows={3} maxLength={1500} placeholder="Conditions or current medicines you would want a physician to review"/></label></details>
        <p className="muted">Private to this page. Nothing is saved or sent; your note clears when you leave.</p><button className="primary-button" type="submit">Review context <ArrowRight size={16}/></button>
      </form>}
      {review && <section ref={reviewRef} tabIndex={-1} className="consult-review" aria-label="Consultation context review"><h2>Your context, ready to review</h2><p>{concern || 'No concern specified'}</p><p>{[profile.age,profile.gender].filter(Boolean).join(' · ') || 'Age and gender not specified'}</p><p>{health || 'No additional health context provided'}</p><p role="status">Local preview only. Booking and secure sharing are unavailable.</p><button className="primary-button" onClick={() => {setReview(false); requestAnimationFrame(() => document.querySelector<HTMLTextAreaElement>('[aria-label="Your concern"]')?.focus());}}>Edit context</button></section>}
    </>}
  </section>;
}
