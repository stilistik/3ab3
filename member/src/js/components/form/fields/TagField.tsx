import React from 'react';
import clx from 'classnames';
import { useField } from '../UseField';
import { FormControl } from '../FormControl';
import { FieldProps } from '../types';
import { TagInput, TagInputProps } from 'Components/inputs/TagInput';

export type TagFieldProps = Omit<FieldProps, 'fieldType'> &
  Omit<TagInputProps, 'value' | 'onChange'> & {
    classes?: TagFieldClasses;
    className?: string;
  };

export interface TagFieldClasses {
  error?: string;
}

export const TagField: React.FC<TagFieldProps> = ({ id, required, defaultValue = [], classes, className, ...rest }) => {
  const fieldProps = { id, required, fieldType: 'select', defaultValue, ...rest };
  const field = useField(fieldProps);

  const handleChange = (value: string[]) => {
    field.onChange(value);
    field.onFieldCommit(id, value);
  };

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  const inputValue = field.value as string[];

  return (
    <FormControl className={cls} error={field.error} required={required}>
      <TagInput id={id} value={inputValue} onChange={handleChange} {...rest} />
    </FormControl>
  );
};
