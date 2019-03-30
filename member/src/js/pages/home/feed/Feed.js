import React from 'react';
import { Post, CreatePost } from 'Components';
import { Grid, Button } from '@material-ui/core';

import styles from './Feed.css';

class Feed extends React.Component {
  render() {
    if (!this.props.posts) return null;
    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CreatePost refetch={this.props.refetch} />
          </Grid>
          {this.props.posts.map((post) => {
            return (
              <Grid key={post.id} item xs={12}>
                <Post post={post} refetch={this.props.refetch} />
              </Grid>
            );
          })}
          {this.props.hasNext ? (
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => this.props.more(this.props.cursor)}>
                  More
                </Button>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default Feed;
