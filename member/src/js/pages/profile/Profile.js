import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Paper } from 'Components';
import { Typography, Grid } from '@material-ui/core';

import styles from './Profile.css';

const QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

class Profile extends React.Component {
  render() {
    if (!this.props.users) return null;
    return (
      <div className={styles.container}>
        <Grid container justify="center">
          <Grid item xs={11} sm={6} md={4} lg={3} xl={3}>
            <br />
            <Paper bgColor="#1a77ad" color="white" width="100%" height="400px">
              <Typography variant="h4" color="inherit">
                Hello
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ users: data.users }),
})(Profile);
