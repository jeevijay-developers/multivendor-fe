import React from 'react';
import Link from 'next/link';
// mui
import { Typography, Grid, Paper, Button } from '@mui/material';
// icons
import { IoArrowForward } from 'react-icons/io5';
// component
import CampaginCard from 'src/components/cards/campagin';
// api

export default function CampaignsComponent({ data }) {
  return (
    <Paper elevation={0}>
      <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
        All Campaigns
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
        All of Ours Campaigns{' '}
      </Typography>

      <Grid container spacing={2} justifyContent="start" alignItems="center">
        {data.map((inner) => (
          <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={inner._id}>
            <CampaginCard campaign={inner} />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="outlined"
        color="secondary"
        endIcon={<IoArrowForward />}
        component={Link}
        href={'/campaigns'}
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
    </Paper>
  );
}
