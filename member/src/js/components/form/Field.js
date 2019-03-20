import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

export class Field extends React.Component {
  onChange = (e) => {
    this.props.onChange(this.props.id, e.target.value);
  };

  render() {
    const {
      id,
      name,
      type,
      value,
      error,
      InputLabelProps,
      InputProps,
      className,
    } = this.props;
    return (
      <FormControl error={error && true} className={className}>
        <InputLabel htmlFor={id} {...InputLabelProps}>
          {name}
        </InputLabel>
        <Input
          id={id}
          type={type}
          onChange={this.onChange}
          value={value}
          {...InputProps}
        />
        <FormHelperText id="component-error-text">
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
