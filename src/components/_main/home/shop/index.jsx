'use client';
// react
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// mui
import { Typography, Grid, Box, Paper, Button } from '@mui/material';
// icons
import { IoArrowForward } from 'react-icons/io5';
// component
import ShopCard from 'src/components/cards/shop';

export default function ShopComponent() {
  const { shops = [], isLoading } = useSelector(({ shops }) => shops);

  return (
    <Paper elevation={0}>
      <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
        Best Shops
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
        Our Highest Rated Shops Where You Can Find What You Are Looking For
      </Typography>

      <Box>
        <Grid container spacing={2} justifyContent="left" alignItems="center">
          {(isLoading ? Array.from(new Array(6)) : shops)?.map((inner, i) => (
            <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={'shop-' + i}>
              <ShopCard shop={inner} isLoading={isLoading} />
            </Grid>
          ))}
          {!isLoading && !Boolean(shops?.length) && (
            <Typography variant="h3" color="error.main" textAlign="center">
              Shop not found
            </Typography>
          )}
        </Grid>

        <Button
          variant="outlined"
          color="secondary"
          endIcon={<IoArrowForward />}
          component={Link}
          href={'/shops'}
          sx={{
            mt: 3,
            float: 'right',
            '& svg': {
              transition: 'transform 0.3s ease' // smooth effect
            },
            '&:hover': {
              svg: { transform: 'translateX(4px)' }
            }
          }}
        >
          View All
        </Button>
      </Box>
    </Paper>
  );
}
