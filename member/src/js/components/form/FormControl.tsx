import React from 'react';
import { FieldError } from './types';
import {
  FormControl as MuiFormControl,
  FormHelperText,
} from '@material-ui/core';
import { useFormContext } from './FormContext';
import { Box, BoxProps } from 'Components/layout';

type FormControlProps = BoxProps & {
  error: FieldError;
  fullWidth?: boolean;
  required?: boolean;
};

export const FormControl: React.FC<FormControlProps> = ({
  children,
  error,
  required,
  fullWidth = true,
  ...rest
}) => {
  const { disableHelpText } = useFormContext();
  const hasError = Boolean(error);

  return (
    <Box w={fullWidth ? '100%' : 'auto'} {...rest}>
      <Box.Row>
        <Box w="15px" color="error.main" mt="1em">
          {required ? '*' : null}
        </Box>
        <MuiFormControl fullWidth={fullWidth} error={hasError}>
          {children}
          {!disableHelpText && hasError ? (
            <FormHelperText role="alert">{error.message}</FormHelperText>
          ) : null}
        </MuiFormControl>
      </Box.Row>
    </Box>
  );
};
