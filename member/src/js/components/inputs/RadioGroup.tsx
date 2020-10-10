import React from 'react';
import clx from 'classnames';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectOption } from './types';

const useStyles = makeStyles((theme) => ({
  group: {
    display: 'flex',
    '& > *:not(:first-child)': {
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: ' 0px',
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
    '& > *:not(:last-child)': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
    },
    '& $active:not(:disabled):not(:first-child)': {
      borderLeft: `1px solid ${theme.palette.primary.main}`,
    },
  },
  button: {
    minWidth: '40px',
    height: '35px',
    padding: '4px 8px',
    color: theme.palette.text.secondary,
    // background: theme.palette.action.default,
    boxShadow: 'none',
    // transition: theme.defaultTransition,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    textTransform: 'none',
    '&:not(:disabled):hover': {
      background: theme.palette.primary.light,
      color: 'white',
      borderColor: theme.palette.primary.light,
      zIndex: 100,
    },
  },
  active: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
}));

interface RadioGroupProps {
  options: SelectOption[];
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, disabled, value, onChange }) => {
  const styles = useStyles();
  return (
    <div className={styles.group}>
      {options.map((option) => {
        const selected = value === option.value;
        const cls = clx(styles.button, {
          [styles.active]: selected,
        });
        return (
          <Button
            key={option.value}
            aria-selected={selected}
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
