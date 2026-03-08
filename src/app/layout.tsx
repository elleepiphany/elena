import type { Metadata } from 'next';
import { cormorantGaramond, jost, jetbrainsMono } from '@/lib/fonts';
import { siteConfig } from '@/lib/constants';
import { Navigation } from '@/components/layout/Navigation';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import './globals.css';

// Note: Safira March is loaded separately when the font files are available
// For now, the fallback serif in --font-display will be used

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${cormorantGaramond.variable}
          ${jost.variable}
          ${jetbrainsMono.variable}
          antialiased
        `}
      >
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <Navigation />
        <main id="main-content">
          {children}
        </main>

        <GrainOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
