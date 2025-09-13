import HomeMain from '@/components/_admin/settings/home';
import HeaderBreadcrumbs from '@/components/headerBreadcrumbs';
import React from 'react';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        heading="Home Settings"
        admin
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Settings',
            href: '/admin/settings'
          },
          {
            name: 'Home Settings'
          }
        ]}
      />
      <HomeMain />
    </div>
  );
}
