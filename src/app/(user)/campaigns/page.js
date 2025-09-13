'use client';
import React from 'react';

// mui
import { Typography, Grid, Stack, Container } from '@mui/material';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import CampaignCard from '@/components/cards/campagin';
import Pagination from 'src/components/pagination';
import { useSearchParams } from 'next/navigation';
import HeaderBreadcrumbs from '@/components/headerBreadcrumbs';
export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['get-campaigns-user', page],
    queryFn: () => api.getCampaigns(page, 12)
  });

  const campaigns = data?.data || [];

  return (
    <Container maxWidth="xl">
      <Stack direction="column" sx={{ gap: 3 }}>
        <HeaderBreadcrumbs heading="Campaigns" links={[{ name: 'Home', href: '/' }, { name: 'Campaigns' }]} />

        <Grid container spacing={2} justifyContent="start" alignItems="center">
          {(isLoading ? Array.from(new Array(8)) : campaigns).map((inner, index) => (
            <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={inner?.id || index}>
              <CampaignCard campaign={inner} isLoading={isLoading} />
            </Grid>
          ))}
        </Grid>
        {!isLoading && campaigns.length === 0 && (
          <Typography variant="h3" color="error.main" textAlign="center" width="100%">
            Campaign not found
          </Typography>
        )}
        <Pagination data={data} />
      </Stack>
    </Container>
  );
}
