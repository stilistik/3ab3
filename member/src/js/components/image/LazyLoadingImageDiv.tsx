import React from 'react';
import { Icon, BoxProps, Loading, Box } from 'Components/index';
import { LazyLoadingItem, useLazyLoading } from './LazyLoadingContext';
import { Typography } from '@material-ui/core';
import { getBackendUrl } from 'Apollo/Utils';

interface LazyLoadingImageDivProps extends BoxProps {
  src: string;
  alt?: string;
}

export const LazyLoadingImageDiv: React.FC<LazyLoadingImageDivProps> = ({
  src,
  alt = 'No image',
  ...rest
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const { registerLazyImage, unregisterLazyImage } = useLazyLoading();

  React.useEffect(() => {
    if (!src) return;
    const div = divRef.current;
    const { clientWidth } = div;

    const desiredImgWidth = Math.ceil(clientWidth / 100) * 100;

    const item: LazyLoadingItem = {
      element: div,
      src: getBackendUrl() + src + `@${desiredImgWidth}`,
      setError,
      setLoading,
    };

    registerLazyImage(item);
    return () => unregisterLazyImage(item);
  }, [src]);

  return (
    <Box ref={divRef} {...rest}>
      {!src ? (
        <Box.Center>
          <Box d="flex" fd="column" ai="center" color="typography.main">
            <Icon type="camera" />
            <Typography variant="body1">{alt}</Typography>
          </Box>
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
      ) : null}
    </Box>
  );
};
