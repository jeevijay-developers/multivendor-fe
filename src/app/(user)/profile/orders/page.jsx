import React from 'react';

// mui
import { Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import InvoiceHistory from 'src/components/_main/profile/invoiceHistory';

// Meta information
export const metadata = {
  title: 'Invoice | Nextall - Your Order Details and Payment Confirmation',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default async function OrderPage() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Orders"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Profile',
            href: '/profile/orders'
          },
          {
            name: 'Orders'
          }
        ]}
      />
      <InvoiceHistory />
    </Container>
  );
}
