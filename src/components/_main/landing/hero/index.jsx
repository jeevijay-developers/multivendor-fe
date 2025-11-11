'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Button, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { FaArrowRight, FaShoppingBag } from 'react-icons/fa';

export default function LandingHero() {
  return (
    <Box
      sx={{
        bgcolor: '#3277d0',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '70vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={10}
          alignItems="center"
          sx={{
            flexWrap: 'nowrap'
          }}
        >
          <Grid item xs={6}>
            <Stack spacing={4} position="relative" zIndex={1}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  color: 'white',
                  lineHeight: 1.1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                Neki Mart
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 1.3
                }}
              >
                Empowering Women Entrepreneurs Across India
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400
                }}
                width="50rem"
              >
                Welcome to Neki Mart — a platform built to empower Indian women entrepreneurs, homemakers, and creators.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}
                width="50rem"
              >
                We provide a space where women can list their products and services, and we promote their offerings to
                reach a wider audience.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  fontSize: '1.2rem'
                }}
                width="50rem"
              >
                Neki Mart is not just a marketplace — it's a movement to celebrate women's creativity, entrepreneurship,
                and financial independence.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={2}>
                <Button
                  component={Link}
                  href="/home"
                  variant="contained"
                  size="large"
                  startIcon={<FaShoppingBag />}
                  endIcon={<FaArrowRight />}
                  sx={{
                    bgcolor: 'white',
                    color: '#3277d0',
                    px: 4,
                    py: 1.8,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
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
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  Start Selling
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 350, md: 500 },
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px dashed rgba(255,255,255,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography variant="h5" color="white" textAlign="center" px={3} fontWeight={500}>
                [Hero Image Placeholder]
                <br />
                <Typography variant="body2" color="rgba(255,255,255,0.8)" mt={1}>
                  Add an inspiring image of women entrepreneurs
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
