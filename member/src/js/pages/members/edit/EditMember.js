import React from 'react';
import { DefaultGrid } from 'Components';
import { Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getQueryParams } from 'History';
import EditMemberForm from './EditMemberForm';

import styles from './EditMember.css';

const QUERY = gql`
  query($userId: ID!) {
    user(userId: $userId) {
      id
      name
      password
      email
      avatar
    }
  }
`;

class EditProductQuery extends React.Component {
  render() {
    const { id } = getQueryParams();
    return (
      <Query query={QUERY} variables={{ userId: id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;
          return <EditMember member={data.user} />;
        }}
      </Query>
    );
  }
}

class EditMember extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Typography variant="h3" className={styles.typo}>
            Edit Member
          </Typography>
          <EditMemberForm {...this.props} initValues={this.props.member} />
        </div>
      </DefaultGrid>
    );
  }
}

export default EditProductQuery;
