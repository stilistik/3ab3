import React from 'react';
import { useRouter } from 'next/router';
import { useTransition, useSpring, animated } from 'react-spring';
import Link from 'next/link';
import clx from 'classnames';

import styles from './BodyLink.module.css';

interface VerticalSlideProps {
  direction: 'up' | 'down';
}

const VerticalSlide: React.FC<VerticalSlideProps> = ({
  direction,
  children,
}) => {
  const router = useRouter();

  const multiplier = direction === 'up' ? 1 : -1;

  const items = [
    {
      id: router.asPath,
      children: children,
    },
  ];

  const transitions = useTransition(items, (item) => item.id, {
    from: { transform: `translate3d(0,${multiplier * 600}%,0)` },
    enter: { transform: 'translate3d(0,0%,0)' },
    leave: { transform: `translate3d(0, ${-multiplier * 600}%,0)` },
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

interface HorizontalSpringProps {
  side: 'left' | 'right';
  distance?: number;
}

const HorizontalSpring: React.FC<HorizontalSpringProps> = ({
  side,
  distance = 60,
  children,
}) => {
  const point = side === 'left' ? distance : -distance;

  const [springProps, set] = useSpring(() => ({
    x: point,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const trans = (y: number) => {
    return `translate3d(0px, ${y}px, 0px)`;
  };

  return (
    <animated.div
      style={{ transform: springProps.x.interpolate(trans) }}
      onMouseEnter={() => set({ x: 0 })}
      onMouseLeave={() => set({ x: point })}
    >
      {children}
    </animated.div>
  );
};

interface BodyLinkProps {
  side: 'right' | 'left';
  distance?: number;
  pathname: string;
}

export const BodyLink: React.FC<BodyLinkProps> = ({
  side,
  pathname,
  children,
}) => {
  const styleName = pathname.replace('/', '') || 'events';

  return (
    <div
      className={`fixed inset-y-0 ${side}-0 flex items-center justify-center z-10 pointer-events-none`}
      style={{ width: 200 }}
    >
      <VerticalSlide direction={side === 'left' ? 'up' : 'down'}>
        <Link href={pathname}>
          <div
            className={
              styles.link +
              ' transform rotate-90 cursor-pointer pointer-events-auto'
            }
          >
            <HorizontalSpring side={side}>
              <div className="font-black uppercase leading-none select-none">
                <span className={clx(styles.bodyLink, styles[styleName])}>
                  {children}
                </span>
              </div>
            </HorizontalSpring>
          </div>
        </Link>
      </VerticalSlide>
    </div>
  );
};
