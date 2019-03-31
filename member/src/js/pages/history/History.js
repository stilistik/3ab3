import React from 'react';
import { DefaultGrid } from 'Components';
import { Typography, Divider } from '@material-ui/core';
import TransactionTable from './TransactionTable';

import styles from './History.css';

class History extends React.Component {
  render() {
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Typography variant="h5" className={styles.typo}>
            HISTORY
          </Typography>
          <Divider />
          <br />
          <TransactionTable />
        </div>
      </DefaultGrid>
    );
  }
}

export default History;
