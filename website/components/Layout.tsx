import React from 'react';
import Link from 'next/link';

import styles from './Layout.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.link}>Events</a>
      </Link>
      <Link href={`/contact`}>
        <a className={styles.link}>Kontakt</a>
      </Link>
      <Link href={`/`}>
        <img
          className={styles.logo}
          src="3ab3-logo.svg"
          alt="3ab3 Vereinslogo"
        />
      </Link>
      <Link href={`/about`}>
        <a className={styles.link}>Statutes</a>
      </Link>
      <Link href={`/archive`}>
        <a className={styles.link}>Archiv</a>
      </Link>
    </header>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.back} />
      <main className={styles.main}>{children}</main>
      <div className={styles.forward} />
    </div>
  );
};

export default Layout;
