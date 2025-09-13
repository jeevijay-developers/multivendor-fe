import React from 'react';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddCouponCode from 'src/components/_admin/couponCodes/addCouponCode';
export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Add Cupon Code"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Coupon codes',
            href: '/admin/coupon-codes'
          },
          {
            name: 'Add coupon code'
          }
        ]}
      />
      <AddCouponCode />
    </div>
  );
}
