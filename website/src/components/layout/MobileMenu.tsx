import React from 'react';
import Link from 'next/link';
import { useTransition, animated } from 'react-spring';
import { RouteDefinition } from './Layout';
import clx from 'classnames';
import styles from './MobileMenu.module.css';

interface VerticalSlideProps {
  show: Boolean;
}

const VerticalSlide: React.FC<VerticalSlideProps> = ({ show, children }) => {
  const items = show
    ? [
        {
          id: 'menu',
          children: children,
        },
      ]
    : [];

  const transitions = useTransition(items, (item) => item.id, {
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
    from: { transform: `translate3d(0, -100vh,0)` },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: `translate3d(0, -100vh,0)` },
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={{ ...props, position: 'absolute' }}>
            {item.children}
          </animated.div>
        );
      })}
    </React.Fragment>
  );
};

interface HorizontalSlideProps {
  routes: RouteDefinition[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const HorizontalSlide: React.FC<HorizontalSlideProps> = ({
  routes,
  show,
  setShow,
}) => {
  const items = show
    ? routes.map((route, index) => ({
        ...route,
        index: index,
        multiplier: index % 2 === 0 ? -1 : 1,
      }))
    : [];

  const transitions = useTransition(items, (item) => item.pathname, {
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
    from: (item) => ({
      transform: `translate3d(${item.multiplier * 100}vw, 0, 0)`,
    }),
    enter: { transform: 'translate3d(0,0%,0)' },
    leave: (item) => ({
      transform: `translate3d(${-item.multiplier * 100}vw, 0, 0)`,
    }),
  });

  const topMargin = 10;
  const itemHeight = 20;

  return (
    <React.Fragment>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              position: 'absolute',
              top: topMargin + item.index * itemHeight + 'vh',
              height: itemHeight + 'vh',
              width: '100vw',
            }}
          >
            <MobileMenuLink route={item} setShow={setShow} />
          </animated.div>
        );
      })}
    </React.Fragment>
  );
};

interface MobileMenuLinkProps {
  route: RouteDefinition;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({ route, setShow }) => {
  const handleClick = () => setShow(false);
  const pathCls = route.pathname.replace('/', '') || 'events';
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Link href={route.pathname}>
        <a className={clx(styles.link, styles[pathCls])} onClick={handleClick}>
          {route.label}
        </a>
      </Link>
    </div>
  );
};

interface MobileMenuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  routes: RouteDefinition[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  routes,
  show,
  setShow,
}) => {
  return (
    <div className={styles.container}>
      <VerticalSlide show={show}>
        <div className={styles.menu}>
          <HorizontalSlide routes={routes} show={show} setShow={setShow} />
        </div>
      </VerticalSlide>
    </div>
  );
};
