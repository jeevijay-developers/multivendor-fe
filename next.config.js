// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });
/** @type {import('next').NextConfig} */
// const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // turbopack: {
  // rules: [],
  //   root: path.join(__dirname, '..')
  // },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    SHIPPING_FEE: process.env.SHIPPING_FEE,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'res.cloudinary.com'
      },
      {
        hostname: 'nextall.vercel.app'
      },
      { hostname: 'nextall-fe-staging.vercel.app' }
    ]
  }
};

module.exports = nextConfig;
