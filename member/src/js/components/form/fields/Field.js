import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

export class Field extends React.Component {
  static getInitValue = () => '';

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
      style,
    } = this.props;
    return (
      <FormControl className={className} style={style}>
        <InputLabel htmlFor={id} {...InputLabelProps}>
          {name}
        </InputLabel>
        <Input
          id={id}
          type={type === 'password' ? 'password' : null}
          onChange={this.onChange}
          value={value}
          {...InputProps}
        />
        <FormHelperText style={{ color: 'red' }}>
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
