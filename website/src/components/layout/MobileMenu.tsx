import React from 'react';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {}

export const MobileMenu: React.FC<MobileMenuProps> = () => {
  return <div className={styles.menu}>hello</div>;
};
