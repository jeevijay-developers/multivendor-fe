'use client';
import React, { useState } from 'react';
// mui
import { Card, Grid } from '@mui/material';

import ProductDetailsCarousel from 'src/components/carousels/customPaginationSilder';
import ProductDetailsSumary from 'src/components/_main/product/summary';

export default function ProductDetail({ ...props }) {
  const { data, brand, category, totalRating, totalReviews, slug, isDialog, isSimpleProduct } = props;
  const [selectedVariant, setSelectedVariant] = useState(data?.variants[0]?.name || '');
  return (
    <Card
      sx={{
        p: 2,
        mt: isDialog ? 0 : 0,
        borderWidth: 0,
        bgcolor: 'background.paper',
        mb: isDialog ? 0 : 0
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 4
          }}
        >
          <ProductDetailsCarousel
            id={data._id}
            isSimpleProduct={isSimpleProduct}
            slug={slug}
            product={data}
            selectedVariant={selectedVariant}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 8,
            lg: 8
          }}
        >
          <ProductDetailsSumary
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            id={data?.id}
            product={data}
            brand={brand}
            category={category}
            totalRating={totalRating}
            totalReviews={totalReviews}
            isSimpleProduct={isSimpleProduct}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
