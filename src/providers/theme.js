'use client';
import dynamic from 'next/dynamic';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/redux';
import { getTheme } from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import GlobalStyles from '@/theme/global-styles';
import { handleChangeCurrency } from '@/redux/slices/settings';

const Settings = dynamic(() => import('@/components/settings'), { ssr: false });

export default function MuiThemeProvider({ children, fontFamilies, palette, fontFamily, baseCurrency }) {
  const { themeMode, direction, rate, currency, isInitialized } = useSelector((state) => state.settings);
  const [resolvedMode, setResolvedMode] = useState(themeMode !== 'system' ? themeMode : 'light');
  const dispatch = useDispatch();
  useEffect(() => {
    if (themeMode === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedMode(media.matches ? 'dark' : 'light');

      const listener = (e) => setResolvedMode(e.matches ? 'dark' : 'light');
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      setResolvedMode(themeMode);
      return undefined;
    }
  }, [themeMode]);
  useEffect(() => {
    dispatch(
      handleChangeCurrency({
        baseCurrency,

        rate: isInitialized ? rate : 1,
        currency: isInitialized ? currency : baseCurrency
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency]);

  // Memoize the cache for RTL or LTR
  const styleCache = useMemo(() => {
    return createCache({
      key: direction === 'rtl' ? 'muirtl' : 'css',
      stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : []
    });
  }, [direction]);

  // Memoize theme based on dependencies
  const theme = useMemo(() => {
    const selectedFont = fontFamilies[fontFamily] || fontFamilies.figtree;
    return getTheme(resolvedMode, direction, selectedFont, palette);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedMode, direction, fontFamily, palette]);

  return (
    <AppRouterCacheProvider>
      <EmotionCacheProvider value={styleCache}>
        <ThemeProvider theme={theme}>
          <main dir={direction}>
            <CssBaseline />
            {children}
            <Settings />
          </main>
          <GlobalStyles />
        </ThemeProvider>
      </EmotionCacheProvider>
    </AppRouterCacheProvider>
  );
}
