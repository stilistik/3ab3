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

const DesktopHeader: React.FC<HeaderProps> = ({ show }) => {
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
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

interface MobileHeaderLinksProps {
  routes: RouteDefinition[];
}

const MobileHeaderLinks: React.FC<MobileHeaderLinksProps> = ({ routes }) => {
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

  const items = [prevRoute, nextRoute].map((el, idx) => ({
    ...el,
    direction: idx === 0 ? -1 : 1,
    className: idx === 0 ? styles.left : styles.right,
  }));

  const transitions = useTransition<any, any>(items, (item) => item.pathname, {
    from: (item) => ({ x: item.direction * window.innerWidth }),
    enter: { x: 0, opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 5, tension: 150, friction: 40 },
  });
  return (
    <React.Fragment>
      {transitions.map(({ item, key, props }) => {
        const { x, ...rest } = props;
        return (
          <animated.div
            key={item.pathname + key}
            className={item.className}
            style={{
              transform: x.interpolate(
                (x: number) => `translate3d(${x}px, 0px, 0px)`
              ),
              ...rest,
            }}
          >
            <HeaderLink pathname={item.pathname}>{item.label}</HeaderLink>
          </animated.div>
        );
      })}
    </React.Fragment>
  );
};

const MobileHeader: React.FC<HeaderProps> = ({ routes, show }) => {
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
      <div className="relative w-full h-full">
        {show && <MobileHeaderLinks routes={routes} />}
        <Logo />
      </div>
    </header>
  );
};

interface HeaderProps {
  routes: RouteDefinition[];
  show: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <MobileHeader {...props} />
      </Hidden>
      <Hidden xsDn>
        <DesktopHeader {...props} />
      </Hidden>
    </React.Fragment>
  );
};
