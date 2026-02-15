'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';

const orbs = [
  {
    color: 'hsl(25, 95%, 53%)',
    size: 'w-[400px] h-[400px] md:w-[600px] md:h-[600px]',
    position: 'top-[10%] left-[15%]',
    animation: 'orb-float-1',
    duration: '18s',
  },
  {
    color: 'hsl(270, 70%, 50%)',
    size: 'w-[350px] h-[350px] md:w-[500px] md:h-[500px]',
    position: 'top-[50%] right-[10%]',
    animation: 'orb-float-2',
    duration: '22s',
  },
  {
    color: 'hsl(175, 60%, 45%)',
    size: 'w-[300px] h-[300px] md:w-[450px] md:h-[450px]',
    position: 'bottom-[15%] left-[30%]',
    animation: 'orb-float-3',
    duration: '20s',
  },
  {
    color: 'hsl(40, 90%, 55%)',
    size: 'w-[250px] h-[250px] md:w-[350px] md:h-[350px]',
    position: 'top-[30%] right-[35%]',
    animation: 'orb-float-4',
    duration: '25s',
  },
];

export function AnimatedBg() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxValues = [y1, y2, y3, y4];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(240_10%_8%)_0%,hsl(240_10%_3.9%)_70%)]" />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.position} rounded-full`}
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(100px)',
            animation: reducedMotion ? 'none' : `${orb.animation} ${orb.duration} ease-in-out infinite`,
            willChange: 'transform',
            y: reducedMotion ? 0 : parallaxValues[i],
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {!reducedMotion && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
            animation: 'grain-drift 8s steps(10) infinite',
          }}
        />
      )}
    </div>
  );
}
