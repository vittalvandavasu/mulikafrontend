import React, { createContext, useContext } from 'react';
import { BookOpen, ShoppingBag, Stethoscope } from 'lucide-react';
import { DiscoveryEntity, Journey } from '../lib/experience';

export const ExperienceContext = createContext<{open: (journey: Journey, entity: DiscoveryEntity, ingredient?: string) => void}>({open: journey => { window.location.hash = journey; }});
export function ContextActions({ entity, make = true, buy = true }: { entity: DiscoveryEntity; make?: boolean; buy?: boolean }) {
  const {open} = useContext(ExperienceContext);
  return <div className="context-actions" data-primary={make ? 'make' : 'none'} aria-label={`Next steps for ${entity.label}`}>
    {make && <button onClick={() => open('make',entity)}><BookOpen size={17}/><span>Make Yourself</span></button>}
    {buy && <button onClick={() => open('buy',entity)} title="Product availability · shop coming soon"><ShoppingBag size={17}/><span>Buy</span></button>}
    <button onClick={() => open('consult',entity)} title="Prepare your questions · booking coming soon"><Stethoscope size={17}/><span>Consult a Physician</span></button>
  </div>;
}
