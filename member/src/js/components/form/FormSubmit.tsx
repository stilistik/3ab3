import React from 'react';
import { useFormContext } from './FormContext';

export const FormSubmit: React.FC = ({ children }) => {
  const { canSubmit } = useFormContext();

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child))
          return React.cloneElement(child, {
            ...child.props,
            disabled: !canSubmit,
          });
        else return null;
      })}
    </React.Fragment>
  );
};
