'use client';

import './landing.css';
import { I18nProvider } from '@/lib/landing/i18n';
import { AnimatedBg } from './animated-bg';
import { Nav } from './nav';
import { HeroSection } from './hero-section';
import { PartnershipSection } from './partnership-section';
import { WorkflowSection } from './workflow-section';
import { EcosystemSection } from './ecosystem-section';
import { Footer } from './footer';

export function LandingPage() {
  return (
    <I18nProvider>
      <div className="relative min-h-screen scroll-smooth">
        <AnimatedBg />
        <Nav />
        <main>
          <HeroSection />
          <PartnershipSection />
          <WorkflowSection />
          <EcosystemSection />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
