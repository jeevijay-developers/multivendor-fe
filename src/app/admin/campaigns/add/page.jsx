import React from 'react';

// components
import AddCampaign from 'src/components/_admin/campaigns/addCampaign';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Campaign"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Campaigns',
            href: '/admin/campaigns'
          },
          {
            name: 'Add Campaign'
          }
        ]}
      />
      <AddCampaign />
    </div>
  );
}
