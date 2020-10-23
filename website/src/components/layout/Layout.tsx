import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { useSpring, useTransition, animated } from 'react-spring';
import styles from './Layout.module.css';
import { AppItem } from 'Ppages/_app';

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

interface BodyLinkProps {
  side: 'right' | 'left';
  distance?: number;
  pathname: string;
}

const BodyLink: React.FC<BodyLinkProps> = ({
  side,
  pathname,
  distance = 60,
  children,
}) => {
  const point = side === 'left' ? distance : -distance;

  const [props, set] = useSpring(() => ({
    x: point,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const trans = (y: number) => {
    return `translate3d(0px, ${y}px, 0px)`;
  };

  return (
    <Link href={pathname}>
      <div
        className={`fixed inset-y-0 ${side}-0 flex items-center justify-center z-10`}
        style={{ width: 200 }}
      >
        <div
          className="transform rotate-90 cursor-pointer"
          style={{ fontSize: '25.5vh' }}
        >
          <animated.div
            style={{ transform: props.x.interpolate(trans) }}
            onMouseEnter={() => set({ x: 0 })}
            onMouseLeave={() => set({ x: point })}
          >
            <div className="font-black uppercase leading-none select-none">
              <span className={styles.bodyLink}>{children}</span>
            </div>
          </animated.div>
        </div>
      </div>
    </Link>
  );
};

const Header: React.FC = () => {
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

interface TransitionProps {
  items: AppItem[];
}

const routes = [
  {
    pathname: '/',
    label: 'Events',
  },
  {
    pathname: '/contact',
    label: 'Kontakt',
  },
  {
    pathname: '/about',
    label: 'About',
  },
  {
    pathname: '/archive',
    label: 'Archiv',
  },
];

const Transition: React.FC<TransitionProps> = ({ items }) => {
  const router = useRouter();

  const [location] = items;
  const direction =
    routes.findIndex((el) => el.pathname === location.id) -
    routes.findIndex((el) => el.pathname === location.prev);

  const transitions = useTransition(items, (item) => item.id, {
    from: { opacity: 0, transform: `translate3d(${direction * 100}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${-direction * 50}%,0,0)` },
  });

  return (
    <React.Fragment key={router.asPath}>
      {transitions.map(({ item, props, key }) => {
        const { Component, pageProps } = item;
        return (
          <animated.div key={key} className={styles.main} style={props}>
            <Component {...pageProps} />
          </animated.div>
        );
      })}
    </React.Fragment>
  );
};

interface LayoutProps {
  items: AppItem[];
}

export const Layout: React.FC<LayoutProps> = ({ items }) => {
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
    <div className={styles.wrapper}>
      <Header />
      <BodyLink side="left" pathname={prevRoute.pathname}>
        {prevRoute.label}
      </BodyLink>
      <Transition items={items} />
      <BodyLink side="right" pathname={nextRoute.pathname}>
        {nextRoute.label}
      </BodyLink>
    </div>
  );
};
