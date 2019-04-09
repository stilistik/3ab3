import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './DefaultGrid.css';

class DefaultGrid extends React.Component {
  render() {
    const { children, overflow, ...props } = this.props;
    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...props });
    });

    if (overflow) {
      return (
        <Grid container justify="center" className={styles.container}>
          <Grid item xs={12} md={10} lg={8} xl={6}>
            {childrenWithProps}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={10} lg={8} xl={6}>
            {childrenWithProps}
          </Grid>
        </Grid>
      );
    }
  }
}

export default DefaultGrid;
