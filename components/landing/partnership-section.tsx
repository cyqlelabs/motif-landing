'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useI18n, type Translations } from '@/lib/landing/i18n';
import { useSectionActive } from './full-page-scroller';

const expo = [0.16, 1, 0.3, 1] as const;

/*
  Reveals:
  - Label: drops from top
  - Heading: fades in + scales
  - Description: slides from right
  - Before card: flies in from left with rotation
  - After card: flies in from right with rotation
*/

function ComparisonCard({
  card,
  index,
  isActive,
}: {
  card: Translations['partnership']['cards'][number];
  index: number;
  isActive: boolean;
}) {
  const isBefore = card.side === 'before';
  const reduced = useReducedMotion();
  const show = isActive && !reduced;

  return (
    <motion.div
      className={cn(
        'rounded-2xl border p-5 sm:p-8 flex flex-col gap-4 sm:gap-5',
        isBefore
          ? 'bg-muted/30 border-border/50 text-muted-foreground'
          : 'bg-primary/5 border-primary/20',
      )}
      initial={{ opacity: 0, x: isBefore ? -120 : 120, rotateY: isBefore ? 12 : -12 }}
      animate={
        show
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: isBefore ? -120 : 120, rotateY: isBefore ? 12 : -12 }
      }
      transition={{ duration: 0.8, delay: 0.35 + index * 0.15, ease: expo }}
      style={{ perspective: 800 }}
    >
      <h3 className={cn('text-xl font-semibold', !isBefore && 'text-foreground')}>
        {card.title}
      </h3>
      <ul className="space-y-3">
        {card.items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            initial={{ opacity: 0, x: isBefore ? -30 : 30 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: isBefore ? -30 : 30 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.15 + i * 0.07, ease: expo }}
          >
            <span
              className={cn(
                'mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0',
                isBefore ? 'bg-muted-foreground/40' : 'bg-primary',
              )}
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PartnershipSection() {
  const { t } = useI18n();
  const isActive = useSectionActive();
  const reduced = useReducedMotion();
  const show = isActive && !reduced;

  return (
    <div className="flex items-center justify-center h-full px-4 sm:px-6">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          {/* Label drops from above */}
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium inline-block"
            initial={{ opacity: 0, y: -30 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: expo }}
          >
            {t.partnership.label}
          </motion.span>

          {/* Heading scales up */}
          <motion.h2
            className="mt-4 text-3xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.7, delay: 0.1, ease: expo }}
          >
            {t.partnership.heading}
          </motion.h2>

          {/* Description slides from right */}
          <motion.p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: 60 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, delay: 0.2, ease: expo }}
          >
            {t.partnership.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
          {t.partnership.cards.map((card, i) => (
            <ComparisonCard key={card.side} card={card} index={i} isActive={isActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
