import React from 'react';
import { Post, CreatePost, Box } from 'Components/index';
import { Grid, Button } from '@material-ui/core';
import { DocumentNode } from 'graphql';
import { Post as TPost } from 'Graphql/types';

interface PostFeedProps {
  posts: TPost[];
  refetch: () => Promise<any>;
  hasNext: boolean;
  cursor: string;
  more: (cursor: string) => void;
}

export const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  hasNext,
  refetch,
  more,
  cursor,
}) => {
  if (!posts) return null;
  return (
    <Box py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreatePost refetch={refetch} />
        </Grid>
        {posts.map((post) => {
          return (
            <Grid key={post.id} item xs={12}>
              <Post post={post} refetch={refetch} />
            </Grid>
          );
        })}
        {hasNext ? (
          <Grid item xs={12}>
            <Box.Row jc="center">
              <Button onClick={() => more(cursor)}>More</Button>
            </Box.Row>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};
