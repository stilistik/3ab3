import React from 'react';
import { Grid } from '@material-ui/core';

export class DefaultGrid extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...props });
    });

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6} xl={5}>
          {childrenWithProps}
        </Grid>
      </Grid>
    );
  }
}
