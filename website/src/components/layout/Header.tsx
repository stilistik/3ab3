import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';

import styles from './Header.module.css';

interface HeaderLinkProps {
  pathname: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ pathname, children }) => {
  const router = useRouter();
  const cls = clx(styles.link, {
    [styles.active]: router.pathname === pathname,
  });
  return (
    <Link href={pathname}>
      <a className={cls}>{children}</a>
    </Link>
  );
};

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <h1 className="shadow-2xl">3A</h1>
        <h1 className="shadow-2xl">B3</h1>
      </div>
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="mx-10">
        <HeaderLink pathname="/">Events</HeaderLink>
        <HeaderLink pathname="/contact">Kontakt</HeaderLink>
      </div>
      <Logo />
      <div className="mx-10">
        <HeaderLink pathname="/about">About</HeaderLink>
        <HeaderLink pathname="/archive">Archiv</HeaderLink>
      </div>
    </header>
  );
};
