'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// mui
import { AppBar, Container, Button, Popover, alpha, Stack, Typography } from '@mui/material';
// icons
import { RxDashboard } from 'react-icons/rx';
import { FaAngleDown } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import MenuDesktopList from 'src/components/lists/menuDesktopList';

// ----------------------------------------------------------------------

const navlinks = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/home' },
  { title: 'Products', path: '/products' },
  { title: 'Brands', path: '/brands' },
  { title: 'Shops', path: '/shops' },
  { title: 'Campaigns', path: '/campaigns' },
  { title: 'Contact', path: '/contact' },
  { title: 'About', path: '/about' }
];

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const anchorRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        position: 'sticky',
        top: 81,
        zIndex: 999,
        bgcolor: (theme) => theme.palette.primary.main,
        display: { md: 'flex', xs: 'none' },
        pr: '0px!important'
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          sx={{
            minHeight: 48,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            ref={anchorRef}
            variant="contained"
            color="primary"
            size="large"
            onMouseEnter={handleOpen}
            sx={{
              boxShadow: 'none',
              borderRadius: 0,
              width: 280,
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.1),
              '& .arrow-icon': { transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }
            }}
            startIcon={<RxDashboard />}
            endIcon={<FaAngleDown size={14} className="arrow-icon" />}
          >
            Categories
          </Button>

          <Stack gap={2} direction="row">
            {navlinks.map((item, i) => (
              <Typography
                key={i}
                variant="subtitle1"
                color="common.white"
                component={Link}
                href={item.path}
                // sx={{
                //   fontWeight: pathname === item.path ? 700 : 600
                // }}
              >
                {item.title}
              </Typography>
            ))}
          </Stack>

          <Popover
            open={open}
            anchorEl={anchorRef.current}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            PaperProps={{
              onMouseEnter: handleOpen, // keep open while hovering popover
              onMouseLeave: handleClose
            }}
          >
            <MenuDesktopList data={categories} onClose={handleClose} />
          </Popover>
        </Stack>
      </Container>
    </AppBar>
  );
}

Navbar.propTypes = {
  categories: PropTypes.array.isRequired
};
