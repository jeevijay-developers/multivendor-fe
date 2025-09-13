import React from 'react';

// components
import AddAttributes from 'src/components/_admin/attributes/addAttribute';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Attribute"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Attributes',
            href: '/admin/attributes'
          },
          {
            name: 'Add Attribute'
          }
        ]}
      />
      <AddAttributes />
    </div>
  );
}
