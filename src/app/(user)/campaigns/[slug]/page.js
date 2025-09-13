// app/Campaigns/[slug]/page.tsx

import { Box, Container } from '@mui/material';
import ProductList from 'src/components/_main/products';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export const revalidate = 60;
export const dynamic = 'auto';
export const dynamicParams = true;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// Static paths
export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/api/campaigns-slugs`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) throw new Error('Failed to fetch slugs');

  const { data } = await res.json();
  return data?.map((campaign) => ({ slug: campaign.slug })) || [];
}

// Metadata
export async function generateMetadata({ params }) {
  const res = await fetch(`${baseUrl}/api/campaigns/${params.slug}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) return { title: 'Campaign Not Found' };

  const { data: campaign } = await res.json();

  return {
    title: campaign.metaTitle || campaign.name,
    description: campaign.metaDescription || campaign.description,
    openGraph: {
      title: campaign.metaTitle || campaign.name,
      description: campaign.metaDescription || campaign.description,
      images: campaign.cover?.url ? [campaign.cover.url] : []
    }
  };
}

// Page
export default async function Listing({ params }) {
  const { slug } = params;

  const res = await fetch(`${baseUrl}/api/campaigns/${slug}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) return <div>Campaign not found</div>;

  const { data: campaign } = await res.json();

  const res2 = await fetch(`${baseUrl}/api/products/filters`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  const response2 = await res2.json();

  const { data: filters } = response2;

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
