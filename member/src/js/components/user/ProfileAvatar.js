import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { UserAvatar } from './UserAvatar';

export const PROFILE_AVATAR = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

export class ProfileAvatar extends React.Component {
  render() {
    return (
      <Query query={PROFILE_AVATAR}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) return null;
          return <UserAvatar user={data.currentUser} {...this.props} />;
        }}
      </Query>
    );
  }
}
