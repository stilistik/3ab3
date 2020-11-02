import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useTransition, useSpring, animated } from 'react-spring';
import { AppRouterItem } from 'Pages/_app';
import { RouteDefinition, useLayoutContext } from './Layout';
import { useGesture } from 'react-use-gesture';

import styles from './RouteCarousel.module.css';
import { useMedia } from 'Components/utility';
import { receiveMessageOnPort } from 'worker_threads';

const useMobileRouteSwipe = (router: NextRouter, routes: RouteDefinition[]) => {
  const isMobile = useMedia(['(max-width: 640px)'], [true], false);
  const hasChangedRef = React.useRef(false);

  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  React.useEffect(() => {
    hasChangedRef.current = false;
    set({ x: 0 });
  }, [router.asPath]);

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], velocity }) => {
      if (!isMobile) return;
      const trigger = velocity > 0.2 && Math.abs(xDelta) > 50;

      const dir = xDir < 0 ? 1 : -1;
      if (!down && trigger) {
        hasChangedRef.current = true;
        const currentIndex = routes.findIndex(
          (el) => el.pathname === router.asPath
        );
        let newIndex = currentIndex + dir;
        if (newIndex < 0) newIndex = routes.length - 1;
        else if (newIndex >= routes.length) newIndex = 0;
        const newLocation = routes[newIndex].pathname;
        router.push(newLocation);
      }

      const x = hasChangedRef.current
        ? (200 + window.innerWidth) * -dir
        : down
        ? xDelta
        : 0;
      set({
        x,
        config: {
          friction: 50,
          tension: down ? 800 : hasChangedRef.current ? 200 : 500,
        },
      });
    }
  );
  return { x, bind };
};

const useScroll = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const layout = useLayoutContext();

  React.useEffect(() => {
    const container = ref.current;
    container.addEventListener('scroll', layout.onScroll);
    return () => container.removeEventListener('scroll', layout.onScroll);
  }, [layout]);

  return ref;
};

interface RouteCarouselProps {
  items: AppRouterItem[];
  routes: RouteDefinition[];
}

export const RouteCarousel: React.FC<RouteCarouselProps> = ({
  routes,
  items,
}) => {
  const router = useRouter();
  const containerRef = useScroll();

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

  const transitions = useTransition(items, (item: AppRouterItem) => item.id, {
    from: { opacity: 0, transform: `translate3d(${direction * 100}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${-direction * 50}%,0,0)` },
  });

  const { x, bind } = useMobileRouteSwipe(router, routes);

  return (
    <div
      className="relative w-screen h-screen overflow-x-hidden"
      key={router.asPath}
      ref={containerRef}
    >
      <animated.div
        style={{
          transform: x.interpolate((x) => `translate3d(${x}px,0px,0)`),
        }}
      >
        {transitions.map(({ item, props, key }) => {
          const { Component, pageProps } = item;
          return (
            <animated.div
              key={key}
              {...bind()}
              className={styles.main}
              style={props}
            >
              <Component {...pageProps} />
            </animated.div>
          );
        })}
      </animated.div>
    </div>
  );
};
