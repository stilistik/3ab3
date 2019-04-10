import React from 'react';
import {
  Chip,
  FormControl,
  FormHelperText,
  Typography,
} from '@material-ui/core';

import styles from './ChipArea.css';

export class SelectField extends React.Component {
  onClick = (optionId) => {
    const { value, id } = this.props;
    const selected = value.find((el) => el === optionId);
    if (selected) value.slice(value.indexOf(selected), 1);
    else value.push(optionId);
    this.props.onChange(id, value);
  };

  render() {
    const { options, value, name, className, error, style } = this.props;
    return (
      <FormControl className={className} style={style}>
        <Typography>{name}</Typography>
        <div>
          {options.map((option) => {
            const isSelected = value.find((el) => el === option.id);
            return (
              <div style={{ margin: '5px' }}>
                <Chip
                  className={isSelected ? styles.selected : ''}
                  classes={{ root: styles.chip, label: styles.chiplabel }}
                  avatar={<Avatar>{option.avatar}</Avatar>}
                  label={option.text}
                  onClick={() => this.onClick(option.id)}
                />
              </div>
            );
          })}
        </div>
        <FormHelperText style={{ color: 'red' }}>
          {error ? error.message : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
