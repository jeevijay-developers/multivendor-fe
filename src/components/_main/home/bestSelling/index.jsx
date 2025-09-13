import React from 'react';

// mui
import { Typography, Box, Stack } from '@mui/material';

// components
import ProductsCarousel from 'src/components/carousels/gridSlider';
// icons

export default function Featured({ data }) {
  const products = Array.isArray(data) ? data : [];
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
            Best Selling Products
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
            Special products in this month
          </Typography>
        </Box>
      </Stack>

      {!products.length ? (
        <Typography variant="h3" color="error.main" textAlign="center">
          Products not found
        </Typography>
      ) : (
        <ProductsCarousel data={products} query={'?top=1'} />
      )}
    </Box>
  );
}
