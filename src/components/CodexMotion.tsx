import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

export function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
  return <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smooth }}/>;
}

/** Pointer response is decorative: the button and its hit target stay still. */
export function CollectionGraphic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20 });
  const sy = useSpring(y, { stiffness: 160, damping: 20 });
  const rotate = useTransform(sx, [-12,12], [-5,5]);
  return <span ref={ref} className="graphic-stage" onPointerMove={event => {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - .5) * 20);
    y.set(((event.clientY - bounds.top) / bounds.height - .5) * 16);
  }} onPointerLeave={() => {x.set(0);y.set(0);}}>
    <motion.span className="graphic-response" style={reduced ? undefined : { x:sx, y:sy, rotate }}>{children}</motion.span>
  </span>;
}
