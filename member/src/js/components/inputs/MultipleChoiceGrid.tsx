import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectOption } from 'Components/inputs/types';
import clx from 'classnames';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '300px',
    display: 'grid',
    gridAutoRows: '1fr',
    gridTemplateColumns: 'repeat(3, 1fr)',
    '& > *': {
      marginRight: '3px',
      marginBottom: '3px',
      width: '100px',
      fontSize: '12px',
      lineHeight: '1rem',
    },
  },
  button: {
    minHeight: '35px',
    padding: '4px 8px',
    color: theme.palette.text.secondary,
    // background: theme.palette.action.default,
    boxShadow: 'none',
    // transition: theme.defaultTransition,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    textTransform: 'none',
    overflow: 'hidden',
    '&:hover': {
      background: theme.palette.primary.light,
      borderColor: theme.palette.primary.light,
      color: 'white',
      zIndex: '100',
    },
  },
  active: {
    color: 'white',
    background: theme.palette.primary.main,
  },
}));

interface MultipleChoiceGridProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  value: string[];
}

const MultipleChoiceGrid: React.FC<MultipleChoiceGridProps> = ({ options, onChange, disabled, value }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      {options.map((option) => {
        const selected = value.includes(option.value);
        const cls = clx(styles.button, {
          [styles.active]: selected,
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
            aria-selected={selected}
          >
            {option.label || 'N/A'}
          </Button>
        );
      })}
    </div>
  );
};

export default MultipleChoiceGrid;
