'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n, type Translations } from '@/lib/landing/i18n';

function StepCard({ step, index }: { step: Translations['workflow']['steps'][number]; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-8 flex flex-col gap-3 sm:gap-4"
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="text-4xl sm:text-5xl font-bold text-primary/20 font-mono">{step.number}</span>
      <h3 className="text-xl sm:text-2xl font-semibold">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export function WorkflowSection() {
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
            {t.workflow.label}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            {t.workflow.heading}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.workflow.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.workflow.steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
