'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// mui
import { TextField, Stack, InputAdornment, Button, Typography } from '@mui/material';

// icons
import { IoMdMail } from 'react-icons/io';
// components
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// api
import * as api from 'src/services';
import { useMutation } from '@tanstack/react-query';

export default function ForgetPasswordForm({ ...props }) {
  const { onSent, onGetEmail } = props;
  const isMountedRef = useIsMountedRef();
  const [loading, setloading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: api.forgetPassword,
    onSuccess: () => {
      onSent();
      toast.success('Email sent, check inbox');
      setloading(false);
    },
    onError: (err) => {
      setloading(false);
      const message = err?.response?.data?.message;
      toast.error(message || 'Email incorrect, please try again.');
    }
  });

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email').required('Email is required')
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setloading(true);
        onGetEmail(values.email);
        await mutate({ email: values.email, origin: window.location.origin });
      } catch (error) {
        if (isMountedRef.current) {
          toast.error(error.message);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              type={'text'}
              {...getFieldProps('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Send Email
          </Button>
        </Stack>
      </Form>
      {/* )} */}
    </FormikProvider>
  );
}
ForgetPasswordForm.propTypes = { onSent: PropTypes.func.isRequired, onGetEmail: PropTypes.func.isRequired };
