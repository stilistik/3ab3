import React from 'react';
import { Input, Button, InputProps, makeStyles } from '@material-ui/core';
import { Icon } from '../icon';

const useStyles = makeStyles({
  inputInput: {
    width: '60px',
    flexGrow: 10,
  },
  adornment: {
    color: '#999',
    display: 'grid',
    gridAutoRows: '1fr',
    gridTemplateColumns: '1fr 35px',
    columnGap: '5px',
    alignItems: 'center',
    fontSize: '14px',
  },
  spinners: {
    height: '100 %',
    width: '30px',
    marginLeft: '5px',
    '& > *: not(: first- child)': {
      borderTopRightRadius: '0px',
      borderTopLeftRadius: '0px',
      borderTop: '1px solid #dedede',
    },
    '& > *: not(: last - child)': {
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
  },
  button: {
    maxWidth: '100 %',
    minWidth: '30px',
    width: '30px',
    height: '50 %',
    padding: '0',
    margin: '0',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: '14px',
    },
  },
});

function getDecimalCount(number: number) {
  if (isNaN(number)) return 0;
  const numStr = String(number);
  const decimalStr = numStr.split('.')[1];
  return decimalStr ? decimalStr.length : 0;
}

export interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  id?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  nullable?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  min,
  max,
  unit,
  onChange,
  nullable = false,
  disabled,
  ...rest
}) => {
  const [tmpValue, setTmpValue] = React.useState<string | null>(null);
  const [step, setStep] = React.useState(rest.step);
  const styles = useStyles();
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

  const increment = () => {
    onChange(clamp(value + step));
  };

  const decrement = () => {
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
    if (e.key === 'ArrowUp') increment();
    else if (e.key === 'ArrowDown') decrement();
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
      onChange={handleChange}
      value={inputValue}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      endAdornment={
        <div className={styles.adornment}>
          <span aria-label="number-input-unit">{unit}</span>
          <div className={styles.spinners}>
            <Button tabIndex={-1} className={styles.button} onClick={increment} disabled={disabled}>
              <Icon type="up" />
            </Button>
            <Button tabIndex={-1} className={styles.button} onClick={decrement} disabled={disabled}>
              <Icon type="down" />
            </Button>
          </div>
        </div>
      }
      {...rest}
    />
  );
};

export default NumberInput;
