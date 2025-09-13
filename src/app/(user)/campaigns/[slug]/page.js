// app/Campaigns/[slug]/page.tsx

import { Box, Container } from '@mui/material';
import ProductList from 'src/components/_main/products';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export const revalidate = 60;
// Keep automatic dynamic/static decision, but if backend is often offline at build time,
// you can switch this to 'force-dynamic' to always fetch at request time:
export const dynamic = 'auto'; // or: 'force-dynamic'
export const dynamicParams = true;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// Static paths (tolerant of backend downtime)
export async function generateStaticParams() {
  // If no API base URL provided, skip pre-generation.
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/api/campaigns-slugs`, {
      // Keep a short revalidate so newly added campaigns appear reasonably soon
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      console.error('[campaigns/[slug]] generateStaticParams: bad status', res.status);
      return [];
    }
    const { data } = await res.json();
    return data?.map((campaign) => ({ slug: campaign.slug })) || [];
  } catch (err) {
    // Swallow network errors so build does not fail when API is offline
    console.error('[campaigns/[slug]] generateStaticParams fetch failed:', err?.message);
    return [];
  }
}

// Metadata
export async function generateMetadata({ params }) {
  if (!baseUrl) return { title: 'Campaign' };
  try {
    const res = await fetch(`${baseUrl}/api/campaigns/${params.slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return { title: 'Campaign Not Found' };
    const { data: campaign } = await res.json();
    return {
      title: campaign?.metaTitle || campaign?.name || 'Campaign',
      description: campaign?.metaDescription || campaign?.description || 'Campaign details',
      openGraph: {
        title: campaign?.metaTitle || campaign?.name || 'Campaign',
        description: campaign?.metaDescription || campaign?.description || 'Campaign details',
        images: campaign?.cover?.url ? [campaign.cover.url] : []
      }
    };
  } catch (err) {
    console.error('[campaigns/[slug]] generateMetadata fetch failed:', err?.message);
    return { title: 'Campaign' };
  }
}

// Page
export default async function Listing({ params }) {
  const { slug } = params;

  if (!baseUrl) {
    return <div>API URL not configured. Set NEXT_PUBLIC_API_URL.</div>;
  }

  let campaign = null;
  let filters = [];

  try {
    const res = await fetch(`${baseUrl}/api/campaigns/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      campaign = json?.data;
    }
  } catch (err) {
    console.error('[campaigns/[slug]] campaign fetch failed:', err?.message);
  }

  try {
    const res2 = await fetch(`${baseUrl}/api/products/filters`, { next: { revalidate: 60 } });
    if (res2.ok) {
      const response2 = await res2.json();
      filters = response2?.data || [];
    }
  } catch (err) {
    console.error('[campaigns/[slug]] filters fetch failed:', err?.message);
  }

  if (!campaign) {
    return (
      <Box>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading="Campaigns"
            links={[{ name: 'Home', href: '/' }, { name: 'Campaigns', href: '/campaigns' }, { name: 'Not Found' }]}
          />
          <div>Campaign not found or unavailable.</div>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading={campaign.name}
            links={[{ name: 'Home', href: '/' }, { name: 'Campaigns', href: '/campaigns' }, { name: campaign.name }]}
          />
          <ProductList campaign={campaign} filters={filters} />
        </Container>
      </Box>
    </Box>
  );
}
