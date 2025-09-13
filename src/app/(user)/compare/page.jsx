import React from 'react';

// mui
import { Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import Compare from 'src/components/_main/compare';

export default function Page() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Compare"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Compare'
          }
        ]}
      />
      <Compare />
    </Container>
  );
}
