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
                bgcolor: 'rgba(50, 119, 208, 0.1)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px dashed rgba(50, 119, 208, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography variant="h5" color="text.disabled" textAlign="center" px={3} fontWeight={600}>
                [Empowerment Mission Banner]
                <br />
                <Typography variant="body2" color="text.disabled" mt={1}>
                  Add empowerment mission banner image
                </Typography>
              </Typography>
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
