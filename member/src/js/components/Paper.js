import React from 'react';
import { Paper as MuiPaper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export class Paper extends React.Component {
  render() {
    const styles = {
      root: {
        background: this.props.bgColor,
        color: this.props.color,
        width: this.props.width,
        height: this.props.height,
      },
    };
    const C = withStyles(styles)(MuiPaper);
    return <C>{this.props.children}</C>;
  }
}
