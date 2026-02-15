'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 360,
    y: (Math.random() - 0.5) * 220,
    rotate: (Math.random() - 0.5) * 540,
    size: Math.random() * 8 + 3,
  }));
}

export function ExplodingButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [animating, setAnimating] = useState(false);
  const [tick, setTick] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- tick triggers fresh random particles per click
  const particles = useMemo(() => createParticles(18), [tick]);

  const handleClick = useCallback(() => {
    if (animating) return;
    setTick((t) => t + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1300);
  }, [animating]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.button
        className={cn(className, 'cursor-pointer')}
        onClick={handleClick}
        animate={
          animating
            ? { scale: [1, 1.08, 0, 0, 0, 0.9, 1], opacity: [1, 1, 0, 0, 0, 1, 1] }
            : { scale: 1, opacity: 1 }
        }
        transition={
          animating
            ? { duration: 1.3, times: [0, 0.06, 0.15, 0.4, 0.7, 0.88, 1], ease: 'easeInOut' }
            : { duration: 0.15 }
        }
      >
        {children}
      </motion.button>

      {animating &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-sm bg-primary pointer-events-none"
            style={{ width: p.size, height: p.size }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              x: [0, p.x, 0],
              y: [0, p.y, 0],
              scale: [1, 0.5, 0],
              opacity: [1, 0.85, 0],
              rotate: [0, p.rotate, 0],
            }}
            transition={{ duration: 1.1, times: [0, 0.4, 1], ease: 'easeInOut' }}
          />
        ))}
    </div>
  );
}
