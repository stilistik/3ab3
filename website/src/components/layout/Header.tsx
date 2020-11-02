import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { Hidden } from 'Components/utility';
import { RouteDefinition } from './Layout';
import { useTransition, animated } from 'react-spring';
import { Logo } from './Logo';

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

const DesktopHeader: React.FC<HeaderProps> = ({ routes, show }) => {
  const router = useRouter();
  const currentRoute = routes.find((el) => el.pathname === router.asPath);
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
      <Logo />
      <div className={styles.currentRoute}>
        <h1>{currentRoute.label}</h1>
      </div>
    </header>
  );
};

interface HeaderProps {
  routes: RouteDefinition[];
  show: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return <DesktopHeader {...props} />;
};
