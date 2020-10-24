import React from 'react';
import { AppProps } from 'next/app';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';
import { Layout } from 'Components/index';

import '../styles/index.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathname = router.pathname;
  const prevRoute = React.useRef('/');

  React.useEffect(() => {
    const root = window.document.documentElement;
    const classList = root.classList;

    if (classList.length > 0) {
      // remove the class of the previous route
      const classToRemove = prevRoute.current.replace('/', '') || 'events';
      classList.remove(classToRemove);
    }

    // add the class of the current route
    const classToAdd = pathname.replace('/', '') || 'events';
    classList.add(classToAdd);

    // track the previous route
    prevRoute.current = pathname;
  }, [pathname]);

  return (
    <LazyLoadingProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LazyLoadingProvider>
  );
}

export default MyApp;
