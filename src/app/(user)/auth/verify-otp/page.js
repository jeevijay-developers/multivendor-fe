import React from 'react';

// guard
import AuthGuard from 'src/guards/auth';

//  components
import OTPMain from 'src/components/_main/auth/otp';

// Meta information
export const metadata = {
  title: 'Verify Your Email with Nextall | Confirm Your Account for Secure Shopping',
  description:
    'Complete the email verification process at Nextall to ensure a secure and personalized shopping experience. Confirm your account and gain access to exclusive features. Shop confidently with a verified email. Verify now!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords: 'ecommerce, Nextall, Commerce, VerifyEmail Nextall, VerifyEmail Page Nextall'
};
export default async function VerifyOTP() {
  return (
    <AuthGuard>
      <OTPMain />
    </AuthGuard>
  );
}
