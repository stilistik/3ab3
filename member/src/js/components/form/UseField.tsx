import React from 'react';
import { FieldProps, Serializable, FieldOptions } from './types';
import { FormProps } from './Form';
import { useFormContext } from './FormContext';
import { useFieldScope } from './FieldScope';

export interface UseFieldReturn {
  value: Serializable;
  opts: FieldOptions;
  error: { message: string };
  onChange: (value: Serializable) => void;
  onChangeOpts: (opts: FieldOptions) => void;
  onFieldCommit: FormProps['onFieldCommit'];
  onFieldOptionSelected: FormProps['onFieldOptionSelected'];
  requestSubmit: () => void;
}

export const useField = (props: FieldProps): UseFieldReturn => {
  const formContext = useFormContext();
  const fieldScope = useFieldScope();

  const {
    setFieldValue,
    setFieldOptions,
    registerField,
    unregisterField,
    onFieldCommit,
    onFieldOptionSelected,
    requestSubmit,
  } = formContext;

  // called from form to update local state
  const [value, setValue] = React.useState(props.defaultValue);
  const [opts, setOpts] = React.useState(props.defaultOpts);
  const [error, setError] = React.useState(null);

  // called on mount and unmount to register and unregister field with form

  const fieldId = fieldScope ? `${fieldScope}.${props.id}` : props.id;

  React.useEffect(() => {
    registerField(fieldId, { ...props, id: fieldId, setValue, setOpts, setError });
    return () => unregisterField(fieldId);
  }, []);

  // updates field value in form
  const onChange = (value: Serializable) => {
    setFieldValue(fieldId, value);
  };

  // updates field options in form
  const onChangeOpts = (opts: FieldOptions) => {
    setFieldOptions(fieldId, opts);
  };

  return {
    value,
    opts,
    error,
    onChange,
    onChangeOpts,
    onFieldCommit,
    onFieldOptionSelected,
    requestSubmit,
  };
};
