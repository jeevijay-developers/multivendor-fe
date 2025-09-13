'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { i18n } from '../../../i18n-config';

// MUI components
import { FormControl, Select, MenuItem, Typography } from '@mui/material';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || i18n.defaultLocale;

  const redirectedPathname = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleChange = (event) => {
    const newLocale = event.target.value;
    const newPath = redirectedPathname(newLocale);
    router?.push(newPath);
  };

  return (
    <FormControl variant="outlined" fullWidth size="large">
      <Typography variant="overline" color="inherit" gutterBottom>
        Language
      </Typography>
      <Select value={currentLocale} onChange={handleChange}>
        {i18n.locales.map((locale) => (
          <MenuItem key={locale.key} value={locale.key}>
            {locale.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
