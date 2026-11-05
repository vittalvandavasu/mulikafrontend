import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Search, Leaf, Moon, Sparkles, Wind, Heart, Sun, Move, Droplets, Pause, Play } from 'lucide-react';
import { HerbMonograph } from '../types';
import { englishHerbName } from '../lib/herbNames';

const artwork = '/images/preparation-editorial.png';
const needs = [
  { label: 'Digestion', query: 'Digestion', icon: Leaf },
  { label: 'Sleep & stress', query: 'Sleep', icon: Moon },
  { label: 'Skin', query: 'Skin', icon: Sparkles },
  { label: 'Hair', query: 'Hair', icon: Droplets },
  { label: 'Joint & mobility', query: 'Joint pain', icon: Move },
  { label: 'Respiratory', query: 'Respiratory', icon: Wind },
  { label: 'Women’s wellness', query: 'Women', icon: Heart },
  { label: 'Seasonal care', query: 'Seasonal', icon: Sun },
];

/** Supply a local, licensed video source when the preparation film is ready. */
export function PreparationHero({ onSearch, videoSrc }: { onSearch: (query: string) => void; videoSrc?: string }) {
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const video = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (!video.current) return;
    if (playing && !reduced) void video.current.play().catch(() => setPlaying(false));
    else video.current.pause();
  }, [playing, reduced, videoSrc]);
  return <section className="botanical-hero" aria-labelledby="home-title">
    <img className="hero-art" src={artwork} alt="" fetchPriority="high"/>
    {videoSrc && <video ref={video} className="hero-art" src={videoSrc} poster={artwork} muted loop playsInline aria-hidden="true"/>}
    <div className="hero-shade"/><div className="hero-seal" aria-hidden="true"><span>ROOTED IN</span><Leaf size={38} strokeWidth={1}/><span>TRADITION</span></div><div className="hero-image-label" aria-hidden="true"><span>01 / THE ART OF PREPARATION</span><span>Plant. Practice. Perspective.</span></div>
    <div className="hero-copy">
      <span className="home-eyebrow">THE LIVING BOTANICAL LIBRARY</span>
      <h1 id="home-title">Old wisdom.<br/>A fresh<br/><em>perspective.</em></h1>
      <p>Discover the plants, preparations and Telugu traditions<br className="desktop-only"/> that bring herbal knowledge to life.</p>
      <form className="home-search" role="search" onSubmit={event => { event.preventDefault(); if(query.trim()) onSearch(query.trim()); }}>
        <label className="sr-only" htmlFor="home-search-input">Search herbs, ailments and remedies</label>
        <Search size={22} aria-hidden="true"/>
        <input id="home-search-input" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search herbs, ailments, formulations…" required/>
        <button type="submit" aria-label="Search Mulika"><span>Search</span><ArrowUpRight size={22}/></button>
      </form>
      <div className="hero-suggestions"><span>Try</span>{['Digestion','Sleep','Skin','Tulsi'].map(value => <button key={value} onClick={() => onSearch(value)}>{value}</button>)}</div>
    </div>
    <div className="hero-caption"><span>HERBS · PREPARATIONS · ORIGINAL TEXTS</span><span>SCROLL TO EXPLORE ↓</span></div>
    {videoSrc && !reduced && <button className="hero-play" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause background film' : 'Play background film'}>{playing ? <Pause/> : <Play/>}</button>}
  </section>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { y: [18, 0], opacity: [0.7, 1] }} viewport={{once:true, amount:0.12}} transition={{duration:0.65}}>{children}</motion.div>;
}

