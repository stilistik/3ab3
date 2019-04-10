import React from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';

export class DateField extends React.Component {
  static getInitValue = () => '';

  onChange = (date) => {
    const str = new Date(date).toISOString();
    this.props.onChange(this.props.id, str);
  };

  render() {
    const { id, name, value, error, className, style } = this.props;
    return (
      <FormControl
        error={error && true}
        className={className}
        style={{ marginTop: '20px', ...style }}
      >
        <DatePicker
          id={id}
          keyboard={true}
          format="dd/MM/yyyy"
          emptyLabel={name}
          value={value || new Date().toISOString()}
          onChange={this.onChange}
        />
        <FormHelperText>{error ? error.message : null}</FormHelperText>
      </FormControl>
    );
  }
}
