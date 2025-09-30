import * as React from 'react';
import Providers from 'src/providers';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import 'simplebar-react/dist/simplebar.min.css';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 60;

export async function generateMetadata() {
  const res = await fetch(`${baseUrl}/api/settings/general-settings`, {
    next: { revalidate: 60 }
  });

  const settings = await res.json();
  const data = settings?.data || {};
  const seo = data.mainSettings?.seo || {};

  return {
    title: seo.metaTitle || data.businessName,
    description: seo.metaDescription || seo.description || '',
    keywords: Array.isArray(seo.tags) ? seo.tags.join(', ') : '',
    icons: {
      icon: data.favicon?.url
    },
    openGraph: {
      title: seo.metaTitle || data.businessName || '',
      description: seo.metaDescription || seo.description || '',
      url: data.domainName || '',
      siteName: data.businessName || '',
      type: 'website',
      images: [data.logoLight?.url || data.logoDark?.url || data.favicon?.url]
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || data.businessName || '',
      description: seo.metaDescription || seo.description || '',
      images: [data.logoLight?.url || data.logoDark?.url || data.favicon?.url]
    }
  };
}

export default async function RootLayout({ children }) {
  const res = await fetch(`${baseUrl}/api/settings/general-settings`, { next: { revalidate: 60 } });
  const settings = await res.json();
  const gtmId = settings.data.systemSettings?.gtmId;
  const gaId = settings.data.systemSettings?.gaId;

  return (
    <html lang="en-US">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </head>
      <body>
        <Providers settings={settings?.data}>{children}</Providers>
      </body>
    </html>
  );
}