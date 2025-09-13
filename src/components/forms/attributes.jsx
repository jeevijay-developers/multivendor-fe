'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from '@bprogress/next';
// mui

import {
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Autocomplete,
  Chip,
  Grid,
  Button,
  Skeleton,
  IconButton,
  Tooltip
} from '@mui/material';
// api
import * as api from 'src/services';
// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
import { FaRegCircleQuestion } from 'react-icons/fa6';

const commonAttributes = [
  'Color',
  'Size',
  'Material',
  'Brand',
  'Weight',
  'Length',
  'Width',
  'Height',
  'Capacity',
  'Flavor'
];
export default function AttributesForm({ data: currentAttribute, isLoading: AttributeLoading }) {
  const router = useRouter();

  const mutationFn = currentAttribute ? api.updateAttributeByAdmin : api.addAttributeByAdmin;

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/admin/attributes');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });
  const AttributeSchema = Yup.object().shape({
    name: Yup.string().required('Attribute name is required'),
    values: Yup.array().of(Yup.string().trim().required('Value is required')).min(1, 'At least one value is required')
  });

  const formik = useFormik({
    initialValues: { name: currentAttribute?.name || '', values: currentAttribute?.values || '' },
    enableReinitialize: true,
    validationSchema: AttributeSchema,
    onSubmit: async (values) => {
      const { ...rest } = values;
      try {
        mutate({ ...rest, ...(currentAttribute && { currentId: currentAttribute._id }) });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue } = formik;
  return (
    <Box position="relative">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid size={{ md: 6, xs: 12 }}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <Typography variant="overline" color="text.primary" htmlFor="brand-name" component={'label'}>
                      {AttributeLoading ? <Skeleton variant="text" width={140} /> : 'Attribute Name'}
                    </Typography>

                    {AttributeLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <Autocomplete
                        id="attribute-name"
                        freeSolo
                        options={commonAttributes}
                        value={values.name}
                        onChange={(event, newValue) => {
                          setFieldValue('name', newValue || '');
                        }}
                        onInputChange={(event, newInputValue) => {
                          setFieldValue('name', newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        )}
                      />
                    )}
                  </div>
                  <div>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="brand-name" component={'label'}>
                        {AttributeLoading ? <Skeleton variant="text" width={70} /> : 'Values'}
                      </Typography>
                      {!AttributeLoading && (
                        <Tooltip title="Press enter to add tag" placement="top" arrow>
                          <IconButton sx={{ color: 'text.secondary' }} size="small">
                            <FaRegCircleQuestion />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>

                    {AttributeLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <Autocomplete
                        id="values"
                        multiple
                        freeSolo
                        value={values.values}
                        onChange={(event, newValue) => {
                          setFieldValue('values', newValue);
                        }}
                        options={[]}
                        renderTags={(values, getTagProps) =>
                          values.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            id=""
                            {...params}
                            error={Boolean(touched.values && errors.values)}
                            helperText={touched.values && errors.values}
                          />
                        )}
                      />
                    )}
                  </div>
                  <div>
                    {AttributeLoading ? (
                      <Skeleton variant="rounded" width="100%" height={56} />
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        loading={isLoading}
                        sx={{ ml: 'auto' }}
                      >
                        {currentAttribute ? 'Update Attribute' : 'Create Attribute'}
                      </Button>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
AttributesForm.propTypes = { data: PropTypes.object, isLoading: PropTypes.bool };
