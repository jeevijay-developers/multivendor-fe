import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditProduct from 'src/components/_admin/products/editProduct';

// api
import * as api from 'src/services';
export const revalidate = 1;
export default async function page(props) {
  const params = await props.params;
  const { data: categories } = await api.getAllCategories();
  const { data: brands } = await api.getAllBrandsByAdmin();

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Edit Product"
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
            name: 'Edit Product'
          }
        ]}
      />
      <EditProduct brands={brands} categories={categories} slug={params.slug} isVendor />
    </div>
  );
}
