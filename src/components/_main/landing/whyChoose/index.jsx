'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Grid, Card, CardContent } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FaCheckCircle, FaLaptop, FaBullhorn, FaGlobe, FaStar } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaCheckCircle size={40} />,
    title: 'Easy Product Listing',
    description: 'Easy product listing and service promotion'
  },
  {
    icon: <FaLaptop size={40} />,
    title: 'Zero Technical Skills',
    description: 'Zero technical skills required'
  },
  {
    icon: <FaBullhorn size={40} />,
    title: 'Marketing Support',
    description: "Marketing support from Neki Mart's digital team"
  },
  {
    icon: <FaGlobe size={40} />,
    title: 'National Exposure',
    description: 'Exposure to national buyers'
  },
  {
    icon: <FaStar size={40} />,
    title: 'Build Your Brand',
    description: 'Build your own brand identity'
  }
];

export default function WhyChoose() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Stack spacing={3} mb={7} textAlign="center" alignItems="center" justifyContent="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              color: '#3277d0'
            }}
          >
            Why Choose Neki Mart?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 900,
              mx: 'auto',
              lineHeight: 1.7,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              justifyContent: 'center'
            }}
          >
            At Neki Mart, we believe every woman deserves a platform to shine. Whether you're a homemaker, an artist, or
            a small business owner, we help you connect with potential buyers and clients through our powerful digital
            ecosystem.
          </Typography>
          <Typography variant="h6" color="#3277d0" fontWeight={600} pt={2}>
            Here's why thousands of women trust Neki Mart:
          </Typography>
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          {reasons.map((reason, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 28px rgba(50, 119, 208, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2.5} alignItems="center">
                    <Box
                      sx={{
                        color: '#3277d0',
                        bgcolor: 'rgba(50, 119, 208, 0.1)',
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%'
                      }}
                    >
                      {reason.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {reason.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                      {reason.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
