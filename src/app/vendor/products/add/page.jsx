import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddProduct from 'src/components/_admin/products/addProduct';

// api
import * as api from 'src/services';
export const revalidate = 1;
export default async function page() {
  const data1 = await api.getAllCategories();
  const data2 = await api.getAllBrandsByAdmin();
  if (!data1 && data2) {
    notFound();
  }
  const { data: categories } = data1;
  const { data: brands } = data2;

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Product"
        links={[
          {
            name: 'Dashboard',
            href: '/vendor/dashboard'
          },
          {
            name: 'Products',
            href: '/vendor/products'
          },
          {
            name: 'Add Product'
          }
        ]}
      />
      <AddProduct brands={brands} categories={categories} isVendor />
    </div>
  );
}
