import React from 'react';
import { Box, Grid, Stack, TextField, Typography, FormHelperText, Skeleton } from '@mui/material';

// Custom components
import UploadAvatar from 'src/components/upload/UploadAvatar';
import countries from 'src/data/countries.json';
import PhoneInputField from 'src/components/phone-input-field';
export default function ShopDetailsForm({ handleDrop, formik, state, handleNameChange, isLoading }) {
  const { values, errors, touched, getFieldProps, setFieldValue } = formik;

  const renderLabel = (label) =>
    isLoading ? (
      <Skeleton width={100} height={30} />
    ) : (
      <Typography variant="overline" component="label">
        {label}
      </Typography>
    );

  const renderTextField = (id, props = {}) =>
    isLoading ? <Skeleton variant="rounded" height={56} width="100%" /> : <TextField id={id} fullWidth {...props} />;

  return (
    <Box>
      <Stack spacing={1} alignSelf={'center'} alignItems="center" textAlign="center">
        {isLoading ? (
          <Skeleton variant="circular" width={100} height={100} sx={{ mx: 2 }} />
        ) : (
          <UploadAvatar
            title="Upload logo"
            accept="image/*"
            file={values?.logoFile}
            loading={state.logoLoading}
            maxSize={3145728}
            onDrop={(v) => handleDrop(v, 'logo')}
            error={Boolean(touched?.logo && errors?.logo)}
          />
        )}
        {!isLoading && touched?.logo && errors?.logo && (
          <FormHelperText error sx={{ px: 2 }}>
            {errors.logo}
          </FormHelperText>
        )}
      </Stack>

      <Stack mt={3} spacing={3}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid
            size={{
              xs: 12,
              md: 6
            }}
          >
            <Stack gap={3}>
              <Stack gap={1}>
                {renderLabel('Name of Supplier')}
                {renderTextField('name', {
                  ...getFieldProps('name'),
                  onChange: handleNameChange,
                  error: Boolean(touched?.name && errors?.name),
                  helperText: touched?.name && errors?.name
                })}
              </Stack>
              <Stack gap={1}>
                {renderLabel('Contact Person')}
                {renderTextField('contactPerson', {
                  ...getFieldProps('contactPerson'),
                  error: Boolean(touched?.contactPerson && errors?.contactPerson),
                  helperText: touched?.contactPerson && errors?.contactPerson
                })}
              </Stack>
              <Stack gap={1}>
                {renderLabel('State of Supplier')}
                {isLoading ? (
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                ) : (
                  <TextField
                    id="stateOfSupplier"
                    select
                    fullWidth
                    {...getFieldProps('stateOfSupplier')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched?.stateOfSupplier && errors?.stateOfSupplier)}
                    helperText={touched?.stateOfSupplier && errors?.stateOfSupplier}
                  >
                    <option value="">Select State of Supplier</option>
                    <option value="Individual">Individual</option>
                    <option value="Partnership Firm">Partnership Firm</option>
                    <option value="Private Limited Company (Pvt Ltd)">Private Limited Company (Pvt Ltd)</option>
                    <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                  </TextField>
                )}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Country')}
                {isLoading ? (
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                ) : (
                  <TextField
                    id="country"
                    select
                    fullWidth
                    {...getFieldProps('address.country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched?.address?.country && errors?.address?.country)}
                    helperText={touched?.address?.country && errors?.address?.country}
                  >
                    <option value="">Select Country</option>
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                )}
              </Stack>

              <Stack gap={1}>
                {renderLabel('City')}
                {renderTextField('address.city', {
                  ...getFieldProps('address.city'),
                  error: Boolean(touched?.address?.city && errors?.address?.city),
                  helperText: touched?.address?.city && errors?.address?.city
                })}
              </Stack>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid
            size={{
              xs: 12,
              md: 6
            }}
          >
            <Stack gap={3}>
              <Stack gap={1}>
                {renderLabel('Supplier Email')}
                {renderTextField('shopEmail', {
                  ...getFieldProps('shopEmail'),
                  error: Boolean(touched?.shopEmail && errors?.shopEmail),
                  helperText: touched?.shopEmail && errors?.shopEmail
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Supplier Phone')}
                {isLoading ? (
                  <Skeleton variant="rounded" height={56} width="100%" />
                ) : (
                  <PhoneInputField
                    error={touched?.shopPhone && errors?.shopPhone}
                    onChange={(val) => setFieldValue('shopPhone', val)}
                    value={values.shopPhone}
                  />
                )}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Website')}
                {renderTextField('website', {
                  ...getFieldProps('website'),
                  error: Boolean(touched?.website && errors?.website),
                  helperText: touched?.website && errors?.website
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('State')}
                {renderTextField('address.state', {
                  ...getFieldProps('address.state'),
                  error: Boolean(touched?.address?.state && errors?.address?.state),
                  helperText: touched?.address?.state && errors?.address?.state
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Street Address')}
                {renderTextField('address.streetAddress', {
                  ...getFieldProps('address.streetAddress'),
                  error: Boolean(touched?.address?.streetAddress && errors?.address?.streetAddress),
                  helperText: touched?.address?.streetAddress && errors?.address?.streetAddress
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Stack gap={1}>
          {renderLabel('Description')}
          {isLoading ? (
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
          ) : (
            <TextField
              id="description"
              fullWidth
              multiline
              rows={4}
              {...getFieldProps('description')}
              error={Boolean(touched?.description && errors?.description)}
              helperText={touched?.description && errors?.description}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
