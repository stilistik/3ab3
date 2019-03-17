import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrendChart } from 'Components';
import { Paper, Grid } from '@material-ui/core';

import styles from './Home.css';

const data = [
  {
    id: 'a',
    date: new Date('2017-05-22'),
    balance: 120,
  },
  {
    id: 'b',
    date: new Date('2017-08-13'),
    balance: 78,
  },
  {
    id: 'c',
    date: new Date('2017-09-10'),
    balance: 55,
  },
  {
    id: 'd',
    date: new Date('2017-11-21'),
    balance: 120,
  },
  {
    id: 'e',
    date: new Date('2018-03-12'),
    balance: 210,
  },
];

const QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

class Home extends React.Component {
  onClick = (e) => console.log(e);

  render() {
    if (!this.props.users) return null;
    return (
      <div className={styles.container}>
        <Grid container justify="center">
          <Grid item xs={11} sm={6} md={4} lg={3} xl={3}>
            <br />
            <Paper
              style={{
                background: '#1a77ad',
                color: 'white',
                width: '100%',
                height: '300px',
              }}
            >
              <TrendChart data={data} onClick={this.onClick} />
            </Paper>
            <br />
            <Paper
              style={{
                background: '#f26457',
                color: 'white',
                width: '100%',
                height: '300px',
              }}
            >
              <TrendChart data={data} onClick={this.onClick} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ users: data.users }),
})(Home);
