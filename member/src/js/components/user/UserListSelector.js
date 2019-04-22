import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './UserListSelector.css';

const USERS = gql`
  query {
    users {
      id
      name
      avatar
    }
  }
`;

class ListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onChange = (e) => this.setState({ term: e.target.value });

  onClick = (user) => this.props.onChange(user);

  render() {
    const { users } = this.props;
    const filtered = users.filter((user) => {
      const name = user.name.toLowerCase();
      const term = this.state.term.toLowerCase();
      return name.includes(term);
    });

    return (
      <div>
        <TextField
          className={styles.input}
          label="Search user"
          value={this.state.term}
          onChange={this.onChange}
        />
        <List>
          {filtered.map((user) => (
            <ListItem key={user.id} button onClick={() => this.onClick(user)}>
              <ListItemAvatar>
                <UserAvatar user={user} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export class UserListSelector extends React.Component {
  render() {
    return (
      <Query query={USERS}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) return null;

          return (
            <ListSelect
              users={data.users}
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
