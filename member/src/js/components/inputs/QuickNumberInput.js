import React from 'react';
import { Input, Button } from '@material-ui/core';
import { Icon } from '../icon';
import classnames from 'classnames';

import styles from './QuickNumberInput.less';

const QuickNumberInput = ({ id, value, min, max, step, unit, ...rest }) => {
  const [tmpValue, setTmpValue] = React.useState(null);

  const parseInputValue = (inputValue) => {
    if (step % 1 === 0) return parseInt(inputValue);
    else return parseFloat(inputValue);
  };

  const isValid = (number) => {
    if (isNaN(number)) return false;
    const isMultipleOfStep = (number - min) % step === 0;
    return number >= min && number <= max && isMultipleOfStep;
  };

  const clamp = (number) => {
    if (!isNaN(max) && number > max) number = max;
    if (!isNaN(min) && number < min) number = min;
    const rest = (number - min) % step;
    if (rest < step / 2) return number - rest;
    if (rest >= step / 2) return number + (step - rest);
  };

  const increment = (step) => {
    rest.onChange(clamp(value + step));
  };

  const decrement = (step) => {
    rest.onChange(clamp(value - step));
  };

  const onChange = (e) => {
    const val = e.target.value;

    if (rest.nullable && !val) rest.onChange(null);

    const value = parseInputValue(val);
    if (!isValid(value) || val.slice(-1) === '.') {
      // value is not a number, e.g. after Backspace or starting minus
      setTmpValue(val); // store as tmp value
    } else {
      // update form state
      rest.onChange(clamp(value));
      // replace any temp values as soon as value is number
      setTmpValue(null);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement(1);
    }
  };

  const onBlur = () => {
    if (tmpValue) {
      const value = clamp(parseInputValue(tmpValue));
      if (isValid(value)) rest.onChange(value);
    }
    setTmpValue(null);
  };

  const cls = classnames(styles.input, rest.className);
  return (
    <Input
      id={id}
      className={cls}
      classes={{
        input: styles.inputInput,
      }}
      disableUnderline={rest.disableUnderline}
      onChange={onChange}
      value={tmpValue != null ? tmpValue : value}
      inputProps={{
        ['data-cy']: rest['data-cy'],
        ...rest.inputProps,
        onKeyDown: onKeyDown,
      }}
      onBlur={onBlur}
      disabled={rest.disabled}
      startAdornment={
        <div className={styles.adornment}>
          <div className={styles.spinnersStart}>
            <Button
              tabIndex={-1}
              className={styles.spin}
              onClick={() => increment(1)}
              disabled={rest.disabled}
            >
              <Icon type="up" />
            </Button>
            <Button
              tabIndex={-1}
              className={styles.spin}
              onClick={() => decrement(1)}
              disabled={rest.disabled}
            >
              <Icon type="down" />
            </Button>
          </div>
        </div>
      }
      endAdornment={
        <div className={styles.adornment}>
          <div className={styles.spinnersEnd}>
            {[1, 2, 5].map((step) => {
              return (
                <Button
                  key={step}
                  tabIndex={-1}
                  className={styles.button}
                  onClick={() => increment(step)}
                  variant="outlined"
                  color="secondary"
                  disabled={rest.disabled}
                >
                  +{step}
                </Button>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

QuickNumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  unit: '',
  nullable: false,
};

export default QuickNumberInput;
