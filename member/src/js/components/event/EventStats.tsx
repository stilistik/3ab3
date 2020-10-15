import React from 'react';
import { useQuery } from 'react-apollo';
import { SocialStats } from 'Components/index';
import { EVENT_STATS } from 'Graphql/queries';
import { Event } from 'Graphql/types';

interface EventStatsProps {
  eventId: string;
  onComment: () => void;
}

export const EventStats: React.FC<EventStatsProps> = ({
  eventId,
  onComment,
}) => {
  const { loading, error, data } = useQuery(EVENT_STATS, {
    variables: { eventId },
  });

  if (loading || error) return null;

  const { likedBy } = data.event;
  const count = data.eventCommentCount;
  return <SocialStats likedBy={likedBy} count={count} onComment={onComment} />;
};
