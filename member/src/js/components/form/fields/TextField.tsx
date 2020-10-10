import React from 'react';
import clx from 'classnames';
import { InputLabel, Input, InputClassKey, InputLabelClassKey } from '@material-ui/core';
import { useField, UseFieldReturn } from '../UseField';
import { FormControl } from '../FormControl';
import { FieldProps } from '../types';

export type TextFieldProps = Omit<FieldProps, 'fieldType'> & {
  className?: string;
  classes?: ITextFieldClasses;
  multiline?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  disableUnderline?: boolean;
  disabled?: boolean;
  onEnterSubmit?: boolean;
  onBlurSubmit?: boolean;
  onBlur?: (e: React.FocusEvent, props: TextFieldProps, field: UseFieldReturn) => void;
  onKeyDown?: (e: React.KeyboardEvent, props: TextFieldProps, field: UseFieldReturn) => void;
  'data-cy'?: string;
};

interface ITextFieldClasses {
  input?: Partial<Record<InputClassKey, string>>;
  label?: Partial<Record<InputLabelClassKey, string>>;
  error?: string;
}

function defaultHandleKeyDown(e: React.KeyboardEvent, props: TextFieldProps, field: UseFieldReturn) {
  const { onEnterSubmit } = props;
  const { requestSubmit } = field;
  if (onEnterSubmit && requestSubmit && e.key === 'Enter') {
    requestSubmit();
  }
}

function defaultHandleBlur(e: React.FocusEvent, props: TextFieldProps, field: UseFieldReturn) {
  if (props.onBlurSubmit && field.requestSubmit) field.requestSubmit();
  field.onFieldCommit(props.id, field.value);
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  className,
  classes,
  defaultValue = '',
  onBlur = defaultHandleBlur,
  onKeyDown = defaultHandleKeyDown,
  'data-cy': dataCy,
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'text', defaultValue, ...rest };
  const field = useField(fieldProps);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    field.onChange(value);
  }

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  // assert the input value is of correct type
  const inputValue = typeof field.value === 'string' ? field.value : '';

  return (
    <FormControl className={cls} error={field.error}>
      {label && (
        <InputLabel htmlFor={id} classes={classes?.label}>
          {label}
        </InputLabel>
      )}
      <Input
        id={id}
        classes={classes?.input}
        onChange={handleChange}
        value={inputValue}
        inputProps={{
          onBlur: (e) => onBlur(e, fieldProps, field),
          onKeyDown: (e) => onKeyDown(e, fieldProps, field),
          'data-cy': dataCy,
        }}
        {...rest}
      />
    </FormControl>
  );
};
