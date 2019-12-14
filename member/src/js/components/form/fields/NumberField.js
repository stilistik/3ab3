import React from 'react';
import { InputLabel } from '@material-ui/core';
import { NumberInput } from '../../inputs';
import { Field } from './Field';

const defaultHandleKeyDown = (e, props) => {
  const { onEnterSubmit, requestSubmit, multiline } = props;
  if (e.key === 'Enter') {
    if (multiline) e.preventDefault(); // if input is multiline we dont want to insert empty lines but instead submit
    if (onEnterSubmit && requestSubmit) {
      props.requestSubmit();
    }
    props.onFieldCommit(props.id, props.value);
  }
};

const defaultHandleBlur = (e, props) => {
  if (props.onBlurSubmit && props.requestSubmit) props.requestSubmit();
  props.onFieldCommit(props.id, props.value);
};

const FieldInput = ({ id, label, handleBlur, handleKeyDown, ...rest }) => {
  return (
    <React.Fragment>
      <InputLabel htmlFor={id} {...rest.InputLabelProps}>
        {label}
      </InputLabel>
      <NumberInput
        id={id}
        {...rest}
        inputProps={{
          ['data-cy']: rest['data-cy'],
          onBlur: (e) => handleBlur(e, rest),
          onKeyDown: (e) => handleKeyDown(e, rest),
        }}
      />
    </React.Fragment>
  );
};

FieldInput.defaultProps = {
  handleKeyDown: defaultHandleKeyDown,
  handleBlur: defaultHandleBlur,
};

export const NumberField = (props) => {
  return (
    <Field fieldType="number" defaultValue={0} {...props}>
      <FieldInput />
    </Field>
  );
};

NumberField.defaultProps = {
  min: 0,
  max: Infinity,
  step: 1,
};
