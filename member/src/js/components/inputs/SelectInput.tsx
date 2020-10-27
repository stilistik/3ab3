import React from 'react';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { SelectOption } from './types';

interface StaticProps {
  componentId: number;
}

export interface SelectInputProps {
  id?: string;
  label?: React.ReactNode;
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
}

export const SelectInput: React.FC<SelectInputProps> & StaticProps = ({
  id = `SelectInput-${SelectInput.componentId++}`,
  label = '',
  value,
  onChange,
  options,
}) => {
  function handleChange(e: React.ChangeEvent<{ name?: string; value: string }>) {
    onChange(options.find((opt) => opt.value === e.target.value));
  }

  const inputValue = value ? value.value : '';

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select id={id} onChange={handleChange} value={inputValue}>
        {options && options.length ? (
          options.map((option: SelectOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Options</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

SelectInput.componentId = 0;
