// Remove 'use client' — this is now a Server Component

import { Container } from '@mui/material';

// Components
import Hero from 'src/components/_main/home/hero';
import WhyUs from 'src/components/_main/home/whyUs';
import TopBanners from 'src/components/_main/home/topBanners';
import Categories from 'src/components/_main/home/categories';
import BestSellingProducs from 'src/components/_main/home/bestSelling';
import Brands from 'src/components/_main/home/brands';
import TopCollection from 'src/components/_main/home/top';
import Shops from 'src/components/_main/home/shop';
import Campaigns from 'src/components/_main/home/campaign';
import Testimonials from 'src/components/_main/home/testimonials';
import FeaturedProducts from 'src/components/_main/home/featured';
import WomanEmpowerSection from 'src/components/_main/home/womanEmpower';
// const SubscriptionModal = dynamic(() => import('src/components/_main/home/subscription'), { ssr: false });

// API services (direct fetch here or via service layer)
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function IndexPage() {
  // Fetch all home data in parallel
  const [
    bannersRes,
    categoriesRes,
    bestSellingRes,
    campaignsRes,
    topRatedRes,
    featuredRes,
    brandsRes,
    shopsRes,
    reviewsRes
  ] = await Promise.all([
    fetch(`${baseUrl}/api/home/home-banners`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/categories`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/products/best-selling`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/campaigns?limit=4`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/products/top`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/products/featured`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/brands`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/shops?limit=8`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/home/reviews?limit=8`, { next: { revalidate: 60 } })
  ]);

  const [
    banners,
    categories,
    bestSellingProducts,
    campaigns,
    topRatedProducts,
    featuredProducts,
    brands,
    shops,
    reviews
  ] = await Promise.all([
    bannersRes.json(),
    categoriesRes.json(),
    bestSellingRes.json(),
    campaignsRes.json(),
    topRatedRes.json(),
    featuredRes.json(),
    brandsRes.json(),
    shopsRes.json(),
    reviewsRes.json()
  ]);

  return (
    <>
      <Container maxWidth="xl">
        <Hero data={shops?.data || []} banners={banners?.data || []} />
      </Container>

      <TopBanners banners={banners?.data} />

      <Container maxWidth="xl">
        <WhyUs />
        <Categories data={categories?.data || []} isHome />
        <BestSellingProducs data={bestSellingProducts?.data || []} />
        <Campaigns data={campaigns?.data || []} />
      </Container>

      <Container maxWidth="xl">
        <TopCollection data={topRatedProducts?.data || []} />
        <Shops /> {/* Assuming shops are static or load separately */}
        <FeaturedProducts data={featuredProducts?.data || []} />
      </Container>
      
      <Container maxWidth="xl">
      {/* Woman Empowerment Section */}
      <WomanEmpowerSection />
      </Container>
      
      {Boolean(reviews?.data.length) && <Testimonials data={reviews?.data} />}

      <Container maxWidth="xl">
        <Brands data={brands?.data || []} />
      </Container>

      {/* <SubscriptionModal /> */}
    </>
  );
}
