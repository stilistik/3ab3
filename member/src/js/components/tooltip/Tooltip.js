import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tooltip as MuiTooltip } from '@material-ui/core';

import styles from './Tooltip.less';

export const Tooltip = (props) => {
  const [arrowRef, setArrowRef] = React.useState(null);
  const arrow_cls = classnames(styles.arrow, styles[props.placement]);

  // if tooltip title not define, just render children
  if (!props.title) return props.children;

  // else wrap children with tooltip
  return (
    <MuiTooltip
      classes={{
        popper: styles.popper,
        tooltip: styles.tooltip,
      }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow_cls} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
};

Tooltip.propTypes = {
  title: PropTypes.node,
};

Tooltip.defaultProps = {
  placement: 'bottom',
};

export default Tooltip;
