import React from 'react';
import clx from 'classnames';
import {
  InputLabel,
  InputClassKey,
  InputLabelClassKey,
} from '@material-ui/core';
import { NumberInput, NumberInputProps } from '../../inputs';
import { useField, UseFieldReturn } from '../UseField';
import { FieldProps } from '../types';
import { FormControl } from '../FormControl';
import { FieldInputLabel } from '../FieldInputLabel';

export type NumberFieldProps = Omit<FieldProps, 'fieldType'> &
  Omit<NumberInputProps, 'value' | 'onChange'> & {
    className?: string;
    classes?: NumberFieldClasses;
    multiline?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    disableUnderline?: boolean;
    disabled?: boolean;
    onEnterSubmit?: boolean;
    onBlurSubmit?: boolean;
    nullable?: boolean;
    onBlur?: (
      e: React.FocusEvent,
      props: NumberFieldProps,
      field: UseFieldReturn
    ) => void;
    onKeyDown?: (
      e: React.KeyboardEvent,
      props: NumberFieldProps,
      field: UseFieldReturn
    ) => void;
    'data-cy'?: string;
  };

interface NumberFieldClasses {
  input?: Partial<Record<InputClassKey, string>>;
  label?: Partial<Record<InputLabelClassKey, string>>;
  error?: string;
}

const defaultHandleKeyDown = (
  e: React.KeyboardEvent,
  props: NumberFieldProps,
  field: UseFieldReturn
) => {
  const { onEnterSubmit } = props;
  const { requestSubmit } = field;
  if (onEnterSubmit && requestSubmit && e.key === 'Enter') {
    requestSubmit();
  }
};

const defaultHandleBlur = (
  e: React.FocusEvent,
  props: NumberFieldProps,
  field: UseFieldReturn
) => {
  if (props.onBlurSubmit && field.requestSubmit) field.requestSubmit();
  field.onFieldCommit(props.id, field.value);
};

export const NumberField: React.FC<NumberFieldProps> = ({
  id,
  label,
  type,
  className,
  classes,
  defaultValue,
  onBlur = defaultHandleBlur,
  onKeyDown = defaultHandleKeyDown,
  'data-cy': dataCy,
  nullable = false,
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'number', type, defaultValue, ...rest };
  const field = useField(fieldProps);

  function handleChange(value: number) {
    field.onChange(value);
  }

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });
  const inputValue = typeof field.value === 'number' ? field.value : null;
  return (
    <FormControl className={cls} error={field.error}>
      <InputLabel
        htmlFor={id}
        classes={classes?.label}
        shrink={inputValue != null}
      >
        <FieldInputLabel required={rest.required} label={label} />
      </InputLabel>
      <NumberInput
        id={id}
        classes={classes?.input}
        onChange={handleChange}
        value={inputValue}
        inputProps={{
          onBlur: (e) => onBlur(e, fieldProps, field),
          onKeyDown: (e) => onKeyDown(e, fieldProps, field),
          'data-cy': dataCy,
        }}
        nullable={nullable}
        {...rest}
      />
    </FormControl>
  );
};
