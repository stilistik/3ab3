import React from 'react';
import facebookIcon from '@iconify/icons-mdi/facebook';
import instagramIcon from '@iconify/icons-mdi/instagram';
import { Icon } from '@iconify/react';

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <span>&copy; 3ab3 2020</span>
      <a href="https://www.facebook.com/3AB3-394680350883429" target="_blank">
        <Icon icon={facebookIcon} />
      </a>{' '}
      <a href="https://www.instagram.com/3ab3verein/" target="_blank">
        <Icon icon={instagramIcon} />
      </a>
    </div>
  );
};
