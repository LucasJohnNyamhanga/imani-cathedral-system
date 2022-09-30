import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Taarifa Binafsi',
  'Mawasiliano Na Makazi',
  'Huduma Za Kiroho',
];
type dataType = {
  value:number
}
export default function HorizontalLabelPositionBelowStepper({value}:dataType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={value} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
