'use client';
import React from 'react';
import { Box, Container, Typography, Stack, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FaCheckCircle } from 'react-icons/fa';

const buyerReasons = ['Explore verified sellers', 'Support women-led businesses', 'Buy genuine and creative products'];

export default function ForBuyers() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 350, md: 500 },
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                bgcolor: '#f5f5f5'
              }}
            >
              <Box
                component="img"
                src="/empowerment.png"
                alt="Empowerment mission banner"
                loading="eager"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: '#3277d0'
                }}
              >
                For Buyers
              </Typography>
              <Typography variant="h6" color="text.secondary" lineHeight={1.8} fontSize="1.2rem">
                Discover authentic handmade products, home services, crafts, and more from talented women across India.
              </Typography>
              <Typography variant="h6" color="text.primary" fontWeight={700} fontSize="1.2rem">
                Every purchase on Neki Mart contributes to empowering women and supporting local economies.
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#3277d0" mt={2}>
                Why shop with us:
              </Typography>
              <List sx={{ bgcolor: 'rgba(50, 119, 208, 0.05)', borderRadius: 2, p: 2 }}>
                {buyerReasons.map((reason, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <FaCheckCircle color="#3277d0" size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={reason}
                      primaryTypographyProps={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
