// app/products/[slug]/page.jsx or page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Box, Container, Stack } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductDetails from 'src/components/_main/product';
import ProductDetailTabs from 'src/components/_main/product/tabs';
import ProductAdditionalInfo from 'src/components/_main/product/additionalInfo';
import RelatedProductsCarousel from 'src/components/_main/product/relatedProducts';
import ProductContentCard from 'src/components/cards/productContentCard';
// Static generation with ISR
export const revalidate = 60;

// ✅ Base URL (set once for all fetches)
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ Generate all static paths at build
export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/api/products-slugs`, {
    next: { revalidate: 3600 } // Cache slug list for 1 hour
  });

  const { data } = await res.json();

  return (
    data?.map((product) => ({
      slug: product.slug
    })) || []
  );
}

// ✅ Generate metadata per product
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: 'force-cache' // Prefer cached
  });

  const { data: product } = await res.json();

  if (!product) return {};

  const images = product.images || [];

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
    keywords: product.tags || [],
    openGraph: {
      title: product.name,
      description: product.metaDescription,
      images: images.map((v) => ({ url: v.url }))
    }
  };
}

// ✅ Main page component
export default async function ProductDetail({ params }) {
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  const response = await res.json();

  if (!response?.success || !response?.data) {
    notFound(); // Show 404 page
  }

  const { data, totalRating, totalReviews, brand, category } = response;
  const isSimpleProduct = data?.type === 'simple';

  return (
    <Box>
      <Container maxWidth="xl">
        <Stack direction={'column'} gap={3}>
          <HeaderBreadcrumbs
            heading="Product Details"
            links={[{ name: 'Home', href: '/' }, { name: 'Products', href: '/products' }, { name: data?.name }]}
          />

          <ProductDetails
            data={data}
            brand={brand}
            slug={slug}
            category={category}
            totalRating={totalRating}
            totalReviews={totalReviews}
            isSimpleProduct={isSimpleProduct}
          />
          <ProductContentCard content={data.content} name={data.name} />

          <ProductDetailTabs
            product={{ description: data.content, _id: data._id }}
            totalRating={totalRating}
            totalReviews={totalReviews}
          />

          <ProductAdditionalInfo />

          <RelatedProductsCarousel id={data._id} category={category?.slug} />
        </Stack>
      </Container>
    </Box>
  );
}
