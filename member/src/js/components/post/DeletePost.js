import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon, DeleteConfirmPopover } from 'Components';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';

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
      refetchQueries: () => this.props.refetch,
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
            <DeleteConfirmPopover>
              <IconButton onClick={this.onDelete}>
                <Icon type="delete" />
              </IconButton>
            </DeleteConfirmPopover>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(DeletePost);
