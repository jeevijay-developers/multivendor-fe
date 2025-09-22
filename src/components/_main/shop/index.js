'use client';

import * as React from 'react';
import { useState } from 'react';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  FormHelperText,
  Skeleton,
  FormControl,
  Typography,
  Select,
  TextField
} from '@mui/material';

import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from '@bprogress/next';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import ShopDetailsForm from '@/components/forms/shop/shop-details';
import { updateUserRole } from '@/redux/slices/user';
import * as api from 'src/services'; // adjust based on your actual path
import IdentityVerificationForm from '@/components/forms/shop/identity-verification';
import FinancialDetailsForm from '@/components/forms/shop/financial-details';
import TwoStepShopForm from '@/components/forms/shop/two-step-shop-form';
import { isValidPhoneNumber } from 'react-phone-number-input';

const STATUS_OPTIONS = ['pending', 'approved', 'in review', 'action required', 'cancel', 'closed'];
export default function ShopMain({ isShopLoading, shop, type }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isCreatingShop = type === 'create-shop';
  const isVendor = type === 'vendor';
  const isAdmin = type === 'admin';
  const [state, setstate] = useState({
    logoLoading: false,
    governmentIdLoading: false,
    proofOfAddressLoading: false,
    vendorAgreementLoading: false,
    aadharCardLoading: false,
    panCardLoading: false,
    cancelChequeLoading: false,
    name: '',
    search: '',
    open: false
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: isAdmin ? api.updateShopByAdmin : isVendor ? api.updateShopByVendor : api.addShopByVendor,
    retry: false,
    onSuccess: () => {
      if (isCreatingShop) {
        toast.success('🎉 Shop created successfully! Your shop is now under review.');
        dispatch(updateUserRole());
        router.push('/vendor/dashboard');
      } else if (isAdmin) {
        toast.success('✅ Shop updated successfully!');
        router.push('/admin/shops');
      } else {
        toast.success('✅ Shop details updated successfully!');
        router.push('/vendor/shops');
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });
  const ShopSettingSchema = Yup.object().shape({
    logo: Yup.object().required('Logo is required'),

    name: Yup.string().required('Shop name is required'),
    description: Yup.string().max(500, 'Description cannot exceed 500 characters').required('Description is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    address: Yup.object().shape({
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      streetAddress: Yup.string().required('Street address is required')
    }),
    contactPerson: Yup.string(),
    shopEmail: Yup.string().email('Invalid email').required('Shop email is required'),
    shopPhone: Yup.string()
      .required('Phone is required')
      .test('is-valid-phone', 'Shop Phone number is not valid', (value) => isValidPhoneNumber(value || '')),
    website: Yup.string().url('Invalid URL'),

    taxIdentificationNumber: Yup.string().required('Tax identification number is required'),
    vatRegistrationNumber: Yup.string(),
    identityVerification: Yup.object().shape({
      governmentId: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('Image url is required') }),
      proofOfAddress: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('Image url is required') })
    }),
    ownerDetails: Yup.object().shape({
      aadharCardNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Aadhar card number must be exactly 12 digits')
        .required('Aadhar card number is required'),
      panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN number must be in format ABCDE1234F')
        .required('PAN number is required'),
      ifscCode: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC code must be in valid format')
        .required('IFSC code is required'),
      gstNumber: Yup.string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'GST number must be in valid format')
        .required('GST number is required'),
      bankBranch: Yup.string().required('Bank branch is required'),
      accountNumber: Yup.string()
        .matches(/^[0-9]{9,18}$/, 'Account number must be between 9-18 digits')
        .required('Account number is required'),
      accountHolderName: Yup.string().required('Account holder name is required'),
      aadharCard: Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Aadhar card photo is required')
      }),
      panCard: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('PAN card photo is required') }),
      cancelCheque: Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Cancel cheque photo is required')
      })
    }),
    operationalDetails: Yup.object().shape({ returnPolicy: Yup.string(), handlingTime: Yup.string() }),
    ...(isVendor && {
      financialDetails: Yup.object().shape({
        paymentMethod: Yup.string().oneOf(['paypal', 'bank']).required('Payment method is required'),
        paypal: Yup.object().shape({
          email: Yup.string().when('paymentMethod', {
            is: 'paypal',
            then: (schema) => schema.email('Invalid email').required('PayPal email is required'),
            otherwise: (schema) => schema.notRequired()
          })
        }),
        bank: Yup.object().shape({
          accountNumber: Yup.string().when('paymentMethod', {
            is: 'bank',
            then: (schema) => schema.required('Account number is required'),
            otherwise: (schema) => schema.notRequired()
          }),
          bankName: Yup.string().when('paymentMethod', {
            is: 'bank',
            then: (schema) => schema.required('Bank name is required'),
            otherwise: (schema) => schema.notRequired()
          }),
          holderName: Yup.string().when('paymentMethod', {
            is: 'bank',
            then: (schema) => schema.required('Account holder name is required'),
            otherwise: (schema) => schema.notRequired()
          }),
          holderEmail: Yup.string()
            .email('Invalid email')
            .when('paymentMethod', {
              is: 'bank',
              then: (schema) => schema.required('Holder email is required'),
              otherwise: (schema) => schema.notRequired()
            }),
          address: Yup.string(),
          routingNumber: Yup.string(),
          swiftCode: Yup.string()
        })
      })
    })
  });
  const formik = useFormik({
    initialValues: {
      logo: isCreatingShop ? null : shop?.logo,
      name: isCreatingShop ? '' : (shop?.name ?? ''),
      slug: isCreatingShop ? '' : (shop?.slug ?? ''),
      metaTitle: isCreatingShop ? '' : (shop?.metaTitle ?? ''),
      description: isCreatingShop ? '' : (shop?.description ?? ''),
      metaDescription: isCreatingShop ? '' : (shop?.metaDescription ?? ''),
      registrationNumber: isCreatingShop ? '' : (shop?.registrationNumber ?? ''),
      address: {
        country: isCreatingShop ? '' : (shop?.address?.country ?? ''),
        city: isCreatingShop ? '' : (shop?.address?.city ?? ''),
        state: isCreatingShop ? '' : (shop?.address?.state ?? ''),
        streetAddress: isCreatingShop ? '' : (shop?.address?.streetAddress ?? '')
      },
      contactPerson: isCreatingShop ? '' : (shop?.contactPerson ?? ''),
      shopEmail: isCreatingShop ? '' : (shop?.shopEmail ?? ''),
      shopPhone: isCreatingShop ? '' : (shop?.shopPhone ?? ''),
      website: isCreatingShop ? '' : (shop?.website ?? ''),

      taxIdentificationNumber: isCreatingShop ? '' : (shop?.taxIdentificationNumber ?? ''),
      vatRegistrationNumber: isCreatingShop ? '' : (shop?.vatRegistrationNumber ?? ''),

      identityVerification: {
        governmentId: isCreatingShop ? null : (shop?.identityVerification?.governmentId ?? null),
        proofOfAddress: isCreatingShop ? null : (shop?.identityVerification?.proofOfAddress ?? null)
      },
      ownerDetails: {
        aadharCardNumber: isCreatingShop ? '' : (shop?.ownerDetails?.aadharCardNumber ?? ''),
        panNumber: isCreatingShop ? '' : (shop?.ownerDetails?.panNumber ?? ''),
        ifscCode: isCreatingShop ? '' : (shop?.ownerDetails?.ifscCode ?? ''),
        gstNumber: isCreatingShop ? '' : (shop?.ownerDetails?.gstNumber ?? ''),
        bankBranch: isCreatingShop ? '' : (shop?.ownerDetails?.bankBranch ?? ''),
        accountNumber: isCreatingShop ? '' : (shop?.ownerDetails?.accountNumber ?? ''),
        accountHolderName: isCreatingShop ? '' : (shop?.ownerDetails?.accountHolderName ?? ''),
        aadharCard: isCreatingShop ? null : (shop?.ownerDetails?.aadharCard ?? null),
        panCard: isCreatingShop ? null : (shop?.ownerDetails?.panCard ?? null),
        cancelCheque: isCreatingShop ? null : (shop?.ownerDetails?.cancelCheque ?? null)
      },
      financialDetails: isVendor
        ? {
            paymentMethod: shop?.financialDetails?.paymentMethod ?? 'paypal',
            paypal: {
              email: shop?.financialDetails?.paypal?.email ?? ''
            },
            bank: {
              accountNumber: shop?.financialDetails?.bank?.accountNumber ?? '',
              bankName: shop?.financialDetails?.bank?.bankName ?? '',
              holderName: shop?.financialDetails?.bank?.holderName ?? '',
              holderEmail: shop?.financialDetails?.bank?.holderEmail ?? '',
              address: shop?.financialDetails?.bank?.address ?? '',
              routingNumber: shop?.financialDetails?.bank?.routingNumber ?? '',
              swiftCode: shop?.financialDetails?.bank?.swiftCode ?? ''
            }
          }
        : undefined,
      logoFile: isCreatingShop ? null : shop?.logo?.url,
      governmentIdFile: isCreatingShop ? null : (shop?.identityVerification?.governmentId ?? null),
      proofOfAddressFile: isCreatingShop ? '' : (shop?.identityVerification?.proofOfAddress ?? ''),
      aadharCardFile: isCreatingShop ? null : (shop?.ownerDetails?.aadharCard ?? null),
      panCardFile: isCreatingShop ? null : (shop?.ownerDetails?.panCard ?? null),
      cancelChequeFile: isCreatingShop ? null : (shop?.ownerDetails?.cancelCheque ?? null),
      ...(isAdmin && {
        status: shop ? shop.status : STATUS_OPTIONS[0], // Only include message if shop exists
        message:
          shop?.status === 'cancel' || shop?.status === 'closed' || shop?.status === 'action required'
            ? shop.message
            : ''
      })
    },
    enableReinitialize: true,
    validationSchema: ShopSettingSchema,
    onSubmit: async (values) => {
      const {
        logoFile: _logoFile,
        governmentIdFile: _governmentIdFile,
        proofOfAddressFile: _proofOfAddressFile,
        aadharCardFile: _aadharCardFile,
        panCardFile: _panCardFile,
        cancelChequeFile: _cancelChequeFile,
        ...rest
      } = values;

      console.log('Form submission data:', rest);

      try {
        mutate({
          ...(!isCreatingShop && {
            currentSlug: shop?.slug
          }),
          ...rest
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  });
  const { setFieldValue, handleSubmit, values, touched, errors, getFieldProps } = formik;

  // handle drop
  const handleDrop = async (acceptedFiles, field) => {
    const split = field.split('.');
    setstate({ ...state, [`${split.length > 1 ? split[1] : split[0]}Loading`]: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, { preview: URL.createObjectURL(file) });
    }
    setFieldValue(`${split.length > 1 ? split[1] : split[0]}File`, file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nekimart');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, [`${split.length > 1 ? split[1] : split[0]}Loading`]: percentage });
      }
    };
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      )
      .then(({ data }) => {
        setFieldValue(field, { _id: data.public_id, url: data.secure_url });
        setstate({ ...state, [`${split.length > 1 ? split[1] : split[0]}Loading`]: false });
      })
      .then(() => {
        // if (values.file) {
        //   deleteMutate(values.cover._id);
        // }
        setstate({ ...state, [`${split.length > 1 ? split[1] : split[0]}Loading`]: false });
      });
  };
  const handleNameChange = (event) => {
    const title = event.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .replace(/\s+/g, '-'); // convert to lowercase, remove special characters, and replace spaces with hyphens
    formik.setFieldValue('slug', slug); // set the value of slug in the formik state
    formik.handleChange(event); // handle the change in formik
  };
  React.useEffect(() => {
    if (values.status === 'approved' || values.status === 'pending' || values.status === 'in review') {
      setFieldValue('message', ''); // Set message to empty string
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.status]);
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {isCreatingShop ? (
          <TwoStepShopForm
            isLoading={isShopLoading}
            handleDrop={handleDrop}
            handleNameChange={handleNameChange}
            state={state}
            formik={formik}
          />
        ) : (
          <Grid container spacing={2}>
            <Grid
              size={{
                md: 8
              }}
            >
              <Card>
                <CardHeader
                  title={<>{isShopLoading ? <Skeleton variant="text" height={28} width={240} /> : 'Shop details'}</>}
                />

                <CardContent>
                  <ShopDetailsForm
                    isLoading={isShopLoading}
                    handleDrop={handleDrop}
                    handleNameChange={handleNameChange}
                    state={state}
                    formik={formik}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid
              size={{
                md: 4
              }}
            >
              <Stack gap={2}>
                <Card>
                  <CardHeader
                    title={
                      <>
                        {isShopLoading ? <Skeleton variant="text" height={28} width={240} /> : 'Identity Verification'}
                      </>
                    }
                  />
                  <CardContent>
                    <IdentityVerificationForm
                      isLoading={isShopLoading}
                      handleDrop={handleDrop}
                      handleNameChange={handleNameChange}
                      state={state}
                      formik={formik}
                    />
                  </CardContent>
                </Card>
                {isVendor && (
                  <Card>
                    <CardHeader
                      title={
                        <>{isShopLoading ? <Skeleton variant="text" height={28} width={240} /> : 'Financial Details'}</>
                      }
                    />
                    <CardContent>
                      <FinancialDetailsForm isLoading={isShopLoading} state={state} formik={formik} />
                    </CardContent>
                  </Card>
                )}
                {isAdmin && (
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <FormControl fullWidth sx={{ select: { textTransform: 'capitalize' } }}>
                          <Stack gap={1}>
                            {isShopLoading ? (
                              <Skeleton variant="text" width={70} />
                            ) : (
                              <Typography variant="overline" component={'label'} htmlFor="status">
                                Status
                              </Typography>
                            )}
                            {isShopLoading ? (
                              <Skeleton variant="rectangular" width="100%" height={56} />
                            ) : (
                              <Select
                                id="status"
                                native
                                {...getFieldProps('status')}
                                error={Boolean(touched.status && errors.status)}
                              >
                                <option value="" style={{ display: 'none' }} />
                                {STATUS_OPTIONS.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </Stack>
                          {touched.status && errors.status && (
                            <FormHelperText error sx={{ px: 2, mx: 0 }}>
                              {touched.status && errors.status}
                            </FormHelperText>
                          )}
                        </FormControl>
                        {(values.status === 'cancel' ||
                          values.status === 'closed' ||
                          values.status === 'action required') && (
                          <Stack gap={1}>
                            {isShopLoading ? (
                              <Skeleton variant="text" width={150} />
                            ) : (
                              <Typography variant="overline" component={'label'} htmlFor="message">
                                Message
                              </Typography>
                            )}
                            {isShopLoading ? (
                              <Skeleton variant="rectangular" width="100%" height={240} />
                            ) : (
                              <TextField
                                id="message"
                                fullWidth
                                {...getFieldProps('message')}
                                error={Boolean(touched.message && errors.message)}
                                helperText={touched.message && errors.message}
                                rows={4}
                                multiline
                              />
                            )}
                          </Stack>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                )}
                <Button type="submit" variant="contained" fullWidth size="large" loading={isLoading}>
                  {isCreatingShop ? 'Create Shop' : 'Update Shop'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Form>
    </FormikProvider>
  );
}
