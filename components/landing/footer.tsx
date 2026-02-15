'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/landing/i18n';
import { Logo } from './logo';
import { ExplodingButton } from './exploding-button';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              motif<span className="text-primary">.ad</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            {t.footer.tagline}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {t.footer.links.map((link) =>
            link.href === '/studio' ? (
              <ExplodingButton
                key={link.href}
                className="hover:text-foreground transition-colors min-h-[44px] flex items-center text-sm text-muted-foreground bg-transparent"
              >
                {link.label}
              </ExplodingButton>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