export function BotanicalHome({ navigate, onSearch, herbs, onHerb, onCustomize }: {
  navigate: (tab: string) => void; onSearch: (query: string) => void; herbs: HerbMonograph[];
  onHerb: (id: string) => void; onCustomize: () => void;
}) {
  const featured = ['Zingiber officinale', 'Ocimum', 'Azadirachta indica', 'Phyllanthus emblica']
    .map(name => herbs.find(herb => herb.botanical.includes(name))).filter((herb): herb is HerbMonograph => !!herb);
  return <div className="botanical-home">
    <PreparationHero onSearch={onSearch}/>
    <div className="editorial-intro"><span>YOUR CURIOSITY. YOUR WAY IN.</span><p>A world of knowledge.<br/><em>Start somewhere familiar.</em></p><span className="editorial-intro-mark" aria-hidden="true">↙</span></div><section className="home-section home-paths" aria-label="Choose your path">
      {[
        { title:'Discover', text:'Find herbs, traditional preparations, and their source stories.', action:'Start discovering', run:() => navigate('search'), tone:'sage' },
        { title:'Know the herb', text:'English names, Telugu names, and the plants behind them.', action:'Browse herbs', run:() => navigate('herbs'), tone:'earth' },
        { title:'Follow the source', text:'Read the original record and understand its evidence.', action:'Open the library', run:() => navigate('sources'), tone:'olive' }
      ].map((path,index) => <Reveal className={'home-path-card '+path.tone} key={path.title}><div className={'path-art crop-'+index} aria-hidden="true"/><div className="path-copy"><span className="home-eyebrow">0{index+1} / YOUR WAY IN</span><h2>{path.title}</h2><p>{path.text}</p><button className="home-link" onClick={path.run}>{path.action}<ArrowUpRight size={20}/></button></div></Reveal>)}
    </section>
    <section className="home-section" aria-labelledby="needs-title">
      <div className="section-heading"><div><span className="home-eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</span><h2 id="needs-title">What brings you here?</h2></div><p>Start with a topic.<br/>See what the traditional texts say.</p></div>
      <div className="needs-grid">{needs.map(({label,query,icon:Icon},index) => <button key={label} className={'need-card need-'+index} onClick={() => onSearch(query)}><Icon size={32} strokeWidth={1}/><span>{label}</span><ArrowUpRight size={18}/></button>)}</div>
    </section>
    <section className="home-section featured-section" aria-labelledby="herbs-title">
      <div className="section-heading"><div><span className="home-eyebrow">FAMILIAR PLANTS. MORE TO DISCOVER.</span><h2 id="herbs-title">Meet the herbs.</h2></div><button className="home-link" onClick={() => navigate('herbs')}>Explore all herbs <ArrowUpRight size={20}/></button></div>
      <div className="home-herbs">{featured.map((herb,index) => <Reveal className={'home-herb herb-tone-'+index} key={herb.id}><div className="herb-illustration" aria-hidden="true"><Leaf strokeWidth={0.65}/><span>BOTANICAL<br/>FIELD NOTES</span></div><span className="herb-number">0{index+1}</span><span className="herb-family">{herb.family}</span><h3>{englishHerbName(herb)}</h3><p lang="te">{herb.telugu}</p><p className="herb-sanskrit">{herb.sanskrit}</p><p className="herb-botanical">{herb.botanical}</p><button className="home-link" onClick={() => onHerb(herb.id)}>View herb <ArrowUpRight size={19}/></button></Reveal>)}</div>
    </section>
    <section className="preparation-story" aria-labelledby="story-title"><div className="story-image"><img src={artwork} alt="Illustrative botanical preparation scene with hands using a stone mortar" loading="lazy"/><span>THE ART OF PREPARATION</span></div><Reveal className="story-copy"><span className="home-eyebrow">THERE’S A STORY IN EVERY PREPARATION</span><h2 id="story-title">More than a leaf.<br/><em>A living tradition.</em></h2><p>The grinding, the steeping, the patient attention. Traditional herbal knowledge carries generations of observation in every preparation.</p><p>Mulika brings you closer to those records—with ingredients, recorded methods, and the pages they came from.</p><button className="home-link" onClick={() => navigate('sources')}>Discover the library <ArrowUpRight size={20}/></button><small>Explore historical knowledge, not a personal treatment plan.</small></Reveal></section>
    <div className="home-service-links" aria-label="Additional services"><span>Planning your next step?</span><button onClick={() => navigate('buy')}>Check availability <span>Shop coming soon</span></button><button onClick={() => navigate('consult')}>Consult a Physician <span>Booking coming soon</span></button></div>
    <div className="home-closing"><span>MULIKA</span><p>Rooted in tradition.<br/>Open to discovery.</p><button className="home-link" onClick={() => navigate('community')}>Meet the community <ArrowUpRight size={20}/></button></div>
  </div>;
}
