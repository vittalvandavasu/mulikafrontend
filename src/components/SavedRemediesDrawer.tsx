import React from 'react';
import { SavedRemedyItem, AyurvedicEntry } from '../types';
import { BotanicalBanner } from './BotanicalBanner';
import { Sheet } from './Sheet';
import { Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
interface SavedRemediesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedRemedies: SavedRemedyItem[];
  onRemoveRemedy: (id: string) => void;
  onClearAll: () => void;
  onConsultRemedy: (query: string) => void;
  onOpenFolio?: (bookId: string, page: number, entryId?: string) => void;
}


export const SavedRemediesDrawer: React.FC<SavedRemediesDrawerProps> = ({ isOpen, onClose, savedRemedies, onRemoveRemedy, onClearAll, onConsultRemedy, onOpenFolio }) => {
 if (!isOpen) return null;
 return <Sheet title="Saved records" onClose={onClose}><div className="provenance-body"><BotanicalBanner page="saved" compact/><p className="muted">Saved on this device · {savedRemedies.length} {savedRemedies.length === 1 ? 'formulation' : 'formulations'}</p>{!savedRemedies.length ? <div className="saved-empty"><Bookmark size={34}/><h3>Keep a reference close.</h3><p>Save a formulation from search results or a condition page. Its manuscript reference will be here when you return.</p><button className="primary-button" onClick={onClose}>Continue exploring <ArrowRight size={16}/></button></div> : <><div className="saved-list">{savedRemedies.map(item=><article key={item.id}><div className="section-heading"><h3>{item.entry.herb}</h3><button className="icon-button" aria-label={`Remove ${item.entry.herb} from Saved records`} onClick={()=>onRemoveRemedy(item.id)}><Trash2 size={17}/></button></div><p lang="te">{item.entry.telugu}</p><p>{item.entry.ailment}</p><p className="muted">{item.entry.source_title || item.entry.source_short} · Page {item.entry.page}</p>{item.notes && <p>{item.notes}</p>}<div className="button-row"><button className="primary-button" onClick={()=>onOpenFolio?.(item.entry.source_id,item.entry.page,item.entry.id)}><BookOpen size={16}/> View source</button><button onClick={()=>onConsultRemedy(item.entry.herb)}>Search this herb</button></div></article>)}</div><div className="button-row"><button onClick={()=>window.print()}>Print saved records</button><button onClick={onClearAll}>Clear saved items</button></div></>}<p className="muted">Saved content is historical reference material, not a treatment plan.</p></div></Sheet>;
};
