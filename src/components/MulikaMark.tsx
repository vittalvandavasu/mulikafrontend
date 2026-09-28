import React from 'react';

/** An open book whose central stem grows into two leaves. */
export function MulikaMark() {
  return <svg className="mulika-mark" viewBox="0 0 56 64" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="54" height="62" rx="17" fill="currentColor"/>
    <g className="mark-lines" stroke="var(--canvas)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 48V27M28 40C21 34 13 36 10 35v13c7-1 12 1 18 5 6-4 11-6 18-5V35c-5 0-11 0-18 5"/>
      <path className="mark-leaf" d="M28 29C16 29 13 20 15 12c10 0 16 7 13 17ZM28 34c0-12 7-17 15-16 0 10-5 16-15 16Z"/>
      <path d="m20 19 8 10m9-5-9 10"/>
    </g>
  </svg>;
}
