import React from 'react';

// guard

import AdminGuard from 'src/guards/admin';

// layout
import DashboardLayout from 'src/layout/_admin';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function layout({ children }) {
  const res = await fetch(`${baseUrl}/api/branding`, { next: { revalidate: 60 } });
  const { data: branding } = await res.json();
  return (
    <AdminGuard>
      <DashboardLayout branding={branding}>{children}</DashboardLayout>
    </AdminGuard>
  );
}
