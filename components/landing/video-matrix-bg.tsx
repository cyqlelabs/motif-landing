'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useSectionActive } from './full-page-scroller';

// ─── Add new videos to public/videos/videos.json ──────────────────────────
import MATRIX_VIDEOS from '@/public/videos/videos.json';
// ──────────────────────────────────────────────────────────────────────────

const CELL_COUNT = 30;
const SWAP_MIN_MS = 1200;
const SWAP_MAX_MS = 7000;
const GLITCH_MS = 80; // when to swap src mid-glitch (dark frame)
const GLITCH_DURATION_MS = 200;

function pickOther(current: string): string {
  const pool = MATRIX_VIDEOS.filter((v) => v !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function VideoMatrixBg() {
  const reducedMotion = useReducedMotion();
  const isActive = useSectionActive();
  const videosRef = useRef<(HTMLVideoElement | null)[]>(Array(CELL_COUNT).fill(null));
  const cellsRef = useRef<(HTMLDivElement | null)[]>(Array(CELL_COUNT).fill(null));
  const currentSrcRef = useRef<string[]>(Array(CELL_COUNT).fill(''));
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isActiveRef = useRef(isActive);

  // Pause / resume when section scrolls in or out
  useEffect(() => {
    isActiveRef.current = isActive;
    videosRef.current.forEach((vid) => {
      if (!vid) return;
      if (isActive) vid.play().catch(() => {});
      else vid.pause();
    });
  }, [isActive]);

  useEffect(() => {
    if (reducedMotion) return;

    const timers = timersRef.current;

    function playVideo(vid: HTMLVideoElement) {
      const tryPlay = () => {
        const duration = vid.duration || 12;
        vid.currentTime = Math.random() * duration;
        if (isActiveRef.current) vid.play().catch(() => {});
      };
      if (vid.readyState >= 1) tryPlay();
      else vid.addEventListener('loadedmetadata', tryPlay, { once: true });
    }

    function scheduleSwap(i: number) {
      const delay = SWAP_MIN_MS + Math.random() * (SWAP_MAX_MS - SWAP_MIN_MS);
      const t = setTimeout(() => swapCell(i), delay);
      timers.push(t);
    }

    function swapCell(i: number) {
      const vid = videosRef.current[i];
      const cell = cellsRef.current[i];
      if (!vid || !cell) { scheduleSwap(i); return; }

      const newSrc = pickOther(currentSrcRef.current[i]);
      cell.classList.add('vmx-glitch');

      // Swap at the dark frame
      const t1 = setTimeout(() => {
        currentSrcRef.current[i] = newSrc;
        vid.src = newSrc;
        playVideo(vid);
      }, GLITCH_MS);

      // Clean up glitch class, then schedule next swap
      const t2 = setTimeout(() => {
        cell.classList.remove('vmx-glitch');
        scheduleSwap(i);
      }, GLITCH_DURATION_MS);

      timers.push(t1, t2);
    }

    // Distribute initial video sources across cells
    for (let i = 0; i < CELL_COUNT; i++) {
      const vid = videosRef.current[i];
      if (!vid) continue;
      const src = MATRIX_VIDEOS[i % MATRIX_VIDEOS.length];
      currentSrcRef.current[i] = src;
      vid.src = src;
      playVideo(vid);

      // Stagger swap start times so cells don't all switch simultaneously
      const stagger = Math.random() * SWAP_MAX_MS;
      const t = setTimeout(() => scheduleSwap(i), stagger);
      timers.push(t);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.length = 0;
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Video grid */}
      <div className="vmx-grid absolute inset-0">
        {Array.from({ length: CELL_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => { cellsRef.current[i] = el; }}
            className="vmx-cell"
          >
            <video
              ref={(el) => { videosRef.current[i] = el; }}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Base dark wash */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Radial vignette — darkens edges, lets centre breathe */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 10%, hsl(var(--background) / 0.4) 100%)',
        }}
      />

      {/* Scanlines */}
      <div className="vmx-scanlines absolute inset-0" />
    </div>
  );
}
