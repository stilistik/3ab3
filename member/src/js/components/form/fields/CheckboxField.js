import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Field } from './Field';

const CheckboxInput = ({ value, label, ...rest }) => {
  const onChange = (e) => {
    rest.onChange(e.target.checked);
    rest.onFieldCommit(rest.id, e.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={onChange}
          color="primary"
          data-cy={rest['data-cy']}
        />
      }
      label={label}
    />
  );
};

export const CheckboxField = (props) => {
  return (
    <Field fieldType="binary" defaultValue={false} {...props}>
      <CheckboxInput />
    </Field>
  );
};
