import React from 'react';
// components
import Image from 'src/components/blurImage';
// mui
import { Typography, Box, Stack, Card, Grid, CardActionArea } from '@mui/material';
// // api
import Link from 'next/link';
export default function Brands({ data }) {
  return (
    <Box sx={{ my: 6, display: { md: 'block', xs: 'none' } }}>
      <Typography variant="h2" color="text.primary" textAlign="left">
        Brands
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="left"
        className="description"
        sx={{ textTransform: 'capitalize', mb: 5 }}
      >
        Shop top-rated brands you trust — quality, style, and performance from the names you know.
      </Typography>

      {Boolean(data.length) ? (
        <Grid container alignItems="center" justifyContent="left" spacing={2}>
          {data.map((v) => (
            <Grid key={v._id} size={{ md: 3, sm: 3, xs: 6 }}>
              <Card
                className="slider-main"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  position: 'relative',
                  mb: 3,
                  img: { borderRadius: '8px', objectFit: 'contain' }
                }}
              >
                <CardActionArea component={Link} href={`/brands/${v.slug}`} sx={{ p: 1, pr: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Image
                      src={v.logo.url}
                      alt="brand logo"
                      // layout="responsive"
                      width={70}
                      height={70}
                      draggable="false"
                      objectFit="cover"
                    />
                    <Stack
                      sx={{
                        display: 'grid'
                      }}
                    >
                      <Typography variant="subtitle1" color="text.primary" noWrap>
                        {v.name}
                      </Typography>
                      <Typography variant="body1" noWrap>
                        {v.totalProducts + ' ' + (v.totalProducts <= 1 ? 'Product' : 'Products')}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" color="error.main" textAlign="center">
          Brands not found
        </Typography>
      )}
    </Box>
  );
}
