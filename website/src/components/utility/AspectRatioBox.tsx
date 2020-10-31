import React from 'react';
import clx from 'classnames';

import styles from './AspectRatioBox.module.css';

interface AspectRatioBoxProps {
  ratio?: number;
  className?: string;
}

export const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({
  children,
  className,
  ratio,
}) => {
  return (
    <div
      className={clx(styles.box, className)}
      style={{ paddingTop: ratio ? `${(1 / ratio) * 100}%` : undefined }}
    >
      <div className={styles.inside}>{children}</div>
    </div>
  );
};
