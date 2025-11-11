// Landing Page - Neki Mart Empowerment Platform

import React from 'react';

// Landing Page Components
import LandingHero from 'src/components/_main/landing/hero';
import WhyChoose from 'src/components/_main/landing/whyChoose';
import Benefits from 'src/components/_main/landing/benefits';
import ForBuyers from 'src/components/_main/landing/forBuyers';
import HowItWorks from 'src/components/_main/landing/howItWorks';
import JoinMovement from 'src/components/_main/landing/joinMovement';

export const revalidate = 3600; // Revalidate every hour

export default function LandingPage() {
  return (
    <>
      {/* Hero Section with main CTA */}
      <LandingHero />

      {/* Why Choose Neki Mart */}
      <WhyChoose />

      {/* Benefits for Women Entrepreneurs with Shop Now button */}
      <Benefits />

      {/* For Buyers Section */}
      <ForBuyers />

      {/* How It Works */}
      <HowItWorks />

      {/* Join the Movement CTA with Shop Now button */}
      <JoinMovement />
    </>
  );
}
