import { SearchResult } from '../types';
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}
export const searchLibrary = (query: string, bookFilter: string, categoryFilter: string, signal?: AbortSignal) => request<SearchResult>('/api/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, bookFilter, categoryFilter }), signal });
