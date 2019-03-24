import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import { Icon } from 'Components';
import { POST_STATS } from './stats/PostStats';

import styles from './LikePost.css';

const USER = gql`
  query {
    currentUser {
      id
      likedPosts {
        id
      }
    }
  }
`;

const LIKE = gql`
  mutation($userId: ID!, $postId: ID!) {
    likePost(userId: $userId, postId: $postId) {
      id
    }
  }
`;

const UNLIKE = gql`
  mutation($userId: ID!, $postId: ID!) {
    unlikePost(userId: $userId, postId: $postId) {
      id
    }
  }
`;

class LikePost extends React.Component {
  onLike = () => {
    this.mutate({
      variables: {
        postId: this.props.post.id,
        userId: this.props.user.id,
      },
      refetchQueries: () => [
        { query: USER },
        { query: POST_STATS, variables: { postId: this.props.post.id } },
      ],
    });
  };

  checkLiked = () => {
    const { likedPosts } = this.props.user;
    return likedPosts.find((post) => post.id === this.props.post.id) && true;
  };

  render() {
    if (!this.props.user) return null;
    const liked = this.checkLiked();
    const cls = liked ? 'liked' : null;
    return (
      <Mutation mutation={liked ? UNLIKE : LIKE}>
        {(mutate) => {
          this.mutate = mutate;
          return (
            <Button
              size="small"
              className={styles[cls]}
              color="primary"
              onClick={this.onLike}
            >
              <Icon type="like" style={{ marginRight: '5px' }} /> Like
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default graphql(USER, {
  props: ({ data }) => ({ user: data.currentUser }),
})(LikePost);
