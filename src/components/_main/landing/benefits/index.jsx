'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const benefits = [
  'Reach new customers across India',
  'Dedicated promotion on social media and digital ads',
  'Personalized dashboard to manage listings',
  'Training and mentorship for digital growth',
  'Low commission and transparent payment system'
];

export default function Benefits() {
  return (
    <Box
      sx={{
        bgcolor: '#3277d0',
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
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: 'white'
                }}
              >
                Benefits for Women Entrepreneurs
              </Typography>
              <Typography variant="h6" color="rgba(255,255,255,0.9)" lineHeight={1.8} fontSize="1.2rem">
                Joining Neki Mart comes with numerous advantages that help you grow your business while balancing your
                home life.
              </Typography>
              <Typography variant="h5" fontWeight={700} color="white">
                You'll get:
              </Typography>
              <List sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2 }}>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <FaCheckCircle color="white" size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit}
                      primaryTypographyProps={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'white'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                  component={Link}
                  href="/home"
                  variant="contained"
                  size="medium"
                  startIcon={<FaShoppingBag />}
                  endIcon={<FaArrowRight />}
                  sx={{
                    bgcolor: 'white',
                    color: '#3277d0',
                    px: 3,
                    py: 1.2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    width: 'fit-content',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-3px)',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Shop Now
                </Button>
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
                src="/product.png"
                alt="Women listing products"
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
