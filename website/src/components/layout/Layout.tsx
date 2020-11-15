import React from 'react';
import { useRouter } from 'next/router';
import { AppRouterItem } from 'Pages/_app';
import { RouteCarousel } from './RouteCarousel';
import { Header } from './Header';
import { BodyLink } from './BodyLink';
import { Hidden } from 'Components/utility/Hidden';

import styles from './Layout.module.css';

const LayoutContext = React.createContext(undefined);

export const useLayoutContext = () => {
  const contextValue = React.useContext(LayoutContext);
  if (contextValue === undefined)
    throw new Error('useLayout must be used within LayoutContext provider.');
  return contextValue;
};

export interface RouteDefinition {
  pathname: string;
  label: string;
}

const routes: RouteDefinition[] = [
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

interface LayoutProps {
  items: AppRouterItem[];
}

export const Layout: React.FC<LayoutProps> = ({ items }) => {
  const router = useRouter();
  const [showHeader, setShowHeader] = React.useState(true);

  React.useEffect(() => {
    // when the route changes, always show header
    setShowHeader(true);
  }, [router.asPath]);

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

  const onScroll = React.useCallback((e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 0) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, []);

  return (
    <LayoutContext.Provider value={{ onScroll }}>
      <div className={styles.wrapper}>
        <Header routes={routes} show={showHeader} />
        <Hidden mdDn>
          <BodyLink side="left" pathname={prevRoute.pathname}>
            {prevRoute.label}
          </BodyLink>
        </Hidden>
        <RouteCarousel routes={routes} items={items} />
        <Hidden mdDn>
          <BodyLink side="right" pathname={nextRoute.pathname}>
            {nextRoute.label}
          </BodyLink>
        </Hidden>
      </div>
    </LayoutContext.Provider>
  );
};
