import React from 'react';
import clx from 'classnames';
import { SelectInput, SelectInputProps, SelectOption } from 'Components/inputs';
import { useField } from '../UseField';
import { FieldProps } from '../types';
import { FormControl } from '../FormControl';
import { FieldInputLabel } from '../FieldInputLabel';

export type SelectFieldProps = Omit<FieldProps, 'fieldType'> &
  Omit<SelectInputProps, 'onChange' | 'value'> & {
    classes?: SelectFieldClasses;
    className?: string;
    clearOption?: SelectOption;
  };

interface SelectFieldClasses {
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  required,
  options,
  label,
  classes,
  className,
  defaultValue = '',
  ...rest
}) => {
  const fieldProps = {
    id,
    required,
    fieldType: 'select',
    defaultValue,
    ...rest,
  };
  const field = useField(fieldProps);

  const handleChange = (selectedOption: SelectOption) => {
    // if an optionToItem converter is defined, we want to store the item in the form state instead of the option
    field.onChange(selectedOption.value);
    field.onFieldCommit(id, selectedOption.value);
  };

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  const inputValue = options.find((option) => option.value === field.value);

  return (
    <FormControl className={cls} error={field.error}>
      <SelectInput
        id={id}
        label={<FieldInputLabel required={required} label={label} />}
        options={options}
        value={inputValue}
        onChange={handleChange}
        {...rest}
      />
    </FormControl>
  );
};
