import React from 'react';

// Components
import AttributesList from 'src/components/_admin/attributes/attributesList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Attributes - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function Attributes() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Attributes List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Attributes'
          }
        ]}
        action={{
          href: `/admin/attributes/add`,
          title: 'Add Attribute'
        }}
      />
      <AttributesList />
    </>
  );
}
