import dynamic from 'next/dynamic';

const LandingPage = dynamic(
  () => import('@/components/landing/landing-page').then((m) => m.LandingPage),
  { ssr: false },
);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Cyqle',
      url: 'https://motif.ad',
      logo: 'https://motif.ad/favicon.svg',
    },
    {
      '@type': 'WebSite',
      name: 'Motif',
      url: 'https://motif.ad',
      description: 'A visual animation studio where human creativity and AI expertise collaborate.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Motif',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'A visual animation studio with a built-in AI creative partner. Design hands-on while a specialized agent accelerates your work — full creative control, broadcast-quality results.',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
