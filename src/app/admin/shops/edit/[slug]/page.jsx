'use client';
import React, { use } from 'react';
import PropTypes from 'prop-types';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ShopMain from '@/components/_main/shop';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

Page.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired };

export default function Page(props) {
  const params = use(props.params);
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['shop-details-by-admin', params.slug],
    queryFn: () => api.getShopDetailsByAdmin(params.slug)
  });
  return (
    <>
      <HeaderBreadcrumbs
        heading="Edit Shop"
        admin
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Shops', href: '/admin/shops' },
          { name: 'Edit Shop' }
        ]}
      />
      <ShopMain isShopLoading={isLoading} shop={data?.data} type="admin" />
    </>
  );
}
