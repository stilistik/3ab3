import React from 'react';
import AvatarUpload from './AvatarUpload';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DefaultGrid } from 'Components';

import styles from './Account.css';

const QUERY = gql`
  query {
    currentUser {
      name
    }
  }
`;

class Account extends React.Component {
  render() {
    if (!this.props.user) return null;
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <AvatarUpload style={{ marginRight: '10px' }} />
            <Typography className={styles.header} variant="h4">
              {this.props.user.name}
            </Typography>
          </div>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Account);
