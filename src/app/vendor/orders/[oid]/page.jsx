'use client';
import React, { use } from 'react';
import PropTypes from 'prop-types';
import CourierDetails from 'src/components/_admin/orders/courierDetails';
// mui
import { Grid, Box } from '@mui/material';

// components
import OrderDetails from 'src/components/_main/orders/orderDetails';
import TableCard from 'src/components/table/order';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import OrderToolbarActions from 'src/components/_admin/orders/orderToolbarActions';
import { useSelector } from '@/redux';
Page.propTypes = { params: PropTypes.shape({ oid: PropTypes.string.isRequired }).isRequired };
export default function Page(props) {
  const { user } = useSelector((state) => state.user);
  const params = use(props.params);
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['order-by-vendor', params.oid],
    queryFn: () => api.getOrderByVendor(params.oid)
  });

  const courierInfo = data?.courierInfo ? data?.courierInfo?.find((v) => v.vendorId === user._id) : null;

  return (
    <Box>
      <HeaderBreadcrumbs
        admin
        links={[
          { name: 'Dashboard', href: '/vendor/dashboard' },
          { name: 'Orders', href: '/vendor/orders' },
          { name: 'Order details' }
        ]}
        action={
          <>
            <OrderToolbarActions isVendor data={data?.data} />
          </>
        }
      />

      <Grid container direction={{ xs: 'row', md: 'row-reverse' }} spacing={2}>
        <Grid size={{ md: 4, xs: 12 }}>
          <CourierDetails id={params.oid} isVendor courierInfo={courierInfo} />
          <OrderDetails data={data?.data} isLoading={isLoading} currency={'$'} />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <TableCard data={data?.data} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  );
}
