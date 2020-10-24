import React from 'react';
import { AppProps } from 'next/app';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';
import { Layout } from 'Components/index';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyLoadingProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LazyLoadingProvider>
  );
}

export default MyApp;
