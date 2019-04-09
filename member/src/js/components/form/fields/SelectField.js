import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

export class SelectField extends React.Component {
  onChange = (e) => {
    this.props.onChange(this.props.id, e.target.value);
  };

  render() {
    const {
      options,
      value,
      id,
      name,
      className,
      error,
      style,
      multiple,
    } = this.props;

    return (
      <FormControl error={error && true} className={className} style={style}>
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Select
          id={id}
          value={value || []}
          onChange={this.onChange}
          className={this.props.className}
          multiple={multiple}
        >
          {options.map((option) => {
            return <MenuItem value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }
}
