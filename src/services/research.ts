export interface ResearchArticle { id:string; title:string; authors:string; journal:string; year:string; excerpt:string; publicationTypes:string[]; url:string }
export interface ResearchResponse { items:ResearchArticle[]; total:number; searchUrl:string }
const text = (value:unknown) => typeof value === 'string' ? value.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/<[^>]*>/g,'').trim() : '';
export function researchQuery(topic:string) {
  const words = topic.normalize('NFKC').match(/[\p{L}\p{M}\p{N}]+/gu)?.slice(0,24) || [];
  return words.length ? `(${words.map(word => '"'+word+'"').join(' AND ')}) AND SRC:MED` : '';
}
export function parseResearch(data:unknown, query:string):ResearchResponse {
  const value = data as {hitCount?:unknown;resultList?:{result?:unknown}};
  if (!value || typeof value.hitCount !== 'number' || !Array.isArray(value.resultList?.result)) throw new Error('Invalid research response');
  const seen = new Set<string>();
  const items = value.resultList.result.flatMap((raw:unknown) => {
    const item = raw as Record<string,unknown>;
    if (!item || item.source !== 'MED' || typeof item.id !== 'string' || !/^\d+$/.test(item.id) || !text(item.title) || seen.has(item.id)) return [];
    seen.add(item.id);
    const journalInfo = item.journalInfo as {journal?:{title?:unknown}} | undefined;
    const types = item.pubTypeList as {pubType?:unknown} | undefined;
    return [{id:item.id,title:text(item.title),authors:text(item.authorString),journal:text(journalInfo?.journal?.title) || text(item.journalTitle),year:text(item.pubYear),excerpt:text(item.abstractText).slice(0,500),publicationTypes:Array.isArray(types?.pubType) ? types.pubType.filter((t):t is string=>typeof t === 'string') : [],url:`https://europepmc.org/article/MED/${item.id}`}];
  });
  return {items,total:value.hitCount,searchUrl:`https://europepmc.org/search?query=${encodeURIComponent(query)}`};
}
export async function searchResearch(topic:string, signal?:AbortSignal):Promise<ResearchResponse> {
  const query = researchQuery(topic);
  if (!query) throw new Error('Enter a herb or research topic.');
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort',abort,{once:true});
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort,12000);
  try {
    const params = new URLSearchParams({query,format:'json',resultType:'core',pageSize:'5'});
    const response = await fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?${params}`,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
    if (!response.ok) throw new Error('Research service unavailable');
    return parseResearch(await response.json(),query);
  } finally { clearTimeout(timeout); signal?.removeEventListener('abort',abort); }
}
