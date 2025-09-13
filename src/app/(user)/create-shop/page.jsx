'use client';
import React, { useEffect } from 'react';
import { useRouter } from '@bprogress/next';
import { useSelector } from 'react-redux';

// mui
import { Container, Stack } from '@mui/material';
import ShopMain from '@/components/_main/shop';
import HeaderBreadcrumbs from '@/components/headerBreadcrumbs';

export default function Page() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.role === 'vendor' || user?.role?.includes('admin')) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <HeaderBreadcrumbs heading="Create a shop" links={[{ name: 'Home', href: '/' }, { name: 'Create shop' }]} />
        <ShopMain type="create-shop" />
      </Stack>
    </Container>
  );
}
