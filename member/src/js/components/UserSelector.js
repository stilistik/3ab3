import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Select } from 'Components';

const USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export class UserSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

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
            <Select
              options={options}
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Select a user..."
            />
          );
        }}
      </Query>
    );
  }
}
