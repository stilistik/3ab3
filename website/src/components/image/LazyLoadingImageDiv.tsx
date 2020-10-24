import React from 'react';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { getResponsiveSrc } from './utils';

interface LazyLoadingImageDivProps {
  src: string;
  alt?: string;
  className?: string;
  backgroundSize?: React.CSSProperties['backgroundSize'];
  backgroundPosition?: React.CSSProperties['backgroundPosition'];
}

export const LazyLoadingImageDiv: React.FC<LazyLoadingImageDivProps> = ({
  src,
  alt = 'No image',
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  className,
  children,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const { registerLazyImage, unregisterLazyImage } = useLazyLoading();

  React.useEffect(() => {
    if (!src) return;
    const div = divRef.current;

    const item: LazyLoadingItem = {
      element: div,
      type: 'div',
      src: getResponsiveSrc(src, div.clientWidth),
      setError,
      setLoading,
    };

    registerLazyImage(item);
    return () => unregisterLazyImage(item);
  }, [src]);

  return (
    <div
      ref={divRef}
      className={className}
      style={{
        backgroundSize,
        backgroundPosition,
      }}
    >
      {!src ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-56 flex flex-col justify-center items-center">
            <span>{alt}</span>
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-56 flex flex-col justify-center items-center">
            <span>{alt}</span>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};