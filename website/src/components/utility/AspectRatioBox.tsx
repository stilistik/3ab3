import React from 'react';
import clx from 'classnames';

import styles from './AspectRatioBox.module.css';

interface AspectRatioBoxProps {
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
}

export const AspectRatioBox = React.forwardRef(
  (
    { children, className, ratio }: AspectRatioBoxProps,
    ref: React.MutableRefObject<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={clx(styles.box, className)}
        style={{ paddingTop: ratio ? `${(1 / ratio) * 100}%` : undefined }}
      >
        <div ref={ref} className={styles.inside}>
          {children}
        </div>
      </div>
    );
  }
);
