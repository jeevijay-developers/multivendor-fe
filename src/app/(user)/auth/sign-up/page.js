// guard
import GuestGuard from 'src/guards/guest';
// mui
import { Card, Container, Typography } from '@mui/material';
// components
import SignUpMain from '@/components/_main/auth/sign-up';

// Meta information
export const metadata = {
  title: 'Create Your Nextall Account | Join Us for Exclusive Deals and Seamless Shopping',
  description:
    'Register with Nextall today to unlock a world of exclusive deals, personalized recommendations, and secure transactions. Join our community for a seamless shopping experience. Sign up now and elevate your online shopping journey!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords: 'ecommerce, Nextall, Commerce, Register Nextall, RegisterFrom Nextall'
};

export default async function SignUp() {
  return (
    <>
      <GuestGuard>
        <Container maxWidth="sm">
          <Card
            sx={{
              maxWidth: 560,
              m: 'auto',
              my: '80px',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Sign up
            </Typography>
            <Typography color="text.secondary" mb={5} textAlign="center">
              Create your account
            </Typography>
            <SignUpMain />
          </Card>
        </Container>
      </GuestGuard>
    </>
  );
}
