import React from 'react';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { getResponsiveSrc } from './utils';

interface LazyLoadingImageDivProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  backgroundSize?: React.CSSProperties['backgroundSize'];
  backgroundPosition?: React.CSSProperties['backgroundPosition'];
  width?: number;
}

export const LazyLoadingImageDiv: React.FC<LazyLoadingImageDivProps> = ({
  src,
  alt = 'No image',
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  width,
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
      src: getResponsiveSrc(src, width || div.clientWidth),
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
        position: 'relative',
        backgroundSize,
        backgroundPosition,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!src ? (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <div className="w-full h-56 flex flex-col justify-center items-center">
            <span>{alt}</span>
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex absolute top-0 left-0 justify-center items-center">
          <div className="w-full h-56 flex flex-col justify-center items-center">
            <span>{alt}</span>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};
