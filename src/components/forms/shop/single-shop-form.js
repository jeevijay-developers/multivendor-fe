import React from 'react';
import { 
  Box, 
  Grid, 
  Stack, 
  TextField, 
  Typography, 
  FormHelperText, 
  Skeleton,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';

// Custom components
import UploadAvatar from 'src/components/upload/UploadAvatar';
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import countries from 'src/data/countries.json';
import PhoneInputField from 'src/components/phone-input-field';

export default function SingleShopForm({ handleDrop, formik, state, handleNameChange, isLoading, isSubmitting }) {
  const { values, errors, touched, submitCount, getFieldProps, setFieldValue } = formik;
  const isUploading = Boolean(
    state.logoLoading ||
    state.aadharCardFrontLoading ||
    state.aadharCardBackLoading ||
    state.panCardLoading ||
    state.cancelChequeLoading ||
    state.letterOfAuthorityLoading
  );

  const renderLabel = (label, required = true) =>
    isLoading ? (
      <Skeleton width={120} height={30} />
    ) : (
      <Typography variant="overline" component="label">
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
    );

  const renderTextField = (id, props = {}) =>
    isLoading ? <Skeleton variant="rounded" height={56} width="100%" /> : <TextField id={id} fullWidth {...props} />;

  const handleAadharDrop = async (acceptedFiles, side) => {
    const file = acceptedFiles?.[0];
    if (!file) return;

    // instant preview
    const withPreview = Object.assign(file, { preview: URL.createObjectURL(file) });
    if (side === 'front') setFieldValue('aadharCardFrontFile', withPreview);
    if (side === 'back') setFieldValue('aadharCardBackFile', withPreview);

    // upload -> get {_id, url}
    const uploaded = await handleDrop(acceptedFiles, side === 'front' ? 'aadharCardFront' : 'aadharCardBack');
    if (!uploaded) return;

    const entry = {
      _id: uploaded._id || uploaded.public_id,
      url: uploaded.url || uploaded.secure_url,
      side,
    };

    const current = Array.isArray(values.ownerDetails?.aadharCardPhotos)
      ? [...values.ownerDetails.aadharCardPhotos]
      : [];

    const idx = current.findIndex((p) => p.side === side);
    if (idx >= 0) current[idx] = entry;
    else current.push(entry);

    setFieldValue('ownerDetails.aadharCardPhotos', current);
  };

  const handlePanDrop = async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) return;

    const withPreview = Object.assign(file, { preview: URL.createObjectURL(file) });
    setFieldValue('panCardFile', withPreview);

    const uploaded = await handleDrop(acceptedFiles, 'panCard');
    if (!uploaded) return;

    setFieldValue('ownerDetails.panCardPhoto', {
      _id: uploaded._id || uploaded.public_id,
      url: uploaded.url || uploaded.secure_url,
    });
  };

  return (
    <Box>
      {/* Shop Logo Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={1} alignSelf={'center'} alignItems="center" textAlign="center">
            {isLoading ? (
              <Skeleton variant="circular" width={100} height={100} sx={{ mx: 2 }} />
            ) : (
              <UploadAvatar
                title="Upload Shop Logo"
                accept="image/*"
                file={values?.logoFile}
                loading={state.logoLoading}
                maxSize={3145728}
                onDrop={(v) => handleDrop(v, 'logo')}
                error={Boolean(touched?.logo && errors?.logo)} />
            )}
            {!isLoading && touched?.logo && errors?.logo && (
              <FormHelperText error sx={{ px: 2 }}>
                {errors.logo}
              </FormHelperText>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Shop Details Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Shop Information" />
        <CardContent>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={3}>
                <Stack gap={1}>
                  {renderLabel('Name of Supplier')}
                  {renderTextField('name', {
                    ...getFieldProps('name'),
                    onChange: handleNameChange,
                    error: Boolean(touched?.name && errors?.name),
                    helperText: touched?.name && errors?.name,
                    placeholder: 'e.g. ABC Traders'
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('Contact Person', false)}
                  {renderTextField('contactPerson', {
                    ...getFieldProps('contactPerson'),
                    error: Boolean(touched?.contactPerson && errors?.contactPerson),
                    helperText: touched?.contactPerson && errors?.contactPerson,
                    placeholder: 'e.g. 999 999 9999'
                  })}
                </Stack>

                {/* Registration Number removed */}

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
                      error={Boolean((touched?.stateOfSupplier || submitCount > 0) && errors?.stateOfSupplier)}
                      helperText={(touched?.stateOfSupplier || submitCount > 0) && errors?.stateOfSupplier}
                    >
                      <option value="">Select State of Supplier</option>
                      <option value="Individual">Individual</option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="Private Limited Company (Pvt Ltd)">Private Limited Company (Pvt Ltd)</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                    </TextField>
                  )}
                </Stack>

                {/* Letter of authority consent upload for Partnership Firm */}
                {values.stateOfSupplier === 'Partnership Firm' && (
                  <Stack gap={1}>
                    {renderLabel('Letter of Authority Consent')}
                    <UploadSingleFile
                      file={values.letterOfAuthorityFile}
                      onDrop={(v) => handleDrop(v, 'letterOfAuthority')}
                      error={Boolean(errors.letterOfAuthority && (touched?.letterOfAuthority || submitCount > 0))}
                      accept="image/*"
                      loading={state.letterOfAuthorityLoading}
                      helperText="Upload signed consent letter from all partners"
                    />
                    {(touched?.letterOfAuthority || submitCount > 0) && errors.letterOfAuthority && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors.letterOfAuthority}
                      </FormHelperText>
                    )}
                  </Stack>
                )}

                <Stack gap={1}>
                  {renderLabel('Income Tax PAN')}
                  {renderTextField('incomeTaxPAN', {
                    ...getFieldProps('incomeTaxPAN'),
                    placeholder: 'ABCDE1234F',
                    error: Boolean((touched?.incomeTaxPAN || submitCount > 0) && errors?.incomeTaxPAN),
                    helperText: (touched?.incomeTaxPAN || submitCount > 0) && errors?.incomeTaxPAN
                  })}
                </Stack>
{/* 

                <Stack gap={1}>
                  {renderLabel('Street Address')}
                  {renderTextField('address.streetAddress', {
                    ...getFieldProps('address.streetAddress'),
                    error: Boolean(touched?.address?.streetAddress && errors?.address?.streetAddress),
                    helperText: touched?.address?.streetAddress && errors?.address?.streetAddress,
                    multiline: true,
                    rows: 2,
                    placeholder: 'e.g. 123, Main Road, Near Park'
                  })}
                </Stack> */}


                <Stack gap={1}>
                  {renderLabel('City')}
                  {renderTextField('address.city', {
                    ...getFieldProps('address.city'),
                    error: Boolean(((touched?.address?.city) || submitCount > 0) && errors?.address?.city),
                    helperText: ((touched?.address?.city) || submitCount > 0) && errors?.address?.city,
                    placeholder: 'e.g. Mumbai'
                  })}
                </Stack>


                <Stack gap={1}>
                  {renderLabel('State')}
                  {renderTextField('address.state', {
                    ...getFieldProps('address.state'),
                    error: Boolean(((touched?.address?.state) || submitCount > 0) && errors?.address?.state),
                    helperText: ((touched?.address?.state) || submitCount > 0) && errors?.address?.state,
                    placeholder: 'e.g. Maharashtra'
                  })}
                </Stack>

        </Stack>
      </Grid>

      {/* Right Column */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack gap={3}>
          <Stack gap={1}>
            {renderLabel('Supplier Email')}
            {renderTextField('shopEmail', {
              ...getFieldProps('shopEmail'),
              error: Boolean((touched?.shopEmail || submitCount > 0) && errors?.shopEmail),
              helperText: (touched?.shopEmail || submitCount > 0) && errors?.shopEmail,
              placeholder: 'e.g. supplier@email.com'
            })}
          </Stack>

          <Stack gap={1}>
            {renderLabel('Supplier Phone')}
            {isLoading ? (
              <Skeleton variant="rounded" height={56} width="100%" />
            ) : (
              <PhoneInputField
                error={(touched?.shopPhone || submitCount > 0) && errors?.shopPhone}
                onChange={(val) => setFieldValue('shopPhone', val)}
                value={values.shopPhone} />
            )}
          </Stack>

          <Stack gap={1}>
            {renderLabel('Website', false)}
            {renderTextField('website', {
              ...getFieldProps('website'),
              error: Boolean(touched?.website && errors?.website),
              helperText: touched?.website && errors?.website,
              placeholder: 'e.g. https://yourshop.com'
            })}
          </Stack>
          
                <Stack gap={1}>
                  {renderLabel('Address')}
                  {renderTextField('address.streetAddress', {
                    ...getFieldProps('address.streetAddress'),
                    error: Boolean(((touched?.address?.streetAddress) || submitCount > 0) && errors?.address?.streetAddress),
                    helperText: ((touched?.address?.streetAddress) || submitCount > 0) && errors?.address?.streetAddress,
                    multiline: true,
                    rows: 1,
                    placeholder: 'e.g. 123, Main Road, Near Park'
                  })}
                </Stack>

                
                <Stack gap={1}>
                  {renderLabel('Zipcode')}
                  {renderTextField('address.zipcode', {
                    ...getFieldProps('address.zipcode'),
                    error: Boolean(((touched?.address?.zipcode) || submitCount > 0) && errors?.address?.zipcode),
                    helperText: ((touched?.address?.zipcode) || submitCount > 0) && errors?.address?.zipcode,
                    placeholder: 'e.g. 400001'
                  })}
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
                      error={Boolean(((touched?.address?.country) || submitCount > 0) && errors?.address?.country)}
                      helperText={((touched?.address?.country) || submitCount > 0) && errors?.address?.country}
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
        </Stack>
      </Grid>
    </Grid>

    <Stack gap={1} mt={3}>
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
            error={Boolean((touched?.description || submitCount > 0) && errors?.description)}
            helperText={(touched?.description || submitCount > 0) && errors?.description}
            placeholder="Describe your shop, products, and specialties"
          />
        )}
      </Stack>
        </CardContent>
      </Card>

      {/* Owner Details Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Owner Details" />
        <CardContent>
          <Grid container spacing={3}>
            {/* Owner Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={3}>
                <Stack gap={1}>
                  {renderLabel('Aadhar Card Number')}
                  {renderTextField('ownerDetails.aadharCardNumber', {
                    ...getFieldProps('ownerDetails.aadharCardNumber'),
                    placeholder: '123456789012',
                    error: Boolean(touched?.ownerDetails?.aadharCardNumber && errors?.ownerDetails?.aadharCardNumber),
                    helperText: touched?.ownerDetails?.aadharCardNumber && errors?.ownerDetails?.aadharCardNumber
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('PAN Number')}
                  {renderTextField('ownerDetails.panNumber', {
                    ...getFieldProps('ownerDetails.panNumber'),
                    placeholder: 'ABCDE1234F',
                    error: Boolean(touched?.ownerDetails?.panNumber && errors?.ownerDetails?.panNumber),
                    helperText: touched?.ownerDetails?.panNumber && errors?.ownerDetails?.panNumber
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('IFSC Code')}
                  {renderTextField('ownerDetails.ifscCode', {
                    ...getFieldProps('ownerDetails.ifscCode'),
                    placeholder: 'SBIN0123456',
                    error: Boolean(touched?.ownerDetails?.ifscCode && errors?.ownerDetails?.ifscCode),
                    helperText: touched?.ownerDetails?.ifscCode && errors?.ownerDetails?.ifscCode
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('GST Number')}
                  {renderTextField('ownerDetails.gstNumber', {
                    ...getFieldProps('ownerDetails.gstNumber'),
                    placeholder: '22AAAAA0000A1Z5',
                    error: Boolean(touched?.ownerDetails?.gstNumber && errors?.ownerDetails?.gstNumber),
                    helperText: touched?.ownerDetails?.gstNumber && errors?.ownerDetails?.gstNumber
                  })}
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={3}>
                <Stack gap={1}>
                  {renderLabel('Bank Branch')}
                  {renderTextField('ownerDetails.bankBranch', {
                    ...getFieldProps('ownerDetails.bankBranch'),
                    error: Boolean(touched?.ownerDetails?.bankBranch && errors?.ownerDetails?.bankBranch),
                    helperText: touched?.ownerDetails?.bankBranch && errors?.ownerDetails?.bankBranch,
                    placeholder: 'e.g. Andheri West Branch'
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('Account Number')}
                  {renderTextField('ownerDetails.accountNumber', {
                    ...getFieldProps('ownerDetails.accountNumber'),
                    error: Boolean(touched?.ownerDetails?.accountNumber && errors?.ownerDetails?.accountNumber),
                    helperText: touched?.ownerDetails?.accountNumber && errors?.ownerDetails?.accountNumber,
                    placeholder: 'e.g. 123456789012'
                  })}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('Account Holder Name')}
                  {renderTextField('ownerDetails.accountHolderName', {
                    ...getFieldProps('ownerDetails.accountHolderName'),
                    error: Boolean(touched?.ownerDetails?.accountHolderName && errors?.ownerDetails?.accountHolderName),
                    helperText: touched?.ownerDetails?.accountHolderName && errors?.ownerDetails?.accountHolderName,
                    placeholder: 'e.g. John Doe'
                  })}
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Document Uploads */}
          <Typography variant="h6" gutterBottom>
            Document Uploads
          </Typography>
          <Grid container spacing={3}>
            {/* Aadhar Card Photos - Front and Back */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={2}>
                <Stack gap={1}>
                  {renderLabel('Aadhar Card - Front')}
                  {isLoading ? (
                    <Skeleton variant="rounded" height={180} />
                  ) : (
                    <>
                      <UploadSingleFile
                        file={values?.aadharCardFrontFile}
                        onDrop={(v) => handleAadharDrop(v, 'front')}
                        error={Boolean(((touched?.ownerDetails?.aadharCardPhotos) || submitCount > 0) && errors?.ownerDetails?.aadharCardPhotos)}
                        accept="image/*"
                        loading={state?.aadharCardFrontLoading}
                        helperText="Upload front side of Aadhar card"
                      />
                    </>
                  )}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('Aadhar Card - Back')}
                  {isLoading ? (
                    <Skeleton variant="rounded" height={180} />
                  ) : (
                    <>
                      <UploadSingleFile
                        file={values?.aadharCardBackFile}
                        onDrop={(v) => handleAadharDrop(v, 'back')}
                        error={Boolean(((touched?.ownerDetails?.aadharCardPhotos) || submitCount > 0) && errors?.ownerDetails?.aadharCardPhotos)}
                        accept="image/*"
                        loading={state?.aadharCardBackLoading}
                        helperText="Upload back side of Aadhar card"
                      />
                    </>
                  )}
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={2}>
                <Stack gap={1}>
                  {renderLabel('PAN Card Photo')}
                  {isLoading ? (
                    <Skeleton variant="rounded" height={180} />
                  ) : (
                    <>
                      <UploadSingleFile
                        file={values?.panCardFile}
                        onDrop={(v) => handlePanDrop(v)}
                        error={Boolean(((touched?.ownerDetails?.panCardPhoto) || submitCount > 0) && errors?.ownerDetails?.panCardPhoto)}
                        accept="image/*"
                        loading={state?.panCardLoading}
                        helperText="Upload front side of PAN card"
                      />
                    </>
                  )}
                </Stack>

                <Stack gap={1}>
                  {renderLabel('Cancel Cheque')}
                  {isLoading ? (
                    <Skeleton variant="rounded" height={180} />
                  ) : (
                    <>
                      <UploadSingleFile
                        file={values?.cancelChequeFile}
                        onDrop={(v) => handleDrop(v, 'ownerDetails.cancelCheque')}
                        error={Boolean(((touched?.ownerDetails?.cancelCheque) || submitCount > 0) && errors?.ownerDetails?.cancelCheque)}
                        accept="image/*"
                        loading={state?.cancelChequeLoading}
                        helperText="Upload cancelled cheque"
                      />
                    </>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Form Action Buttons */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => {
                // Reset form or navigate back
                formik.resetForm();
              }}
              disabled={isLoading || isSubmitting || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || isSubmitting || isUploading}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting 
                ? 'Creating Shop...' 
                : (values.id ? 'Update Shop' : 'Create Shop')
              }
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}