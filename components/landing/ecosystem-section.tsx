'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { useI18n, type Translations } from '@/lib/landing/i18n';

function FeatureCard({ feature, index }: { feature: Translations['ecosystem']['features'][number]; index: number }) {
  return (
    <motion.div
      className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6 flex flex-col gap-3"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <h3 className="text-lg font-semibold">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function EcosystemSection() {
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
            {t.ecosystem.label}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            {t.ecosystem.heading}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.ecosystem.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.ecosystem.features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-6">{t.ecosystem.changelog.title}</h3>
          <div className="space-y-4">
            {t.ecosystem.changelog.entries.map((entry, i) => (
              <motion.div
                key={entry.version}
                className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border/50 bg-card/30 px-4 sm:px-5 py-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Badge variant="secondary" className="shrink-0 font-mono text-xs">
                  v{entry.version}
                </Badge>
                <span className="text-sm text-muted-foreground">{entry.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
