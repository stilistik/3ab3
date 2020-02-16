import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from './Box';
import { Grid as MuiGrid } from '@material-ui/core';

const useItemStyles = makeStyles({
  item: (props) => ({
    height: props.height || '100%',
    width: 'auto',
  }),
});

const useContainerStyles = makeStyles((theme) => ({
  container: (props) => ({
    height: props.height
      ? `calc(${props.height} + ${theme.spacing(props.spacing)}px)`
      : `calc(100% + ${theme.spacing(props.spacing)}px)`,
    width: 'auto',
    flex: '0 10 auto',
    overflow: 'hidden',
  }),
}));

const FixGridItem = (props) => {
  const classes = useItemStyles(props);
  return <MuiGrid item className={classes.item} {...props} />;
};

const FixGridContainer = (props) => {
  const classes = useContainerStyles(props);
  return <MuiGrid container className={classes.container} {...props} />;
};

FixGridContainer.defaultProps = {
  spacing: 0,
};

const FixGrid = ({ item, container, ...rest }) => {
  if (item && container)
    throw new Error('FlexGrid: Must be either container or item but not both.');
  if (item) return <FixGridItem {...rest} />;
  else if (container) return <FixGridContainer {...rest} />;
  else return <MuiGrid {...rest} />;
};

const useDefaultStyles = makeStyles({
  grid: {
    overflowY: 'auto',
    height: '100%',
  },
});

const DefaultGrid = ({ children, ...rest }) => {
  const classes = useDefaultStyles();
  return (
    <FixGrid container justify="center" className={classes.grid}>
      <FixGrid item xs={12} md={10} lg={8} xl={6}>
        {children}
      </FixGrid>
    </FixGrid>
  );
};
export class Grid extends React.Component {
  render() {
    return <MuiGrid {...this.props} />;
  }
}

Grid.Fix = FixGrid;
Grid.Default = DefaultGrid;
