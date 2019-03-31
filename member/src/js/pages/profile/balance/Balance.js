import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Grid, Card, CardContent } from '@material-ui/core';
import BalanceDisplay from './BalanceDisplay';
import AccountInfo from './AccountInfo';
import BalanceChart from './BalanceChart';

import styles from './Balance.css';

const BALANCE = gql`
  query {
    currentUser {
      id
      balance
      avatar
      name
      transactions(first: 5) {
        id
        date
        balance
      }
    }
  }
`;

class Balance extends React.Component {
  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <BalanceDisplay user={user} />
                <AccountInfo />
                <BalanceChart user={user} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(BALANCE, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Balance);
