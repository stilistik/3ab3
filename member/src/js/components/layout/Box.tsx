import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@material-ui/core';
import clx from 'classnames';

export type BoxRef = HTMLDivElement;

type Display = 'none' | 'flex' | 'block' | 'grid';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type AlignItems = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
type AlignContent = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
type FlexDirection = 'row' | 'column';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Overflow = 'hidden' | 'visible' | 'auto' | 'scroll';
type PointerEvents = 'auto' | 'none' | 'inherit';

export interface BoxProps extends MuiBoxProps {
  // GENERAL
  className?: string;

  // DISPLAY
  display?: Display;
  d?: Display;
  overflow?: Overflow;
  o?: Overflow;
  overflowX?: Overflow;
  ox?: Overflow;
  overflowY?: Overflow;
  oy?: Overflow;
  opacity?: number;
  op?: number;
  pointer?: boolean;
  shadow?: boolean;
  pointerEvents?: PointerEvents;
  pe?: PointerEvents;

  // POSITION
  position?: Position;
  pos?: Position;

  // FLEXBOX
  justifyContent?: JustifyContent;
  jc?: JustifyContent;
  alignItems?: AlignItems;
  ai?: AlignItems;
  alignContent?: AlignContent;
  ac?: AlignContent;
  flexDirection?: FlexDirection;
  fd?: FlexDirection;
  flexGrow?: number;
  fg?: number;
  flexWrap?: FlexWrap;
  fw?: FlexWrap;
  flex?: string;

  // SIZING
  height?: string;
  h?: string;
  width?: string;
  w?: string;

  // BORDERS
  borderLeft?: string | number;
  bl?: string | number;
  borderRight?: string | number;
  br?: string | number;
  borderTop?: string | number;
  bt?: string | number;
  borderBottom?: string | number;
  bb?: string | number;
  border?: string | number;
  b?: string | number;
  borderColor?: string;
  bc?: string;

  // TYPOGRAPHY
  fontSize?: string;
  fs?: string;
  lineHeight?: number;
  lh?: number;

  // SPACING
  margin?: string | number;
  m?: string | number;
  mx?: string | number;
  my?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  padding?: string | number;
  p?: string | number;
  px?: string | number;
  py?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  cm?: string | number;
  cp?: string | number;
  cmr?: string | number;
  cpr?: string | number;
  cml?: string | number;
  cpl?: string | number;
  cmt?: string | number;
  cpt?: string | number;
  cmb?: string | number;
  cpb?: string | number;
  cmnl?: string | number;
  cpnl?: string | number;
  cmrnl?: string | number;
  cprnl?: string | number;
  cmlnl?: string | number;
  cplnl?: string | number;
  cmtnl?: string | number;
  cptnl?: string | number;
  cmbnl?: string | number;
  cpbnl?: string | number;
}

export interface FlexBoxProps extends BoxProps {
  column?: boolean;
  row?: boolean;
}

/**
 * Converts a spacing prop value into a css string in px using the material-ui
 * theme spacing value. If the value is already in the desired format, it will
 * just return it.
 * @param {*} value the property value
 * @param {Object} theme The material-ui theme
 */
