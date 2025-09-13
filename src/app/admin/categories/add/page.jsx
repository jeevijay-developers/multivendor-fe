import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddCategory from 'src/components/_admin/categories/parent/addCategory';

// Meta information
export const metadata = {
  title: 'Add Categories - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Category"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Categories',
            href: '/admin/categories'
          },
          {
            name: 'Add Category'
          }
        ]}
      />
      <AddCategory />
    </div>
  );
}
