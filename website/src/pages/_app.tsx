import { AppProps } from 'next/app';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyLoadingProvider>
      <Component {...pageProps} />
    </LazyLoadingProvider>
  );
}

export default MyApp;
