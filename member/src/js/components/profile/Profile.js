import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
      <div>
        {this.props.users.map((user) => {
          return <p key={user.id}>{user.name}</p>;
        })}
      </div>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ users: data.users }),
})(Profile);
