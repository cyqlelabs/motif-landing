'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useSectionActive } from './full-page-scroller';
import MATRIX_VIDEOS from '@/public/videos/videos.json';

// ─── Add new videos to public/videos/videos.json ──────────────────────────

const CELL_COUNT = 16;
const FLIP_HALF_MS = 300;       // each half of the 3D flip
const REVEAL_STAGGER_MS = 70;   // delay between cells in the load reveal
const REVEAL_JITTER_MS = 120;   // random jitter on top of stagger
const MIN_FLIP_INTERVAL_MS = 3500; // min quiet time per cell between spotlight flips
const SPOTLIGHT_RADIUS_RATIO = 0.22; // fraction of container's smaller dimension

function pickOther(current: string): string {
  const pool = MATRIX_VIDEOS.filter((v) => v !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getCols(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 640) return 3;
  return 2;
}

export function VideoMatrixBg() {
  const reducedMotion = useReducedMotion();
  const isActive = useSectionActive();

  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>(Array(CELL_COUNT).fill(null));
  const videosRef = useRef<(HTMLVideoElement | null)[]>(Array(CELL_COUNT).fill(null));
  const srcRef = useRef<string[]>(Array(CELL_COUNT).fill(''));
  const flippingRef = useRef<boolean[]>(Array(CELL_COUNT).fill(false));
  const lastFlipRef = useRef<number[]>(Array(CELL_COUNT).fill(0));
  const isActiveRef = useRef(isActive);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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

    /* ── video loading ── */
    function loadVideo(i: number, src: string) {
      const vid = videosRef.current[i];
      if (!vid) return;
      srcRef.current[i] = src;
      vid.src = src;
      const go = () => {
        vid.currentTime = Math.random() * (vid.duration || 12);
        if (isActiveRef.current) vid.play().catch(() => {});
      };
      if (vid.readyState >= 1) go();
      else vid.addEventListener('loadedmetadata', go, { once: true });
    }

    for (let i = 0; i < CELL_COUNT; i++) {
      loadVideo(i, MATRIX_VIDEOS[i % MATRIX_VIDEOS.length]);
    }

    /* ── on ended: flip to a different video at a random frame ── */
    const endedHandlers = videosRef.current.map((vid, i) => {
      const handler = () => flipCell(i, true);
      vid?.addEventListener('ended', handler);
      return handler;
    });

    /* ── one-shot reveal (edge → face) ── */
    function revealCell(i: number) {
      const cell = cellsRef.current[i];
      if (!cell || flippingRef.current[i]) return;
      flippingRef.current[i] = true;
      cell.style.transition = `transform ${FLIP_HALF_MS + 100}ms ease-out`;
      cell.style.transform = 'rotateY(0deg)';
      const t = setTimeout(() => { flippingRef.current[i] = false; }, FLIP_HALF_MS + 100);
      timers.push(t);
    }

    /* ── spotlight flip: fold → swap video → unfold ── */
    function flipCell(i: number, force = false) {
      const cell = cellsRef.current[i];
      if (!cell || flippingRef.current[i]) return;
      if (!force && performance.now() - lastFlipRef.current[i] < MIN_FLIP_INTERVAL_MS) return;
      flippingRef.current[i] = true;
      lastFlipRef.current[i] = performance.now();

      // Phase 1 — fold to edge (ease-in)
      cell.style.transition = `transform ${FLIP_HALF_MS}ms ease-in`;
      cell.style.transform = 'rotateY(90deg)';

      const t1 = setTimeout(() => {
        // Swap video at the invisible edge
        loadVideo(i, pickOther(srcRef.current[i]));

        // Jump to opposite edge without transition, then unfold
        cell.style.transition = 'none';
        cell.style.transform = 'rotateY(-90deg)';

        // Phase 2 — unfold from opposite edge (ease-out), next rAF
        const t2 = setTimeout(() => {
          cell.style.transition = `transform ${FLIP_HALF_MS}ms ease-out`;
          cell.style.transform = 'rotateY(0deg)';

          const t3 = setTimeout(() => { flippingRef.current[i] = false; }, FLIP_HALF_MS);
          timers.push(t3);
        }, 20);
        timers.push(t2);
      }, FLIP_HALF_MS);
      timers.push(t1);
    }

    /* ── staggered reveal from screen centre outward ── */
    const revealCols = getCols(window.innerWidth);
    const revealRows = Math.ceil(CELL_COUNT / revealCols);
    const cx = revealCols / 2;
    const cy = revealRows / 2;

    const revealOrder = Array.from({ length: CELL_COUNT }, (_, i) => ({
      i,
      dist: Math.hypot((i % revealCols) - cx, Math.floor(i / revealCols) - cy),
    }))
      .sort((a, b) => a.dist - b.dist || Math.random() - 0.5)
      .map((x) => x.i);

    revealOrder.forEach((cellIdx, order) => {
      const delay = 400 + order * REVEAL_STAGGER_MS + Math.random() * REVEAL_JITTER_MS;
      const t = setTimeout(() => revealCell(cellIdx), delay);
      timers.push(t);
    });

    /* ── spotlight animation loop ── */
    const startT = performance.now();
    let rafId: number;
    let lastProximityMs = 0;

    function tick() {
      const spotlight = spotlightRef.current;
      const grid = gridRef.current;
      if (!spotlight || !grid) { rafId = requestAnimationFrame(tick); return; }

      const elapsed = (performance.now() - startT) / 1000;
      const rect = grid.getBoundingClientRect();

      // Lissajous path — incommensurable frequencies fill the grid over ~2 min
      const xPct = 0.5 + 0.44 * Math.sin(elapsed * 0.17);
      const yPct = 0.5 + 0.40 * Math.cos(elapsed * 0.11);
      const x = xPct * rect.width;
      const y = yPct * rect.height;

      spotlight.style.transform = `translate(${x - 200}px, ${y - 200}px)`;

      // Proximity check at 250 ms intervals
      const now = performance.now();
      if (now - lastProximityMs > 250) {
        lastProximityMs = now;

        const cols = getCols(rect.width);
        const cellW = rect.width / cols;
        const cellH = rect.height / Math.ceil(CELL_COUNT / cols);
        const triggerR = Math.min(rect.width, rect.height) * SPOTLIGHT_RADIUS_RATIO;

        for (let i = 0; i < CELL_COUNT; i++) {
          if (flippingRef.current[i]) continue;

          const col = i % cols;
          const row = Math.floor(i / cols);
          if (Math.hypot(x - (col + 0.5) * cellW, y - (row + 0.5) * cellH) < triggerR) {
            flipCell(i, false);
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    // Start spotlight after initial reveals begin
    const tSpotlight = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 600);
    timers.push(tSpotlight);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
      timers.length = 0;
      videosRef.current.forEach((vid, i) => {
        vid?.removeEventListener('ended', endedHandlers[i]);
      });
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* 3D video grid */}
      <div ref={gridRef} className="vmx-grid absolute inset-0">
        {Array.from({ length: CELL_COUNT }, (_, i) => (
          <div key={i} ref={(el) => { cellsRef.current[i] = el; }} className="vmx-cell">
            <video
              ref={(el) => { videosRef.current[i] = el; }}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Moving spotlight */}
      <div ref={spotlightRef} className="vmx-spotlight absolute top-0 left-0" />

      {/* Base dark wash */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Vignette */}
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
