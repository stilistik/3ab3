import React from 'react';
import gql from 'graphql-tag';
import { EventFeed } from './EventFeed';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Event } from 'Graphql/types';

export const FEED = gql`
  query($first: Int!, $after: String) {
    futureEvents(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          date
          image
        }
      }
    }
  }
`;

const COUNT = 10;

export const EventFeedManager: React.FC = ({}) => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
  } = usePaginatedQuery<Event>(FEED, 3);

  if (loading || error) return null;

  return (
    <EventFeed
      events={nodes}
      more={fetchMore}
      hasNext={hasNext}
      cursor={cursor}
      refetch={[{ query: FEED, variables: { first: COUNT } }]}
    />
  );
};
