// app/brands/[slug]/page.jsx or page.tsx
import React from 'react';
// (notFound import removed because we now soft-fallback instead of throwing 404 during build)
import { Stack, Container } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';
// Static generation with ISR
export const revalidate = 60;

// Base URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/api/brands-slugs`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data?.map((brand) => ({ slug: brand.slug })) || [];
  } catch (e) {
    console.error('[brands/[slug]] generateStaticParams failed:', e?.message);
    return [];
  }
}

// Generate metadata per brand
export async function generateMetadata({ params }) {
  if (!baseUrl) return { title: 'Brand' };
  try {
    const { slug } = await params;
    const res = await fetch(`${baseUrl}/api/brands/${slug}`, { cache: 'force-cache' });
    if (!res.ok) return { title: 'Brand Not Found' };
    const { data: brand } = await res.json();
    if (!brand) return { title: 'Brand Not Found' };
    return {
      title: brand.metaTitle || brand.name,
      description: brand.metaDescription || brand.description,
      openGraph: {
        title: brand.name,
        description: brand.metaDescription || brand.description
      }
    };
  } catch (e) {
    console.error('[brands/[slug]] generateMetadata failed:', e?.message);
    return { title: 'Brand' };
  }
}

// Main page component
export default async function BrandDetail({ params }) {
  if (!baseUrl) {
    return <div>API URL not configured. Set NEXT_PUBLIC_API_URL.</div>;
  }
  let brand = null;
  let filters = [];
  try {
    const { slug } = await params;
    const res = await fetch(`${baseUrl}/api/brands/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const response = await res.json();
      if (response?.success) brand = response?.data;
    }
  } catch (e) {
    console.error('[brands/[slug]] brand fetch failed:', e?.message);
  }
  try {
    const res2 = await fetch(`${baseUrl}/api/products/filters`, { next: { revalidate: 60 } });
    if (res2.ok) {
      const response2 = await res2.json();
      filters = response2?.data || [];
    }
  } catch (e) {
    console.error('[brands/[slug]] filters fetch failed:', e?.message);
  }
  if (!brand) {
    return (
      <Container maxWidth="xl">
        <Stack gap={3}>
          <HeaderBreadcrumbs
            heading="Brands"
            links={[{ name: 'Home', href: '/' }, { name: 'Brands', href: '/brands' }, { name: 'Not Found' }]}
          />
          <div>Brand not found or unavailable.</div>
        </Stack>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <HeaderBreadcrumbs
          heading={brand?.name}
          links={[{ name: 'Home', href: '/' }, { name: 'Brands', href: '/brands' }, { name: brand?.name }]}
        />
        <ProductList brand={brand} filters={filters} />
      </Stack>
    </Container>
  );
}
