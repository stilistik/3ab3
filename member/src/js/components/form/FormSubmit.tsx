import React from 'react';
import { useFormContext } from './FormContext';
import { Typography } from '@material-ui/core';

export const FormSubmit: React.FC = ({ children }) => {
  const [failedSubmit, setFailedSubmit] = React.useState(false);
  const { canSubmit } = useFormContext();

  const handleSubmit = (e: React.MouseEvent) => {
    if (!canSubmit) {
      e.preventDefault();
      setFailedSubmit(true);
    } else {
      setFailedSubmit(false);
    }
  };

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child))
          return React.cloneElement(child, {
            ...child.props,
            onClick: handleSubmit,
            // disabled: !canSubmit,
          });
        else return null;
      })}
      {failedSubmit && (
        <Typography variant="body2">Field values did not change.</Typography>
      )}
    </React.Fragment>
  );
};
