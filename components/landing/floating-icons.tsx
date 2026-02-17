'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/* ── gradient defs (Instagram) ── */

function GradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="fi-ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── creative asset icons (input side) ── */

function ImageAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#4ADE80" />
      <circle cx="17" cy="19" r="4" fill="#FDE68A" />
      <path d="M4 32l12-10 8 6 10-8 10 8v6a12 12 0 01-12 6H16a12 12 0 01-12-6v-2z" fill="#16A34A" />
    </svg>
  );
}

function VideoAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FB923C" />
      <path d="M20 16l14 8-14 8V16z" fill="#fff" />
    </svg>
  );
}

function TextAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#38BDF8" />
      <rect x="11" y="13" width="26" height="3" rx="1.5" fill="#fff" />
      <rect x="11" y="20" width="20" height="3" rx="1.5" fill="#fff" opacity="0.8" />
      <rect x="11" y="27" width="24" height="3" rx="1.5" fill="#fff" opacity="0.6" />
      <rect x="11" y="34" width="14" height="3" rx="1.5" fill="#fff" opacity="0.4" />
    </svg>
  );
}

function ShapeAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#C084FC" />
      <circle cx="20" cy="28" r="9" fill="#E9D5FF" />
      <polygon points="28,10 38,28 18,28" fill="#A855F7" />
    </svg>
  );
}

function BrushAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F472B6" />
      <path d="M12 36c4-8 10-14 16-20 3-3 7-5 8-4s-1 5-4 8c-6 6-12 12-18 17-1 1-3 0-2-1z" fill="#fff" />
      <circle cx="34" cy="14" r="3" fill="#FFF" opacity="0.6" />
    </svg>
  );
}

function CameraAsset({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#2DD4BF" />
      <rect x="8" y="18" width="32" height="20" rx="4" fill="#fff" />
      <circle cx="24" cy="28" r="6" fill="#2DD4BF" />
      <circle cx="24" cy="28" r="3" fill="#fff" />
      <rect x="18" y="13" width="12" height="7" rx="2" fill="#fff" />
    </svg>
  );
}

const assetComponents: Record<string, React.ComponentType<{ size: number }>> = {
  image: ImageAsset,
  video: VideoAsset,
  text: TextAsset,
  shape: ShapeAsset,
  brush: BrushAsset,
  camera: CameraAsset,
};

/* ── social platform icons (output side) ── */

function Instagram({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="url(#fi-ig)" />
      <rect x="10" y="10" width="28" height="28" rx="8" stroke="#fff" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="7" stroke="#fff" strokeWidth="2" fill="none" />
      <circle cx="34" cy="14" r="2" fill="#fff" />
    </svg>
  );
}

function TikTok({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#010101" />
      <path d="M21 13h4a6 6 0 005 5v4a10 10 0 01-5-1.5v9a8 8 0 11-7-7.9v4.4a4 4 0 103 3.8V13z" fill="#25F4EE" />
      <path d="M22 12h4a6 6 0 005 5v4a10 10 0 01-5-1.5v9a8 8 0 11-7-7.9v4.4a4 4 0 103 3.8V12z" fill="#FE2C55" opacity="0.75" />
    </svg>
  );
}

function XIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#000" />
      <path d="M28 22l9-10h-2l-8 9-6-9h-8l9 13-9 11h2l8-10 7 10h8l-10-14zm-3 3l-1-1.3L17 14h3l5.5 8 1 1.3L35 34h-3l-7-9z" fill="#fff" />
    </svg>
  );
}

function Facebook({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#1877F2" />
      <path d="M29 25.5l.75-5H25v-3.2c0-1.4.67-2.7 2.8-2.7H30v-4.3s-1.8-.3-3.6-.3c-3.7 0-6.1 2.3-6.1 6.3v3.8h-4.1v5h4.1V38h5V25.5h3.7z" fill="#fff" />
    </svg>
  );
}

function YouTube({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FF0000" />
      <path d="M20 17l12 7-12 7V17z" fill="#fff" />
    </svg>
  );
}

function LinkedIn({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0A66C2" />
      <path d="M16 20h4v14h-4V20zm2-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4 6h4v2c.6-1 2-2.5 4.5-2.5 4.5 0 5.5 2.7 5.5 6.5v8h-4v-7c0-1.8 0-4-2.5-4s-3 1.8-3 3.8V34h-4V20z" fill="#fff" />
    </svg>
  );
}

