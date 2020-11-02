import React from 'react';
import Link from 'next/link';

import styles from './Logo.module.css';

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <h1 className="shadow-2xl">3A</h1>
        <h1 className="shadow-2xl">B3</h1>
      </div>
    </Link>
  );
};
