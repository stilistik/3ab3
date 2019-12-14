import React from 'react';
import { InputLabel, Input } from '@material-ui/core';
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

export const TextInput = (props) => {
  const {
    id,
    value,
    label,
    type,
    multiline,
    autoFocus,
    settings,
    disableUnderline,
  } = props;
  const { handleBlur, handleKeyDown, ...rest } = props;

  const onChange = (e) => {
    const value = e.target.value.slice(0, settings.len);
    rest.onChange(value);
  };
  return (
    <React.Fragment>
      <InputLabel htmlFor={id} {...rest.InputLabelProps}>
        {label}
      </InputLabel>
      <Input
        id={id}
        type={type}
        className={rest.className}
        onChange={onChange}
        value={value || ''}
        inputProps={{
          ['data-cy']: rest['data-cy'],
          onBlur: (e) => handleBlur(e, rest),
          onKeyDown: (e) => handleKeyDown(e, rest),
        }}
        multiline={multiline}
        autoFocus={autoFocus}
        disableUnderline={disableUnderline}
        {...rest.InputProps}
      />
    </React.Fragment>
  );
};

TextInput.defaultProps = {
  handleKeyDown: defaultHandleKeyDown,
  handleBlur: defaultHandleBlur,
  onChange: () => {},
  settings: {},
};

export const TextField = (props) => {
  return (
    <Field fieldType="text" defaultValue="" {...props}>
      <TextInput />
    </Field>
  );
};
