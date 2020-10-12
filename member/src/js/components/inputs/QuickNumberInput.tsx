import React from 'react';
import { Input, Button, makeStyles } from '@material-ui/core';
import { Icon } from '../icon';
import { getDecimalCount, NumberInputProps } from './NumberInput';

const useStyles = makeStyles({
  inputInput: {
    width: '60px',
    flexGrow: 1,
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },

  adornment: {
    color: '#999',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
  },

  spinnersEnd: {
    display: 'flex',
    '& > *': {
      marginLeft: '5px',
    },
  },

  button: {
    width: '40px',
    minWidth: '40px',
    height: '40px',
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    overflow: 'hidden',

    '& span': {
      marginLeft: '-0.4em',
    },
  },

  spinnersStart: {
    height: '40px',
    width: '30px',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '10px',

    '& > *:not(:first-child)': {
      borderTopRightRadius: '0px',
      borderTopLeftRadius: '0px',
      borderTop: '1px solid #dedede',
    },
    '& > *:not(:last-child)': {
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
  },

  spin: {
    width: '30px',
    minWidth: '30px',
    height: '20px',
    padding: '0',
    margin: '0',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg:': {
      fontSize: '14px',
    },
  },
});

export const QuickNumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  min = -Infinity,
  max = Infinity,
  unit = '',
  nullable = false,
  className,
  onChange,
  ...rest
}) => {
  const styles = useStyles();
  const [tmpValue, setTmpValue] = React.useState(null);
  const [step, setStep] = React.useState(rest.step);

  /**
   * Infers the input step from the decimal count of
   * the last value that was input by the user
   */
  React.useEffect(() => {
    if (!isNaN(rest.step)) {
      // step prop changed, we have to update the local state
      setStep(rest.step);
    }
    if (rest.step == null) {
      // step prop is not defined, we infer the local step state from the value
      const decimalCount = getDecimalCount(value);
      let step = 1;
      for (let i = 0; i < decimalCount; ++i) step /= 10;
      setStep(step);
    }
  }, [value, rest.step]);

  /**
   * Validates if a number is between the boundaries
   * defined by min and max settings and if it is a multiple
   * of step
   * @param {Number} number the number to validate
   */
  const isValid = (number: number) => {
    if (isNaN(number)) return false;
    const { hasMin, hasMax, hasStep } = getDefinedBounds();
    if (hasMin && hasMax && hasStep) {
      const isMultipleOfStep = (number - min) % step < step;
      return number >= min && number <= max && isMultipleOfStep;
    } else if (hasMin && hasMax) {
      return number >= min && number <= max;
    } else if (hasMin) {
      return number >= min;
    } else if (hasMax) {
      return number <= max;
    }
    return true;
  };

  /**
   * Forces the input number to be a multiple of the step setting and
   * bounded between the min and max setting
   * @param {Number} number: the number to clamp
   */
  const clamp = (number: number) => {
    const { hasMin, hasMax, hasStep } = getDefinedBounds();
    if (hasMax && number > max) {
      number = max;
    }
    if (hasMin && number < min) {
      number = min;
    }
    if (hasStep && hasMin) {
      const rest = (number - min) % step;
      if (rest < step / 2) {
        number -= rest;
      }
      if (rest >= step / 2) {
        number += step - rest;
      }
      const decimalCount = getDecimalCount(step);
      if (decimalCount > 0) number = Number(number.toFixed(decimalCount));
    }
    return number;
  };

  /**
   * Checks if the min, max and step settings are defined and valid,
   * i.e. a valid number
   */
  const getDefinedBounds = () => {
    return {
      hasMin: min != null && !isNaN(min),
      hasMax: max != null && !isNaN(max),
      hasStep: step != null && !isNaN(step),
    };
  };

  const increment = (step: number) => {
    onChange(clamp(value + step));
  };

  const decrement = (step: number) => {
    onChange(clamp(value - step));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = e.target.value;
    if (nullable && !inputString) onChange(null);

    // if the user is entering a value that matches this regex, they are typing a
    // decimal value. We dont want to clamp or validate this, but instead just store
    // it as an temporary value and reflect it in the UI
    if (inputString.match(/^[0-9]+\.(?:0*)?$/)) {
      setTmpValue(inputString);
      return;
    }

    const value = parseFloat(e.target.value);
    if (!isValid(value)) {
      // value is not a number, e.g. after Backspace or starting minus
      setTmpValue(e.target.value); // store as tmp value
    } else {
      // update form state
      onChange(clamp(value));
      // replace any temp values as soon as value is number
      setTmpValue(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') increment(1);
    else if (e.key === 'ArrowDown') decrement(1);
  };

  const handleBlur = () => {
    if (tmpValue) {
      const value = clamp(parseFloat(tmpValue));
      if (isValid(value)) onChange(value);
    }
    setTmpValue(null);
  };

  /**
   * Returns the value to be passed down to the html input element.
   * If there is a local state temp value, we use it, otherwise we
   * use the value passed down from the form
   */
  const getInputValue = () => {
    // if the input is nullable and the received value is null, return empty string as inputValue
    if (nullable && value === null) return '';

    // if we have a temporary value due to the user typing a number that does not yet parse to a valid number,
    // we just return that temporary string to reflect it in the ui
    if (tmpValue !== null) return tmpValue;

    // if there is value prop, we clamp it and make sure it is a valid number
    const clampedValue = clamp(value);
    if (!isNaN(clampedValue) && clampedValue !== null) return clampedValue;
    else return '';
  };

  const inputValue = getInputValue();

  return (
    <Input
      id={id}
      className={className}
      classes={{
        input: styles.inputInput,
      }}
      disableUnderline={rest.disableUnderline}
      onChange={handleChange}
      value={inputValue}
      inputProps={{
        ...rest.inputProps,
        onKeyDown: handleKeyDown,
      }}
      onBlur={handleBlur}
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
