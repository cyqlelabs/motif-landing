'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useI18n, type Locale } from '@/lib/landing/i18n';
import { Logo } from './logo';
import { ExplodingButton } from './exploding-button';

const localeLabels: Record<Locale, string> = { en: 'EN', es: 'ES' };
const localeOrder: Locale[] = ['en', 'es'];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { locale, t, setLocale } = useI18n();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      initial={{ y: -100 }}
      animate={visible ? { y: 0 } : { y: -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-border/50" />
      <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight">
        <Logo className="w-7 h-7 text-primary" />
        <span>motif<span className="text-primary">.ad</span></span>
      </Link>
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground" role="group" aria-label="Language">
          {localeOrder.map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-1.5 py-0.5 rounded transition-colors ${l === locale ? 'text-foreground font-medium' : 'hover:text-foreground'}`}
              aria-pressed={l === locale}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
        <ExplodingButton className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium h-9 px-3 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {t.nav.cta}
        </ExplodingButton>
      </div>
    </motion.header>
  );
}
