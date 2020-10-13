import React from 'react';
import { Icon, BoxProps, Loading, Box } from 'Components/index';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { Typography } from '@material-ui/core';
import { getResponsiveSrc } from './utils';

interface LazyLoadingImageProps {
  src: string;
  alt?: string;
  width: string;
  height: string;
}

export const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const { registerLazyImage, unregisterLazyImage } = useLazyLoading();

  React.useEffect(() => {
    if (!src) return;
    const img = imgRef.current;
    const div = divRef.current;

    const item: LazyLoadingItem = {
      element: img,
      src: getResponsiveSrc(src, div.clientWidth),
      setError,
      setLoading,
    };

    console.log(item);

    registerLazyImage(item);
    return () => unregisterLazyImage(item);
  }, [src]);

  return (
    <div ref={divRef} style={{ width, height }}>
      <img ref={imgRef} alt={alt} width="100%" />
    </div>
  );
};
