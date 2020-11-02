import { makeStyles, useTheme } from '@material-ui/core';
import React from 'react';
import MasonryGrid from 'react-masonry-css';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'flex',
    marginLeft: -theme.spacing(3) /* gutter size offset */,
    width: 'auto',
  },
  column: {
    paddingLeft: theme.spacing(3) /* gutter size */,
    backgroundClip: 'padding-box',
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

export const Masonry: React.FC = ({ children }) => {
  const styles = useStyles();
  const theme = useTheme();

  const breakpoints = {
    default: 2,
    [theme.breakpoints.values.sm]: 1,
  };

  return (
    <MasonryGrid
      breakpointCols={breakpoints}
      className={styles.grid}
      columnClassName={styles.column}
    >
      {React.Children.map(children, (child) => {
        return <div className={styles.item}>{child}</div>;
      })}
    </MasonryGrid>
  );
};
