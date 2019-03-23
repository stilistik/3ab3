import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { TextField } from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './CreateCommentForm.css';

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

class CreateCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onKey = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      userId: this.props.user.id,
      postId: this.props.post.id,
      text: this.state.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        <UserAvatar user={this.props.user} className={styles.avatar} />
        <TextField
          value={this.state.value}
          onKeyPress={this.onKey}
          onChange={this.onChange}
          multiline
          autoFocus={true}
          placeholder="Comment"
          style={{ width: '100%' }}
        />
      </form>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(CreateCommentForm);
