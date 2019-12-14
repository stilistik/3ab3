import React from 'react';
import { InputLabel } from '@material-ui/core';
import { TagInput } from '../../inputs';
import { Field } from './Field';

const FieldInput = ({ label, id, ...rest }) => {
  const onChange = (value) => {
    rest.onChange(value);
    rest.onFieldCommit(id, value);
  };
  return (
    <React.Fragment>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TagInput id={id} {...rest} onChange={onChange} />
    </React.Fragment>
  );
};

export const TagField = (props) => {
  return (
    <Field fieldType="multiselect" defaultValue={[]} {...props}>
      <FieldInput />
    </Field>
  );
};
