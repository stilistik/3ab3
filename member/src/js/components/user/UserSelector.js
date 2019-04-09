import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { TagSelect } from 'Components';

const USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export class UserSelector extends React.Component {
  render() {
    return (
      <Query query={USERS}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) return null;

          const options = data.users.map((user) => ({
            value: user.id,
            label: user.name,
          }));

          return (
            <TagSelect
              options={options}
              value={this.props.value}
              onChange={this.props.onChange}
              placeholder="Select a user..."
              isMulti={this.props.isMulti}
            />
          );
        }}
      </Query>
    );
  }
}
