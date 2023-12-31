import React from 'react';
import { Icon, Loading, Box } from 'Components/index';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { Typography } from '@material-ui/core';
import { getResponsiveSrc } from './utils';

interface LazyLoadingImageProps {
  src: string;
  alt?: string;
  width: string;
  height?: string;
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
    <Box ref={divRef} width={width} height={height}>
      {!src ? (
        <Box.Center>
          <Box.Center height="200px">
            <Box d="flex" fd="column" ai="center">
              <Icon type="camera" />
              <Typography variant="body1">{alt}</Typography>
            </Box>
          </Box.Center>
        </Box.Center>
      ) : error ? (
        <Box.Center>
          <Box d="flex" fd="column" ai="center" color="typography.main">
            <Icon type="close" />
            <Typography variant="body1">Error loading image</Typography>
          </Box>
        </Box.Center>
      ) : loading ? (
        <Loading />
      ) : (
        <img src={responsiveSrc} alt={alt} width="100%" />
      )}
    </Box>
  );
};
