import React from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import { TagSelect } from 'Components';

export class TagField extends React.Component {
  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  };

  render() {
    const { options, value, name, className, error, style } = this.props;

    return (
      <FormControl className={className} style={style}>
        <TagSelect
          options={options}
          value={value}
          onChange={this.onChange}
          placeholder={name}
          isMulti={true}
        />
        <FormHelperText style={{ color: 'red' }}>
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
