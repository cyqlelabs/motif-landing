'use client';

import './landing.css';
import { I18nProvider } from '@/lib/landing/i18n';
import { AnimatedBg } from './animated-bg';
import { Nav } from './nav';
import { HeroSection } from './hero-section';
import { PartnershipSection } from './partnership-section';
import { WorkflowSection } from './workflow-section';
import { ProductShowcase } from './product-showcase';
import { EcosystemSection } from './ecosystem-section';
import { Footer } from './footer';
import { FullPageScroller } from './full-page-scroller';

export function LandingPage() {
  return (
    <I18nProvider>
      <AnimatedBg />
      <FullPageScroller overlay={<Nav />}>
        {[
          <HeroSection key="hero" />,
          <ProductShowcase key="product" />,
          <PartnershipSection key="partnership" />,
          <WorkflowSection key="workflow" />,
          <div key="ecosystem-footer" className="fp-section-scrollable">
            <div className="min-h-full flex flex-col">
              <div className="flex-1 flex items-start md:items-center pt-16 md:pt-0">
                <EcosystemSection />
              </div>
              <Footer />
            </div>
          </div>,
        ]}
      </FullPageScroller>
    </I18nProvider>
  );
}
