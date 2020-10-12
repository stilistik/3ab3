import React from 'react';
import gql from 'graphql-tag';
import { PostFeed } from './PostFeed';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';

export const FEED = gql`
  query($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          author {
            id
            name
            avatar
          }
          date
          text
          image
          link
        }
      }
    }
  }
`;

const COUNT = 10;

export const PostFeedManager: React.FC = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
  } = usePaginatedQuery(FEED, 10);

  if (loading || error) return null;
  return (
    <PostFeed
      posts={nodes}
      more={fetchMore}
      hasNext={hasNext}
      cursor={cursor}
      refetch={[{ query: FEED, variables: { first: COUNT } }]}
    />
  );
};
