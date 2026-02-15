'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useI18n, type Translations } from '@/lib/landing/i18n';

function ComparisonCard({ card, index }: { card: Translations['partnership']['cards'][number]; index: number }) {
  const isBefore = card.side === 'before';

  return (
    <motion.div
      className={cn(
        'rounded-2xl border p-5 sm:p-8 flex flex-col gap-4 sm:gap-5',
        isBefore
          ? 'bg-muted/30 border-border/50 text-muted-foreground'
          : 'bg-primary/5 border-primary/20',
      )}
      initial={{ opacity: 0, x: isBefore ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className={cn('text-xl font-semibold', !isBefore && 'text-foreground')}>
        {card.title}
      </h3>
      <ul className="space-y-3">
        {card.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className={cn('mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0', isBefore ? 'bg-muted-foreground/40' : 'bg-primary')} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            {t.partnership.label}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            {t.partnership.heading}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.partnership.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.partnership.cards.map((card, i) => (
            <ComparisonCard key={card.side} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
