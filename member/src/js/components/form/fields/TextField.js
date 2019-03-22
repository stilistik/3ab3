import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

export class TextField extends React.Component {
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
          multiline={true}
          id={id}
          rowsMax={10}
          type={type === 'password' ? 'password' : null}
          onChange={this.onChange}
          value={value}
          {...InputProps}
        />
        <FormHelperText>{error ? error.message : null}</FormHelperText>
      </FormControl>
    );
  }
}
