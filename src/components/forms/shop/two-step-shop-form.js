import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Skeleton
} from '@mui/material';

import ShopDetailsForm from './shop-details';
import OwnerDetailsForm from './owner-details';
import IdentityVerificationForm from './identity-verification';

const steps = ['Shop Information', 'Identity Verification', 'Owner Details'];

export default function TwoStepShopForm({ 
  handleDrop, 
  formik, 
  state, 
  handleNameChange, 
  isLoading 
}) {
  const [activeStep, setActiveStep] = useState(0);
  const { validateForm, setTouched, handleSubmit } = formik;

  const getCurrentStepFields = (step) => {
    switch (step) {
      case 0:
        return [
          'logo', 
          'name', 
          'description', 
          'registrationNumber', 
          'address.country',
          'address.city', 
          'address.state',
          'address.streetAddress',
          'contactPerson', 
          'shopEmail', 
          'shopPhone', 
          'website', 
          'taxIdentificationNumber', 
          'vatRegistrationNumber'
        ];
      case 1:
        return [
          'identityVerification.governmentId',
          'identityVerification.proofOfAddress'
        ];
      case 2:
        return [
          'ownerDetails.aadharCardNumber',
          'ownerDetails.panNumber',
          'ownerDetails.ifscCode',
          'ownerDetails.gstNumber',
          'ownerDetails.bankBranch',
          'ownerDetails.accountNumber',
          'ownerDetails.accountHolderName',
          'ownerDetails.aadharCard',
          'ownerDetails.panCard',
          'ownerDetails.cancelCheque'
        ];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    // Validate current step before moving to next
    const errors = await validateForm();
    const currentStepFields = getCurrentStepFields(activeStep);
    
    // Check if any of the current step fields have errors
    const currentStepErrors = Object.keys(errors).filter(errorKey => 
      currentStepFields.some(field => errorKey === field || errorKey.startsWith(field + '.'))
    );
    
    if (currentStepErrors.length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Mark fields as touched to show validation errors
      const touchedFields = {};
      currentStepFields.forEach(field => {
        // Handle nested fields properly
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          if (!touchedFields[parent]) {
            touchedFields[parent] = {};
          }
          touchedFields[parent][child] = true;
        } else {
          touchedFields[field] = true;
        }
      });
      setTouched(touchedFields, true); // The second parameter merges with existing touched state
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleCreateShop = async () => {
    // Validate entire form
    const errors = await validateForm();
    console.log('Form validation errors:', errors);
    
    if (Object.keys(errors).length === 0) {
      handleSubmit();
    } else {
      // Mark all fields as touched to show all validation errors
      const allTouched = {};
      Object.keys(formik.values).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      console.log('Creating shop...')
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ShopDetailsForm
            isLoading={isLoading}
            handleDrop={handleDrop}
            handleNameChange={handleNameChange}
            state={state}
            formik={formik}
          />
        );
      case 1:
        return (
          <IdentityVerificationForm
            isLoading={isLoading}
            handleDrop={handleDrop}
            state={state}
            formik={formik}
          />
        );
      case 2:
        return (
          <OwnerDetailsForm
            isLoading={isLoading}
            handleDrop={handleDrop}
            state={state}
            formik={formik}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel 
                  onClick={() => handleStepClick(index)}
                  sx={{ 
                    cursor: 'pointer',
                    '& .MuiStepLabel-label': {
                      fontSize: '0.875rem'
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">
              {isLoading ? (
                <Skeleton variant="text" height={28} width={240} />
              ) : (
                steps[activeStep]
              )}
            </Typography>
          }
        />
        <CardContent>
          {renderStepContent(activeStep)}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          size="large"
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleCreateShop}
            variant="contained"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Shop...' : 'Create Shop'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            size="large"
          >
            Next
          </Button>
        )}
      </Stack>
    </Box>
  );
}
