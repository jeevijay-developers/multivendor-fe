import React from 'react';

// mui
import { Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import WishlistMain from 'src/components/_main/profile/wishlist';

// Meta information
export const metadata = {
  title: 'Wishlist | Nextall - Save Your Favorite Items for Later',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function Wishlist() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Wishlist"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Profile',
            href: '/profile/wishlist'
          },
          {
            name: 'Wishlist'
          }
        ]}
      />
      <WishlistMain />
    </Container>
  );
}
