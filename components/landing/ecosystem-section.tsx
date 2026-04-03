'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useI18n, type Translations } from '@/lib/landing/i18n';
import { useSectionActive } from './full-page-scroller';

const expo = [0.16, 1, 0.3, 1] as const;

/*
  Reveals — each feature card enters from a unique direction based on grid position:
  Row 1: top-left diagonal, straight down, top-right diagonal
  Row 2: left, scale-pop from center, right
  This creates a radial-burst pattern from the center of the grid.
*/

const cardDirections = [
  { x: -50, y: -40, rotate: -3 },   // top-left
  { x: 0, y: -60, rotate: 0 },      // top
  { x: 50, y: -40, rotate: 3 },     // top-right
  { x: -60, y: 0, rotate: -2 },     // left
  { x: 0, y: 0, rotate: 0 },        // center (scale only)
  { x: 60, y: 0, rotate: 2 },       // right
];

function FeatureCard({
  feature,
  index,
  isActive,
}: {
  feature: Translations['ecosystem']['features'][number];
  index: number;
  isActive: boolean;
}) {
  const reduced = useReducedMotion();
  const show = isActive && !reduced;
  const dir = cardDirections[index % cardDirections.length];
  const isCenter = index === 4;

  return (
    <motion.div
      className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6 flex flex-col gap-3"
      initial={{
        opacity: 0,
        x: dir.x,
        y: dir.y,
        scale: isCenter ? 0.5 : 0.85,
        rotate: dir.rotate,
      }}
      animate={
        show
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
          : {
              opacity: 0,
              x: dir.x,
              y: dir.y,
              scale: isCenter ? 0.5 : 0.85,
              rotate: dir.rotate,
            }
      }
      transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: expo }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <motion.h3
        className="text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.08, ease: expo }}
      >
        {feature.title}
      </motion.h3>
      <motion.p
        className="text-sm text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.08, ease: expo }}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
}

export function EcosystemSection() {
  const { t } = useI18n();
  const isActive = useSectionActive();
  const reduced = useReducedMotion();
  const show = isActive && !reduced;

  return (
    <div className="w-full px-4 sm:px-6 py-12 sm:py-8">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          {/* Label — rotates in from below */}
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium inline-block"
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            animate={show ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 20, rotate: 5 }}
            transition={{ duration: 0.6, ease: expo }}
          >
            {t.ecosystem.label}
          </motion.span>

          {/* Heading — scales down from large */}
          <motion.h2
            className="mt-4 text-3xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.7, delay: 0.08, ease: expo }}
          >
            {t.ecosystem.heading}
          </motion.h2>

          {/* Description — slides from left */}
          <motion.p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.15, ease: expo }}
          >
            {t.ecosystem.description}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.ecosystem.features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} isActive={isActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
