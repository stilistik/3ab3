import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid as MuiGrid, GridProps } from '@material-ui/core';

export type GridRef = HTMLDivElement;

export interface FlexGridProps extends GridProps {
  height?: string;
  item?: boolean;
  container?: boolean;
}

const useItemStyles = makeStyles<any, FlexGridProps>({
  item: (props) => ({
    height: props.height || '100%',
    width: 'auto',
  }),
});

const useContainerStyles = makeStyles<any, FlexGridProps>((theme) => ({
  container: (props) => ({
    height: props.height
      ? `calc(${props.height} + ${theme.spacing(props.spacing)}px)`
      : `calc(100% + ${theme.spacing(props.spacing)}px)`,
    width: 'auto',
    flex: '0 10 auto',
    overflow: 'hidden',
  }),
}));

const FlexGridItem: React.FC<FlexGridProps> = React.forwardRef<GridRef, FlexGridProps>(function FlexGridItem(
  props,
  ref
) {
  const classes = useItemStyles(props);
  return <MuiGrid ref={ref} item className={classes.item} {...props} />;
});

const FlexGridContainer: React.FC<FlexGridProps> = React.forwardRef<GridRef, FlexGridProps>(function FlexGridContainer(
  props,
  ref
) {
  const classes = useContainerStyles(props);
  return <MuiGrid ref={ref} container className={classes.container} {...props} />;
});

FlexGridContainer.defaultProps = {
  spacing: 0,
};

const FlexGrid: React.FC<FlexGridProps> = React.forwardRef<GridRef, FlexGridProps>(function FlexGrid(
  { item, container, ...rest },
  ref
) {
  if (item && container) throw new Error('FlexGrid: Must be either container or item but not both.');
  if (item) return <FlexGridItem ref={ref} {...rest} />;
  else if (container) return <FlexGridContainer ref={ref} {...rest} />;
  else return <MuiGrid ref={ref} {...rest} />;
});

const useDefaultStyles = makeStyles({
  grid: {
    overflowY: 'auto',
    height: '100%',
  },
});

const DefaultGrid: React.FC<FlexGridProps> = ({ children, ...rest }) => {
  const classes = useDefaultStyles();
  return (
    <FlexGrid container justify="center" className={classes.grid} {...rest}>
      <FlexGridItem item xs={12} md={10} lg={8} xl={6}>
        {children}
      </FlexGridItem>
    </FlexGrid>
  );
};

export type GridType = React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>> & {
  Flex?: React.FC<FlexGridProps>;
  Default?: React.FC<FlexGridProps>;
};

export const Grid: GridType = React.forwardRef<GridRef, GridProps>(function Grid(props, ref) {
  return <MuiGrid ref={ref} {...props} />;
});

Grid.Flex = FlexGrid;
Grid.Default = DefaultGrid;
