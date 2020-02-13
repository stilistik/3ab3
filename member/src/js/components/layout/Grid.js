import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const FlexGridItem = (props) => {
  const classes = useItemStyles(props);
  return <MuiGrid item className={classes.item} {...props} />;
};

const FlexGridContainer = (props) => {
  const classes = useContainerStyles(props);
  return <MuiGrid container className={classes.container} {...props} />;
};

FlexGridContainer.defaultProps = {
  spacing: 0,
};

const FlexGrid = ({ item, container, ...rest }) => {
  if (item && container)
    throw new Error('FlexGrid: Must be either container or item but not both.');
  if (item) return <FlexGridItem {...rest} />;
  else if (container) return <FlexGridContainer {...rest} />;
  else return <MuiGrid {...rest} />;
};

export class Grid extends React.Component {
  render() {
    return <MuiGrid {...this.props} />;
  }
}

Grid.Flex = FlexGrid;
