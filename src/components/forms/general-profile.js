'use client';
// react
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from '@bprogress/next';
// icons
import { MdVerified } from 'react-icons/md';
// mui
import { Grid, Card, Stack, TextField, Typography, FormHelperText, Button, Skeleton, CardContent } from '@mui/material';
import PhoneInputField from 'src/components/phone-input-field';
// component
import UploadAvatar from 'src/components/upload/UploadAvatar';
import countries from 'src/data/countries.json';
// api
import * as api from 'src/services';
// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// axios
import axios from 'axios';
// redux
import { useDispatch } from 'react-redux';
import { signIn } from 'src/redux/slices/user';
import { isValidPhoneNumber } from 'react-phone-number-input';

export default function GeneralProfileForm({ user, isLoading, avatarId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const { mutate, isPending: updateLoading } = useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (res) => {
      dispatch(signIn(res.data));
      toast.success('Updated profile');
    }
  });

  const { mutate: avatarMutate, isPending: avatarLoading } = useMutation({
    mutationFn: api.singleDeleteFile,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });

  const { mutate: ResendOTPMutate } = useMutation({
    mutationFn: api.resendOTP,
    retry: false,
    onSuccess: async () => {
      toast.success('OTP resent');
      setVerifyLoading(false);
      router.push('/auth/verify-otp');
    },
    onError: () => {
      toast.error('Invalid OTP.');
      setVerifyLoading(false);
    }
  });

  const [loading, setLoading] = React.useState(100);
  const [verifyLoading, setVerifyLoading] = React.useState(false);

  const callbackLoading = useCallback(
    (value) => {
      setLoading(value);
    },
    [setLoading]
  );

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    phone: Yup.string()
      .required('Phone Number is required')
      .test('is-valid-phone', 'Phone number is not valid', (value) => isValidPhoneNumber(value || '')),
    gender: Yup.string().required('Gender required')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      photoURL: user?.cover?.url || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      about: user?.about || '',
      file: '',
      cover: user?.cover,
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      country: user?.country || 'Andorra',
      zip: user?.zip || ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const { photoURL: _photoURL, file: _file, ...rest } = values;
      mutate({ ...rest });
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoadingUpload(true);
      setFieldValue('file', file);
      setFieldValue('photoURL', { ...file, preview: URL.createObjectURL(file) });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          callbackLoading(percentage);
        }
      };
      await axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
        .then(({ data }) => {
          setFieldValue('cover', { _id: data.public_id, url: data.secure_url });
        })
        .then(() => {
          avatarId && avatarMutate(avatarId);
          setLoadingUpload(false);
        });
    }
  };

  const onVerifyAccount = () => {
    setVerifyLoading(true);
    ResendOTPMutate({ email: user.email });
  };
  console.log(errors, 'errors');
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ md: 4, xs: 12 }}>
            <Card sx={{ py: 5, textAlign: 'center' }}>
              <CardContent>
                {isLoading || avatarLoading || loadingUpload ? (
                  <Stack alignItems="center">
                    <Skeleton variant="circular" width={142} height={142} />
                    <Skeleton variant="text" width={150} sx={{ mt: 1 }} />
                  </Stack>
                ) : (
                  <UploadAvatar
                    accept="image/*"
                    file={values.photoURL}
                    loading={loading}
                    maxSize={3145728}
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                    caption={
                      <>
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 1,
                            position: 'relative',
                            cursor: 'pointer',
                            svg: {
                              color: 'primary.main',
                              position: 'absolute',
                              top: '-121px',
                              right: '35%',
                              transform: 'translate(24%, -100%)'
                            }
                          }}
                        >
                          {user?.isVerified && <MdVerified size={24} />}
                          Allowed *.jpeg, *.jpg, *.png, *.gif
                        </Typography>
                      </>
                    }
                  />
                )}
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.photoURL && errors.photoURL}
                </FormHelperText>
                {isLoading || user?.isVerified ? (
                  ''
                ) : (
                  <Button loading={verifyLoading} variant="text" color="primary" onClick={onVerifyAccount}>
                    Verify Account
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ md: 8, xs: 12 }}>
            <Card>
              <CardContent>
                <Stack spacing={{ xs: 2 }}>
                  {/* First + Last Name */}
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    {/* First Name */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'First Name'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          id="first-name"
                          fullWidth
                          {...getFieldProps('firstName')}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      )}
                    </Stack>

                    {/* Last Name */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'Last Name'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          id="last-name"
                          fullWidth
                          {...getFieldProps('lastName')}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      )}
                    </Stack>
                  </Stack>
                  {/* Phone + Gender */}
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    {/* Phone */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'Phone'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <PhoneInputField
                          error={errors?.phone}
                          onChange={(val) => setFieldValue('phone', val)}
                          value={values.phone}
                        />
                      )}
                    </Stack>

                    {/* Gender */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'Gender'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          select
                          fullWidth
                          id="gender"
                          placeholder="Gender"
                          {...getFieldProps('gender')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched.gender && errors.gender)}
                          helperText={touched.gender && errors.gender}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </TextField>
                      )}
                    </Stack>
                  </Stack>
                  {/* Address */}
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      {isLoading ? <Skeleton variant="text" width={120} /> : 'Address'}
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="rounded" height={56} />
                    ) : (
                      <TextField
                        id="address"
                        fullWidth
                        {...getFieldProps('address')}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                      />
                    )}
                  </Stack>
                  {/* Country */}
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      {isLoading ? <Skeleton variant="text" width={120} /> : 'Country'}
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="rounded" height={56} />
                    ) : (
                      <TextField
                        id="country"
                        select
                        fullWidth
                        placeholder="Country"
                        {...getFieldProps('country')}
                        SelectProps={{ native: true }}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                      >
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    )}
                  </Stack>
                  {/* City, State, Zip */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {/* City */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'Town City'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          id="city"
                          fullWidth
                          {...getFieldProps('city')}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      )}
                    </Stack>

                    {/* State */}
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'State'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          id="state"
                          fullWidth
                          {...getFieldProps('state')}
                          error={Boolean(touched.state && errors.state)}
                          helperText={touched.state && errors.state}
                        />
                      )}
                    </Stack>
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary">
                        {isLoading ? <Skeleton variant="text" width={120} /> : 'Zip/Postal Code'}
                      </Typography>
                      {isLoading ? (
                        <Skeleton variant="rounded" height={56} />
                      ) : (
                        <TextField
                          fullWidth
                          {...getFieldProps('zip')}
                          error={Boolean(touched.zip && errors.zip)}
                          helperText={touched.zip && errors.zip}
                          type="number"
                        />
                      )}
                    </Stack>
                  </Stack>
                  {/* About */}
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary">
                      {isLoading ? <Skeleton variant="text" width={120} /> : 'About'}
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="rounded" height={100} />
                    ) : (
                      <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} id="about" />
                    )}
                  </Stack>{' '}
                  <Stack alignItems="end">
                    {/* Save button */}
                    {isLoading ? (
                      <Skeleton height={56} width={81} variant="rounded" />
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={updateLoading || avatarLoading || loadingUpload}
                      >
                        Save
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
