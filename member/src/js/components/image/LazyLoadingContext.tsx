import React from 'react';

type LazyLoadingElement = HTMLDivElement | HTMLImageElement;

export interface LazyLoadingItem {
  element: LazyLoadingElement;
  src: string;
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

function isImageElement(
  target: LazyLoadingElement
): target is HTMLImageElement {
  return target instanceof HTMLImageElement;
}

function isDivElement(target: LazyLoadingElement): target is HTMLDivElement {
  return target instanceof HTMLDivElement;
}

export const LazyLoadingProvider: React.FC = ({ children }) => {
  const itemsRef = React.useRef<LazyLoadingItem[]>([]);

  const lazyImageObserverRef = React.useRef<IntersectionObserver>(
    new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry: IntersectionObserverEntry) {
        if (entry.isIntersecting) {
          const item = itemsRef.current.find(
            (item) => item.element === entry.target
          );

          const element = item.element;

          if (isImageElement(element)) {
            element.src = item.src;
            element.onload = () => {
              item.setLoading(false);
            };
            element.onerror = () => {
              item.setLoading(false);
              item.setError(true);
            };
          } else if (isDivElement(element)) {
            const tmpImage = new Image();
            tmpImage.onload = () => {
              item.element.style.backgroundImage = `url(${item.src})`;
              item.setLoading(false);
            };
            tmpImage.onerror = () => {
              item.setError(true);
              item.setLoading(false);
            };
            tmpImage.src = item.src;
          }

          lazyImageObserverRef.current.unobserve(element);
        }
      });
    })
  );

  function registerLazyImage(item: LazyLoadingItem) {
    lazyImageObserverRef.current.observe(item.element);
    itemsRef.current.push(item);
  }

  function unregisterLazyImage(item: LazyLoadingItem) {
    lazyImageObserverRef.current.unobserve(item.element);
    itemsRef.current = itemsRef.current.filter(
      (el) => el.element === item.element
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
