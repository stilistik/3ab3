import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useRingStyles = makeStyles((theme) => ({
  '@keyframes ring': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
    width: '60px',
    height: '60px',
    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: '44px',
      height: '44px',
      margin: '8px',
      border: '3px solid #fff',
      borderRadius: '50%',
      animation: '$ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
    },
    '& div:nth-child(1)': {
      animationDelay: '-0.45s',
    },
    '& div:nth-child(2)': {
      animationDelay: '-0.3s',
    },
    '& div:nth-child(3)': {
      animationDelay: '-0.15s',
    },
  },
}));

export const RingSpinner = () => {
  const styles = useRingStyles();
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const useChaseStyles = makeStyles((theme) => ({
  '@keyframes chase': {
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes dot': {
    '80%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes before': {
    '50%': { transform: 'scale(0.4)' },
    '100%': { transform: 'scale(1.0)' },
    '0%': { transform: 'scale(1.0)' },
  },
  chase: {
    width: '40px',
    height: '40px',
    position: 'relative',
    animation: '$chase 2.5s infinite linear both',
  },
  dot: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    animation: '$dot 2.0s infinite ease-in-out both',
    '&:before': {
      content: '""',
      display: 'block',
      width: '25%',
      height: '25%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '100%',
      animation: '$before 2.0s infinite ease-in-out both',
    },
    '&:nth-child(1)': {
      animationDelay: '-1.1s',
      '&:before': {
        animationDelay: '-1.1s',
      },
    },
    '&:nth-child(2)': {
      animationDelay: '-1.0s',
      '&:before': {
        animationDelay: '-1.0s',
      },
    },
    '&:nth-child(3)': {
      animationDelay: '-0.9s',
      '&:before': {
        animationDelay: '-0.9s',
      },
    },
    '&:nth-child(4)': {
      animationDelay: '-0.8s',
      '&:before': {
        animationDelay: '-0.8s',
      },
    },
    '&:nth-child(5)': {
      animationDelay: '-0.7s',
      '&:before': {
        animationDelay: '-0.7s',
      },
    },
    '&:nth-child(6)': {
      animationDelay: '-0.6s',
      '&:before': {
        animationDelay: '-0.6s',
      },
    },
  },
}));

export const ChaseProgress = () => {
  const styles = useChaseStyles();
  return (
    <div className={styles.chase}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};