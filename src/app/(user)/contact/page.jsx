import React from 'react';

// mui
import { Container } from '@mui/material';

// component
import ContactUs from 'src/components/_main/contactUs';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function Page() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Contact Us"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Contact us'
          }
        ]}
      />
      <ContactUs />
    </Container>
  );
}
