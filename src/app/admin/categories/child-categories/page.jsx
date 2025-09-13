import React from 'react';

// components
import ChildCategoryList from 'src/components/_admin/categories/child/categoryList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// apo
import * as api from 'src/services';

// Meta information
export const metadata = {
  title: 'Child Categories - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export const dynamic = 'force-dynamic';
export default async function Categories() {
  const { data: categories } = await api.getAllCategoriesByAdmin();
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Child Categories"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Child Categories'
          }
        ]}
        action={{
          href: `/admin/categories/child-categories/add`,
          title: 'Add Child Category'
        }}
      />
      <ChildCategoryList categories={categories} />
    </>
  );
}
