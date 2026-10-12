import { AyurvedicEntry, HerbMonograph } from '../types';
import { AilmentContext } from '../components/SearchContext';

export type Journey = 'make' | 'buy' | 'consult';
export type DiscoveryEntity =
  | { kind: 'herb'; id: string; label: string; recordIds: string[] }
  | { kind: 'ailment'; id: string; label: string; recordIds: string[] }
  | { kind: 'formulation'; id: string; label: string; recordIds: string[] }
  | { kind: 'query'; id: string; label: string; recordIds: string[] };
export interface JourneyContext { entity: DiscoveryEntity; query: string; demographics: AilmentContext; returnTab: string; ingredient?: string }
export interface Product { id: string; name: string; herbId?: string; ingredient?: string; imageUrl?: string; packSize: string; priceMinor: number; currency: string; available: boolean; purchaseUrl: string }
export interface Physician { id: string; name: string; credentials: string; verification: 'verified' | 'pending'; modes: ('online' | 'in-person')[] }
export interface Appointment { id: string; physicianId: string; startsAt: string; mode: 'online' | 'in-person' }
export type ServiceResult<T> = { status: 'available'; items: T[] } | { status: 'unavailable'; reason: string };
export interface CommerceGateway { products(context: JourneyContext, signal: AbortSignal): Promise<ServiceResult<Product>> }
export interface ConsultationGateway { physicians(signal: AbortSignal): Promise<ServiceResult<Physician>>; appointments(physicianId: string, signal: AbortSignal): Promise<ServiceResult<Appointment>> }
export const commerceGateway: CommerceGateway = { products: async () => ({status:'unavailable',reason:'Mulika’s product catalogue and checkout are not connected yet.'}) };
export const consultationGateway: ConsultationGateway = {
  physicians: async () => ({status:'unavailable',reason:'Verified physician listings and appointment booking are not connected yet.'}),
  appointments: async () => ({status:'unavailable',reason:'Appointment availability is not connected yet.'})
};
export const normalizeName = (value: string) => value.normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export function relatedHerbRecords(herb: HerbMonograph, entries: AyurvedicEntry[]) {
  const species = normalizeName(herb.botanical).split(' ').slice(0,2).join(' ');
  const names = [herb.name, ...herb.common_names].map(normalizeName);
  return entries.filter(entry => (species.split(' ').length === 2 && normalizeName(entry.botanical).split(' ').slice(0,2).join(' ') === species) || names.includes(normalizeName(entry.herb)));
}
export function ingredientHerb(name: string, herbs: HerbMonograph[]) {
  const normal = normalizeName(name);
  return herbs.find(herb => {
    const species = normalizeName(herb.botanical).split(' ').slice(0,2).join(' ');
    return [herb.name,...herb.common_names,herb.telugu,herb.sanskrit].some(alias => normalizeName(alias) === normal) ||
      (species.split(' ').length === 2 && (' '+normal+' ').includes(' '+species+' '));
  });
}
