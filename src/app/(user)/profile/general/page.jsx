import React from 'react';

// mui
import { Container } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import GeneralProfileMain from '@/components/_main/profile/edit/generalProfile';

// Meta information
export const metadata = {
  title: 'Nextall - Your Gateway to Seamless Shopping and Secure Transactions',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function GeneralProfile() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="General"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Profile',
            href: '/profile/general'
          },
          {
            name: 'General'
          }
        ]}
      />
      <GeneralProfileMain />
    </Container>
  );
}
