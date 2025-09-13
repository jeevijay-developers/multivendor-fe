import React from 'react';

// mui
import { Container } from '@mui/material';

// components
import Checkout from 'src/components/_main/checkout';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Checkout | Nextall - Secure and Convenient Checkout for Your Shopping',
  description:
    'Complete your purchase with confidence on Nextall. Enjoy a secure and convenient checkout process for your shopping needs. Enter your payment and shipping information with ease. Experience seamless transactions and fast delivery. Start your checkout now!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords:
    'checkout, Nextall, secure checkout, convenient checkout, complete purchase, payment information, shipping information, seamless transactions, fast delivery, secure payment, easy checkout, hassle-free checkout, online shopping checkout'
};

export default function CheckoutPage() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Checkout"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Cart',
            href: '/cart'
          },
          {
            name: 'Checkout'
          }
        ]}
      />

      <Checkout />
    </Container>
  );
}
