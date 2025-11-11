# Neki Mart Landing Page Implementation

## Overview

Created a separate landing page as the main entry point for Neki Mart, showcasing the empowerment mission for women entrepreneurs across India.

## Page Structure

### Landing Page (Root: `/`)

The new landing page is now the first page users see when visiting the website.

**Sections:**

1. **Hero Section** - Main introduction with CTA buttons (Shop Now → `/home`, Start Selling → `/create-shop`)
2. **Why Choose Neki Mart** - 5 key reasons with icons
3. **Benefits for Women Entrepreneurs** - List of benefits with "Shop Now" button → `/home`
4. **For Buyers** - Information for customers
5. **How It Works** - 5-step process
6. **Join the Movement** - CTA section with "Shop Now" and "Start Selling" buttons

### Shop Homepage (`/home`)

The previous homepage with all product listings, categories, campaigns, etc. is now accessible at `/home`.

## Components Created

### Landing Page Components (`src/components/_main/landing/`)

- `hero/index.jsx` - Hero section with main messaging
- `whyChoose/index.jsx` - Why Choose Neki Mart section
- `benefits/index.jsx` - Benefits for Women Entrepreneurs
- `forBuyers/index.jsx` - For Buyers section
- `howItWorks/index.jsx` - How It Works process steps
- `joinMovement/index.jsx` - Final CTA section

## "Shop Now" Button Locations

The "Shop Now" button appears in **3 strategic locations**, all linking to `/home`:

1. **Hero Section** - Primary CTA button (top of page)
2. **Benefits Section** - After listing benefits for entrepreneurs
3. **Join Movement Section** - Final CTA at bottom of page

## Navigation Updates

Updated the main navigation bar to include:

- **Home** → `/` (Landing page)
- **Shop** → `/home` (Main shop/product page)
- Products, Brands, Shops, Campaigns, Contact, About (unchanged)

## Image Placeholders

All sections have image placeholders with dashed borders for easy identification:

- Hero section: "Hero Image Placeholder"
- Benefits section: "Women Listing Products Image"
- For Buyers section: "Empowerment Mission Banner"
- Join Movement section: "Call to Action Image"

## Routing Structure

```
/ (root)                    → Landing Page (Neki Mart empowerment)
/home                       → Main Shop Homepage (products, categories, etc.)
/products                   → Product listing
/brands                     → Brand listing
/shops                      → Shop listing
/campaigns                  → Campaigns
/contact                    → Contact page
/about                      → About page
... (other routes unchanged)
```

## Design Features

- Fully responsive design (mobile, tablet, desktop)
- Consistent Material-UI theming
- Smooth hover animations and transitions
- Color-coded sections for visual hierarchy
- Professional gradient backgrounds
- Icon-based visual elements (React Icons)
- Server-side rendering ready

## How to Replace Images

To replace placeholder images:

1. Find the `Box` component with dashed border
2. Replace the content with an `Image` or `img` tag
3. Or use the Box as a background with `backgroundImage` CSS property

Example:

```jsx
<Box
  sx={{
    backgroundImage: 'url(/path/to/image.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
    // ... other styles
  }}
/>
```

## Next Steps

1. Replace all image placeholders with actual images
2. Update SEO metadata for the landing page
3. Test all "Shop Now" buttons to ensure smooth navigation
4. Add analytics tracking for CTA button clicks
5. Consider A/B testing different CTA placements

## Notes

- The logo in the navbar links to `/` (landing page)
- All "Shop Now" buttons redirect to `/home` (main shop)
- "Start Selling" buttons link to `/create-shop`
- Landing page uses Server Components for optimal performance
- Revalidation set to 1 hour (3600 seconds) for landing page
