'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Grid, Card, CardContent } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FaUserPlus, FaClipboardList, FaBullhorn, FaInbox, FaRocket } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus size={40} />,
    number: 1,
    title: 'Sign Up',
    description: 'Sign Up as a Seller or Buyer on Neki Mart'
  },
  {
    icon: <FaClipboardList size={40} />,
    number: 2,
    title: 'List Products',
    description: 'List your products or services with easy upload options'
  },
  {
    icon: <FaBullhorn size={40} />,
    number: 3,
    title: 'Get Promoted',
    description: 'Neki Mart promotes your listings through online marketing'
  },
  {
    icon: <FaInbox size={40} />,
    number: 4,
    title: 'Receive Inquiries',
    description: 'Receive inquiries and orders directly on your dashboard'
  },
  {
    icon: <FaRocket size={40} />,
    number: 5,
    title: 'Grow Your Business',
    description: 'Build your brand and grow your income'
  }
];

export default function HowItWorks() {
  return (
    <Box
      sx={{
        bgcolor: '#3277d0',
        py: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} mb={7} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'white',
              textAlign: 'center'
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.9)"
            sx={{
              maxWidth: 800,
              lineHeight: 1.7,
              fontSize: '1.1rem',
              textAlign: 'center'
            }}
          >
            Start your journey with Neki Mart in 5 simple steps
          </Typography>
        </Stack>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                    borderColor: 'rgba(255,255,255,0.4)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2.5} alignItems="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        position: 'relative'
                      }}
                    >
                      {step.icon}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          color: '#3277d0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          boxShadow: 'none'
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="white">
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.85)" lineHeight={1.8}>
                      {step.description}
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
