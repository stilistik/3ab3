import React from 'react';
import AvatarUpload from './AvatarUpload';
import { Grid } from '@material-ui/core';

import styles from './Account.css';

class Account extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Grid container justify="center">
          <Grid item xs={9} sm={6}>
            <AvatarUpload />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
