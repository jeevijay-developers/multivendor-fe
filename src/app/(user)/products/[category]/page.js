// mui
import { Box, Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';
import Categories from 'src/components/_main/home/categories';

export const revalidate = 60;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/api/categories-slugs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data?.map((cat) => ({ category: cat.slug })) || [];
  } catch (e) {
    console.error('[products/[category]] generateStaticParams failed:', e?.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  if (!baseUrl) return { title: 'Products' };
  try {
    const { category } = await params;
    const res = await fetch(`${baseUrl}/api/categories/${category}`, { cache: 'force-cache' });
    if (!res.ok) return { title: 'Category Not Found' };
    const { data: currentCategory } = await res.json();
    if (!currentCategory) return { title: 'Category Not Found' };
    return {
      title: currentCategory.metaTitle || currentCategory.name,
      description: currentCategory.metaDescription || currentCategory.description || '',
      openGraph: {
        title: currentCategory.name,
        description: currentCategory.metaDescription || currentCategory.description || ''
      }
    };
  } catch (e) {
    console.error('[products/[category]] generateMetadata failed:', e?.message);
    return { title: 'Products' };
  }
}

export default async function Listing(props) {
  if (!baseUrl) return <div>API URL not configured. Set NEXT_PUBLIC_API_URL.</div>;
  let categoryData = null;
  let filters = [];
  let subCategories = [];
  let category;
  try {
    const params = await props.params;
    category = params.category;
    const res = await fetch(`${baseUrl}/api/categories/${category}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const response = await res.json();
      if (response?.success) {
        categoryData = response?.data;
        subCategories = categoryData?.subCategories || [];
      }
    }
  } catch (e) {
    console.error('[products/[category]] category fetch failed:', e?.message);
  }
  try {
    const res2 = await fetch(`${baseUrl}/api/products/filters`, { next: { revalidate: 60 } });
    if (res2.ok) {
      const response2 = await res2.json();
      filters = response2?.data || [];
    }
  } catch (e) {
    console.error('[products/[category]] filters fetch failed:', e?.message);
  }
  if (!categoryData) {
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
            heading={categoryData?.name}
            links={[{ name: 'Home', href: '/' }, { name: 'Products', href: '/products' }, { name: categoryData?.name }]}
          />
          {Boolean(subCategories.length) && <Categories data={subCategories || []} slug={category} />}
          <ProductList category={categoryData} filters={filters} />
        </Container>
      </Box>
    </Box>
  );
}
