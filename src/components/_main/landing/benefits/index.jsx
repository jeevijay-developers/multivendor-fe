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
        py: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
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
                size="large"
                startIcon={<FaShoppingBag />}
                endIcon={<FaArrowRight />}
                sx={{
                  alignSelf: 'flex-start',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  bgcolor: 'white',
                  color: '#3277d0',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'none'
                  }
                }}
              >
                Shop Now
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
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
              <Typography variant="h5" color="white" textAlign="center" px={3} fontWeight={600}>
                [Women Listing Products Image]
                <br />
                <Typography variant="body2" color="rgba(255,255,255,0.8)" mt={1}>
                  Add an image of women listing their products
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
