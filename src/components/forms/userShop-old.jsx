'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateUserRole } from 'src/redux/slices/user';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useRouter } from '@bprogress/next';
// mui
import { styled } from '@mui/material/styles';

import {
  Card,
  Button,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  FormHelperText,
  Grid,
  CardHeader,
  CardContent,
  Collapse
} from '@mui/material';
// components
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import UploadAvatar from 'src/components/upload/UploadAvatar';
import countries from 'src/data/countries.json';
// yup
import * as Yup from 'yup';
// axios
import axios from 'axios';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';
import { FaPaypal } from 'react-icons/fa';
import { CiBank } from 'react-icons/ci';

CreateShopSettingFrom.propTypes = { data: PropTypes.object, isLoading: PropTypes.bool };

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5
}));

export default function CreateShopSettingFrom() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    logoLoading: false,
    coverLoading: false,
    governmentIdLoading: false,
    proofOfAddressLoading: false,
    vendorAgreementLoading: false,
    name: '',
    search: '',
    open: false
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: api.addShopByUser,
    retry: false,
    onSuccess: () => {
      toast.success('Shop is under review!');
      dispatch(updateUserRole());
      router.push('/vendor/dashboard');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });
  const ShopSettingSchema = Yup.object().shape({
    slug: Yup.string().required('Slug is required'),
    logo: Yup.object().required('Logo is required'),

    name: Yup.string().required('Shop name is required'),
    metaTitle: Yup.string().max(100, 'Meta title cannot exceed 100 characters').required('Meta title is required'),
    description: Yup.string().max(500, 'Description cannot exceed 500 characters').required('Description is required'),
    metaDescription: Yup.string()
      .max(200, 'Meta description cannot exceed 200 characters')
      .required('Meta description is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    address: Yup.object().shape({
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      streetAddress: Yup.string().required('Street address is required')
    }),
    contactPerson: Yup.string(),
    shopEmail: Yup.string().email('Invalid email').required('Shop email is required'),
    shopPhone: Yup.string().required('Shop phone is required'),
    website: Yup.string().url('Invalid URL'),

    financialDetails: Yup.object().shape({
      paymentMethod: Yup.string().oneOf(['paypal', 'bank']).required('Payment method is required'),
      paypal: Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .when('paymentMethod', { is: 'paypal', then: Yup.string().required('PayPal email is required') })
      }),
      bank: Yup.object().shape({
        accountNumber: Yup.string().when('paymentMethod', {
          is: 'bank',
          then: Yup.string().required('Bank account number is required')
        }),
        bankName: Yup.string().when('paymentMethod', {
          is: 'bank',
          then: Yup.string().required('Bank name is required')
        }),
        holderName: Yup.string().when('paymentMethod', {
          is: 'bank',
          then: Yup.string().required('Account holder name is required')
        }),
        holderEmail: Yup.string()
          .email('Invalid email')
          .when('paymentMethod', { is: 'bank', then: Yup.string().required('Account holder email is required') }),
        address: Yup.string(),
        routingNumber: Yup.string(),
        swiftCode: Yup.string()
      }),
      taxIdentificationNumber: Yup.string().required('Tax identification number is required'),
      vatRegistrationNumber: Yup.string()
    }),
    identityVerification: Yup.object().shape({
      governmentId: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('Image url is required') }),
      proofOfAddress: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('Image url is required') })
    }),
    operationalDetails: Yup.object().shape({ returnPolicy: Yup.string(), handlingTime: Yup.string() }),
    legalAgreements: Yup.object().shape({
      termsAndConditions: Yup.string(),
      vendorAgreement: Yup.object().shape({ url: Yup.string().url('Invalid URL').required('Image url is required') })
    }),
    customerSupport: Yup.object().shape({
      supportContact: Yup.string().required('Support contact is required'),
      supportHours: Yup.string().required('Support hours are required')
    })
  });

  const formik = useFormik({
    initialValues: {
      logo: null,
      cover: null,
      name: '',
      slug: '',
      metaTitle: '',
      description: '',
      metaDescription: '',
      registrationNumber: '',
      address: { country: '', city: '', state: '', streetAddress: '' },
      contactPerson: '',
      shopEmail: '',
      shopPhone: '',
      website: '',

      financialDetails: {
        paymentMethod: 'paypal',
        paypal: { email: '' },
        bank: {
          accountNumber: '',
          bankName: '',
          holderName: '',
          holderEmail: '',
          address: '',
          routingNumber: '',
          swiftCode: ''
        },
        taxIdentificationNumber: '',
        vatRegistrationNumber: ''
      },
      identityVerification: { governmentId: null, proofOfAddress: null },
      operationalDetails: { returnPolicy: '', handlingTime: 0 },
      customerSupport: { supportContact: '', supportHours: '' },
      legalAgreements: { vendorAgreement: null, termsAndConditions: '', complianceDocuments: [null] },
      logoFile: null,
      coverFile: null,
      governmentIdFile: null,
      proofOfAddressFile: null,
      vendorAgreementFile: null
    },
    enableReinitialize: true,
    validationSchema: ShopSettingSchema,
    onSubmit: async (values) => {
      const {
        logoFile: _logoFile,
        coverFile: _coverFile,
        governmentIdFile: _governmentIdFile,
        proofOfAddressFile: _proofOfAddressFile,
        vendorAgreementFile: _vendorAgreementFile,
        ...rest
      } = values;

      try {
        mutate({ ...rest });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

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
  const handlenameChange = (event) => {
    const title = event.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .replace(/\s+/g, '-'); // convert to lowercase, remove special characters, and replace spaces with hyphens
    formik.setFieldValue('slug', slug); // set the value of slug in the formik state
    formik.handleChange(event); // handle the change in formik
  };

  return (
    <Box position="relative">
      <Typography variant="h2" color="text-primary" textAlign="center" py={6}>
        Create Shop
      </Typography>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ md: 8, xs: 12 }}>
              <Card>
                <CardHeader title="Shop details" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid size={3}>
                      <Stack direction="row" spacing={3} flexGrow="wrap">
                        <Box sx={{ width: '100%' }}>
                          <Stack direction="row">
                            <LabelStyle variant="body1" component={'label'} color="text.primary">
                              Logo
                            </LabelStyle>

                            <LabelStyle component={'label'} htmlFor="file">
                              <span>512 * 512</span>
                            </LabelStyle>
                          </Stack>
                          <UploadAvatar
                            accept="image/*"
                            file={values?.logoFile}
                            loading={state.logoLoading}
                            maxSize={3145728}
                            onDrop={(v) => handleDrop(v, 'logo')}
                            error={Boolean(touched?.logo && errors?.logo)}
                          />

                          {touched?.logo && errors?.logo && (
                            <FormHelperText error sx={{ px: 2, mx: 0 }}>
                              {touched?.logo && errors?.logo}
                            </FormHelperText>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid size={9}>
                      <Box>
                        <Stack direction="row" justifyContent="space-between">
                          <LabelStyle variant="body1" component={'label'} color="text.primary">
                            Cover
                          </LabelStyle>

                          <LabelStyle component={'label'} htmlFor="file">
                            <span>990 * 300</span>
                          </LabelStyle>
                        </Stack>

                        <UploadSingleFile
                          id="file"
                          file={values?.coverFile}
                          onDrop={(v) => handleDrop(v, 'cover')}
                          error={Boolean(touched?.cover && errors?.cover)}
                          category
                          accept="image/*"
                          loading={state.coverLoading}
                        />

                        {touched?.cover && errors?.cover && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched?.cover && errors?.cover}
                          </FormHelperText>
                        )}
                      </Box>{' '}
                    </Grid>
                  </Grid>
                  <Stack mt={3} spacing={3} direction="row" flexGrow="wrap">
                    <Box sx={{ width: '100%' }}>
                      <div>
                        <LabelStyle component={'label'} htmlFor="title">
                          Shop name
                        </LabelStyle>

                        <TextField
                          id="name"
                          fullWidth
                          {...getFieldProps('name')}
                          onChange={handlenameChange} // add onChange handler for name
                          error={Boolean(touched?.name && errors?.name)}
                          helperText={touched?.name && errors?.name}
                        />
                      </div>

                      <div>
                        <LabelStyle component={'label'} htmlFor="slug">
                          {' '}
                          {'Slug'}
                        </LabelStyle>

                        <TextField
                          fullWidth
                          id="slug"
                          {...getFieldProps('slug')}
                          error={Boolean(touched?.slug && errors?.slug)}
                          helperText={touched?.slug && errors?.slug}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="contactPerson">
                          {' '}
                          {'Contact Person'}
                        </LabelStyle>

                        <TextField
                          fullWidth
                          id="contactPerson"
                          {...getFieldProps('contactPerson')}
                          error={Boolean(touched?.contactPerson && errors?.contactPerson)}
                          helperText={touched?.contactPerson && errors?.contactPerson}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="registrationNumber">
                          {' '}
                          {'Registration Number'}
                        </LabelStyle>

                        <TextField
                          fullWidth
                          id="registrationNumber"
                          type="number"
                          {...getFieldProps('registrationNumber')}
                          error={Boolean(touched?.registrationNumber && errors?.registrationNumber)}
                          helperText={touched?.registrationNumber && errors?.registrationNumber}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="country">
                          Country
                        </LabelStyle>

                        <TextField
                          id="country"
                          select
                          fullWidth
                          placeholder="Country"
                          {...getFieldProps('address.country')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched?.address?.country && errors?.address?.country)}
                          helperText={touched?.address?.country && errors?.address?.country}
                        >
                          {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="city">
                          City
                        </LabelStyle>

                        <TextField
                          id="city"
                          fullWidth
                          {...getFieldProps('address.city')}
                          error={Boolean(touched?.address?.city && errors?.address?.city)}
                          helperText={touched?.address?.city && errors?.address?.city}
                        />
                      </div>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <div>
                        <LabelStyle component={'label'} htmlFor="meta-title">
                          {'Meta Title'}
                        </LabelStyle>

                        <TextField
                          id="meta-title"
                          fullWidth
                          {...getFieldProps('metaTitle')}
                          error={Boolean(touched?.metaTitle && errors?.metaTitle)}
                          helperText={touched?.metaTitle && errors?.metaTitle}
                        />
                      </div>

                      <div>
                        <LabelStyle component={'label'} htmlFor="shopEmail">
                          {' '}
                          Shop email
                        </LabelStyle>

                        <TextField
                          fullWidth
                          type="email"
                          id="shopEmail"
                          {...getFieldProps('shopEmail')}
                          error={Boolean(touched?.shopEmail && errors?.shopEmail)}
                          helperText={touched?.shopEmail && errors?.shopEmail}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="shopPhone">
                          {' '}
                          Shop Phone
                        </LabelStyle>

                        <TextField
                          fullWidth
                          type="number"
                          id="shopPhone"
                          {...getFieldProps('shopPhone')}
                          error={Boolean(touched?.shopPhone && errors?.shopPhone)}
                          helperText={touched?.shopPhone && errors?.shopPhone}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="website">
                          {' '}
                          Website
                        </LabelStyle>

                        <TextField
                          fullWidth
                          type="url"
                          id="website"
                          {...getFieldProps('website')}
                          error={Boolean(touched?.website && errors?.website)}
                          helperText={touched?.website && errors?.website}
                        />
                      </div>

                      <div>
                        <LabelStyle component={'label'} htmlFor="state">
                          State
                        </LabelStyle>

                        <TextField
                          id="state"
                          fullWidth
                          {...getFieldProps('address.state')}
                          error={Boolean(touched?.address?.state && errors?.address?.state)}
                          helperText={touched?.address?.state && errors?.address?.state}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="streetAddress">
                          Street Address
                        </LabelStyle>

                        <TextField
                          id="streetAddress"
                          fullWidth
                          {...getFieldProps('address.streetAddress')}
                          error={Boolean(touched?.address?.streetAddress && errors?.address?.streetAddress)}
                          helperText={touched?.address?.streetAddress && errors?.address?.streetAddress}
                        />
                      </div>
                    </Box>
                  </Stack>

                  <div>
                    <LabelStyle component={'label'} htmlFor="description">
                      {' '}
                      {'Description'}{' '}
                    </LabelStyle>

                    <TextField
                      fullWidth
                      id="description"
                      {...getFieldProps('description')}
                      error={Boolean(touched?.description && errors?.description)}
                      helperText={touched?.description && errors?.description}
                      rows={9}
                      multiline
                    />
                  </div>

                  <div>
                    {' '}
                    <LabelStyle component={'label'} htmlFor="meta-description">
                      {' '}
                      {'Meta Description'}{' '}
                    </LabelStyle>
                    <TextField
                      id="meta-description"
                      fullWidth
                      {...getFieldProps('metaDescription')}
                      error={Boolean(touched.metaDescription && errors?.metaDescription)}
                      helperText={touched?.metaDescription && errors?.metaDescription}
                      rows={9}
                      multiline
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ md: 4, xs: 12 }}>
              <div style={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}>
                <Stack spacing={3}>
                  <Card>
                    <CardHeader title="Financial Details" />
                    <CardContent>
                      <Stack spacing={2}>
                        <div>
                          <RadioGroup
                            value={values.financialDetails.paymentMethod}
                            onChange={(e) => setFieldValue('financialDetails.paymentMethod', e.target.value)}
                            sx={{ pl: 1 }}
                            row
                          >
                            <FormControlLabel
                              value="paypal"
                              control={<Radio />}
                              label={
                                <Stack
                                  direction="row"
                                  alignItem="center"
                                  spacing={1}
                                  ml={1}
                                  sx={{
                                    svg: {
                                      color:
                                        values.financialDetails.paymentMethod === 'paypal'
                                          ? 'primary.main'
                                          : 'text.primary'
                                    }
                                  }}
                                >
                                  <FaPaypal size={20} />
                                  <Typography variant="subtitle2">PayPal</Typography>
                                </Stack>
                              }
                            />
                            <FormControlLabel
                              value="bank"
                              control={<Radio />}
                              label={
                                <Stack
                                  direction="row"
                                  alignItem="center"
                                  spacing={1}
                                  ml={1}
                                  sx={{
                                    svg: {
                                      color:
                                        values.financialDetails.paymentMethod === 'bank'
                                          ? 'primary.main'
                                          : 'text.primary'
                                    }
                                  }}
                                >
                                  <CiBank size={20} />
                                  <Typography variant="subtitle2">Bank Transfer</Typography>
                                </Stack>
                              }
                            />
                          </RadioGroup>
                        </div>
                        <Collapse in={values.financialDetails.paymentMethod === 'paypal'}>
                          <div>
                            <LabelStyle component={'label'} htmlFor="paypal-email">
                              Paypal Email
                            </LabelStyle>

                            <TextField
                              id="paypal-email"
                              fullWidth
                              type="email"
                              {...getFieldProps('financialDetails.paypal.email')}
                              error={Boolean(
                                touched.financialDetails?.paypal?.email && errors.financialDetails?.paypal?.email
                              )}
                              helperText={
                                touched.financialDetails?.paypal?.email && errors.financialDetails?.paypal?.email
                              }
                            />
                          </div>
                        </Collapse>
                        <Collapse in={values.financialDetails.paymentMethod === 'bank'}>
                          <>
                            <div>
                              <LabelStyle component={'label'} htmlFor="holder-name">
                                Holder Name
                              </LabelStyle>

                              <TextField
                                id="holder-name"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.holderName')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.holderName &&
                                    errors.financialDetails?.bank?.holderName
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.holderName &&
                                  errors.financialDetails?.bank?.holderName
                                }
                              />
                            </div>
                            <div>
                              <LabelStyle component={'label'} htmlFor="holder-email">
                                Holder Email
                              </LabelStyle>

                              <TextField
                                id="holder-email"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.holderEmail')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.holderEmail &&
                                    errors.financialDetails?.bank?.holderEmail
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.holderEmail &&
                                  errors.financialDetails?.bank?.holderEmail
                                }
                              />
                            </div>
                            <div>
                              <LabelStyle component={'label'} htmlFor="bank-name">
                                Bank Name
                              </LabelStyle>

                              <TextField
                                id="bank-name"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.bankName')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.bankName && errors.financialDetails?.bank?.bankName
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.bankName && errors.financialDetails?.bank?.bankName
                                }
                              />
                            </div>
                            <div>
                              <LabelStyle component={'label'} htmlFor="account-number">
                                Account Number
                              </LabelStyle>

                              <TextField
                                id="account-number"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.accountNumber')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.accountNumber &&
                                    errors.financialDetails?.bank?.accountNumber
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.accountNumber &&
                                  errors.financialDetails?.bank?.accountNumber
                                }
                              />
                            </div>
                            <div>
                              <LabelStyle component={'label'} htmlFor="account-number">
                                Routing Number
                              </LabelStyle>

                              <TextField
                                id="account-number"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.routingNumber')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.routingNumber &&
                                    errors.financialDetails?.bank?.routingNumber
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.routingNumber &&
                                  errors.financialDetails?.bank?.routingNumber
                                }
                              />
                            </div>
                            <div>
                              <LabelStyle component={'label'} htmlFor="account-number">
                                Swift Code
                              </LabelStyle>

                              <TextField
                                id="account-number"
                                fullWidth
                                {...getFieldProps('financialDetails.bank.swiftCode')}
                                error={Boolean(
                                  touched.financialDetails?.bank?.swiftCode && errors.financialDetails?.bank?.swiftCode
                                )}
                                helperText={
                                  touched.financialDetails?.bank?.swiftCode && errors.financialDetails?.bank?.swiftCode
                                }
                              />
                            </div>
                          </>
                        </Collapse>
                        <div>
                          <LabelStyle component={'label'} htmlFor="account-number">
                            TAX Identification Number
                          </LabelStyle>

                          <TextField
                            id="account-number"
                            fullWidth
                            {...getFieldProps('financialDetails.taxIdentificationNumber')}
                            error={Boolean(
                              touched.financialDetails?.taxIdentificationNumber &&
                                errors.financialDetails?.taxIdentificationNumber
                            )}
                            helperText={
                              touched.financialDetails?.taxIdentificationNumber &&
                              errors.financialDetails?.taxIdentificationNumber
                            }
                          />
                        </div>
                        <div>
                          <LabelStyle component={'label'} htmlFor="account-number">
                            VAT Registration Number
                          </LabelStyle>

                          <TextField
                            id="account-number"
                            fullWidth
                            {...getFieldProps('financialDetails.vatRegistrationNumber')}
                            error={Boolean(
                              touched.financialDetails?.vatRegistrationNumber &&
                                errors.financialDetails?.vatRegistrationNumber
                            )}
                            helperText={
                              touched.financialDetails?.vatRegistrationNumber &&
                              errors.financialDetails?.vatRegistrationNumber
                            }
                          />
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader title="Identity Verification" />
                    <CardContent>
                      <Stack spacing={2}>
                        <Box>
                          <Stack direction="row" justifyContent="space-between">
                            <LabelStyle variant="body1" component={'label'} color="text.primary">
                              Government ID
                            </LabelStyle>
                          </Stack>

                          <UploadSingleFile
                            id="file"
                            file={values?.governmentIdFile}
                            onDrop={(v) => handleDrop(v, 'identityVerification.governmentId')}
                            error={Boolean(
                              touched?.identityVerification?.governmentId && errors?.identityVerification?.governmentId
                            )}
                            category
                            accept="image/*"
                            loading={state.governmentIdLoading}
                          />

                          {touched?.identityVerification?.governmentId &&
                            errors?.identityVerification?.governmentId && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched?.identityVerification?.governmentId &&
                                  errors?.identityVerification?.governmentId}
                              </FormHelperText>
                            )}
                        </Box>{' '}
                        <Box>
                          <Stack direction="row" justifyContent="space-between">
                            <LabelStyle variant="body1" component={'label'} color="text.primary">
                              Proof Of Address
                            </LabelStyle>
                          </Stack>

                          <UploadSingleFile
                            id="file"
                            file={values?.proofOfAddressFile}
                            onDrop={(v) => handleDrop(v, 'identityVerification.proofOfAddress')}
                            error={Boolean(
                              touched?.identityVerification?.proofOfAddress &&
                                errors?.identityVerification?.proofOfAddress
                            )}
                            category
                            accept="image/*"
                            loading={state.proofOfAddressLoading}
                          />

                          {touched?.identityVerification?.proofOfAddress &&
                            errors?.identityVerification?.proofOfAddress && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched?.identityVerification?.proofOfAddress &&
                                  errors?.identityVerification?.proofOfAddress}
                              </FormHelperText>
                            )}
                        </Box>{' '}
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader title="Operational Details" />
                    <CardContent>
                      <Stack spacing={2}>
                        <div>
                          <LabelStyle component={'label'} htmlFor="return-policy">
                            Return Policy
                          </LabelStyle>

                          <TextField
                            id="return-policy"
                            fullWidth
                            {...getFieldProps('operationalDetails.returnPolicy')}
                            error={Boolean(
                              touched.operationalDetails?.returnPolicy && errors.operationalDetails?.returnPolicy
                            )}
                            helperText={
                              touched.operationalDetails?.returnPolicy && errors.operationalDetails?.returnPolicy
                            }
                          />
                        </div>
                        <Box>
                          <Stack direction="row" justifyContent="space-between">
                            <LabelStyle variant="body1" component={'label'} color="text.primary">
                              Signed Vendor Agreement
                            </LabelStyle>
                          </Stack>

                          <UploadSingleFile
                            id="vendor-agreement"
                            file={values?.vendorAgreementFile}
                            onDrop={(v) => handleDrop(v, 'legalAgreements.vendorAgreement')}
                            error={Boolean(
                              touched?.legalAgreements?.vendorAgreement && errors?.legalAgreements?.vendorAgreement
                            )}
                            category
                            accept="image/*"
                            loading={state.vendorAgreementLoading}
                          />

                          {touched?.legalAgreements?.vendorAgreement && errors?.legalAgreements?.vendorAgreement && (
                            <FormHelperText error sx={{ px: 2, mx: 0 }}>
                              {touched?.legalAgreements?.vendorAgreement && errors?.legalAgreements?.vendorAgreement}
                            </FormHelperText>
                          )}
                        </Box>{' '}
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader title="Customer Support" />
                    <CardContent>
                      <Stack spacing={2}>
                        <div>
                          <LabelStyle component={'label'} htmlFor="customer-support">
                            Support Contact
                          </LabelStyle>

                          <TextField
                            id="customer-support"
                            fullWidth
                            {...getFieldProps('customerSupport.supportContact')}
                            error={Boolean(
                              touched.customerSupport?.supportContact && errors.customerSupport?.supportContact
                            )}
                            helperText={
                              touched.customerSupport?.supportContact && errors.customerSupport?.supportContact
                            }
                          />
                        </div>
                        <div>
                          <LabelStyle component={'label'} htmlFor="support-hours">
                            Support Hours
                          </LabelStyle>

                          <TextField
                            id="support-hours"
                            fullWidth
                            {...getFieldProps('customerSupport.supportHours')}
                            error={Boolean(
                              touched.customerSupport?.supportHours && errors.customerSupport?.supportHours
                            )}
                            helperText={touched.customerSupport?.supportHours && errors.customerSupport?.supportHours}
                          />
                        </div>{' '}
                      </Stack>
                    </CardContent>
                  </Card>
                  <Button type="submit" variant="contained" size="large" loading={isLoading} sx={{ ml: 'auto', mt: 3 }}>
                    Save
                  </Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
