import React from 'react';
import { Box } from 'Components/index';

interface FieldInputLabelProps {
  label?: string;
  required?: boolean;
}

export const FieldInputLabel: React.FC<FieldInputLabelProps> = ({
  required,
  label,
}) => {
  if (!label) return null;
  return (
    <Box.Row>
      <Box mr={0.5}>{label}</Box>
      {!required && <em>- Optional</em>}
    </Box.Row>
  );
};
