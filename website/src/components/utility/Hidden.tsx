import React from 'react';
import { useMedia } from '.';

const breakPoints = {
  smUp: ['sm', 'md', 'lg', 'xl'],
  mdUp: ['md', 'lg', 'xl'],
  lgUp: ['lg', 'xl'],
  xlUp: ['xl'],
  lgDn: ['lg', 'md', 'sm', 'xs'],
  mdDn: ['md', 'sm', 'xs'],
  smDn: ['sm', 'xs'],
  xsDn: ['xs'],
};

interface HiddenProps {
  smUp?: boolean;
  mdUp?: boolean;
  lgUp?: boolean;
  xlUp?: boolean;
  lgDn?: boolean;
  mdDn?: boolean;
  smDn?: boolean;
  xsDn?: boolean;
}

export const Hidden: React.FC<HiddenProps> = ({
  smUp,
  mdUp,
  lgUp,
  xlUp,
  lgDn,
  mdDn,
  smDn,
  xsDn,
  children,
}) => {
  const bp = useMedia(
    [
      '(min-width: 1280px)',
      '(min-width: 1024px)',
      '(min-width: 768px)',
      '(min-width: 640px)',
    ],
    ['xl', 'lg', 'md', 'sm'],
    'xs'
  );

  if (smUp && breakPoints.smUp.includes(bp)) return null;
  if (mdUp && breakPoints.mdUp.includes(bp)) return null;
  if (lgUp && breakPoints.lgUp.includes(bp)) return null;
  if (xlUp && breakPoints.xlUp.includes(bp)) return null;
  if (lgDn && breakPoints.lgDn.includes(bp)) return null;
  if (mdDn && breakPoints.mdDn.includes(bp)) return null;
  if (smDn && breakPoints.smDn.includes(bp)) return null;
  if (xsDn && breakPoints.xsDn.includes(bp)) return null;

  return <React.Fragment>{children}</React.Fragment>;
};
