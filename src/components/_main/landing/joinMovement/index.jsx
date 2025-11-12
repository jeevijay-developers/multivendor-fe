'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Button, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { FaArrowRight, FaShoppingBag } from 'react-icons/fa';

export default function JoinMovement() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={4} position="relative" zIndex={1}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  color: '#3277d0',
                  lineHeight: 1.2
                }}
              >
                Join the Neki Movement Today!
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  fontSize: { xs: '1.1rem', md: '1.4rem' }
                }}
                width="50rem"
              >
                Whether you're a homemaker turning your hobby into a business or a small-scale entrepreneur ready to
                scale — Neki Mart is here for you.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  lineHeight: 1.7,
                  fontSize: '1.2rem'
                }}
              >
                Join us in empowering women, supporting local talent, and building a stronger India.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#3277d0',
                  fontStyle: 'italic',
                  mt: 2
                }}
              >
                Start Your Journey with Neki Mart
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#3277d0',
                  fontWeight: 600
                }}
              >
                Where Women Empower Women
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} pt={3}>
                <Button
                  component={Link}
                  href="/home"
                  variant="contained"
                  size="large"
                  startIcon={<FaShoppingBag />}
                  endIcon={<FaArrowRight />}
                  sx={{
                    bgcolor: '#3277d0',
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#2a66b8',
                      transform: 'translateY(-3px)',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  component={Link}
                  href="/create-shop"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#3277d0',
                    color: '#3277d0',
                    borderWidth: 2,
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#3277d0',
                      borderWidth: 2,
                      bgcolor: 'rgba(50, 119, 208, 0.05)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  Start Selling
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 300, md: 450 },
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              <Box
                component="img"
                src="/call.png"
                alt="Call to action image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
