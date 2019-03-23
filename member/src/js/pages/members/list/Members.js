import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import MemberItem from '../MemberItem';
import CreateButton from '../create/CreateButton';
import { requestRoute } from 'History';

import styles from './Members.css';

export const MEMBERS = gql`
  query {
    users {
      id
      name
      role
      email
      avatar
    }
  }
`;

class Members extends React.Component {
  onCreate = () => {
    requestRoute('/createmember');
  };

  onEdit = (userId) => {
    requestRoute('/editmember', {
      id: userId,
    });
  };

  render() {
    if (!this.props.users) return null;
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} lg={4}>
              <CreateButton onClick={this.onCreate} />
            </Grid>
            {this.props.users.map((user) => {
              return (
                <Grid key={user.id} item xs={12} sm={6} lg={4}>
                  <MemberItem user={user} onClick={this.onEdit} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(MEMBERS, {
  props: ({ data }) => ({ users: data.users }),
})(Members);