function Snapchat({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FFFC00" />
      <path d="M24 12c-3.3 0-6 2.8-6 6.5v3c-1 .3-1.8.8-1.8 1.5 0 .7 1 1.1 1.8 1.1-.5 2-2 3.5-4 4.5.3.5 1 1 2 1.2l1.5.3c.5 1.2 1.5 2 3 2 1.3 0 2-.5 3.5-.5s2.2.5 3.5.5c1.5 0 2.5-.8 3-2l1.5-.3c1-.2 1.7-.7 2-1.2-2-1-3.5-2.5-4-4.5.8 0 1.8-.4 1.8-1.1 0-.7-.8-1.2-1.8-1.5v-3c0-3.7-2.7-6.5-6-6.5z" fill="#fff" />
    </svg>
  );
}

function Pinterest({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E60023" />
      <path d="M24 10c-7.7 0-14 6.3-14 14 0 5.6 3.3 10.4 8 12.6-.1-1-.2-2.5 0-3.6l1.4-6s-.3-.7-.3-1.7c0-1.6.9-2.8 2-2.8 1 0 1.5.7 1.5 1.6 0 1-.7 2.4-1 3.7-.3 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-1.9-4.6-4.6-4.6-3.2 0-5 2.4-5 4.9 0 1 .3 2 .8 2.5.1.1.1.2.1.3l-.3 1.1c0 .2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.5-6.9 4 0 7 2.8 7 6.6 0 4-2.5 7.1-6 7.1-1.1 0-2.2-.6-2.5-1.3l-.7 2.7c-.3 1-1 2.1-1.4 2.8 1.1.3 2.2.5 3.4.5 7.7 0 14-6.3 14-14S31.7 10 24 10z" fill="#fff" />
    </svg>
  );
}

const iconComponents: Record<string, React.ComponentType<{ size: number }>> = {
  instagram: Instagram,
  tiktok: TikTok,
  x: XIcon,
  facebook: Facebook,
  youtube: YouTube,
  linkedin: LinkedIn,
  snapchat: Snapchat,
  pinterest: Pinterest,
};

/* ── stream configuration ── */

interface StreamItem {
  asset: string;
  icon: string;
  size: number;
  y: number;
  speed: number;
  delay: number;
  wave: 'sm' | 'md' | 'lg';
  opacity: number;
}

const streams: StreamItem[] = [
  { asset: 'image',  icon: 'instagram', size: 40, y: 43, speed: 18, delay: 0,  wave: 'md', opacity: 0.45 },
  { asset: 'video',  icon: 'facebook',  size: 44, y: 56, speed: 20, delay: 1,  wave: 'md', opacity: 0.4  },
  { asset: 'camera', icon: 'linkedin',  size: 30, y: 60, speed: 24, delay: 2,  wave: 'sm', opacity: 0.3  },
  { asset: 'video',  icon: 'tiktok',    size: 34, y: 53, speed: 22, delay: 3,  wave: 'lg', opacity: 0.35 },
  { asset: 'shape',  icon: 'tiktok',    size: 42, y: 39, speed: 14, delay: 4,  wave: 'sm', opacity: 0.4  },
  { asset: 'video',  icon: 'youtube',   size: 38, y: 48, speed: 15, delay: 5,  wave: 'sm', opacity: 0.45 },
  { asset: 'text',   icon: 'youtube',   size: 36, y: 44, speed: 20, delay: 6,  wave: 'md', opacity: 0.35 },
  { asset: 'brush',  icon: 'x',         size: 32, y: 41, speed: 17, delay: 7,  wave: 'lg', opacity: 0.35 },
  { asset: 'image',  icon: 'instagram', size: 30, y: 57, speed: 23, delay: 8,  wave: 'lg', opacity: 0.3  },
  { asset: 'text',   icon: 'snapchat',  size: 36, y: 45, speed: 19, delay: 9,  wave: 'md', opacity: 0.4  },
  { asset: 'shape',  icon: 'facebook',  size: 32, y: 47, speed: 21, delay: 10, wave: 'lg', opacity: 0.35 },
  { asset: 'image',  icon: 'pinterest', size: 28, y: 50, speed: 16, delay: 11, wave: 'lg', opacity: 0.35 },
  { asset: 'brush',  icon: 'x',         size: 38, y: 52, speed: 16, delay: 12, wave: 'sm', opacity: 0.35 },
  { asset: 'camera', icon: 'snapchat',  size: 34, y: 55, speed: 17, delay: 14, wave: 'md', opacity: 0.35 },
];

const BASE_DELAY = 0.3;

