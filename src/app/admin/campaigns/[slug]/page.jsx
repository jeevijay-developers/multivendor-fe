'use client';
import React, { use } from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditCampaign from 'src/components/_admin/campaigns/editCampaign';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

export default function Page(props) {
  const params = use(props.params);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['get-admin-campaign', params.slug],
    queryFn: () => api.getCampaignByAdmin(params.slug)
  });
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Edit Campaign"
        links={[
          { name: 'Admin Dashboard', href: '/admin/dashboard' },
          { name: 'Campaigns', href: '/admin/campaigns' },
          { name: 'Edit Campaign' }
        ]}
      />
      <EditCampaign isLoading={isLoading} data={data?.data} />
    </div>
  );
}
