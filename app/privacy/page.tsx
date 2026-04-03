import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/landing/logo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Motif — the visual animation studio.',
  alternates: { canonical: 'https://motif.ad/privacy' },
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: April 1, 2026</p>
        </div>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">1. Overview</h2>
            <p>
              CyqleLabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Motif website
              and service (&quot;Service&quot;). This Privacy Policy explains what information we
              collect, how we use it, and your rights regarding your data. By using the Service, you
              agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              2. Information We Collect
            </h2>

            <h3 className="text-foreground text-base font-medium mt-5 mb-2">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-foreground/80">Email address</strong> — when you join the
                waitlist or contact us.
              </li>
              <li>
                <strong className="text-foreground/80">Account details</strong> — name and
                credentials when account functionality becomes available.
              </li>
              <li>
                <strong className="text-foreground/80">Communications</strong> — any messages or
                feedback you send us.
              </li>
            </ul>

            <h3 className="text-foreground text-base font-medium mt-5 mb-2">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-foreground/80">Usage data</strong> — pages visited,
                features used, and interactions within the Service.
              </li>
              <li>
                <strong className="text-foreground/80">Device and browser data</strong> — IP
                address, browser type, operating system, and referring URLs.
              </li>
              <li>
                <strong className="text-foreground/80">Cookies and local storage</strong> — used to
                remember preferences such as language selection.
              </li>
            </ul>

            <h3 className="text-foreground text-base font-medium mt-5 mb-2">
              2.3 Content You Create
            </h3>
            <p>
              When you use the Service to create animations or other content, we may process that
              content to deliver the Service. We do not use your creative content to train our AI
              models without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 ml-2">
              <li>Provide, operate, and improve the Service.</li>
              <li>Send you product updates, announcements, and early-access invitations.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Monitor and analyze usage trends to enhance user experience.</li>
              <li>Detect and prevent fraud, abuse, or security incidents.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We will only send you marketing communications if you have opted in or where otherwise
              permitted by applicable law. You can opt out at any time using the unsubscribe link in
              any email we send.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              4. Cookies and Local Storage
            </h2>
            <p>
              We use cookies and browser local storage for essential functionality (e.g., session
              management) and preference storage (e.g., language selection stored under the key{' '}
              <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">motif-lang</code>).
            </p>
            <p className="mt-3">
              We may use third-party analytics tools that set their own cookies. You can control
              cookies through your browser settings; note that disabling cookies may affect Service
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 ml-2">
              <li>
                <strong className="text-foreground/80">Service providers</strong> — trusted vendors
                who process data on our behalf (e.g., hosting, email delivery, analytics) under
                contractual confidentiality obligations.
              </li>
              <li>
                <strong className="text-foreground/80">Legal requirements</strong> — when required
                by law, court order, or to protect the rights and safety of users or the public.
              </li>
              <li>
                <strong className="text-foreground/80">Business transfers</strong> — in connection
                with a merger, acquisition, or sale of assets, with appropriate notice to you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to provide the Service and
              fulfill the purposes described in this policy, or as required by law. Waitlist email
              addresses are retained until you unsubscribe or request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">7. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your
              information against unauthorized access, loss, or misuse. However, no method of
              transmission over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">8. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, delete, or
              restrict processing of your personal data, as well as the right to data portability
              and to withdraw consent where processing is based on consent.
            </p>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a
                href="mailto:hello@motif.ad"
                className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                hello@motif.ad
              </a>
              . We will respond within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              9. International Transfers
            </h2>
            <p>
              Your information may be transferred to and processed in countries other than your own.
              Where required, we ensure appropriate safeguards are in place in accordance with
              applicable data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              10. Children&apos;s Privacy
            </h2>
            <p>
              The Service is not directed to children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have inadvertently collected
              such information, please contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by posting the new policy with an updated effective date. Continued use of the
              Service after changes are posted constitutes your acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold mb-3">12. Contact</h2>
            <p>
              For questions, concerns, or data requests related to this Privacy Policy, contact us
              at{' '}
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
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <span>&copy; {new Date().getFullYear()} CyqleLabs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
