import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { Hidden } from 'Components/utility';
import { RouteDefinition } from './Layout';
import { useTransition, animated } from 'react-spring';

import styles from './Header.module.css';
import { Logo } from './Logo';

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


const DesktopHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <HeaderLink pathname="/">Events</HeaderLink>
        <HeaderLink pathname="/contact">Kontakt</HeaderLink>
      </div>
      <Logo />
      <div className={styles.right}>
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

  function getDirection() {
    return -1;
  }

  const direction = getDirection();

  const transitions = useTransition(
    [prevRoute, nextRoute],
    (item) => item.pathname,
    {
      from: { opacity: 0, transform: `translate3d(${direction * 100}%,0,0)` },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: `translate3d(${-direction * 50}%,0,0)` },
    }
  );

  return (
    <header className={styles.header}>
      <div className="relative w-full h-full">
        {transitions.map(({ item, key, props }) => {
          const cls =
            item.pathname === prevRoute.pathname ? styles.left : styles.right;

          return (
            <animated.div className={cls} style={props}>
              <HeaderLink pathname={item.pathname}>{item.label}</HeaderLink>
            </animated.div>
          );
        })}
        <Logo />
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
