import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  circle: {
    strokeDasharray: '166',
    strokeDashoffset: '166',
    strokeWidth: '2',
    strokeMiterlimit: 10,
    stroke: '#7ac142',
    fill: 'none',
    animation: '$stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
  },
  checkmark: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'block',
    strokeWidth: '2',
    stroke: '#fff',
    strokeMiterlimit: 10,
    margin: '10% auto',
    boxShadow: 'inset 0px 0px 0px #7ac142',
    animation: '$fill .4s ease-in-out .4s forwards, $scale .3s ease-in-out .9s both',
  },
  check: {
    transformOrigin: '50% 50%',
    strokeDasharray: '48',
    strokeDashoffset: '48',
    animation: '$stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
  },
  '@keyframes stroke': {
    '100%': {
      strokeDashoffset: 0,
    },
  },
  '@keyframes scale': {
    '0%, 100%': {
      transform: 'none',
    },
    '50%': {
      transform: 'scale3d(1.1, 1.1, 1)',
    },
  },
  '@keyframes fill': {
    '100%': {
      boxShadow: 'inset 0px 0px 0px 30px #7ac142',
    },
  },
});

export const AnimatedCheckmark: React.FC = () => {
  const styles = useStyles();
  return (
    <svg className={styles.checkmark} viewBox="0 0 52 52">
      <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
      <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  );
};
