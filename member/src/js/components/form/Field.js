import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

export class Field extends React.Component {
  render() {
    const { id, name, type, value, error, onChange } = this.props;
    return (
      <FormControl error={error && true}>
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Input id={id} type={type} onChange={onChange} value={value} />
        <FormHelperText id="component-error-text">
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
