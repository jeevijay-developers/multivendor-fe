import Link from 'next/link';
import PropTypes from 'prop-types';

// mui
import { Box, useTheme } from '@mui/material';
import Image from 'next/image';

const Logo = ({ branding }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  // src={isDarkMode?darkekt:}
  return (
    <Box
      component={Link}
      href="/"
      sx={{
        display: 'inline-block',
        height: 56,
        width: 'auto'
      }}
    >
      <Image
        src={isDarkMode ? branding.logoDark.url : branding.logoLight.url}
        alt="Logo"
        height={56}
        width={200} // Will be overridden by aspect ratio automatically
        style={{ height: '56px', width: 'auto' }}
      />
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  isMobile: PropTypes.bool
};
export default Logo;
