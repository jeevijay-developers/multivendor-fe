import React from 'react';

// components
import AddCurrency from 'src/components/_admin/currencies/addCurrency';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Currency"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Currencies',
            href: '/admin/currencies'
          },
          {
            name: 'Add Currency'
          }
        ]}
      />
      <AddCurrency />
    </div>
  );
}
