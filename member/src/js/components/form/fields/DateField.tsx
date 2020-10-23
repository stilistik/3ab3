import React from 'react';
import clx from 'classnames';
import { DatePicker } from '@material-ui/pickers';
import { IconButton } from '@material-ui/core';
import { Icon, Box } from 'Components/index';
import { useField } from '../UseField';
import { FormControl } from '../FormControl';
import { FieldProps } from '../types';
import { DateType } from '@date-io/type';

export type DateFieldProps = Omit<FieldProps, 'fieldType'> & {
  classes?: DateFieldClasses;
  className?: string;
};

interface DateFieldClasses {
  error?: string;
  input?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
  id,
  label,
  classes,
  className,
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'date', ...rest };
  const field = useField(fieldProps);

  const handleChange = (date: DateType) => {
    const dateISOString = new Date(date).toISOString();
    field.onChange(dateISOString);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    field.onChange(null);
  };

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  // assert the input value is of correct type
  const inputValue = typeof field.value === 'string' ? field.value : null;

  return (
    <FormControl className={cls} error={field.error} required={rest.required}>
      <DatePicker
        id={id}
        className={classes?.input}
        allowKeyboardControl={true}
        autoOk={true}
        format="dd MMMM yyyy"
        label={label}
        error={Boolean(field.error)}
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: field.value && (
            <Box clone height="30px" width="30px" p={0} pointer>
              <IconButton onClick={handleReset}>
                <Icon type="close" />
              </IconButton>
            </Box>
          ),
        }}
      />
    </FormControl>
  );
};
