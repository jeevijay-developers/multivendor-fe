'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  IconButton,
  FormHelperText
} from '@mui/material';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import * as api from 'src/services';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function HomeSettingsForm({ data: settings }) {
  const [uploadLoading, setUploadLoading] = useState({});

  // Upload handler
  // Upload handler
  const handleDrop = async (acceptedFiles, fileField, form, index) => {
    setUploadLoading((prev) => ({ ...prev, [fileField]: 2 }));

    const file = acceptedFiles[0];
    if (!file) return;

    Object.assign(file, { preview: URL.createObjectURL(file) });

    // temporarily store for preview
    form.setFieldValue(fileField, file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    const config = {
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded * 100) / total);
        setUploadLoading((prev) => ({ ...prev, [fileField]: percentage }));
      }
    };

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      );

      if (typeof index === 'number') {
        form.setFieldValue(fileField, { _id: data.public_id, url: data.secure_url });
      } else {
        form.setFieldValue(fileField, { _id: data.public_id, url: data.secure_url });
      }

      setUploadLoading((prev) => ({ ...prev, [fileField]: false }));
    } catch (err) {
      console.log(err);
      setUploadLoading((prev) => ({ ...prev, [fileField]: false }));

      toast.error('Image upload failed');
    }
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    slides: Yup.array()
      .of(
        Yup.object().shape({
          link: Yup.string().required('Slide Link is required'),
          image: Yup.object()
            .shape({
              _id: Yup.string().required(),
              url: Yup.string().required()
            })
            .required('Slide image is required')
        })
      )
      .min(1, 'At least one slide is required'),
    banner1: Yup.object().shape({
      link: Yup.string().required('Banner 1 Link is required'),
      image: Yup.object()
        .shape({
          _id: Yup.string().required(),
          url: Yup.string().required()
        })
        .required('Banner 1 image is required')
    }),
    banner2: Yup.object().shape({
      link: Yup.string().required('Banner 2 Link is required'),
      image: Yup.object()
        .shape({
          _id: Yup.string().required(),
          url: Yup.string().required()
        })
        .required('Banner 2 image is required')
    })
  });

  // Initial values
  const initialValues = {
    slides:
      settings?.slides?.map((s) => ({
        link: s.link || '',
        image: { _id: s.image._id, url: s.image.url }
      })) || [],
    banner1: {
      link: settings?.banner1?.link || '',
      image: settings?.banner1?.image || null
    },
    banner2: {
      link: settings?.banner2?.link || '',
      image: settings?.banner2?.image || null
    }
  };

  // Mutation
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: (data) => api.updateSettingsByAdmin(data),
    onSuccess: () => toast.success('Home settings updated successfully'),
    onError: () => toast.error('Failed to update home settings')
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync({
        ...settings,
        ...values
      });
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  console.log(values.banner1, 'values.banner1');
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Slides Section */}
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Slides</Typography>
                <Button
                  startIcon={<FiPlus />}
                  onClick={() => setFieldValue('slides', [...values.slides, { link: '', image: null }])}
                >
                  Add Slide
                </Button>
              </Stack>
              <FieldArray
                name="slides"
                render={(arrayHelpers) => (
                  <Stack spacing={2} mt={2}>
                    {values.slides.map((slide, index) => (
                      <Card key={index} variant="outlined">
                        <CardContent>
                          <Stack spacing={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1">Slide {index + 1}</Typography>
                              <IconButton color="error" onClick={() => arrayHelpers.remove(index)}>
                                <FiTrash2 />
                              </IconButton>
                            </Stack>
                            <TextField
                              label="Slide Link"
                              {...getFieldProps(`slides[${index}].link`)}
                              error={Boolean(touched.slides?.[index]?.link && errors.slides?.[index]?.link)}
                              helperText={touched.slides?.[index]?.link && errors.slides?.[index]?.link}
                            />
                            <UploadSingleFile
                              file={slide.image}
                              onDrop={(acceptedFiles) =>
                                handleDrop(acceptedFiles, `slides[${index}].image`, formik, index)
                              }
                              accept="image/*"
                              loading={uploadLoading[`slides[${index}].image`]}
                            />
                            {touched.slides?.[index]?.image && errors.slides?.[index]?.image && (
                              <FormHelperText error>
                                {errors.slides[index].image?._id || errors.slides[index].image?.url || 'Image required'}
                              </FormHelperText>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              />
            </CardContent>
          </Card>

          {/* Banner 1 */}
          <Card>
            <CardContent>
              <Typography variant="h6">Banner 1</Typography>
              <Stack spacing={2} mt={2}>
                <TextField
                  label="Banner 1 Link"
                  {...getFieldProps('banner1.link')}
                  error={Boolean(touched.banner1?.link && errors.banner1?.link)}
                  helperText={touched.banner1?.link && errors.banner1?.link}
                />
                <UploadSingleFile
                  file={values.banner1.image}
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner1.image', formik)}
                  accept="image/*"
                  loading={uploadLoading['banner1.image']}
                />
                {touched.banner1?.image && errors.banner1?.image && (
                  <FormHelperText error>
                    {errors.banner1.image?._id || errors.banner1.image?.url || 'Image required'}
                  </FormHelperText>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Banner 2 */}
          <Card>
            <CardContent>
              <Typography variant="h6">Banner 2</Typography>
              <Stack spacing={2} mt={2}>
                <TextField
                  label="Banner 2 Link"
                  {...getFieldProps('banner2.link')}
                  error={Boolean(touched.banner2?.link && errors.banner2?.link)}
                  helperText={touched.banner2?.link && errors.banner2?.link}
                />
                <UploadSingleFile
                  file={values.banner2.image}
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner2.image', formik)}
                  accept="image/*"
                  loading={uploadLoading['banner2.image']}
                />
                {touched.banner2?.image && errors.banner2?.image && (
                  <FormHelperText error>
                    {errors.banner2.image?._id || errors.banner2.image?.url || 'Image required'}
                  </FormHelperText>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Box textAlign="right">
            <Button type="submit" variant="contained" loading={isLoading}>
              {'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </form>
    </FormikProvider>
  );
}
