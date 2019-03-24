import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';
import { Icon, UserAvatar } from 'Components';

import styles from './CreatePostForm.css';

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = () => {
    if (this.state.value.length === 0) return;
    this.props.onSubmit({
      userId: this.props.user.id,
      text: this.state.value,
    });
    this.setState({ value: '' });
  };

  render() {
    if (!this.props.user) return null;
    return (
      <Card>
        <CardContent className={styles.content}>
          <UserAvatar user={this.props.user} className={styles.avatar} />
          <TextField
            value={this.state.value}
            onChange={this.onChange}
            multiline
            placeholder="Write something..."
            style={{ width: '100%' }}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ width: '100%' }}
            onClick={this.onSubmit}
          >
            Post <Icon type="send" style={{ marginLeft: '10px' }} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(CreatePostForm);
