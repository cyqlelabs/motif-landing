'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useI18n, type Translations } from '@/lib/landing/i18n';
import { useSectionActive } from './full-page-scroller';

const expo = [0.16, 1, 0.3, 1];

/*
  Reveals — each step card enters from a different direction:
  - Step 01: slides up from below
  - Step 02: scales in from center (zoom pop)
  - Step 03: slides down from above
  Number overlays stagger-fade independently.
*/

const cardReveals = [
  { y: 80, x: 0, scale: 0.9, rotate: 2 },   // from below, slight tilt
  { y: 0, x: 0, scale: 0.5, rotate: 0 },     // zoom pop from center
  { y: -80, x: 0, scale: 0.9, rotate: -2 },  // from above, slight tilt
];

function StepCard({
  step,
  index,
  isActive,
}: {
  step: Translations['workflow']['steps'][number];
  index: number;
  isActive: boolean;
}) {
  const reduced = useReducedMotion();
  const show = isActive && !reduced;
  const reveal = cardReveals[index] ?? cardReveals[0];

  return (
    <motion.div
      className="relative rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-8 flex flex-col gap-3 sm:gap-4"
      initial={{
        opacity: 0,
        y: reveal.y,
        x: reveal.x,
        scale: reveal.scale,
        rotate: reveal.rotate,
      }}
      animate={
        show
          ? { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
          : { opacity: 0, y: reveal.y, x: reveal.x, scale: reveal.scale, rotate: reveal.rotate }
      }
      transition={{ duration: 0.8, delay: 0.2 + index * 0.13, ease: expo }}
    >
      {/* Number — independent stagger fade + drift */}
      <motion.span
        className="text-4xl sm:text-5xl font-bold text-primary/20 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.45 + index * 0.13, ease: expo }}
      >
        {step.number}
      </motion.span>
      <motion.h3
        className="text-xl sm:text-2xl font-semibold"
        initial={{ opacity: 0, x: -20 }}
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.13, ease: expo }}
      >
        {step.title}
      </motion.h3>
      <motion.p
        className="text-muted-foreground text-sm leading-relaxed"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.6 + index * 0.13, ease: expo }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

export function WorkflowSection() {
  const { t } = useI18n();
  const isActive = useSectionActive();
  const reduced = useReducedMotion();
  const show = isActive && !reduced;

  return (
    <div className="flex items-center justify-center h-full px-4 sm:px-6">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          {/* Label — fades in from left */}
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium inline-block"
            initial={{ opacity: 0, x: -40 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: expo }}
          >
            {t.workflow.label}
          </motion.span>

          {/* Heading — clip reveal upward */}
          <motion.h2
            className="mt-4 text-3xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.08, ease: expo }}
          >
            {t.workflow.heading}
          </motion.h2>

          {/* Description — fades in from right */}
          <motion.p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.15, ease: expo }}
          >
            {t.workflow.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.workflow.steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} isActive={isActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
