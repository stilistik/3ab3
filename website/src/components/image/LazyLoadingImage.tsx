import React from 'react';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { getResponsiveSrc } from './utils';

interface LazyLoadingImageProps {
  src: string;
  alt?: string;
  width: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

export const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({
  src,
  alt = 'No image',
  width,
  height,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [responsiveSrc, setResponsiveSrc] = React.useState<string | null>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const { registerLazyImage, unregisterLazyImage } = useLazyLoading();

  React.useEffect(() => {
    if (!src) return;
    const div = divRef.current;

    const responsiveSrc = getResponsiveSrc(src, div.clientWidth);

    const item: LazyLoadingItem = {
      element: div,
      type: 'image',
      src: responsiveSrc,
      setError,
      setLoading,
    };

    setResponsiveSrc(responsiveSrc);

    registerLazyImage(item);
    return () => unregisterLazyImage(item);
  }, [src]);

  return (
    <div ref={divRef} style={{ width, height }}>
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
      ) : loading ? null : (
        <img src={responsiveSrc} alt={alt} width="100%" />
      )}
    </div>
  );
};
