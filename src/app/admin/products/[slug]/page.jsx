import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditProduct from 'src/components/_admin/products/editProduct';

// api
import * as api from 'src/services';
export const dynamic = 'force-dynamic';

export default async function page(props) {
  const params = await props.params;
  const { data: categories } = await api.getAllCategories();
  const { data: brands } = await api.getAllBrandsByAdmin();
  const { data: shops } = await api.getAllShopsByAdmin();

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Edit Product"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Products',
            href: '/admin/products'
          },
          {
            name: 'Edit Product'
          }
        ]}
      />
      <EditProduct brands={brands} shops={shops} categories={categories} slug={params.slug} />
    </div>
  );
}
