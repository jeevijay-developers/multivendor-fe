import React from 'react';
import { Box, Grid, Stack, TextField, Typography, FormHelperText, Skeleton } from '@mui/material';

// Custom components
import UploadSingleFile from 'src/components/upload/UploadSingleFile';

export default function OwnerDetailsForm({ handleDrop, formik, state, isLoading }) {
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
      <Stack spacing={3}>
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
                {renderLabel('Aadhar Card Number')}
                {renderTextField('ownerDetails.aadharCardNumber', {
                  ...getFieldProps('ownerDetails.aadharCardNumber'),
                  error: Boolean(touched?.ownerDetails?.aadharCardNumber && errors?.ownerDetails?.aadharCardNumber),
                  helperText: touched?.ownerDetails?.aadharCardNumber && errors?.ownerDetails?.aadharCardNumber,
                  placeholder: 'Enter 12-digit Aadhar number'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('PAN Number')}
                {renderTextField('ownerDetails.panNumber', {
                  ...getFieldProps('ownerDetails.panNumber'),
                  error: Boolean(touched?.ownerDetails?.panNumber && errors?.ownerDetails?.panNumber),
                  helperText: touched?.ownerDetails?.panNumber && errors?.ownerDetails?.panNumber,
                  placeholder: 'Enter PAN number (e.g., ABCDE1234F)'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('IFSC Code')}
                {renderTextField('ownerDetails.ifscCode', {
                  ...getFieldProps('ownerDetails.ifscCode'),
                  error: Boolean(touched?.ownerDetails?.ifscCode && errors?.ownerDetails?.ifscCode),
                  helperText: touched?.ownerDetails?.ifscCode && errors?.ownerDetails?.ifscCode,
                  placeholder: 'Enter IFSC code'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('GST Number')}
                {renderTextField('ownerDetails.gstNumber', {
                  ...getFieldProps('ownerDetails.gstNumber'),
                  error: Boolean(touched?.ownerDetails?.gstNumber && errors?.ownerDetails?.gstNumber),
                  helperText: touched?.ownerDetails?.gstNumber && errors?.ownerDetails?.gstNumber,
                  placeholder: 'Enter GST number'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Bank Branch')}
                {renderTextField('ownerDetails.bankBranch', {
                  ...getFieldProps('ownerDetails.bankBranch'),
                  error: Boolean(touched?.ownerDetails?.bankBranch && errors?.ownerDetails?.bankBranch),
                  helperText: touched?.ownerDetails?.bankBranch && errors?.ownerDetails?.bankBranch,
                  placeholder: 'Enter bank branch name'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Account Number')}
                {renderTextField('ownerDetails.accountNumber', {
                  ...getFieldProps('ownerDetails.accountNumber'),
                  error: Boolean(touched?.ownerDetails?.accountNumber && errors?.ownerDetails?.accountNumber),
                  helperText: touched?.ownerDetails?.accountNumber && errors?.ownerDetails?.accountNumber,
                  placeholder: 'Enter account number'
                })}
              </Stack>

              <Stack gap={1}>
                {renderLabel('Account Holder Name')}
                {renderTextField('ownerDetails.accountHolderName', {
                  ...getFieldProps('ownerDetails.accountHolderName'),
                  error: Boolean(touched?.ownerDetails?.accountHolderName && errors?.ownerDetails?.accountHolderName),
                  helperText: touched?.ownerDetails?.accountHolderName && errors?.ownerDetails?.accountHolderName,
                  placeholder: 'Enter account holder name'
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
              {/* Aadhar Card Photo Upload */}
              <Stack gap={1}>
                {renderLabel('Aadhar Card Photo')}
                {isLoading ? (
                  <Skeleton variant="rounded" height={240} width="100%" />
                ) : (
                  <>
                    <UploadSingleFile
                      id="aadhar-card-upload"
                      file={values?.aadharCardFile}
                      onDrop={(v) => handleDrop(v, 'ownerDetails.aadharCard')}
                      error={Boolean(touched?.ownerDetails?.aadharCard && errors?.ownerDetails?.aadharCard)}
                      category
                      accept="image/*"
                      loading={state?.aadharCardLoading}
                    />

                    {touched?.ownerDetails?.aadharCard && errors?.ownerDetails?.aadharCard && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors?.ownerDetails?.aadharCard}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Stack>

              {/* PAN Card Photo Upload */}
              <Stack gap={1}>
                {renderLabel('PAN Card Photo')}
                {isLoading ? (
                  <Skeleton variant="rounded" height={240} width="100%" />
                ) : (
                  <>
                    <UploadSingleFile
                      id="pan-card-upload"
                      file={values?.panCardFile}
                      onDrop={(v) => handleDrop(v, 'ownerDetails.panCard')}
                      error={Boolean(touched?.ownerDetails?.panCard && errors?.ownerDetails?.panCard)}
                      category
                      accept="image/*"
                      loading={state?.panCardLoading}
                    />

                    {touched?.ownerDetails?.panCard && errors?.ownerDetails?.panCard && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors?.ownerDetails?.panCard}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Stack>

              {/* Cancel Cheque Photo Upload */}
              <Stack gap={1}>
                {renderLabel('Cancel Cheque Photo')}
                {isLoading ? (
                  <Skeleton variant="rounded" height={240} width="100%" />
                ) : (
                  <>
                    <UploadSingleFile
                      id="cancel-cheque-upload"
                      file={values?.cancelChequeFile}
                      onDrop={(v) => handleDrop(v, 'ownerDetails.cancelCheque')}
                      error={Boolean(touched?.ownerDetails?.cancelCheque && errors?.ownerDetails?.cancelCheque)}
                      category
                      accept="image/*"
                      loading={state?.cancelChequeLoading}
                    />

                    {touched?.ownerDetails?.cancelCheque && errors?.ownerDetails?.cancelCheque && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors?.ownerDetails?.cancelCheque}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
