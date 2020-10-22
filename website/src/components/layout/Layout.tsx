import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { useSpring, animated } from 'react-spring';
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
          style={{ fontSize: 180 }}
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

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <BodyLink side="left" pathname="/archive">
        Archiv
      </BodyLink>
      <main className={styles.main}>{children}</main>
      <BodyLink side="right" pathname="/contact">
        Kontakt
      </BodyLink>
    </div>
  );
};
