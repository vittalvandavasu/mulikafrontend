import React from 'react';

const scenes: Record<string, { image: string; caption: string; note: string; position?: string }> = {
  index: { image: 'garden', caption: 'Every path starts with curiosity.', note: 'THE MULIKA COLLECTION' },
  search: { image: 'infusion', caption: 'A question is a good place to begin.', note: 'EXPLORE THE TRADITION' },
  herbs: { image: 'garden', caption: 'Get to know the plants behind the names.', note: 'THE HERB COLLECTION' },
  az: { image: 'garden', caption: 'Many names. A world of discovery.', note: 'AN ALPHABET OF HERBS', position: 'left 40%' },
  taxonomy: { image: 'garden', caption: 'Discover the connections between plants.', note: 'BOTANICAL FAMILIES', position: 'right 65%' },
  ailments: { image: 'infusion', caption: 'Start with what you want to understand.', note: 'EXPLORE BY NEED' },
  sources: { image: 'reading', caption: 'There is a story behind every record.', note: 'THE MULIKA LIBRARY' },
  codex: { image: 'reading', caption: 'Take a closer look at the original knowledge.', note: 'READ & DISCOVER' },
  compare: { image: 'reading', caption: 'Different texts. A wider perspective.', note: 'READ ACROSS SOURCES', position: 'center 65%' },
  glossary: { image: 'infusion', caption: 'A little clarity opens up a whole tradition.', note: 'WORDS, METHODS & MATERIALS' },
  community: { image: 'preparation-editorial', caption: 'Knowledge grows through conversation.', note: 'THE MULIKA COMMUNITY' },
  saved: { image: 'reading', caption: 'Your own trail of discovery.', note: 'KEEP SOMETHING CLOSE' },
};

/** Editorial atmosphere only: never a specimen image or a source manuscript scan. */
export function BotanicalBanner({ page, compact = false }: { page: string; compact?: boolean }) {
  const scene = scenes[page];
  if (!scene) return null;
  const original = scene.image === 'preparation-editorial';
  return <div className={`botanical-banner ${compact ? 'botanical-banner-compact' : ''}`} data-scene={page}>
    <picture>
      {!original && <source media="(max-width: 700px)" srcSet={`/images/${scene.image}-mobile.webp`}/>}
      <img src={`/images/${scene.image}.${original ? 'png' : 'webp'}`} alt="" width="1536" height="1024" style={{objectPosition:scene.position}} decoding="async"/>
    </picture>
    <div className="botanical-banner-copy"><span>{scene.note}</span><p>{scene.caption}</p></div>
    <span className="botanical-banner-credit">Illustrative imagery</span>
  </div>;
}
