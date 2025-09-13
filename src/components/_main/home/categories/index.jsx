// react
import React from 'react';

// mui
import { Typography, Grid, Box, Stack, Paper } from '@mui/material';

// component
import CategoryCard from 'src/components/cards/category';
export default function Categories(props) {
  const { data, isHome } = props;
  return (
    <Paper elevation={0}>
      <Stack direction={'column'} sx={{ gap: 3, mt: 5 }}>
        {isHome && (
          <Box>
            <Typography variant="h2" color="text.primary">
              Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover our most popular categories, carefully curated to help you find the best products quickly and
              easily.
            </Typography>
          </Box>
        )}

        <Box>
          <Grid container spacing={2} justifyContent={'left'} alignItems="center">
            {data.map((inner) => (
              <React.Fragment key={Math.random()}>
                <Grid size={{ lg: 2, md: 3, sm: 4, xs: 4 }}>
                  <CategoryCard category={inner} slug={props.slug} />
                </Grid>
              </React.Fragment>
            ))}
            {isHome && !Boolean(data.length) && (
              <Typography variant="h3" color="error.main" textAlign="center">
                Categories not found
              </Typography>
            )}
          </Grid>
        </Box>
      </Stack>
    </Paper>
  );
}
