import React from 'react';
import { Button } from '@material-ui/core';
import classnames from 'classnames';

import styles from './RadioGroup.less';

const RadioGroup = ({ options, disabled, value, onChange }) => {
  return (
    <div className={styles.buttonGroup}>
      {options.map((option) => {
        const cls = classnames(styles.button, {
          [styles.active]: value === option.value,
        });
        return (
          <Button
            key={option.value}
            className={cls}
            onClick={() => onChange(option.value)}
            onMouseDown={(e) => e.preventDefault()} // prevent focus
            variant="contained"
            color="primary"
            disabled={disabled}
          >
            {option.label || 'N/A'}
          </Button>
        );
      })}
    </div>
  );
};

export default RadioGroup;
