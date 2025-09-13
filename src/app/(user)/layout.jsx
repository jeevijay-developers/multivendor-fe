import React from 'react';

// mui
import { Toolbar } from '@mui/material';

// components
import Navbar from 'src/layout/_main/navbar';
import Footer from 'src/layout/_main/footer';
// import Topbar from 'src/layout/_main/topbar';
import ActionBar from 'src/layout/_main/actionbar';

// Meta information
export const metadata = {
  title: 'Nextall E-commerce Script | Your Gateway to Seamless Shopping and Secure Transactions',
  description:
    'Log in to Nextall for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords: 'ecommerce, Nextall, Commerce, Sign in Nextall, Signin From Nextall',
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    images: 'https://nextall.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
  }
};
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function RootLayout({ children }) {
  const res = await fetch(`${baseUrl}/api/branding`, { next: { revalidate: 60 } });
  const res2 = await fetch(`${baseUrl}/api/all-categories`, { next: { revalidate: 60 } });

  const { data: branding } = await res.json();
  const { data: categories } = await res2.json();
  return (
    <>
      {/* <Topbar /> */}
      <Navbar branding={branding} />
      <ActionBar categories={categories} />
      {children}
      <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
      <Footer branding={branding} />
    </>
  );
}
