import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon, DeleteConfirm } from 'Components';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { FEED } from '../Feed';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

const MUTATION = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onDelete = () => {
    this.deletePost({
      variables: { postId: this.props.post.id },
      refetchQueries: () => [{ query: FEED }],
    });
  };

  onOpen = (e) => this.setState({ anchorEl: e.target });

  onCancel = () => this.setState({ anchorEl: null });

  render() {
    const { post, user } = this.props;
    if (!user || user.id !== post.author.id) return null;
    return (
      <Mutation mutation={MUTATION}>
        {(deletePost) => {
          this.deletePost = deletePost;
          return (
            <div>
              <IconButton onClick={this.onOpen}>
                <Icon type="delete" />
              </IconButton>
              <DeleteConfirm
                anchorEl={this.state.anchorEl}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
              />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(DeletePost);
