import React from 'react';
// mui
import { Box, Grid, Skeleton } from '@mui/material';
// components
import PaymentSummarySkeleton from './paymentSummary';
import ShoppingCartSkeleton from './shoppingcart';

export default function MainCartSkeleton() {
  return (
    <Box py={5}>
      <Grid container spacing={2}>
        <Grid size={{ md: 8, xs: 6 }}>
          <ShoppingCartSkeleton />
        </Grid>
        <Grid size={{ md: 4, xs: 6 }}>
          <PaymentSummarySkeleton />
          <Box mt={2}>
            <Skeleton variant="rounded" width="100%" height={48} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
