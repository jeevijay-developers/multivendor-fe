import React from 'react';

// guard
import VendorGuard from 'src/guards/vendor';

// layout
import VendorLayout from 'src/layout/_vendor';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function layout({ children }) {
  const res = await fetch(`${baseUrl}/api/branding`, { next: { revalidate: 60 } });
  const { data: branding } = await res.json();
  return (
    <VendorGuard>
      <VendorLayout branding={branding}>{children}</VendorLayout>
    </VendorGuard>
  );
}