/* ── JS-driven positioning + vortex physics ──
 *
 * ALL positioning is computed in JS (no CSS icon-stream / icon-wave).
 * This puts natural path and vortex path in the same coordinate space,
 * so lerp-blending actually converges items to a shared center.
 *
 * CSS only handles: asset-morph / icon-morph (visual transformation).
 */

const VORTEX_SPEED = 22;
const VORTEX_RADIUS = 65;
const CENTER_X_PCT = 0.50;
const CENTER_Y_PCT = 0.47;
const PULL_START = 0.34;
const FULL_VORTEX_START = 0.42;
const FULL_VORTEX_END = 0.58;
const PULL_END = 0.66;

const WAVE_AMP: Record<string, number> = { sm: 15, md: 30, lg: 50 };

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function streamX(progress: number, vw: number): number {
  const startX = -60;
  const cx = vw / 2;
  const endX = vw + 60;

  if (progress <= 0.44) {
    const t = progress / 0.44;
    const eased = t * t;
    return lerp(startX, cx - 10, eased);
  } else if (progress <= 0.56) {
    const t = (progress - 0.44) / 0.12;
    return lerp(cx - 10, cx + 10, t);
  } else {
    const t = (progress - 0.56) / 0.44;
    const eased = 1 - (1 - t) * (1 - t) * (1 - t);
    return lerp(cx + 10, endX, eased);
  }
}

function vortexWeight(progress: number): number {
  if (progress < PULL_START || progress > PULL_END) return 0;
  if (progress >= FULL_VORTEX_START && progress <= FULL_VORTEX_END) return 1;
  if (progress < FULL_VORTEX_START) {
    return smoothstep((progress - PULL_START) / (FULL_VORTEX_START - PULL_START));
  }
  return smoothstep(1 - (progress - FULL_VORTEX_END) / (PULL_END - FULL_VORTEX_END));
}

/* ── component ── */

export function FloatingIcons() {
  const reducedMotion = useReducedMotion();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    startRef.current = performance.now();
    let frame: number;

    function tick() {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const vortexAngle = elapsed * VORTEX_SPEED;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = CENTER_X_PCT * vw;
      const cy = CENTER_Y_PCT * vh;

      for (let i = 0; i < streams.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const item = streams[i];
        const totalDelay = BASE_DELAY + item.delay;
        const itemTime = elapsed - totalDelay;

        if (itemTime < 0) {
          el.style.visibility = 'hidden';
          continue;
        }

        el.style.visibility = 'visible';

        const progress = (itemTime % item.speed) / item.speed;

        const natX = streamX(progress, vw);
        const waveSpeed = item.speed / 3.5;
        const wavePhase = (itemTime % waveSpeed) / waveSpeed;
        const waveY = -WAVE_AMP[item.wave] * Math.sin(wavePhase * Math.PI * 2);
        const natY = (item.y / 100) * vh + waveY;

        const w = vortexWeight(progress);

        if (w === 0) {
          el.style.transform = `translate(${natX.toFixed(1)}px,${natY.toFixed(1)}px)`;
          continue;
        }

        const phase = (i / streams.length) * Math.PI * 2;
        const angle = vortexAngle + phase;

        const distFromCenter = Math.abs(progress - 0.50) / 0.16;
        const spiralRadius = VORTEX_RADIUS * lerp(0.12, 1, Math.min(1, distFromCenter));

        const vortexX = cx + spiralRadius * Math.cos(angle);
        const vortexY = cy + spiralRadius * Math.sin(angle);

        const finalX = lerp(natX, vortexX, w);
        const finalY = lerp(natY, vortexY, w);

        el.style.transform = `translate(${finalX.toFixed(1)}px,${finalY.toFixed(1)}px)`;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <GradientDefs />
      {streams.map((item, i) => {
        const Asset = assetComponents[item.asset];
        const Icon = iconComponents[item.icon];
        const totalDelay = BASE_DELAY + item.delay;

        return (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute top-0 left-0"
            style={{
              visibility: 'hidden',
              willChange: 'transform',
            }}
          >
            <div className="relative" style={{ width: item.size, height: item.size, opacity: item.opacity }}>
              <div
                style={{
                  animation: `asset-morph ${item.speed}s linear ${totalDelay}s infinite backwards`,
                }}
              >
                <Asset size={item.size} />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  animation: `icon-morph ${item.speed}s linear ${totalDelay}s infinite backwards`,
                }}
              >
                <Icon size={item.size} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
