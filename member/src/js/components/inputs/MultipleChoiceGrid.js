import React from 'react';
import { Button } from '@material-ui/core';
import classnames from 'classnames';

import styles from './MultipleChoiceGrid.less';

const MultipleChoiceGrid = ({ options, onChange, disabled, value }) => {
  return (
    <div className={styles.grid}>
      {options.map((option) => {
        const cls = classnames(styles.button, {
          [styles.active]: value.includes(option.value),
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

export default MultipleChoiceGrid;
