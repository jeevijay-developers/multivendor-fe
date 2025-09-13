import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';
// components
import CheckoutGuestFormSkeleton from './checkoutForm';
import PaymentInfoSkeleton from './paymentInfo';
import CardItemSekelton from './cartItems';
import PaymentMethodCardSkeleton from './paymentMethod';

export default function CheckoutSkeleton() {
  return (
    <Box py={5}>
      <Grid container spacing={2}>
        <Grid size={{ lg: 3, md: 8, sm: 6, xs: 12 }}>
          <CheckoutGuestFormSkeleton />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <CardItemSekelton />
          <PaymentInfoSkeleton />
          <PaymentMethodCardSkeleton />
          <br />
          <Skeleton variant="rounded" height={48} />
        </Grid>
      </Grid>
    </Box>
  );
}
