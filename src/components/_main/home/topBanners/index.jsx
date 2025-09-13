'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// mui
import { Box, Card, Grid, Container, CardActionArea } from '@mui/material';

export default function Index({ banners }) {
  // const isDeskTop = useMediaQuery(theme.breakpoints.up('xl'));
  // const isDeskTopBtn = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box mb={2} mt={2}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }} key={banners.banner1.image._id}>
            <Card>
              <CardActionArea
                {...(Boolean(banners.banner1.link) && {
                  component: Link,
                  href: banners.banner1.link
                })}
              >
                <Box sx={{ position: 'relative', height: 240 }}>
                  <Image
                    draggable="false"
                    src={banners.banner1.image.url}
                    alt="banner"
                    layout="fill"
                    sizes="100vw"
                    objectFit="cover"
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }} key={banners.banner2.image._id}>
            <Card>
              <CardActionArea
                {...(Boolean(banners.banner2.link) && {
                  component: Link,
                  href: banners.banner2.link
                })}
              >
                <Box sx={{ position: 'relative', height: 240 }}>
                  <Image
                    draggable="false"
                    src={banners.banner2.image.url}
                    alt="banner"
                    layout="fill"
                    sizes="100vw"
                    objectFit="cover"
                  />
                </Box>
                {}
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
