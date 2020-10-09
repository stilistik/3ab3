import React from 'react';
import { Box, BoxProps } from './Box';
import { useLayout } from './LayoutContext';

export const LayoutBox: React.FC<BoxProps> = ({ children, ...rest }) => {
  const layout = useLayout();
  if (!layout) return null;
  const size = layout.boxSize + 'px';
  const margin = layout.margin + 'px';
  return (
    <Box width={size} height={size} m={margin} {...rest}>
      {children}
    </Box>
  );
};
