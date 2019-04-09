import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const USERS = gql`
  query {
    users {
      id
      name
      pendingInvitations {
        id
        committee {
          id
        }
      }
    }
  }
`;

class AvailableUsers extends React.Component {
  render() {
    return (
      <Query query={USERS}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) return null;

          const { children, committee } = this.props;
          const available = data.users.filter((user) => {
            return (
              !user.pendingInvitations.find(
                (inv) => inv.committee.id === committee.id
              ) &&
              !committee.members.find((member) => member.id === user.id) &&
              user.id !== committee.creator.id
            );
          });

          const options = available.map((user) => ({
            value: user.id,
            label: user.name,
          }));

          return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              options,
            });
          });
        }}
      </Query>
    );
  }
}

export default AvailableUsers;
