import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';

import styles from './Layout.module.css';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <h1>3A</h1>
        <h1>B3</h1>
      </div>
    </Link>
  );
};

interface HeaderLinkProps {
  pathName: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ children, pathName }) => {
  const router = useRouter();
  const isActive = router.pathname === pathName;
  const className = clx(styles.link, { [styles.active]: isActive });  
  return (
    <Link href={pathName}>
      <a className={className}>{children}</a>
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <HeaderLink pathName="/">Events</HeaderLink>
      <HeaderLink pathName="/contact">Kontakt</HeaderLink>
      <Logo />
      <HeaderLink pathName="/about">Verein</HeaderLink>
      <HeaderLink pathName="/archive">Archiv</HeaderLink>
    </header>
  );
};

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.back} />
      <main className={styles.main}>{children}</main>
      <div className={styles.forward} />
    </div>
  );
};
