import React from 'react';
import { Box } from 'Components/index';
import { TextField, Chip, StandardTextFieldProps } from '@material-ui/core';

/**
 * The default function that renders the currently selected tags. This can be
 * overridden via the renderValue prop of TagInput
 * @param value: the current input value
 * @param handleDelete: A function callback if delete is called on an element
 */
function defaultRenderValue(value: string[], handleDelete: (item: string) => void) {
  return value.map((item) => (
    <Box key={item} m="3px" clone>
      <Chip key={item} tabIndex={-1} label={<span>{item}</span>} onDelete={() => handleDelete(item)} />
    </Box>
  ));
}

export type TagInputProps = Omit<StandardTextFieldProps, 'value' | 'onChange'> & {
  label?: React.ReactNode;
  value: string[];
  onChange: (value: string[]) => void;
  renderValue?: (value: string[], handleDelete: (item: string) => void) => React.ReactNode;
};

export const TagInput: React.FC<TagInputProps> = ({
  label,
  value,
  onChange,
  renderValue = defaultRenderValue,
  InputProps,
  ...rest
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue.length && !value.includes(inputValue)) {
      const newvalue = [...value, inputValue];
      onChange(newvalue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (value.length && !inputValue.length && e.key === 'Backspace') {
      onChange(value.slice(0, value.length - 1));
    }
    if (inputValue.length && e.key === 'Enter') commitInputValue(inputValue);
  };

  const commitInputValue = (inputValue: string) => {
    const newValue = inputValue.trim();
    if (!value.includes(newValue)) {
      const newvalue = [...value, inputValue];
      onChange(newvalue);
      setInputValue('');
    }
  };

  const handleDelete = (item: string) => {
    const newValue = value.filter((el) => el !== item);
    onChange(newValue);
  };

  return (
    <TextField
      label={label}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      InputProps={{
        startAdornment: renderValue(value, handleDelete),
        onKeyDown: handleKeyDown,
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default TagInput;
