import React from 'react';
import { Box, BoxProps } from 'Components/index';

export const Logo: React.FC<BoxProps> = ({
  fontSize = '13px',
  fontWeight = 900,
  fontFamily = 'Montserrat',
  ...rest
}) => {
  return (
    <Box
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      {...rest}
    >
      <h1>3A</h1>
      <h1>B3</h1>
    </Box>
  );
};
