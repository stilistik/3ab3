import React from 'react';
import { Field } from './Field';
import { InputLabel, Input } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';

export const DateInput = ({ id, name, value, label, ...rest }) => {
  const onChange = (date) => {
    const str = new Date(date).toISOString();
    rest.onChange(str);
  };

  return (
    <DatePicker
      id={id}
      keyboard={true}
      format="dd/MM/yyyy"
      emptyLabel={name}
      value={value || new Date().toISOString()}
      onChange={onChange}
      TextFieldComponent={(props) => {
        return (
          <React.Fragment>
            <InputLabel htmlFor={id} {...rest.InputLabelProps}>
              {label}
            </InputLabel>
            <Input
              style={{ marginBottom: -3 }}
              id={id}
              className={rest.className}
              onChange={props.onChange}
              value={props.value}
              {...props.InputProps}
              {...rest.InputProps}
            />
          </React.Fragment>
        );
      }}
    />
  );
};

export const DateField = (props) => {
  return (
    <Field
      fieldType="date"
      type="date"
      defaultValue={new Date().toISOString()}
      {...props}
    >
      <DateInput />
    </Field>
  );
};
