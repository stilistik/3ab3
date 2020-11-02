import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { Hidden } from 'Components/utility';
import { RouteDefinition } from './Layout';
import { useTransition, animated } from 'react-spring';
import { Logo } from './Logo';
import { Icon } from '@iconify/react';
import chevronLeftIcon from '@iconify/icons-mdi/chevron-left';
import chevronRightIcon from '@iconify/icons-mdi/chevron-right';

import styles from './Header.module.css';

interface HeaderLinkProps {
  pathname: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ pathname, children }) => {
  const router = useRouter();
  const styleName = pathname.replace('/', '') || 'events';
  const cls = clx(styles.link, styles[styleName]);
  return (
    <Link href={pathname}>
      <a className={cls}>
        <h1>{children}</h1>
      </a>
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
    direction: -1,
    className: idx === 0 ? styles.left : styles.right,
    label:
      idx === 0 ? (
        <Icon icon={chevronLeftIcon} />
      ) : (
        <Icon icon={chevronRightIcon} />
      ),
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
                (x: number) => `translate3d(0px, ${x}px, 0px)`
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
  const router = useRouter();
  const currentRoute = routes.find((el) => el.pathname === router.asPath);
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
      {show && <MobileHeaderLinks routes={routes} />}
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
