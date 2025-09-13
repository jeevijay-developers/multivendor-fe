// mui
import { Box, Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';
// Static generation with ISR
export const revalidate = 60;

// Base URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/api/child-categories-slugs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data?.map((child) => ({ childCategory: child.slug })) || [];
  } catch (e) {
    console.error('[products/[category]/[subCategory]/[childCategory]] generateStaticParams failed:', e?.message);
    return [];
  }
}

// // Generate metadata per brand
export async function generateMetadata({ params }) {
  if (!baseUrl) return { title: 'Products' };
  try {
    const { childCategory } = await params;
    const res = await fetch(`${baseUrl}/api/child-categories/${childCategory}`, { cache: 'force-cache' });
    if (!res.ok) return { title: 'Category Not Found' };
    const { data: child } = await res.json();
    if (!child) return { title: 'Category Not Found' };
    return {
      title: child.metaTitle || child.name,
      description: child.metaDescription || child.description || '',
      openGraph: {
        title: child.metaTitle || child.name,
        description: child.metaDescription || child.description || ''
      }
    };
  } catch (e) {
    console.error('[products/[category]/[subCategory]/[childCategory]] generateMetadata failed:', e?.message);
    return { title: 'Products' };
  }
}
export default async function Listing(props) {
  if (!baseUrl) return <div>API URL not configured. Set NEXT_PUBLIC_API_URL.</div>;
  let childCategoryData = null;
  let filters = [];
  let category, subCategory, childCategory;
  try {
    const params = await props.params;
    category = params.category;
    subCategory = params.subCategory;
    childCategory = params.childCategory;
    const res = await fetch(`${baseUrl}/api/child-categories/${childCategory}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const response = await res.json();
      if (response?.success) childCategoryData = response?.data;
    }
  } catch (e) {
    console.error('[products/[category]/[subCategory]/[childCategory]] category fetch failed:', e?.message);
  }
  try {
    const res2 = await fetch(`${baseUrl}/api/products/filters`, { next: { revalidate: 60 } });
    if (res2.ok) {
      const response2 = await res2.json();
      filters = response2?.data || [];
    }
  } catch (e) {
    console.error('[products/[category]/[subCategory]/[childCategory]] filters fetch failed:', e?.message);
  }
  if (!childCategoryData) {
    return (
      <Box>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading="Products"
            links={[{ name: 'Home', href: '/' }, { name: 'Products', href: '/products' }, { name: 'Not Found' }]}
          />
          <div>Category not found or unavailable.</div>
        </Container>
      </Box>
    );
  }
  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading={childCategoryData?.name}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: childCategoryData.subCategory?.parentCategory?.name, href: `/products/${category}` },
              { name: childCategoryData.subCategory?.name, href: `/products/${category}/${subCategory}` },
              { name: childCategoryData?.name }
            ]}
          />
          <ProductList childCategory={childCategoryData} filters={filters} />
        </Container>
      </Box>
    </Box>
  );
}
