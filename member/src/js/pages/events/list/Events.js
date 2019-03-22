import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DefaultGrid, Icon } from 'Components';
import { Fab } from '@material-ui/core';
import { requestRoute } from 'History';

import styles from './Events.css';

const QUERY = gql`
  query {
    events {
      id
      title
      description
      date
      image
    }
  }
`;

class Events extends React.Component {
  onCreate = () => {
    requestRoute('/createevent');
  };

  render() {
    console.log(this.props);
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <h1>Events</h1>
          <Fab color="primary" onClick={this.onCreate}>
            <Icon type="add" />
          </Fab>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ events: data.events }),
})(Events);
