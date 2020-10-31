import React from 'react';
import clx from 'classnames';

import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ title, children, style }) => {
  return (
    <div className={styles.card} style={style}>
      {title && <h1 className={styles.header}>{title}</h1>}
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export const CardBackground: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {Array(11)
          .fill(undefined)
          .map((_el, idx) => (
            <div key={`row-${idx}`} className={styles.row}>
              {Array(2)
                .fill(undefined)
                .map((_el, idx) => (
                  <div key={`wrapper-${idx}`} className={styles.wrapper}>
                    {Array(7)
                      .fill(undefined)
                      .map((_el, idx) => (
                        <div
                          key={`arrow-${idx}`}
                          className={styles.arrowWrapper}
                        >
                          <div className={clx(styles.arrow)} />
                          <div className={clx(styles.arrow, styles.one)} />
                          <div className={clx(styles.arrow, styles.two)} />
                          <div className={clx(styles.arrow, styles.three)} />
                          <div className={clx(styles.arrow, styles.four)} />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
