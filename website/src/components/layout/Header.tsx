import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';

import styles from './Header.module.css';
import { Hidden } from 'Components/utility';
import { RouteDefinition } from './Layout';

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

const DesktopHeader: React.FC = () => {
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

const MobileHeader: React.FC<HeaderProps> = ({ routes }) => {
  const router = useRouter();

  function clampIndex(value: number): number {
    if (value < 0) value = routes.length - 1;
    if (value > routes.length - 1) value = 0;
    return value;
  }

  const currentIndex = routes.findIndex((el) => el.pathname === router.asPath);
  const nextIndex = clampIndex(currentIndex + 1);
  const prevIndex = clampIndex(currentIndex - 1);

  const prevRoute = routes[prevIndex];
  const nextRoute = routes[nextIndex];

  return (
    <header className={styles.header}>
      <div className="mx-10">
        <HeaderLink pathname={prevRoute.pathname}>{prevRoute.label}</HeaderLink>
      </div>
      <Logo />
      <div className="mx-10">
        <HeaderLink pathname={nextRoute.pathname}>{nextRoute.label}</HeaderLink>
      </div>
    </header>
  );
};

interface HeaderProps {
  routes: RouteDefinition[];
}

export const Header: React.FC<HeaderProps> = ({ routes }) => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <MobileHeader routes={routes} />
      </Hidden>
      <Hidden xsDn>
        <DesktopHeader />
      </Hidden>
    </React.Fragment>
  );
};
