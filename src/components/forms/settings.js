'use client';
import * as Yup from 'yup';
import { useState } from 'react';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// mui
import {
  Typography,
  Stack,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Select,
  Chip,
  Autocomplete,
  Button
} from '@mui/material';
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
// api
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as api from 'src/services';

const WEBSITE_OPTIONS = [
  { label: 'no', value: false },
  { label: 'yes', value: true }
];

const FONT_FAMILIES = [
  { label: 'Figtree', value: 'figtree' },
  { label: 'Montserrat', value: 'montserrat' },
  { label: 'Roboto', value: 'roboto' },
  { label: 'Open Sans', value: 'open-sans' }
];

export default function ThemeSettingForm({ ...props }) {
  const { currentSetting } = props;
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({
    logoDarkLoading: false,
    logoLightLoading: false,
    faviconLoading: false,
    loading: false
  });

  const { mutate } = useMutation({
    mutationKey: ['create-general-setting'],
    mutationFn: api.updateSettingsByAdmin,
    onSuccess: async () => {
      setloading(false);
      toast.success('Theme Update successfully!');
    },
    onError: (err) => {
      setloading(false);
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ['delete-file'],
    mutationFn: api.singleDeleteFile,
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  });
  const ThemeSettingFormSchema = Yup.object().shape({
    mainSettings: Yup.object().shape({
      businessName: Yup.string().required('Business Name is required'),
      domainName: Yup.string().required('Domain Name is required'),

      websiteStatus: Yup.string().required('Website Status is required'),
      offlineMessage: Yup.string().required('Offline Message is required'),

      seo: Yup.object().shape({
        metaTitle: Yup.string().required('Meta Title is required'),
        description: Yup.string().required('Description is required'),
        metaDescription: Yup.string().required('Meta Description is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required')
      }),
      theme: Yup.object().shape({
        palette: Yup.object().shape({
          primary: Yup.string().required('Primary color is required'),
          secondary: Yup.string().required('Secondary color is required'),
          defaultDark: Yup.string().required('Default Dark color is required'),
          defaultLight: Yup.string().required('Default Light color is required'),
          paperDark: Yup.string().required('Paper Dark color is required'),
          paperLight: Yup.string().required('Paper Light color is required')
        })
      })
    }),
    logoDark: Yup.object().shape({
      _id: Yup.string().required('Id is required'),
      url: Yup.string().required('Dark logo URL is required')
    }),
    logoLight: Yup.object().shape({
      _id: Yup.string().required('Id is required'),
      url: Yup.string().required('Light logo URL is required')
    }),
    favicon: Yup.object().shape({
      _id: Yup.string().required('favicon _id is required'),
      url: Yup.string().required('favicon URL is required')
    }),
    contact: Yup.object().shape({
      address: Yup.string().required('Address is required'),
      addressOnMap: Yup.string().required('Address on Map is required'),
      lat: Yup.string().required('Latitude is required'),
      long: Yup.string().required('Longitude is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      whatsappNo: Yup.string().required('Whatsapp Number is required')
    }),
    socialLinks: Yup.object().shape({
      facebook: Yup.string().required('Facebook link is required'),
      twitter: Yup.string().required('Twitter link is required'),
      linkedin: Yup.string().required('LinkedIn link is required'),
      instagram: Yup.string().required('Instagram link is required'),
      whatsapp: Yup.string().required('WhatsApp link is required')
    }),
    systemSettings: Yup.object().shape({
      gaId: Yup.string().required('GA Id is required'),
      gtmId: Yup.string().required('GTM Id is required')
    })
  });

  const formik = useFormik({
    initialValues: {
      mainSettings: {
        businessName: currentSetting?.mainSettings?.businessName || '',
        domainName: currentSetting?.mainSettings?.domainName || '',

        websiteStatus: currentSetting?.mainSettings?.websiteStatus || false,
        offlineMessage: currentSetting?.mainSettings?.offlineMessage || '',

        seo: {
          metaTitle: currentSetting?.mainSettings?.seo?.metaTitle || '',
          description: currentSetting?.mainSettings?.seo?.description || '',
          metaDescription: currentSetting?.mainSettings?.seo?.metaDescription || '',
          tags: currentSetting?.mainSettings?.seo?.tags || []
        },
        theme: {
          palette: {
            primary: currentSetting?.mainSettings?.theme?.palette?.primary || '#7E6767',
            secondary: currentSetting?.mainSettings?.theme?.palette?.secondary || '#7E6767',
            defaultDark: currentSetting?.mainSettings?.theme?.palette?.defaultDark || '#7E6767',
            defaultLight: currentSetting?.mainSettings?.theme?.palette?.defaultLight || '#7E6767',
            paperDark: currentSetting?.mainSettings?.theme?.palette?.paperDark || '#7E6767',
            paperLight: currentSetting?.mainSettings?.theme?.palette?.paperLight || '#7E6767'
          },
          themeName: 'default',
          fontFamily: currentSetting?.mainSettings?.theme?.fontFamily || 'figtree'
        }
      },
      contact: {
        address: currentSetting?.contact?.address || '',
        addressOnMap: currentSetting?.contact?.addressOnMap || '',
        lat: currentSetting?.contact?.lat || '',
        long: currentSetting?.contact?.long || '',
        email: currentSetting?.contact?.email || '',
        phone: currentSetting?.contact?.phone || '',
        whatsappNo: currentSetting?.contact?.whatsappNo || ''
      },
      fileLogoDark: currentSetting?.fileLogoDark || '',
      fileLogoLight: currentSetting?.fileLogoLight || '',
      fileFavico: currentSetting?.fileFavico || '',
      logoDark: currentSetting?.logoDark || null,
      logoLight: currentSetting?.logoLight || null,
      favicon: currentSetting?.favicon || null,
      socialLinks: {
        facebook: currentSetting?.socialLinks?.facebook || '',
        twitter: currentSetting?.socialLinks?.twitter || '',
        linkedin: currentSetting?.socialLinks?.linkedin || '',
        instagram: currentSetting?.socialLinks?.instagram || '',
        whatsapp: currentSetting?.socialLinks?.whatsapp || ''
      },
      systemSettings: {
        gaId: currentSetting?.systemSettings?.gaId || '',
        gtmId: currentSetting?.systemSettings?.gtmId || ''
      }
    },
    validationSchema: ThemeSettingFormSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setloading(true);
      mutate(values);
    }
  });

  const { errors, touched, values, handleSubmit, setFieldValue, getFieldProps } = formik;

  // handle drop logo
  const handleDropLogoDark = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nekimart');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, logoDarkLoading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('logoDark', {
          _id: data.public_id,
          url: data.secure_url
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        if (values?.logoDark) {
          deleteMutate(values?.logoDark?._id);
        }
        setstate({ ...state, loading: false });
      });
  };
  const handleDropLogoLight = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nekimart');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, logoLightLoading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('logoLight', {
          _id: data.public_id,
          url: data.secure_url
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        if (values?.logoLight) {
          deleteMutate(values?.logoLight?._id);
        }
        setstate({ ...state, loading: false });
      });
  };
  const handleDropLogoFavicon = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nekimart');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, faviconLoading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('favicon', {
          _id: data.public_id,
          url: data.secure_url
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        if (values?.favicon) {
          deleteMutate(values?.favicon?._id);
        }
        setstate({ ...state, loading: false });
      });
  };
  console.log(errors, values, 'errors');
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            size={{
              md: 8,
              xs: 12
            }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Main Setting</Typography>
                  <Typography variant="body1">Application name and tags</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="businessName" component={'label'}>
                        Business Name
                      </Typography>
                      <TextField
                        id="businessName"
                        fullWidth
                        type="text"
                        {...getFieldProps('mainSettings.businessName')}
                        error={Boolean(touched.mainSettings?.businessName && errors.mainSettings?.businessName)}
                        helperText={touched.mainSettings?.businessName && errors.mainSettings?.businessName}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="domainName" component={'label'}>
                        Domain Name
                      </Typography>
                      <TextField
                        id="domainName"
                        fullWidth
                        type="text"
                        {...getFieldProps('mainSettings.domainName')}
                        error={Boolean(touched.mainSettings?.domainName && errors.mainSettings?.domainName)}
                        helperText={touched.mainSettings?.domainName && errors.mainSettings?.domainName}
                      />
                    </Stack>
                  </Grid>

                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <FormControl fullWidth sx={{ select: { textTransform: 'capitalize' } }}>
                      <Stack gap={0.5} width={1}>
                        <Typography variant="overline" color="text.primary" htmlFor="websiteStatus" component={'label'}>
                          Website Offline
                        </Typography>

                        <Select
                          id="websiteStatus"
                          native
                          {...getFieldProps('mainSettings.websiteStatus')}
                          error={Boolean(touched.mainSettings?.websiteStatus && errors.mainSettings?.websiteStatus)}
                        >
                          <option value="" style={{ display: 'none' }} />
                          {WEBSITE_OPTIONS.map((websiteStatus) => (
                            <option key={Math.random()} value={websiteStatus.value}>
                              {websiteStatus.label}
                            </option>
                          ))}
                        </Select>
                      </Stack>

                      {touched.mainSettings?.websiteStatus && errors.mainSettings?.websiteStatus && (
                        <FormHelperText error sx={{ px: 2, mx: 0 }}>
                          {touched.mainSettings?.websiteStatus && errors.mainSettings?.websiteStatus}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="title" component={'label'}>
                        Meta Title
                      </Typography>
                      <TextField
                        id="title"
                        fullWidth
                        autoComplete="username"
                        type="text"
                        {...formik.getFieldProps('mainSettings.seo.metaTitle')} // Accessing metaTitle within mainSettings?.seo object
                        error={Boolean(
                          formik.touched.mainSettings?.seo?.metaTitle && formik.errors.mainSettings?.seo?.metaTitle
                        )}
                        helperText={
                          formik.touched.mainSettings?.seo?.metaTitle && formik.errors.mainSettings?.seo?.metaTitle
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="tags" component={'label'}>
                        Meta Tags
                      </Typography>
                      <Autocomplete
                        id="tags"
                        multiple
                        freeSolo
                        value={values.mainSettings?.seo?.tags}
                        onChange={(event, newValue) => {
                          setFieldValue('mainSettings.seo.tags', newValue);
                        }}
                        options={[]}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={index} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(touched.mainSettings?.seo?.tags && errors.mainSettings?.seo?.tags)}
                            helperText={touched.mainSettings?.seo?.tags && errors.mainSettings?.seo?.tags}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        htmlFor="meta-description"
                        component={'label'}
                      >
                        Meta Description
                      </Typography>
                      <TextField
                        id="meta-description"
                        fullWidth
                        {...getFieldProps('mainSettings.seo.metaDescription')}
                        error={Boolean(
                          touched.mainSettings?.seo?.metaDescription && errors.mainSettings?.seo?.metaDescription
                        )}
                        helperText={
                          touched.mainSettings?.seo?.metaDescription && errors.mainSettings?.seo?.metaDescription
                        }
                        rows={5}
                        multiline
                      />
                    </Stack>
                  </Grid>

                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="offlineMessage" component={'label'}>
                        Offline Message
                      </Typography>
                      <TextField
                        id="offlineMessage"
                        fullWidth
                        {...getFieldProps('mainSettings.offlineMessage')}
                        error={Boolean(touched.mainSettings?.offlineMessage && errors.mainSettings?.offlineMessage)}
                        helperText={touched.mainSettings?.offlineMessage && errors.mainSettings?.offlineMessage}
                        rows={5}
                        multiline
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 12,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="description" component={'label'}>
                        Description
                      </Typography>
                      <TextField
                        id="description"
                        fullWidth
                        {...getFieldProps('mainSettings.seo.description')}
                        error={Boolean(touched.mainSettings?.seo?.description && errors.mainSettings?.seo?.description)}
                        helperText={touched.mainSettings?.seo?.description && errors.mainSettings?.seo?.description}
                        rows={7}
                        multiline
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card
              sx={{
                mb: 2
              }}
            >
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Website Theme</Typography>
                  <Typography variant="body1">Select Color Theme</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="font-family" component={'label'}>
                        Font Family
                      </Typography>

                      <TextField
                        select
                        fullWidth
                        id="font-family"
                        placeholder="Font Family"
                        {...getFieldProps('mainSettings.theme.fontFamily')}
                        SelectProps={{ native: true }}
                        error={Boolean(
                          touched.mainSettings?.theme?.fontFamily && errors.mainSettings?.theme?.fontFamily
                        )}
                        helperText={touched.mainSettings?.theme?.fontFamily && errors.mainSettings?.theme?.fontFamily}
                      >
                        {FONT_FAMILIES.map((font) => (
                          <option value={font.value} key={font.value}>
                            {font.label}
                          </option>
                        ))}
                      </TextField>
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="primary" component={'label'}>
                        Primary Color
                      </Typography>
                      <TextField
                        id="primary"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.primary')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.primary && errors.mainSettings?.theme?.palette?.primary
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.primary && errors.mainSettings?.theme?.palette?.primary
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="secondary" component={'label'}>
                        Secondary Color
                      </Typography>
                      <TextField
                        id="secondary"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.secondary')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.secondary &&
                            errors.mainSettings?.theme?.palette?.secondary
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.secondary &&
                          errors.mainSettings?.theme?.palette?.secondary
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="defaultDark" component={'label'}>
                        Dark Background
                      </Typography>
                      <TextField
                        id="defaultDark"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.defaultDark')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.defaultDark &&
                            errors.mainSettings?.theme?.palette?.defaultDark
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.defaultDark &&
                          errors.mainSettings?.theme?.palette?.defaultDark
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="defaultLight" component={'label'}>
                        Light Background
                      </Typography>
                      <TextField
                        id="defaultLight"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.defaultLight')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.defaultLight &&
                            errors.mainSettings?.theme?.palette?.defaultLight
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.defaultLight &&
                          errors.mainSettings?.theme?.palette?.defaultLight
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="paperDark" component={'label'}>
                        Dark Paper
                      </Typography>
                      <TextField
                        id="paperDark"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.paperDark')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.paperDark &&
                            errors.mainSettings?.theme?.palette?.paperDark
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.paperDark &&
                          errors.mainSettings?.theme?.palette?.paperDark
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="paperLight" component={'label'}>
                        Light Paper
                      </Typography>
                      <TextField
                        id="paperLight"
                        fullWidth
                        type="color"
                        {...getFieldProps('mainSettings.theme.palette.paperLight')}
                        error={Boolean(
                          touched.mainSettings?.theme?.palette?.paperLight &&
                            errors.mainSettings?.theme?.palette?.paperLight
                        )}
                        helperText={
                          touched.mainSettings?.theme?.palette?.paperLight &&
                          errors.mainSettings?.theme?.palette?.paperLight
                        }
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card
              sx={{
                mb: 2
              }}
            >
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">System Settings</Typography>
                  <Typography variant="body1">System settings and configurations</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="gaId" component={'label'}>
                        GA ID
                      </Typography>
                      <TextField
                        id="gaId"
                        fullWidth
                        {...getFieldProps('systemSettings.gaId')}
                        error={Boolean(touched.systemSettings?.gaId && errors.systemSettings?.gaId)}
                        helperText={touched.systemSettings?.gaId && errors.systemSettings?.gaId}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="gtmId" component={'label'}>
                        GTM ID
                      </Typography>
                      <TextField
                        id="gtmId"
                        fullWidth
                        {...getFieldProps('systemSettings.gtmId')}
                        error={Boolean(touched.systemSettings?.gtmId && errors.systemSettings?.gtmId)}
                        helperText={touched.systemSettings?.gtmId && errors.systemSettings?.gtmId}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Contact</Typography>
                  <Typography variant="body1">Contact Details</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      md: 12,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="address" component={'label'}>
                        Address
                      </Typography>
                      <TextField
                        id="address"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.address')}
                        error={Boolean(touched.contact?.address && errors.contact?.address)}
                        helperText={touched.contact?.address && errors.contact?.address}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="addressOnMap" component={'label'}>
                        Address Map
                      </Typography>
                      <TextField
                        id="addressOnMap"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.addressOnMap')}
                        error={Boolean(touched.contact?.addressOnMap && errors.contact?.addressOnMap)}
                        helperText={touched.contact?.addressOnMap && errors.contact?.addressOnMap}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="lat" component={'label'}>
                        Latitude
                      </Typography>
                      <TextField
                        id="lat"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.lat')}
                        error={Boolean(touched.contact?.lat && errors.contact?.lat)}
                        helperText={touched.contact?.lat && errors.contact?.lat}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="long" component={'label'}>
                        Longitude
                      </Typography>
                      <TextField
                        id="long"
                        fullWidth
                        type="text"
                        {...getFieldProps('contact.long')}
                        error={Boolean(touched.contact?.long && errors.contact?.long)}
                        helperText={touched.contact?.long && errors.contact?.long}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
                        Email
                      </Typography>
                      <TextField
                        id="email"
                        fullWidth
                        type="email"
                        {...getFieldProps('contact.email')}
                        error={Boolean(touched.contact?.email && errors.contact?.email)}
                        helperText={touched.contact?.email && errors.contact?.email}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="phone" component={'label'}>
                        Phone
                      </Typography>
                      <TextField
                        id="phone"
                        fullWidth
                        type="phone"
                        {...getFieldProps('contact.phone')}
                        error={Boolean(touched.contact?.phone && errors.contact?.phone)}
                        helperText={touched.contact?.phone && errors.contact?.phone}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    size={{
                      md: 6,
                      xs: 12
                    }}
                  >
                    <Stack gap={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="whatsappNo" component={'label'}>
                        whatsapp No
                      </Typography>
                      <TextField
                        id="whatsappNo"
                        fullWidth
                        type="whatsappNo"
                        {...getFieldProps('contact.whatsappNo')}
                        error={Boolean(touched.contact?.whatsappNo && errors.contact?.whatsappNo)}
                        helperText={touched.contact?.whatsappNo && errors.contact?.whatsappNo}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            size={{
              md: 4,
              xs: 12
            }}
          >
            <Card
              sx={{
                mb: 2
              }}
            >
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Branding</Typography>
                  <Typography variant="body1">Business logo and favicon.</Typography>
                </Stack>
                <Stack gap={3} width={1}>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="fileLogoDark" component={'label'}>
                      Business Logo Dark
                    </Typography>
                    <UploadSingleFile
                      id="fileLogoDark"
                      file={values.logoDark}
                      onDrop={handleDropLogoDark}
                      error={Boolean(touched.logoDark && errors.logoDark)}
                      category
                      accept="image/*"
                      loading={state.logoDarkLoading}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="fileLogoLight" component={'label'}>
                      Business Logo Light
                    </Typography>
                    <UploadSingleFile
                      id="fileLogoLight"
                      file={values.logoLight}
                      onDrop={handleDropLogoLight}
                      error={Boolean(touched.logoLight && errors.logoLight)}
                      category
                      accept="image/*"
                      loading={state.logoLightLoading}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="fileFavico" component={'label'}>
                      Favicon Logo
                    </Typography>
                    <UploadSingleFile
                      id="fileFavico"
                      file={values.favicon}
                      onDrop={handleDropLogoFavicon}
                      error={Boolean(touched.favicon && errors.favicon)}
                      category
                      accept="image/*"
                      loading={state.faviconLoading}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              sx={{
                mb: 2
              }}
            >
              <CardContent>
                <Stack mb={2}>
                  <Typography variant="h4">Social Links</Typography>
                  <Typography variant="body1">Social media pages links</Typography>
                </Stack>
                <Stack spacing={2}>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="facebook" component={'label'}>
                      Facebook
                    </Typography>
                    <TextField
                      id="facebook"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.facebook')}
                      error={Boolean(touched.socialLinks?.facebook && errors.socialLinks?.facebook)}
                      helperText={touched.socialLinks?.facebook && errors.socialLinks?.facebook}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="twitter" component={'label'}>
                      Twitter
                    </Typography>
                    <TextField
                      id="twitter"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.twitter')}
                      error={Boolean(touched.socialLinks?.twitter && errors.socialLinks?.twitter)}
                      helperText={touched.socialLinks?.twitter && errors.socialLinks?.twitter}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="linkedin" component={'label'}>
                      Linkedin
                    </Typography>
                    <TextField
                      id="linkedin"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.linkedin')}
                      error={Boolean(touched.socialLinks?.linkedin && errors.socialLinks?.linkedin)}
                      helperText={touched.socialLinks?.linkedin && errors.socialLinks?.linkedin}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="instagram" component={'label'}>
                      Instagram
                    </Typography>
                    <TextField
                      id="instagram"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.instagram')}
                      error={Boolean(touched.socialLinks?.instagram && errors.socialLinks?.instagram)}
                      helperText={touched.socialLinks?.instagram && errors.socialLinks?.instagram}
                    />
                  </Stack>
                  <Stack gap={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="whatsapp" component={'label'}>
                      Whatsapp
                    </Typography>
                    <TextField
                      id="whatsapp"
                      fullWidth
                      type="text"
                      {...getFieldProps('socialLinks.whatsapp')}
                      error={Boolean(touched.socialLinks?.whatsapp && errors.socialLinks?.whatsapp)}
                      helperText={touched.socialLinks?.whatsapp && errors.socialLinks?.whatsapp}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            <Button fullWidth size="large" type="submit" variant="contained" loading={loading}>
              Save Settings
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
