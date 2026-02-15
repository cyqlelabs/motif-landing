'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/landing/i18n';
import { Logo } from './logo';
import { ExplodingButton } from './exploding-button';

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.04, duration: 0.5, ease: easeOut },
  }),
};

function AnimatedWord({ text, className, startIndex = 0 }: { text: string; className?: string; startIndex?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] px-4 sm:px-6 text-center">
      <motion.div
        className="flex flex-col items-center gap-4 sm:gap-6 max-w-4xl"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}
        >
          <Logo className="w-20 h-20 sm:w-28 sm:h-28 text-primary" />
        </motion.div>

        <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.9] tracking-tighter">
          <AnimatedWord text="motif" />
          <AnimatedWord text=".ad" className="text-primary" startIndex={5} />
        </h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {t.hero.tagline}
        </motion.p>

        <motion.p
          className="mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {t.hero.headline}
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <ExplodingButton className="mt-2 sm:mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium px-8 sm:px-10 py-3 min-h-[48px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {t.hero.cta}
          </ExplodingButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
