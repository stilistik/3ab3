import React from 'react';

type LazyLoadingElement = HTMLDivElement;

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
  const itemsRef = React.useRef<LazyLoadingItem[]>([]);

  const observerRef = React.useRef<IntersectionObserver>(
    new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry: IntersectionObserverEntry) {
        if (entry.isIntersecting) {
          const item = itemsRef.current.find(
            (item) => item.element === entry.target
          );

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
    })
  );

  function registerLazyImage(item: LazyLoadingItem) {
    observerRef.current.observe(item.element);
    itemsRef.current.push(item);
  }

  function unregisterLazyImage(item: LazyLoadingItem) {
    observerRef.current.unobserve(item.element);
    itemsRef.current = itemsRef.current.filter(
      (el) => el.element !== item.element
    );
  }

  return (
    <LazyLoadingContext.Provider
      value={{ registerLazyImage, unregisterLazyImage }}
    >
      {children}
    </LazyLoadingContext.Provider>
  );
};
