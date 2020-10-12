import React from 'react';
import { PostFeed } from './PostFeed';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Post } from 'Graphql/types';
import { POST_FEED } from 'Graphql/queries';

export const PostFeedManager: React.FC = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
    refetch
  } = usePaginatedQuery<Post>(POST_FEED, 10);

  if (loading || error) return null;
  return (
    <PostFeed
      posts={nodes}
      more={fetchMore}
      hasNext={hasNext}
      cursor={cursor}
      refetch={refetch}
    />
  );
};
