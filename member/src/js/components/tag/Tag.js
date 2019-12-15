import React from 'react';
import { Icon } from '../icon';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

import styles from './Tag.less';

const OutlinedTag = ({
  children,
  color,
  className,
  style,
  onClose,
  onClick,
}) => {
  const cls = classnames(styles.tag, className);
  return (
    <span
      className={cls}
      style={{
        ...style,
        color: color,
        borderColor: color,
        backgroundColor: tinycolor(color)
          .setAlpha(0.08)
          .toRgbString(),
        cursor: onClick ? 'pointer' : 'auto',
      }}
      onClick={onClick}
    >
      {children}
      {onClose && true ? <Icon type="close" onClick={onClose} /> : null}
    </span>
  );
};

const FilledTag = ({ children, color, className, style, onClose, onClick }) => {
  const cls = classnames(styles.tag, className);
  return (
    <span
      className={cls}
      style={{
        ...style,
        backgroundColor: color,
        cursor: onClick ? 'pointer' : 'auto',
      }}
      onClick={onClick}
    >
      {children}
      {onClose && true ? <Icon type="close" onClick={onClose} /> : null}
    </span>
  );
};

const Tag = ({ outlined, ...rest }) => {
  if (outlined) return <OutlinedTag {...rest} />;
  else return <FilledTag {...rest} />;
};

Tag.defaultProps = {
  outlined: false,
};

export default Tag;
