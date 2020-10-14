import React from 'react';
import { Box, BoxProps } from 'Components/index';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  logo: {
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 900,
    fontFamily: 'Montserrat',
    '& h1': {
      margin: 0,
      lineHeight: '21px',
    },
  },
});

export const Logo: React.FC<BoxProps> = ({ ...rest }) => {
  const styles = useStyles();
  return (
    <Box className={styles.logo} {...rest}>
      <h1>3A</h1>
      <h1>B3</h1>
    </Box>
  );
};
