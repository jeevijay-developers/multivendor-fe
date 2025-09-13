'use client';
import React from 'react';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import ShopMain from '@/components/_main/shop';
export default function ShopSetting() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['get-vendor-shop'],
    queryFn: api.getVendorShop,
    retry: false
  });
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Shop Setting"
        links={[
          { name: 'Dashboard', href: '/vendor/dashboard' },
          { name: 'Settings', href: '/vendor/settings' },
          { name: 'Shop Settings' }
        ]}
      />
      <ShopMain isShopLoading={isLoading} shop={data?.data} type="vendor" />
    </>
  );
}
