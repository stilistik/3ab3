import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Post from './post/Post';
import CreatePost from './post/CreatePost';
import { Grid } from '@material-ui/core';

import styles from './Feed.css';

export const FEED = gql`
  query {
    posts {
      id
      author {
        id
        name
        avatar
      }
      date
      text
      image
    }
  }
`;

class Feed extends React.Component {
  render() {
    if (!this.props.posts) return null;
    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CreatePost />
          </Grid>
          {this.props.posts.map((post) => {
            return (
              <Grid key={post.id} item xs={12}>
                <Post post={post} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default graphql(FEED, {
  props: ({ data }) => ({ posts: data.posts }),
})(Feed);
