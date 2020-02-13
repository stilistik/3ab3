import React from 'react';
import { Box as MuiBox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clx from 'classnames';

/**
 * Converts a spacing prop value into a css string in px using the material-ui
 * theme spacing value. If the value is already in the desired format, it will
 * just return it.
 * @param {*} value the property value
 * @param {Object} theme The material-ui theme
 */
const spacing = (value, theme) => {
  if (!value) return;
  // supplied value is a css string
  if (typeof value === 'string') return value;
  // supplied value is a number
  else if (typeof value === 'number') {
    // if theme spacing is a function, apply to value and return result
    if (typeof theme.spacing === 'function') return theme.spacing(value);
    // if theme spacing is a number, multiply by value and return result
    else if (typeof theme.spacing === 'number') return theme.spacing * value;
  }
  throw new Error('Box: Unsupported spacing type');
};

// shorthand definitions
const PROP_MAP = {
  d: 'display',
  pos: 'position',
  jc: 'justifyContent',
  ai: 'alignItems',
  fd: 'flexDirection',
  fw: 'flexWrap',
  ac: 'alignContent',
  h: 'height',
  w: 'width',
  o: 'overflow',
};

/**
 * Transforms a set of prop shorthands into their real box properties
 * @param {Object} props The input props object containing shorthands
 * @returns {Object} The same props with the shorthands transformed
 */
const mapProps = (props) => {
  return Object.keys(props).reduce((result, key) => {
    const p = PROP_MAP[key];
    const value = props[key];
    if (p) result[p] = value;
    else result[key] = value;
    return result;
  }, {});
};

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    cursor: props.pointer ? 'pointer' : 'inherit',
    boxShadow: props.shadow ? theme.defaultShadow : 'none',
    opacity: props.opacity || 1,
    '& > *': {
      margin: spacing(props.cm, theme),
      padding: spacing(props.cp, theme),
      marginRight: spacing(props.cmr, theme),
      paddingRight: spacing(props.cpr, theme),
      marginLeft: spacing(props.cml, theme),
      paddingLeft: spacing(props.cpl, theme),
      marginTop: spacing(props.cmt, theme),
      paddingTop: spacing(props.cpt, theme),
      marginBottom: spacing(props.cmb, theme),
      paddingBottom: spacing(props.cpb, theme),
    },
    '& > *:not(:last-child)': {
      margin: spacing(props.cmnl, theme),
      padding: spacing(props.cpnl, theme),
      marginRight: spacing(props.cmrnl, theme),
      paddingRight: spacing(props.cprnl, theme),
      marginLeft: spacing(props.cmlnl, theme),
      paddingLeft: spacing(props.cplnl, theme),
      marginTop: spacing(props.cmtnl, theme),
      paddingTop: spacing(props.cptnl, theme),
      marginBottom: spacing(props.cmbnl, theme),
      paddingBottom: spacing(props.cpbnl, theme),
    },
  }),
}));

const MuiBoxWrapper = React.forwardRef((props, ref) => {
  const { className, pointer, shadow, ...rest } = props;
  const classes = useStyles(props);
  return (
    <MuiBox
      ref={ref}
      className={clx(classes.root, className)}
      {...mapProps(rest)}
    />
  );
});

export const FlexItem = React.forwardRef((props, ref) => {
  return <MuiBoxWrapper ref={ref} flex="0 1 auto" {...props} />;
});

export const FlexBox = React.forwardRef((props, ref) => {
  const { column, row, ...rest } = props;
  if (column && row) throw new Error('Box: Must be either row or column type');
  return (
    <MuiBoxWrapper
      ref={ref}
      width="100%"
      height="100%"
      overflow="hidden"
      display="flex"
      flexDirection={column ? 'column' : 'row'}
      {...rest}
    />
  );
});

export const CenterBox = React.forwardRef((props, ref) => {
  return (
    <MuiBoxWrapper
      ref={ref}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
});

export const FillBox = React.forwardRef((props, ref) => {
  return <MuiBoxWrapper ref={ref} width="100%" height="100%" {...props} />;
});

export const RowBox = React.forwardRef((props, ref) => {
  return (
    <MuiBoxWrapper ref={ref} display="flex" alignItems="center" {...props} />
  );
});

export const Box = React.forwardRef((props, ref) => {
  return <MuiBoxWrapper ref={ref} {...props} />;
});

Box.Center = CenterBox;
Box.Flex = FlexBox;
Box.Item = FlexItem;
Box.Fill = FillBox;
Box.Row = RowBox;
