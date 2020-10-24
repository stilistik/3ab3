import React from 'react';

export interface LazyLoadingItem {
  element: HTMLDivElement;
  src: string;
  type: 'div' | 'image';
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LazyLoadingContextValue {
  registerLazyImage: (item: LazyLoadingItem) => void;
  unregisterLazyImage: (item: LazyLoadingItem) => void;
}

const LazyLoadingContext = React.createContext<
  LazyLoadingContextValue | undefined
>(undefined);

export const useLazyLoading = (): LazyLoadingContextValue => {
  const contextValue = React.useContext(LazyLoadingContext);
  if (contextValue === undefined)
    throw new Error(
      'useLazyLoading must be used within LazyLoadingContext provider'
    );
  return contextValue;
};

export const LazyLoadingProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<LazyLoadingContextValue>(null);

  React.useEffect(() => {
    let items: LazyLoadingItem[] = [];
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry: IntersectionObserverEntry) {
        if (entry.isIntersecting) {
          const item = items.find((item) => item.element === entry.target);

          const tmpImage = new Image();
          tmpImage.onload = () => {
            if (item.type === 'div') {
              item.element.style.backgroundImage = `url(${item.src})`;
            }
            item.setLoading(false);
          };
          tmpImage.onerror = () => {
            item.setError(true);
            item.setLoading(false);
          };
          tmpImage.src = item.src;

          unregisterLazyImage(item);
        }
      });
    });

    function registerLazyImage(item: LazyLoadingItem) {
      observer.observe(item.element);
      items.push(item);
    }

    function unregisterLazyImage(item: LazyLoadingItem) {
      observer.unobserve(item.element);
      items = items.filter((el) => el.element !== item.element);
    }

    setState({ registerLazyImage, unregisterLazyImage });
  }, []);

  if (!state) return null;
  return (
    <LazyLoadingContext.Provider value={state}>
      {children}
    </LazyLoadingContext.Provider>
  );
};
