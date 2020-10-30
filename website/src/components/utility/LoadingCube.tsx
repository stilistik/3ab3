import React from 'react';
import clx from 'classnames';
import styles from './LoadingCube.module.css';

const sides = [
  'show-front',
  'show-back',
  'show-left',
  'show-right',
  'show-top',
  'show-bottom',
];

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = React.useRef(null);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const LoadingCube: React.FC = () => {
  const [show, setShow] = React.useState(0);

  useInterval(() => {
    let newSide = Math.floor(Math.random() * 6);
    if (newSide === show) {
      if (newSide > 1) newSide--;
      else newSide++;
    }
    setShow(newSide);
  }, 1000);

  return (
    <div className={styles['scene']}>
      <div className={clx(styles['cube'], styles[sides[show]])}>
        <div className={clx(styles['cube__face'], styles['cube__face--front'])}>
          3
        </div>
        <div className={clx(styles['cube__face'], styles['cube__face--back'])}>
          3
        </div>
        <div className={clx(styles['cube__face'], styles['cube__face--right'])}>
          B
        </div>
        <div className={clx(styles['cube__face'], styles['cube__face--left'])}>
          A
        </div>
        <div className={clx(styles['cube__face'], styles['cube__face--top'])}>
          A
        </div>
        <div
          className={clx(styles['cube__face'], styles['cube__face--bottom'])}
        >
          B
        </div>
      </div>
    </div>
  );
};
