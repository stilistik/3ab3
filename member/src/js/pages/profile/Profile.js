import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Paper, Typography, Grid } from '@material-ui/core';

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
            <Paper classes={{ root: styles.info }}>
              <Typography variant="h4" color="inherit">
                Hello
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={11} sm={6} md={4} lg={3} xl={3}>
            <br />
            <Paper styleName="info">
              <Typography variant="h4" color="inherit">
                Hello
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={11} sm={6} md={4} lg={3} xl={3}>
            <br />
            <Paper styleName="info">
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
