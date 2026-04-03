'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useSectionActive } from './full-page-scroller';

const expo = [0.16, 1, 0.3, 1] as const;

export function ProductShowcase() {
  const isActive = useSectionActive();
  const reduced = useReducedMotion();
  const show = isActive && !reduced;

  return (
    <div className="relative flex items-center justify-center h-full px-4 sm:px-6 overflow-hidden">
      <div className="relative max-w-6xl w-full mx-auto">
        {/* Ambient glow — scales in from nothing */}
        <motion.div
          className="absolute -inset-x-20 -inset-y-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={show ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 1.2, ease: expo, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(25_95%_53%/0.12),transparent_70%)]" />
        </motion.div>

        {/* Main screenshot — rises from below with scale */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 120, scale: 0.88 }}
          animate={
            show
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 120, scale: 0.88 }
          }
          transition={{ duration: 0.9, ease: expo, delay: 0.15 }}
        >
          <motion.div className="relative">
            <div className="screenshot-smoke-frame relative rounded-xl overflow-hidden">
              <Image
                src="/ss1.jpeg"
                alt="motif.ad video editor — scene composition with timeline, effects, and audio tracks"
                width={1920}
                height={1080}
                className="w-full h-auto block"
                priority={false}
                quality={90}
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_20px_hsl(0_0%_0%/0.5)]" />
            </div>

            {/* Smoke tendrils — fade in after the frame lands */}
            <motion.div
              className="absolute -inset-4 pointer-events-none"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={show ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="smoke-tendril smoke-tendril-1" />
              <div className="smoke-tendril smoke-tendril-2" />
              <div className="smoke-tendril smoke-tendril-3" />
              <div className="smoke-tendril smoke-tendril-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
