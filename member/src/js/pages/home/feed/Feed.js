import React from 'react';
import { Post, CreatePost, Box } from 'Components';
import { Grid, Button } from '@material-ui/core';

class Feed extends React.Component {
  render() {
    if (!this.props.posts) return null;
    return (
      <Box py={3}>
        <Grid container spacing={3}>
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
              <Box.Row jc="center">
                <Button onClick={() => this.props.more(this.props.cursor)}>
                  More
                </Button>
              </Box.Row>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    );
  }
}

export default Feed;
