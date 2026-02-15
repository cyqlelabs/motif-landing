import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://motif.ad'),
  title: {
    default: 'Motif — Animation & Design Studio',
    template: '%s | Motif',
  },
  description:
    'A visual animation studio with a built-in AI creative partner. Design hands-on, collaborate with a specialized agent, and keep full creative control — the best of human creativity and AI expertise, together.',
  keywords: [
    'AI animation studio',
    'motion graphics',
    'AI motion design',
    'human AI collaboration',
    'animation agent',
    'motion design',
    'visual animation editor',
    'AI creative partner',
    'collaborative animation',
  ],
  authors: [{ name: 'Cyqle' }],
  creator: 'Cyqle',
  publisher: 'Cyqle',
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'Motif',
    title: 'Motif — Animation & Design Studio',
    description:
      'Create with AI, not through it. A visual animation studio where human creativity and AI expertise collaborate to produce broadcast-quality motion graphics.',
    url: 'https://motif.ad',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motif — Animation & Design Studio',
    description:
      'Create with AI, not through it. A visual animation studio where human creativity and AI expertise collaborate to produce broadcast-quality motion graphics.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: 'https://motif.ad' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
