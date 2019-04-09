import React from 'react';
import { Select } from 'Components';
import { FormControl, FormHelperText } from '@material-ui/core';

export class SelectField extends React.Component {
  onChange = (e) => {
    this.props.onChange(this.props.id, e.target.value);
  };

  render() {
    const {
      isMulti,
      name,
      value,
      options,
      error,
      className,
      style,
    } = this.props;
    return (
      <FormControl
        error={error && true}
        className={className}
        style={{ marginTop: '20px', ...style }}
      >
        <Select
          options={options}
          value={value}
          onChange={this.onChange}
          placeholder={name}
          isMulti={isMulti}
        />
        <FormHelperText>{error ? error.message : null}</FormHelperText>
      </FormControl>
    );
  }
}
