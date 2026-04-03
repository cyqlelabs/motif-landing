'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  useState,
  useCallback,
  useEffect,
  useRef,
  createContext,
  useContext,
  type ReactNode,
} from 'react';

/* ── Context ── */

interface ScrollerState {
  activeSection: number;
  totalSections: number;
  direction: number; // 1 = forward, -1 = backward
  goToSection: (i: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

const ScrollerCtx = createContext<ScrollerState | null>(null);
const SectionIndexCtx = createContext(0);

export function useScroller() {
  const ctx = useContext(ScrollerCtx);
  if (!ctx) throw new Error('useScroller must be inside FullPageScroller');
  return ctx;
}

export function useSectionIndex() {
  return useContext(SectionIndexCtx);
}

/** Returns true when this section is the currently active one. */
export function useSectionActive() {
  const i = useSectionIndex();
  const { activeSection } = useScroller();
  return activeSection === i;
}

/* ── Component ── */

export function FullPageScroller({
  children,
  overlay,
}: {
  children: ReactNode[];
  overlay?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const lockRef = useRef(false);
  const touchYRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const total = children.length;

  const LOCK_MS = reducedMotion ? 100 : 1050;
  const DURATION = reducedMotion ? 0.01 : 0.95;

  /* ── Navigation helpers ── */

  const goTo = useCallback(
    (i: number) => {
      if (lockRef.current || i === active || i < 0 || i >= total) return;
      setDir(i > active ? 1 : -1);
      setActive(i);
      lockRef.current = true;
      setTimeout(() => {
        lockRef.current = false;
      }, LOCK_MS);
    },
    [active, total, LOCK_MS],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  /** Find the .fp-section-scrollable element inside the active section, if any. */
  const getScrollable = useCallback(() => {
    if (!trackRef.current) return null;
    const section = trackRef.current.children[active] as HTMLElement | undefined;
    return section?.querySelector('.fp-section-scrollable') as HTMLElement | null;
  }, [active]);

  /* ── Wheel ── */
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (lockRef.current) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 25) { e.preventDefault(); return; }

      const el = getScrollable();
      if (el) {
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
        // Let the browser scroll internally unless at an edge in the scroll direction
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [goNext, goPrev, getScrollable]);

  /* ── Touch ── */
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (lockRef.current) return;
      const dy = touchYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;

      const el = getScrollable();
      if (el) {
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
        if (dy > 0 && !atBottom) return;
        if (dy < 0 && !atTop) return;
      }

      if (dy > 0) goNext();
      else goPrev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev, getScrollable]);

  /* ── Keyboard ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, goTo, total]);

  return (
    <ScrollerCtx.Provider
      value={{
        activeSection: active,
        totalSections: total,
        direction: dir,
        goToSection: goTo,
        goNext,
        goPrev,
      }}
    >
      <div className="fp-root">
        <motion.div
          ref={trackRef}
          className="fp-track"
          animate={{ y: `${-active * 100}vh` }}
          transition={{
            duration: DURATION,
            ease: [0.16, 1, 0.3, 1], // ease-out-expo
          }}
        >
          {children.map((child, i) => (
            <div key={i} className="fp-section">
              <SectionIndexCtx.Provider value={i}>
                {child}
              </SectionIndexCtx.Provider>
            </div>
          ))}
        </motion.div>

        {/* Dot nav */}
        <nav className="fp-dots" aria-label="Sections">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`fp-dot${i === active ? ' fp-dot-active' : ''}`}
              aria-label={`Section ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
            />
          ))}
        </nav>

        {/* Fixed overlays (Nav, etc.) rendered inside context */}
        {overlay}
      </div>
    </ScrollerCtx.Provider>
  );
}
