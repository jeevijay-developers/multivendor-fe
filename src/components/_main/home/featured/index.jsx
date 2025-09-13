import React from 'react';

// mui
import { Typography, Box } from '@mui/material';
// api

// components
import ProductsCarousel from 'src/components/carousels/gridSlider';
export default function Index({ data }) {
  return (
    <Box>
      <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
        Featured Products
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
        Discover a curated selection of our most loved products — handpicked for quality, popularity, and style.
      </Typography>

      {!Boolean(data.length) ? (
        <Typography variant="h3" color="error.main" textAlign="center">
          Products not found
        </Typography>
      ) : (
        <ProductsCarousel data={data} query="?featured=true" />
      )}
    </Box>
  );
}
