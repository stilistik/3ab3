import React from 'react';
import { Grid } from '@material-ui/core';

export class DefaultGrid extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...props });
    });

    return (
      <Grid container justify="center" style={{ overflowY: 'auto' }}>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          {childrenWithProps}
        </Grid>
      </Grid>
    );
  }
}
