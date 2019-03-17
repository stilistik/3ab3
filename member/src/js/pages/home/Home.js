import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrendChart } from 'Components';
import { Paper } from '@material-ui/core';
import { DefaultGrid } from 'Components';

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
  onClick = () => {};

  render() {
    if (!this.props.users) return null;
    return (
      <DefaultGrid>
        <div className={styles.container}>
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
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ users: data.users }),
})(Home);
