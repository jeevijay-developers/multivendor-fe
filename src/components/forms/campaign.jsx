'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useRouter } from '@bprogress/next';

// mui

import {
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Select,
  ListItemText,
  InputAdornment,
  FormControl,
  FormHelperText,
  Grid,
  Skeleton,
  RadioGroup,
  Radio,
  Tooltip,
  FormControlLabel,
  Button,
  IconButton
} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// components
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import Search from 'src/components/widgets/search';

import BlurImageAvatar from 'src/components/avatar';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// yup
import * as Yup from 'yup';
// axios
import axios from 'axios';
// toast
import toast from 'react-hot-toast';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';
// icons
import { IoMdClose } from 'react-icons/io';
import { format, parseISO } from 'date-fns';

CampaignForm.propTypes = { data: PropTypes.object, isLoading: PropTypes.bool };

const STATUS_OPTIONS = ['active', 'inactive'];

export default function CampaignForm({ data: currentCampaign, isLoading: campaignLoading }) {
  const router = useRouter();
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [state, setstate] = useState({ loading: false, name: '', search: '', open: false });

  const mutationFn = currentCampaign ? api.updateCampaignByAdmin : api.addCampaignByAdmin;

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/admin/campaigns');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });

  // Delete mutation
  const { mutate: deleteMutate } = useMutation({
    mutationFn: api.singleDeleteFile,
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });
  const NewcampaignSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    cover: Yup.mixed().required('Cover is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string().required('Description is required'),
    metaTitle: Yup.string().required('Meta title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    products: Yup.array().required('Products are required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    discount: Yup.number().required('Discount is required')
  });

  const formik = useFormik({
    initialValues: {
      name: currentCampaign?.name || '',
      metaTitle: currentCampaign?.metaTitle || '',
      cover: currentCampaign?.cover || null,
      description: currentCampaign?.description || '',
      metaDescription: currentCampaign?.metaDescription || '',
      products: currentCampaign?.products || [],

      startDate: currentCampaign?.startDate ? format(parseISO(currentCampaign?.startDate), 'yyyy-MM-dd') : '',

      endDate: currentCampaign?.endDate ? format(parseISO(currentCampaign?.endDate), 'yyyy-MM-dd') : '',
      discount: currentCampaign?.discount || '',
      discountType: currentCampaign?.discountType || 'percent',
      file: currentCampaign?.cover || '',
      slug: currentCampaign?.slug || '',
      status: currentCampaign?.status || STATUS_OPTIONS[0]
    },
    enableReinitialize: true,
    validationSchema: NewcampaignSchema,
    onSubmit: async (values) => {
      const { products, ...rest } = values;
      try {
        mutate({
          ...rest,
          products: products.map((v) => v._id),
          ...(currentCampaign && { currentSlug: currentCampaign.slug })
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleDrop = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, { preview: URL.createObjectURL(file) });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nekimart');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, loading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('cover', { _id: data.public_id, url: data.secure_url });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        if (values.file) {
          deleteMutate(values.cover._id);
        }
        setstate({ ...state, loading: false });
      });
  };
  const handleChange = (event) => {
    setFieldValue('discountType', event.target.value);
  };
  const handleTitleChange = (event) => {
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
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ md: 8, xs: 12 }}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Stack gap={1}>
                    {campaignLoading ? (
                      <Skeleton variant="text" width={140} />
                    ) : (
                      <Typography variant="overline" color="text.primary" htmlFor="campaign-name" component={'label'}>
                        Compaign Name
                      </Typography>
                    )}
                    {campaignLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="campaign-name"
                        fullWidth
                        {...getFieldProps('name')}
                        onChange={handleTitleChange} // add onChange handler for title
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    )}
                  </Stack>
                  <Stack gap={1}>
                    {campaignLoading ? (
                      <Skeleton variant="text" width={100} />
                    ) : (
                      <Typography variant="overline" color="text.primary" htmlFor="meta-title" component={'label'}>
                        Meta Title
                      </Typography>
                    )}
                    {campaignLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="meta-title"
                        fullWidth
                        {...getFieldProps('metaTitle')}
                        error={Boolean(touched.metaTitle && errors.metaTitle)}
                        helperText={touched.metaTitle && errors.metaTitle}
                      />
                    )}
                  </Stack>
                  <Stack gap={1}>
                    {campaignLoading ? (
                      <Skeleton variant="text" width={70} />
                    ) : (
                      <Typography variant="overline" color="text.primary" htmlFor="slug" component={'label'}>
                        Slug
                      </Typography>
                    )}
                    {campaignLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <TextField
                        fullWidth
                        id="slug"
                        {...getFieldProps('slug')}
                        error={Boolean(touched.slug && errors.slug)}
                        helperText={touched.slug && errors.slug}
                      />
                    )}
                  </Stack>
                  <Stack gap={1}>
                    {campaignLoading ? (
                      <Skeleton variant="text" width={100} />
                    ) : (
                      <Typography variant="overline" color="text.primary" htmlFor="description" component={'label'}>
                        Description
                      </Typography>
                    )}
                    {campaignLoading ? (
                      <Skeleton variant="rounded" width="100%" height={240} />
                    ) : (
                      <TextField
                        fullWidth
                        id="description"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                        rows={9}
                        multiline
                      />
                    )}
                  </Stack>

                  <div>
                    <Stack gap={1}>
                      <Stack direction="row" justifyContent="space-between">
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography variant="overline" color="text.primary" component={'label'}>
                            Image
                          </Typography>
                        )}
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography variant="overline" color="text.primary" htmlFor="file" component={'label'}>
                            <span>512 * 512</span>
                          </Typography>
                        )}
                      </Stack>
                      {campaignLoading ? (
                        <Skeleton variant="rectangular" width="100%" height={225} />
                      ) : (
                        <UploadSingleFile
                          id="file"
                          file={values.cover}
                          onDrop={handleDrop}
                          error={Boolean(touched.cover && errors.cover)}
                          campaign
                          accept="image/*"
                          loading={state.loading}
                        />
                      )}
                    </Stack>

                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ md: 4, xs: 12 }}>
              <div style={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}>
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Stack gap={1}>
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography
                            variant="overline"
                            color="text.primary"
                            htmlFor="meta-description"
                            component={'label'}
                          >
                            Meta Description
                          </Typography>
                        )}
                        {campaignLoading ? (
                          <Skeleton variant="rounded" width="100%" height={240} />
                        ) : (
                          <TextField
                            id="meta-description"
                            fullWidth
                            {...getFieldProps('metaDescription')}
                            error={Boolean(touched.metaDescription && errors.metaDescription)}
                            helperText={touched.metaDescription && errors.metaDescription}
                            rows={9}
                            multiline
                          />
                        )}
                      </Stack>
                      <FormControl>
                        <Typography variant="overline" color="text.primary" htmlFor="campaign-type" component={'label'}>
                          {campaignLoading ? <Skeleton variant="text" width={150} /> : 'Campaign type'}
                        </Typography>
                        {campaignLoading ? (
                          <Stack direction="row" gap={1}>
                            <Stack direction="row" gap={1} alignItems="center">
                              <Skeleton variant="circular" height={42} width={42} />
                              <Skeleton variant="text" height={22} width={140} />
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center">
                              <Skeleton variant="circular" height={42} width={42} />
                              <Skeleton variant="text" height={22} width={140} />
                            </Stack>
                          </Stack>
                        ) : (
                          <RadioGroup row id="campaign-type" value={values.discountType} onChange={handleChange}>
                            <FormControlLabel value="percent" control={<Radio />} label="Percent" />
                            <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                          </RadioGroup>
                        )}
                      </FormControl>
                      <Stack gap={1}>
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography variant="overline" color="text.primary" htmlFor="discount" component={'label'}>
                            Discount
                          </Typography>
                        )}
                        {campaignLoading ? (
                          <Skeleton variant="rounded" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="discount"
                            fullWidth
                            {...getFieldProps('discount')}
                            error={Boolean(touched.discount && errors.discount)}
                            helperText={touched.discount && errors.discount}
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {values.discountType === 'percent'
                                    ? '%'
                                    : fCurrency(0)
                                        .replace(/\d+(\.\d+)?/g, '')
                                        .trim()}
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                      </Stack>
                      <Stack gap={1}>
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography variant="overline" color="text.primary" htmlFor="startDate" component={'label'}>
                            Start Date
                          </Typography>
                        )}
                        {campaignLoading ? (
                          <Skeleton variant="rounded" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="startDate"
                            fullWidth
                            {...getFieldProps('startDate')}
                            error={Boolean(touched.startDate && errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                            type="date"
                          />
                        )}
                      </Stack>
                      <Stack gap={1}>
                        {campaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <Typography variant="overline" color="text.primary" htmlFor="endDate" component={'label'}>
                            End Date
                          </Typography>
                        )}
                        {campaignLoading ? (
                          <Skeleton variant="rounded" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="endDate"
                            fullWidth
                            {...getFieldProps('endDate')}
                            error={Boolean(touched.endDate && errors.endDate)}
                            helperText={touched.endDate && errors.endDate}
                            type="date"
                          />
                        )}
                      </Stack>

                      <FormControl fullWidth sx={{ select: { textTransform: 'capitalize' } }}>
                        <Typography variant="overline" color="text.primary" htmlFor="status" component={'label'}>
                          {campaignLoading ? <Skeleton variant="text" width={70} /> : 'Status'}
                        </Typography>

                        {campaignLoading ? (
                          <Skeleton variant="rounded" width="100%" height={56} />
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
                        {touched.status && errors.status && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.status && errors.status}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <Button onClick={handleClickOpen} variant="contained" color="error" size="large">
                        Select products
                      </Button>
                      {Boolean(values.products.length) && (
                        <MenuList sx={{ pt: 0, mt: 1, overflow: 'auto', maxHeight: 500 }}>
                          {values.products.map((product) => (
                            <MenuItem key={product?._id} sx={{ px: 1 }}>
                              <ListItemIcon>
                                {campaignLoading ? (
                                  <Skeleton variant="circular" width={40} height={40} />
                                ) : (
                                  <BlurImageAvatar
                                    alt={product.name}
                                    src={product.image.url}
                                    priority
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                )}
                              </ListItemIcon>
                              <ListItemText>
                                <Stack
                                  direction="row"
                                  gap={1}
                                  alignItems={'center'}
                                  justifyContent={'space-between'}
                                  sx={{ div: { display: 'grid' } }}
                                >
                                  <div>
                                    <Typography variant="subtitle2" color="text.primary" noWrap>
                                      {campaignLoading ? <Skeleton variant="text" width="200px" /> : product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                      {campaignLoading ? (
                                        <Skeleton variant="text" width="100px" />
                                      ) : (
                                        fCurrency(cCurrency(product.salePrice))
                                      )}
                                    </Typography>
                                  </div>
                                  <Tooltip title="Remove product from list" placement="top" arrow>
                                    <IconButton
                                      size="small"
                                      aria-label="remove"
                                      onClick={() =>
                                        setFieldValue(
                                          'products',
                                          values.products.filter((v) => v._id !== product._id)
                                        )
                                      }
                                    >
                                      <IoMdClose />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </ListItemText>
                            </MenuItem>
                          ))}
                        </MenuList>
                      )}

                      <Search
                        multiSelect
                        handleSave={(val) => {
                          setFieldValue('products', val);
                          setOpen(false);
                        }}
                        selectedProducts={values.products}
                        open={open}
                        setOpen={setOpen}
                      />
                    </Stack>
                  </Card>
                  {campaignLoading ? (
                    <Skeleton variant="rounded" width="100%" height={56} />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isLoading}
                      sx={{ ml: 'auto', mt: 3 }}
                    >
                      {currentCampaign ? 'Update' : 'Create'}
                    </Button>
                  )}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
