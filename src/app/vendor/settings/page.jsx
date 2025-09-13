import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AccountGeneral from '@/components/_main/profile/edit/generalProfile';

// Meta information
export const metadata = {
  title: 'Setting - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};
export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        heading="Settings"
        admin
        links={[
          {
            name: 'Dashboard',
            href: '/vendor/dashboard'
          },
          {
            name: 'Settings'
          }
        ]}
        action={{
          href: `/vendor/settings/shop`,
          title: 'Shop Setting'
        }}
      />
      <AccountGeneral />
    </div>
  );
}
