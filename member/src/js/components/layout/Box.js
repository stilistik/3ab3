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
const MUI_BOX_PROP_MAP = {
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
  bl: 'borderLeft',
  br: 'borderRight',
  bt: 'borderTop',
  bb: 'borderBottom',
  b: 'border',
  bc: 'borderColor',
};

const MAKE_STYLES_PROPS = [
  'borderColor', // due to issue https://github.com/mui-org/material-ui/issues/16995
  'bc',
  'pointer',
  'shadow',
  'opacity',
  'ox',
  'oy',
  'cm',
  'cp',
  'cmr',
  'cpr',
  'cml',
  'cpl',
  'cmt',
  'cpt',
  'cmb',
  'cpb',
  'cmnl',
  'cpnl',
  'cmrnl',
  'cprnl',
  'cmlnl',
  'cplnl',
  'cmtnl',
  'cptnl',
  'cmbnl',
  'cpbnl',
];

/**
 * Transforms a set of prop shorthands into their real box properties
 * @param {Object} props The input props object containing shorthands
 * @returns {Object} The same props with the shorthands transformed
 */
const mapProps = (props) => {
  return Object.keys(props).reduce((result, key) => {
    const p = MUI_BOX_PROP_MAP[key];
    const value = props[key];
    if (p) result[p] = value;
    else result[key] = value;
    return result;
  }, {});
};

/**
 * This fixes https://github.com/mui-org/material-ui/issues/16995
 * @param {String} borderColor A color string or mui theme key
 * @param {Object} theme the mui theme
 * @returns {String} A color string
 */
const fixBorderColorIssue = (borderColor, theme) => {
  if (!borderColor) return;
  const token = borderColor.split('.');
  if (token.length === 2) {
    const name = token[0];
    const tone = token[1];
    if (!theme.palette[name] || !theme.palette[name][tone])
      throw new Error(
        'Box: borderColor palette or tone not supported by material-ui theme'
      );
    return theme.palette[name][tone];
  } else return borderColor;
};

/**
 * Sorts the props of this component into props intended for makeStyles
 * and props intended for the material-ui box
 * @param {Object} props: The props to be sorted
 * @returns {Array} A list with [makeStylesProps, muiBoxProps]
 */
const extractProps = (props) => {
  const makeStylesProps = {};
  const muiBoxProps = {};
  for (let key in props) {
    const value = props[key];
    if (MAKE_STYLES_PROPS.includes(key)) makeStylesProps[key] = value;
    else muiBoxProps[key] = value;
  }
  return [makeStylesProps, muiBoxProps];
};

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    cursor: props.pointer ? 'pointer' : 'inherit',
    boxShadow: props.shadow ? theme.defaultShadow : 'none',
    opacity: props.opacity || 1,
    overflowX: props.ox,
    overflowY: props.oy,
    borderColor: fixBorderColorIssue(props.borderColor || props.bc, theme),
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

const MuiBoxWrapper = React.forwardRef(function MuiBoxWrapper(props, ref) {
  const { className, ...rest } = props;
  const [msp, mbp] = extractProps(rest);
  const classes = useStyles(msp);
  return (
    <MuiBox
      ref={ref}
      className={clx(classes.root, className)}
      {...mapProps(mbp)}
    />
  );
});

export const FlexItem = React.forwardRef(function FlexItem(props, ref) {
  return <MuiBoxWrapper ref={ref} flex="0 1 auto" {...props} />;
});

export const FlexBox = React.forwardRef(function FlexBox(props, ref) {
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

export const CenterBox = React.forwardRef(function CenterBox(props, ref) {
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

export const FillBox = React.forwardRef(function FillBox(props, ref) {
  return <MuiBoxWrapper ref={ref} width="100%" height="100%" {...props} />;
});

export const RowBox = React.forwardRef(function RowBox(props, ref) {
  return (
    <MuiBoxWrapper ref={ref} display="flex" alignItems="center" {...props} />
  );
});

export const Box = React.forwardRef(function Box(props, ref) {
  return <MuiBoxWrapper ref={ref} {...props} />;
});

Box.Center = CenterBox;
Box.Flex = FlexBox;
Box.Item = FlexItem;
Box.Fill = FillBox;
Box.Row = RowBox;
