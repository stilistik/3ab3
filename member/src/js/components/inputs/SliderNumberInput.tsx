import React from 'react';
import { Slider, makeStyles, SliderClassKey, InputClassKey } from '@material-ui/core';
import { NumberInput, NumberInputProps } from './NumberInput';
import { Box } from 'Components/index';

const useStyles = makeStyles((theme) => ({
  sliderInput: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    marginLeft: '15px',
    paddingLeft: '7px',
  },
}));

type SliderNumberInputProps = Omit<NumberInputProps, 'classes'> & {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  classes?: SliderNumberInputClasses;
};

interface SliderNumberInputClasses {
  slider?: Partial<Record<SliderClassKey, string>>;
  input?: Partial<Record<InputClassKey, string>>;
}

export const SliderNumberInput: React.FC<SliderNumberInputProps> = ({
  value,
  disabled,
  onChange,
  min,
  max,
  step,
  classes,
  ...rest
}) => {
  const [tmpValue, setTmpValue] = React.useState<number | null>(null);
  const styles = useStyles();

  const handleSliderChange = (event: React.ChangeEvent<any>, value: number) => {
    setTmpValue(value);
  };

  const handleInputChange = (value: number) => {
    setTmpValue(null);
    onChange(value);
  };

  const handleChangeCommitted = (event: React.ChangeEvent<any>, value: number) => {
    setTmpValue(null);
    onChange(value);
  };

  return (
    <Box.Row cmrnl={1}>
      <Slider
        value={tmpValue || value || 0}
        classes={classes?.slider}
        onChange={handleSliderChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        disabled={disabled}
      />
      <NumberInput
        className={styles.sliderInput}
        classes={classes?.input}
        value={tmpValue || value || 0}
        onChange={handleInputChange}
        disableUnderline
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        {...rest}
      />
    </Box.Row>
  );
};
