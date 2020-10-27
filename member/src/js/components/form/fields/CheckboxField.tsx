import React from 'react';
import clx from 'classnames';
import {
  FormControlLabel,
  Checkbox,
  CheckboxClassKey,
  FormControlLabelClassKey,
} from '@material-ui/core';
import { useField } from '../UseField';
import { FormControl } from '../FormControl';
import { FieldProps } from '../types';
import { FieldInputLabel } from '../FieldInputLabel';

export type CheckboxFieldProps = Omit<FieldProps, 'fieldType'> & {
  className?: string;
  classes?: CheckboxFieldClasses;
};

interface CheckboxFieldClasses {
  error?: string;
  input?: Partial<Record<CheckboxClassKey, string>>;
  label?: Partial<Record<FormControlLabelClassKey, string>>;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  className,
  classes,
  defaultValue,
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'binary', defaultValue, ...rest };
  const field = useField(fieldProps);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.checked);
    field.onFieldCommit(id, e.target.checked);
  };

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  // assert input value is of type boolean
  const inputValue = typeof field.value === 'boolean' ? field.value : false;

  return (
    <FormControl className={cls} error={field.error}>
      {label ? (
        <FormControlLabel
          classes={classes?.label}
          control={
            <Checkbox
              checked={inputValue}
              onChange={handleChange}
              color="primary"
              classes={classes?.input}
              {...rest}
            />
          }
          label={<FieldInputLabel required={rest.required} label={label} />}
        />
      ) : (
        <Checkbox
          checked={inputValue}
          onChange={handleChange}
          color="primary"
          classes={classes?.input}
          {...rest}
        />
      )}
    </FormControl>
  );
};
