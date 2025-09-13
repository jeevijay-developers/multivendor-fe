'use client';
import React from 'react';
// mui
import { Box, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
// components
import { getCart } from '@/redux/slices/product';
import ShoppingCart from 'src/components/_main/cart/shoppingCart';
import PaymentSummary from 'src/components/_main/cart/paymentSummary';

export default function CartMain() {
  const dispatch = useDispatch();
  const { checkout } = useSelector(({ product }) => product);
  const { cart } = checkout;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(getCart(cart));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box py={5}>
        <Grid container spacing={2}>
          <Grid size={{ md: 8, xs: 12 }}>
            <ShoppingCart loading={loading} />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <PaymentSummary loading={loading} cart={cart} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
