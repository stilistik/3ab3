import React from 'react';
import { InputLabel } from '@material-ui/core';
import { QuickNumberInput } from '../../inputs';
import { NumberFieldProps } from './NumberField';
import { useField, UseFieldReturn } from '../UseField';
import { FormControl } from '../FormControl';
import clx from 'classnames';

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

export const QuickNumberField: React.FC<NumberFieldProps> = ({
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
      {label && (
        <InputLabel
          htmlFor={id}
          classes={classes?.label}
          shrink={inputValue != null}
        >
          {label}
        </InputLabel>
      )}
      <QuickNumberInput
        id={id}
        classes={classes?.input}
        onChange={handleChange}
        value={inputValue}
        inputProps={{
          onBlur: (e) => onBlur(e, fieldProps, field),
          onKeyDown: (e) => onKeyDown(e, fieldProps, field),
        }}
        nullable={nullable}
        {...rest}
      />
    </FormControl>
  );
};
