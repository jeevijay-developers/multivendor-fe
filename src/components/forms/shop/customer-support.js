import React from 'react';
import { Stack, TextField, Typography, styled } from '@mui/material';
// Styled label
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5
}));

export default function CustomerSupportForm({ formik }) {
  const { getFieldProps, touched, errors } = formik;

  return (
    <Stack spacing={2}>
      <div>
        <LabelStyle component="label" htmlFor="customer-support">
          Support Contact
        </LabelStyle>
        <TextField
          id="customer-support"
          fullWidth
          {...getFieldProps('customerSupport.supportContact')}
          error={Boolean(touched.customerSupport?.supportContact && errors.customerSupport?.supportContact)}
          helperText={touched.customerSupport?.supportContact && errors.customerSupport?.supportContact}
        />
      </div>
      <div>
        <LabelStyle component="label" htmlFor="support-hours">
          Support Hours
        </LabelStyle>
        <TextField
          id="support-hours"
          fullWidth
          {...getFieldProps('customerSupport.supportHours')}
          error={Boolean(touched.customerSupport?.supportHours && errors.customerSupport?.supportHours)}
          helperText={touched.customerSupport?.supportHours && errors.customerSupport?.supportHours}
        />
      </div>
    </Stack>
  );
}
