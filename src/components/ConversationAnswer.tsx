import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { AyurvedicEntry, SearchResult, ThreeStateStatus } from '../types';
import { englishHerbName } from '../lib/herbNames';

export function ConversationAnswer({query,result,onSource,onSearch}:{query:string;result:SearchResult;onSource?:(book:string,page:number,id?:string)=>void;onSearch?:(question:string)=>void}) {
  const [followup,setFollowup] = useState('');
  const supported = result.status !== ThreeStateStatus.UNKNOWN && !!result.status && !result.is_abstention;
  const entries = supported ? result.manuscript_matches || result.topManuscriptMatches || [] : [];
  const safetyQuestion = /\b(safe|safety|risk|risks|side effects)\b/i.test(query);
  const ingredientQuestion = /\b(ingredient|ingredients|prepare|preparation|make)\b/i.test(query);
  const describe = (entry:AyurvedicEntry) => ingredientQuestion ? (entry.ingredients_structured?.length ? `Recorded ingredients: ${entry.ingredients_structured.join(', ')}.` : 'This record does not list structured ingredients. Open its source to see the original wording.') : safetyQuestion ? `Source safety label: ${entry.safety_rating || 'Not stated'}. This label does not establish whether it is safe for you.` : `The source records ${entry.preparation_type || 'a traditional preparation'} in connection with ${entry.ailment}.`;
  return <section className="conversation-answer" aria-label="Mulika answer"><div className="answer-identity"><MessageCircle size={18}/><span>MULIKA · LET’S EXPLORE</span></div>
    <h2>{supported && entries.length ? safetyQuestion ? 'Let’s separate the record from personal safety.' : ingredientQuestion ? 'Here’s what the preparations actually record.' : 'Here’s a useful place to start.' : 'Let’s look a little wider.'}</h2>
    <p>{supported && entries.length ? `I found ${entries.length} related source records. These describe historical practice; they don’t establish that a preparation works or is right for you.` : 'I couldn’t verify a matching claim in this manuscript collection. That is a limit of this collection, not a conclusion about all available knowledge. You can search published research below.'}</p>
    {entries.length>0 && <ol>{entries.slice(0,3).map(entry=><li key={entry.id}><strong>{englishHerbName(entry)}</strong><p>{describe(entry)}</p><button onClick={()=>onSource?.(entry.source_id,entry.page,entry.id)}>{entry.source_short} · p. {entry.page}<ArrowRight size={14}/></button></li>)}</ol>}
    {supported && safetyQuestion && <p className="answer-limitation">{result.safety_note || 'No source-specific safety information is available.'}</p>}
    {onSearch && <><div className="followup-chips" aria-label="Suggested follow-up questions"><button onClick={()=>document.getElementById('research-topic')?.focus()}>Explore published research<ArrowRight size={14}/></button>{(entries.length ? ['What about safety?','Which ingredients are recorded?'] : []).map(question=><button key={question} onClick={()=>onSearch(question)}>{question}<ArrowRight size={14}/></button>)}</div><form className="followup-form" onSubmit={event=>{event.preventDefault();if(followup.trim()) onSearch(followup.trim());}}><label htmlFor="followup-question">Ask a follow-up</label><div><input id="followup-question" value={followup} onChange={event=>setFollowup(event.target.value)} placeholder="Ask about this topic, or name a different herb…" maxLength={500}/><button className="primary-button" disabled={!followup.trim()} aria-label="Send follow-up"><ArrowRight size={18}/></button></div></form></>}
  </section>;
}
