'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: image drifts up slightly as you scroll
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Glow intensifies as the section enters viewport center
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 0.6, 0.6, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Ambient glow behind the frame */}
        <motion.div
          className="absolute -inset-x-20 -inset-y-10 pointer-events-none"
          style={{ opacity: glowOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(25_95%_53%/0.12),transparent_70%)]" />
        </motion.div>

        {/* Main screenshot frame */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div className="relative" style={{ y: imgY }}>
            {/* The screenshot with smoke-dissolve mask */}
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

              {/* Inner vignette overlay for depth */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_20px_hsl(0_0%_0%/0.5)]" />
            </div>

            {/* Smoke tendrils — animated pseudo-layers */}
            <div className="absolute -inset-4 pointer-events-none smoke-tendrils" aria-hidden="true">
              <div className="smoke-tendril smoke-tendril-1" />
              <div className="smoke-tendril smoke-tendril-2" />
              <div className="smoke-tendril smoke-tendril-3" />
              <div className="smoke-tendril smoke-tendril-4" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
