import React from 'react';
import { useRouter } from 'next/router';
import { useTransition, animated } from 'react-spring';
import { AppRouterItem } from 'Pages/_app';
import { RouteDefinition } from './Layout';

import styles from './RouteCarousel.module.css';

interface RouteCarouselProps {
  items: AppRouterItem[];
  routes: RouteDefinition[];
}

export const RouteCarousel: React.FC<RouteCarouselProps> = ({
  routes,
  items,
}) => {
  const router = useRouter();

  const [location] = items;

  function getDirection() {
    const diff =
      routes.findIndex((el) => el.pathname === location.id) -
      routes.findIndex((el) => el.pathname === location.prev);
    if (diff < -1) return 1;
    if (diff > 1) return -1;
    return diff;
  }

  const direction = getDirection();

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
