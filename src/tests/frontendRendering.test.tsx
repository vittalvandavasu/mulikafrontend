import React from 'react';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { SearchResultsView } from '../components/SearchResultsView';
import { ThreeStateStatus, SearchResult } from '../types';
import { MANUSCRIPT_ENTRIES } from '../data/manuscripts';
const base: SearchResult = { status: ThreeStateStatus.SUPPORTED, query_understood_as: 'Test question', manuscript_summary: 'Source-backed synthesis', modern_crossref: 'Modern reference text', safety_note: 'Returned safety warning', manuscript_matches: [MANUSCRIPT_ENTRIES[0]], pathya_guidance: ['Returned diet statement'] };
const render = (r: SearchResult) => renderToStaticMarkup(<SearchResultsView searchResult={r} loading={false} onSelectHerb={() => {}}/>);
for (const [status,label] of [[ThreeStateStatus.SUPPORTED,'Verified source evidence'],[ThreeStateStatus.INFERRED,'Source-linked interpretation']] as const) { const html=render({...base,status}); assert.ok(html.includes(label)); assert.ok(html.includes('Source-backed synthesis')); assert.ok(html.includes('Returned safety warning')); assert.ok(html.includes('View source')); }
for (const r of [{...base,status:ThreeStateStatus.UNKNOWN},{...base,is_abstention:true}]) { const html=render(r); assert.ok(html.includes('We couldn’t verify')); for (const forbidden of ['Source-backed synthesis','Modern reference text','Returned diet statement',MANUSCRIPT_ENTRIES[0].remedy,'View source']) assert.ok(!html.includes(forbidden), `Abstention leaked ${forbidden}`); }
const community=render({...base,user_submitted_matches:[{id:'c1',title:'Example field note',recipe:'Community text',upvotes:2}]}); assert.ok(community.includes('Community contribution')); assert.ok(community.includes('not medical validity'));
const missingSafety=render({...base,safety_note:''}); assert.ok(missingSafety.includes('Safety information unavailable')); assert.ok(missingSafety.includes('does not confirm absence of risk'));
console.log('PASS: SUPPORTED, INFERRED, contradictory UNKNOWN, explicit abstention, source action, community separation, missing safety rendering');
