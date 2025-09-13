'use client';
import React, { use } from 'react';

// components
import EditCurrency from 'src/components/_admin/currencies/editCurrency';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

export default function Page(props) {
  const params = use(props.params);
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['get-admin-currency', params.cid],
    queryFn: () => api.getCurrencyByAdmin(params.cid)
  });
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading=" Edit Currency"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Currencies', href: '/admin/currencies' },
          { name: 'Edit Currency' }
        ]}
      />
      <EditCurrency isLoading={isLoading} data={data?.data} />
    </div>
  );
}
