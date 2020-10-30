import React from 'react';

import styles from './CloseButton.module.css';

interface CloseButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      +
    </button>
  );
};
