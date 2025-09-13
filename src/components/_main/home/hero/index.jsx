import React from 'react';
// components
import SingleSlideCarousel from 'src/components/carousels/singleSlide';
import MegaMenu from 'src/components/mega-menu/MegaMenuDesktopVertical';
// slides data
// mui
import { Stack } from '@mui/material';

export default function Hero({ data, banners }) {
  return (
    <Stack direction="row" gap={2} mt={2}>
      <MegaMenu data={data} />
      <SingleSlideCarousel data={banners?.slides} />
    </Stack>
  );
}
