import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

export class SelectField extends React.Component {
  onChange = (e) => {
    this.props.onChange(this.props.id, e.target.value);
  };

  render() {
    const { options, value, id, name, className, error, style } = this.props;
    return (
      <FormControl className={className} style={style}>
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Select
          id={id}
          value={value || []}
          onChange={this.onChange}
          className={this.props.className}
        >
          {options.map((option) => {
            return <MenuItem value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
        <FormHelperText style={{ color: 'red' }}>
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
