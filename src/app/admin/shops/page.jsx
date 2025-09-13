import React from 'react';

// components
import ShopList from 'src/components/_admin/shops/shopList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Products - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default async function AdminProducts() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Shops"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Shops'
          }
        ]}
      />
      <ShopList />
    </>
  );
}
