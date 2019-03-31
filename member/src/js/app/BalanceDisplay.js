import React from 'react';
import { Fab } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { requestRoute } from 'History';

import styles from './BalanceDisplay.css';

const USER = gql`
  query {
    currentUser {
      id
      balance
    }
  }
`;

class BalanceDisplay extends React.Component {
  onClick = () => {
    requestRoute('/profile');
  };

  render() {
    if (!this.props.user) return null;
    const { user } = this.props;
    let cls;
    if (user.balance < 30) cls = 'low';
    else if (user.balance >= 30 && user.balance <= 60) cls = 'medium';
    else cls = 'high';

    const balance = this.props.user.balance.toFixed(2);
    return (
      <Fab
        variant="extended"
        size="small"
        className={styles[cls]}
        classes={{ extended: styles.btn }}
        onClick={this.onClick}
      >
        {balance} CHF
      </Fab>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(BalanceDisplay);
