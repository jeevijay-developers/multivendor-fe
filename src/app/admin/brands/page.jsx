import React from 'react';

// Components
import BrandList from 'src/components/_admin/brands/brandList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Brands - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function Brands() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Brands"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Brands'
          }
        ]}
        action={{
          href: `/admin/brands/add`,
          title: 'Add brand'
        }}
      />
      <BrandList />
    </>
  );
}
