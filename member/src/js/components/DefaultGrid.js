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
        <Grid item xs={11} sm={6}>
          {childrenWithProps}
        </Grid>
      </Grid>
    );
  }
}
