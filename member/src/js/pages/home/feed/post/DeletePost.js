import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon } from 'Components';
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
  onDelete = () => {
    this.deletePost({
      variables: { postId: this.props.post.id },
      refetchQueries: () => [{ query: FEED }],
    });
  };

  render() {
    const { post, user } = this.props;
    if (!user || user.id !== post.author.id) return null;
    return (
      <Mutation mutation={MUTATION}>
        {(deletePost) => {
          this.deletePost = deletePost;
          return (
            <IconButton onClick={this.onDelete}>
              <Icon type="delete" />
            </IconButton>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(DeletePost);
