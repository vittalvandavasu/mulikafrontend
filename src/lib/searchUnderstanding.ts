import { AyurvedicEntry, HerbMonograph } from '../types';
import { HERB_MONOGRAPHS } from '../data/herbs';
import { englishHerbName } from './herbNames';
import { normalizeName } from './experience';

const stop = new Set('a an the is are was were am have has had having be being been as at by from also regarding information benefits benefit recommend recommended take taking daily good bad cure can could should would will do does did i me my we our you your it its they them this that these those what which when where why how about for of to in on with and or please tell show know want need help explain more using use used uses safe safety side effects dosage dose ingredients preparation preparations source sources evidence research study studies recorded records traditional herb herbs there any'.split(' '));
export function searchTerms(query: string): string[] {
  return [...new Set(normalizeName(query).split(' ').filter(term => term.length > 1 && !stop.has(term)))];
}
function contains(text: string, term: string) { return (' '+normalizeName(text)+' ').includes(' '+term+' '); }
export function matchingHerbs(query: string, herbs: HerbMonograph[] = HERB_MONOGRAPHS) {
  const normalized = normalizeName(query);
  return herbs.filter(herb => [herb.name, herb.botanical, herb.telugu, herb.sanskrit, englishHerbName(herb), ...herb.common_names].some(alias => {
    const name = normalizeName(alias);
    return name.length > 2 && contains(normalized, name);
  }));
}
export function scoreEntryMatch(entry: AyurvedicEntry, terms: string[]): number {
  if (!terms.length) return 0;
  const query = terms.join(' ');
  const aliases = matchingHerbs(query);
  const species = normalizeName(entry.botanical || '').split(' ').slice(0,2).join(' ');
  const identity = `${entry.herb} ${entry.herb_full || ''} ${entry.telugu} ${entry.botanical || ''} ${englishHerbName(entry)}`;
  const topic = `${entry.ailment} ${entry.ailment_telugu || ''}`;
  const rest = `${entry.remedy} ${entry.category} ${entry.source_title}`;
  let score = terms.reduce((total,term) => total + (contains(identity,term) ? 20 : contains(topic,term) ? 15 : contains(rest,term) ? 3 : 0),0);
  if (species.split(' ').length === 2 && aliases.some(herb => normalizeName(herb.botanical).split(' ').slice(0,2).join(' ') === species)) score += 50;
  const groups = [
    ['piles','hemorrhoids','hemorrhoid','moola','arshas'],
    ['headache','headaches','migraine','talanopi'],
    ['fever','fevers','jwara'], ['cough','coughs','cold','jalubu'],
    ['joint','joints','arthritis','keellu'], ['sleep','sleeplessness','insomnia'],
    ['tulsi','tulasi','basil'], ['acidity','hyperacidity'],
  ];
  for (const group of groups) {
    if (group.some(term => terms.includes(term)) && group.some(term => contains(identity+' '+topic,term))) score += 12;
  }
  return score;
}
export function resolveFollowup(question: string, previousTopic: string): string {
  if (!previousTopic) return question.trim();
  const relative = /\b(it|its|they|them|this herb|that herb|these preparations)\b/i.test(question) || !searchTerms(question).length;
  return relative ? `${previousTopic} ${question.trim()}` : question.trim();
}
export function researchTopic(query: string): string {
  const herbs = matchingHerbs(query);
  const terms = searchTerms(query);
  const species = new Set(herbs.map(herb=>normalizeName(herb.botanical).split(' ').slice(0,2).join(' ')));
  if (species.size !== 1) return terms.join(' ');
  const herb = herbs[0];
  const aliasWords = new Set([herb.name,herb.botanical,herb.telugu,herb.sanskrit,englishHerbName(herb),...herb.common_names].flatMap(name=>normalizeName(name).split(' ')));
  return [herb.botanical.split(/\s+/).slice(0,2).join(' '),...terms.filter(term=>!aliasWords.has(term))].join(' ');
}
