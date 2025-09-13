import SettingsMain from '@/components/_admin/settings';
import HeaderBreadcrumbs from '@/components/headerBreadcrumbs';
import React from 'react';
// components

// Meta information
export const metadata = {
  title: 'General Settings - ReactTravels',
  applicationName: 'ReactTravels',
  authors: 'ReactTravels'
};
export default function page() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="General Settings"
        admin
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'General Settings'
          }
        ]}
        action={{
          title: 'Home settings',
          href: '/admin/settings/home'
        }}
      />
      <SettingsMain />
    </>
  );
}
