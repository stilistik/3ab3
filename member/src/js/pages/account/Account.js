import React from 'react';
import AvatarUpload from './AvatarUpload';
import AccountForm from './AccountForm';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Grid } from 'Components';

import styles from './Account.css';

export const ACCOUNT = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`;

class Account extends React.Component {
  render() {
    if (!this.props.user) return null;
    return (
      <Grid.Default>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <AvatarUpload style={{ marginRight: '20px' }} />
            <Typography className={styles.header} variant="h4">
              {this.props.user.name}
            </Typography>
          </div>
          <AccountForm {...this.props} />
        </div>
      </Grid.Default>
    );
  }
}

export default graphql(ACCOUNT, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Account);