const spacing = (value: string | number, theme: any) => {
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

const useStyles = makeStyles<any, BoxProps>((theme: any) => ({
  root: (props) => ({
    cursor: props.pointer ? 'pointer' : undefined,
    boxShadow: props.shadow ? theme.defaultShadow : props.boxShadow,
    opacity: props.opacity != null ? props.opacity : 1,
    pointerEvents: props.pointerEvents || 'inherit',
    overflowX: props.ox,
    overflowY: props.oy,
    borderColor: fixBorderColorIssue(props.borderColor || props.bc, theme),
    lineHeight: props.lh || props.lineHeight,
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

export const CenterBox: ForwardRefType & React.FC<BoxProps> = React.forwardRef<BoxRef, BoxProps>(function CenterBox(
  props,
  ref
) {
  return (
    <Box ref={ref} width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" {...props} />
  );
});

export const FillBox: ForwardRefType & React.FC<BoxProps> = React.forwardRef<BoxRef, BoxProps>(function FillBox(
  props,
  ref
) {
  return <Box ref={ref} width="100%" height="100%" {...props} />;
});

export const RowBox: ForwardRefType & React.FC<BoxProps> = React.forwardRef<BoxRef, BoxProps>(function RowBox(
  props,
  ref
) {
  return <Box ref={ref} display="flex" alignItems="center" {...props} />;
});

export const FlexItem: ForwardRefType & React.FC<BoxProps> = React.forwardRef<BoxRef, BoxProps>(function FlexItem(
  props,
  ref
) {
  return <Box ref={ref} flex="0 1 auto" {...props} />;
});

export const FlexBox: ForwardRefType & React.FC<FlexBoxProps> = React.forwardRef<BoxRef, FlexBoxProps>(function FlexBox(
  props,
  ref
) {
  const { column, row, ...rest } = props;
  if (column && row) throw new Error('FlexBox: Must be either row or column type');
  return (
    <Box
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

// shorthand definitions
const SHORTHANDS: { [key: string]: string } = {
  d: 'display',
  pos: 'position',
  jc: 'justifyContent',
  ai: 'alignItems',
  fd: 'flexDirection',
  fg: 'flexGrow',
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
  fs: 'fontSize',
  pe: 'pointerEvents',
};

const MAKESTYLES = [
  'pointerEvents',
  'pe',
  'borderColor', // due to issue https://github.com/mui-org/material-ui/issues/16995
  'bc',
  'lineHeight',
  'lh',
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
const mapProps = (props: BoxProps) => {
  const processedProps: { [key: string]: any } = {};
  Object.entries(props).forEach((entry) => {
    const [key, value] = entry;
    const shorthand = SHORTHANDS[key];
    if (shorthand) processedProps[shorthand] = value;
    else processedProps[key] = value;
  });
  return processedProps;
};

/**
 * This fixes https://github.com/mui-org/material-ui/issues/16995
 * @param {String} borderColor A color string or mui theme key
 * @param {Object} theme the mui theme
 * @returns {String} A color string
 */
const fixBorderColorIssue = (borderColor: string, theme: any) => {
  if (!borderColor) return;
  const token = borderColor.split('.');
  if (token.length === 2) {
    const name = token[0];
    const tone = token[1];
    if (!theme.palette[name] || !theme.palette[name][tone])
      throw new Error('Box: borderColor palette or tone not supported by material-ui theme');
    return theme.palette[name][tone];
  } else if (theme.palette[borderColor]) {
    return theme.palette[borderColor];
  } else {
    return borderColor;
  }
};

/**
 * Sorts the props of this component into props intended for makeStyles
 * and props intended for the material-ui box
 * @param {BoxProps} props: The props to be sorted
 * @returns {Array} A list with [makeStylesProps, muiBoxProps]
 */
const extractProps = (props: BoxProps) => {
  const makeStylesProps: { [key: string]: any } = {};
  const muiBoxProps: { [key: string]: any } = {};
  Object.entries(props).forEach((entry) => {
    const [key, value] = entry;
    if (MAKESTYLES.includes(key)) makeStylesProps[key] = value;
    else muiBoxProps[key] = value;
  });
  return [makeStylesProps, muiBoxProps];
};

type ForwardRefType = React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;

export type BoxType = ForwardRefType &
  React.FC<BoxProps> & {
    Center?: ForwardRefType & React.FC<BoxProps>;
    Fill?: ForwardRefType & React.FC<BoxProps>;
    Row?: ForwardRefType & React.FC<BoxProps>;
    Flex?: ForwardRefType & React.FC<FlexBoxProps>;
    Item?: ForwardRefType & React.FC<BoxProps>;
  };

export const Box: BoxType = React.forwardRef<BoxRef, BoxProps>(function Box(props, ref) {
  const { className, ...rest } = props;
  const [msp, mbp] = extractProps(rest);
  const classes = useStyles(msp);

  // TODO: ref is missing in the type declaration of material-ui
  // remove ts-ignore once this is fixed
  // https://github.com/mui-org/material-ui/issues/17010
  return (
    <MuiBox
      className={clx(className, classes.root)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      {...mapProps(mbp)}
    />
  );
});

Box.Center = CenterBox;
Box.Row = RowBox;
Box.Flex = FlexBox;
Box.Item = FlexItem;
Box.Fill = FillBox;
