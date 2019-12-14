import React from 'react';
import { MultiSelectInput } from '../../inputs';
import { Field } from './Field';

const FieldInput = ({ id, ...rest }) => {
  const onChange = (value) => {
    rest.onChange(value);
    rest.onFieldCommit(id, value);
  };
  return (
    <React.Fragment>
      <MultiSelectInput id={id} {...rest} onChange={onChange} />
    </React.Fragment>
  );
};

export const MultiSelectField = (props) => {
  return (
    <Field fieldType="multiselect" defaultValue={[]} {...props}>
      <FieldInput />
    </Field>
  );
};
