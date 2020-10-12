import React from 'react';
import { EventFeed } from './EventFeed';
import { usePaginatedQuery } from 'Components/utility/usePaginatedQuery';
import { Event } from 'Graphql/types';
import { FUTURE_EVENT_FEED } from 'Graphql/queries';

export const EventFeedManager: React.FC = () => {
  const {
    loading,
    error,
    nodes,
    fetchMore,
    hasNext,
    cursor,
    refetch,
  } = usePaginatedQuery<Event>(FUTURE_EVENT_FEED, 3);

  if (loading || error) return null;

  return (
    <EventFeed
      events={nodes}
      more={fetchMore}
      hasNext={hasNext}
      cursor={cursor}
      refetch={refetch}
    />
  );
};
