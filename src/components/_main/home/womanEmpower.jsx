'use client'
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Stack,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Star as SparklesIcon,
  Favorite as HeartIcon,
  People as UsersIcon,
  Store as ShoppingBagIcon 
} from '@mui/icons-material';

export default function WomanEmpowerSection() {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.info.light, 0.1)})`,
        my: 8,
    }}
    >
      <Container maxWidth="lg">
        <Stack spacing={10}>

          {/* Image Section */}
          <Paper
            elevation={12}
            sx={{
              height: 320,
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'url("/woman.jpg")', // Add your image URL here
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.4)}, ${alpha(theme.palette.info.dark, 0.4)})`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                // background: `linear-gradient(to top, ${alpha(theme.palette.primary.dark, 0.3)}, transparent)`,
              },
            }}
          >
          </Paper>

          {/* About Women Section */}
          <Grid container spacing={6} alignItems="center" justifyContent={"center"}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3} sx={{ textAlign: 'center' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                  <HeartIcon sx={{ fontSize: 32, color: theme.palette.info.main }} />
                  <Typography variant="h3" component="h3" fontWeight="bold" color="text.primary">
                    The Power of Womanhood
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    height: 4,
                    width: 96,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                    borderRadius: 2,
                    margin: '0 auto',
                  }}
                />
                <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Women are the pillars of strength, compassion, and resilience. They nurture families, build communities, and drive progress across every sphere of life.
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Every woman carries within her the power to create, transform, and elevate. When we empower women, we empower the world.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {[
                  {
                    icon: SparklesIcon,
                    title: 'Strength',
                    description: 'Unwavering resilience in every challenge',
                    color: theme.palette.primary.main,
                  },
                  {
                    icon: HeartIcon,
                    title: 'Compassion',
                    description: 'Infinite kindness that heals hearts',
                    color: theme.palette.info.main,
                  },
                  {
                    icon: UsersIcon,
                    title: 'Leadership',
                    description: 'Guiding with wisdom and vision',
                    color: theme.palette.secondary.main,
                  },
                  {
                    icon: ShoppingBagIcon,
                    title: 'Innovation',
                    description: 'Creating tomorrow\'s solutions today',
                    color: theme.palette.primary.main,
                  },
                ].map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Card
                      elevation={4}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        borderTop: `4px solid ${item.color}`,
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        '&:hover': {
                          elevation: 8,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 0, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: alpha(item.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            margin: '0 auto 16px auto',
                          }}
                        >
                          <item.icon sx={{ fontSize: 24, color: item.color }} />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* About Nekimart Section */}
          <Paper
            elevation={12}
            sx={{
              p: 6,
              borderRadius: 4,
              borderTop: `4px solid ${theme.palette.primary.main}`,
              textAlign: 'center',
            }}
          >
            <Container maxWidth="md">
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                    <ShoppingBagIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                    <Typography variant="h3" component="h3" fontWeight="bold">
                      About Nekimart
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      height: 4,
                      width: '100%',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                      borderRadius: 2,
                      maxWidth: 200,
                      margin: '0 auto',
                    }}
                  />
                </Box>
                <Typography variant="h6" color="text.primary" sx={{ lineHeight: 1.7 }}>
                  Nekimart is more than just a marketplace—it's a celebration of goodness, values, and the spirit of womanhood. We believe in creating a platform where quality meets compassion.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Our mission is to empower women entrepreneurs, celebrate women consumers, and create a community built on trust, authenticity, and mutual respect.
                </Typography>
                <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={1} sx={{ pt: 3 }}>
                  {['Women-Centric', 'Quality First', 'Ethical & Sustainable', 'Community Driven'].map((label, index) => (
                    <Chip
                      key={index}
                      label={label}
                      variant="filled"
                      color={index % 2 === 0 ? 'primary' : 'info'}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        m: 0.5,
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Paper>

          {/* YouTube Video Section */}
          <Stack spacing={4}>
            <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
              <Typography variant="h3" component="h3" fontWeight="bold" gutterBottom>
                Discover Nekimart
              </Typography>
              <Box
                sx={{
                  height: 4,
                  width: 96,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                  borderRadius: 2,
                  margin: '0 auto',
                  mb: 2,
                }}
              />
              <Typography variant="h6" color="text.secondary">
                Watch our story and vision come to life
              </Typography>
            </Box>
            <Container maxWidth="md">
              <Paper
                elevation={12}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    backgroundColor: '#000',
                  }}
                >
                  <Box
                    component="iframe"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Nekimart Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                Replace the YouTube video ID in the embed URL with your actual Nekimart video
              </Typography>
            </Container>
          </Stack>

        </Stack>
      </Container>
    </Box>
  );
}