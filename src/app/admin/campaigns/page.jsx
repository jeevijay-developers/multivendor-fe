import React from 'react';

// Components
import CampaignList from 'src/components/_admin/campaigns/campaignList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Campaigns - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};
export default function Campaigns() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Campaigns List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Campaigns'
          }
        ]}
        action={{
          href: `/admin/campaigns/add`,
          title: 'Add Campaign'
        }}
      />
      <CampaignList />
    </>
  );
}
