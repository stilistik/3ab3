import React from 'react';
import clx from 'classnames';
import styles from './HamburgerButton.module.css';

interface HamburgerButtonProps {
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  active,
  onClick,
}) => {
  return (
    <button
      className={clx(styles.hamburger, styles.spin, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      <span className={styles.box}>
        <span className={styles.inner} />
      </span>
    </button>
  );
};
