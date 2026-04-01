import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/landing/logo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Motif — the visual animation studio.',
  alternates: { canonical: 'https://motif.ad/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              motif<span className="text-primary">.ad</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Effective date: April 1, 2026</p>
        </div>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Motif website and any associated services (collectively, the
              &quot;Service&quot;) operated by Cyqle (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">2. Description of Service</h2>
            <p>
              Motif is a visual animation studio combining a professional design editor with an AI
              creative partner. The Service is currently in pre-launch. Features and availability are
              subject to change without notice.
            </p>
            <p className="mt-3">
              Access to early versions of the Service may be limited to invited users or waitlist
              participants at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">3. Eligibility</h2>
            <p>
              You must be at least 13 years of age to use the Service. By using the Service, you
              represent that you meet this requirement and that you have the legal capacity to enter
              into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">4. User Accounts</h2>
            <p>
              When account functionality becomes available, you are responsible for maintaining the
              confidentiality of your credentials and for all activity that occurs under your account.
              You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">5. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 ml-2">
              <li>Violate any applicable law or regulation.</li>
              <li>Infringe the intellectual property rights of any third party.</li>
              <li>
                Generate, distribute, or promote content that is unlawful, harmful, threatening,
                abusive, defamatory, or otherwise objectionable.
              </li>
              <li>
                Attempt to reverse engineer, decompile, or extract the underlying models, algorithms,
                or source code of the Service.
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the Service or its
                infrastructure.
              </li>
              <li>
                Use automated means to scrape, crawl, or harvest data from the Service without our
                prior written consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content, software, trademarks, logos, and other materials associated with the
              Service are the property of Cyqle or its licensors and are protected by applicable
              intellectual property laws.
            </p>
            <p className="mt-3">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable,
              revocable license to access and use the Service for your personal or internal business
              purposes.
            </p>
            <p className="mt-3">
              You retain ownership of any original creative content you produce using the Service.
              You grant us a limited license to process and store your content solely as necessary to
              provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">7. AI-Generated Content</h2>
            <p>
              The Service uses AI models to assist in content creation. You are solely responsible
              for reviewing, editing, and ensuring that any AI-generated output complies with
              applicable laws and does not infringe third-party rights before publishing or
              distributing it.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              8. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind, either express or implied, including but not limited to
              warranties of merchantability, fitness for a particular purpose, or non-infringement.
              We do not warrant that the Service will be uninterrupted, error-free, or free of
              harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Cyqle and its affiliates, officers, employees,
              and licensors shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising out of or related to your use of the Service, even if we
              have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Service at any time,
              with or without cause or notice. Upon termination, all licenses granted to you under
              these Terms will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will post the revised Terms with an
              updated effective date. Continued use of the Service after changes are posted
              constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any
              disputes arising under these Terms shall be resolved through good-faith negotiation
              before seeking other remedies.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">13. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a
                href="mailto:hello@motif.ad"
                className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                hello@motif.ad
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 px-4 sm:px-6 py-6 mt-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Back to Motif
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>&copy; {new Date().getFullYear()} Cyqle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
