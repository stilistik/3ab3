import React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { Field } from './Field';

const SelectInput = ({ id, value, options, label, ...rest }) => {
  const onChange = (e) => {
    rest.onChange(e.target.value);
    rest.onFieldCommit(id, e.target.value);
  };
  return (
    <React.Fragment>
      <InputLabel htmlFor={id} {...rest.InputLabelProps}>
        {label}
      </InputLabel>
      <Select
        id={id}
        onChange={onChange}
        value={value || ''}
        data-cy={rest['data-cy']}
      >
        {options && options.length ? (
          options.map((option) => (
            <MenuItem data-cy="option" key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Options</MenuItem>
        )}
      </Select>
    </React.Fragment>
  );
};

export const SelectField = (props) => {
  return (
    <Field fieldType="select" defaultValue="" {...props}>
      <SelectInput />
    </Field>
  );
};
