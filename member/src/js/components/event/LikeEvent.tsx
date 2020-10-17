import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Button, makeStyles } from '@material-ui/core';
import { Icon } from 'Components/index';
import { EVENT_STATS, CURRENT_USER_LIKED_EVENTS } from 'Graphql/queries';
import { LIKE_EVENT, UNLIKE_EVENT } from 'Graphql/mutations';
import { Event, User } from 'Graphql/types';
import { useCurrentUser } from 'Components/user';
import clx from 'classnames';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  liked: { color: '#1a77ad' },
});

interface LikeEventProps {
  event: Event;
}

export const LikeEvent: React.FC<LikeEventProps> = ({ event }) => {
  const [likeEvent] = useMutation(LIKE_EVENT);
  const [unlikeEvent] = useMutation(UNLIKE_EVENT);
  const { id: userId } = useCurrentUser();
  const styles = useStyles();
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(CURRENT_USER_LIKED_EVENTS);

  if (loading || error) return null;

  const user: User = data.currentUser;
  const liked = user.likedEvents.some((el) => el.id === event.id);

  const onClick = () => {
    const mutate = liked ? unlikeEvent : likeEvent;
    mutate({
      variables: {
        eventId: event.id,
        userId: userId,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_LIKED_EVENTS },
        { query: EVENT_STATS, variables: { eventId: event.id } },
      ],
    });
  };

  return (
    <Button
      size="small"
      className={clx({ [styles.liked]: liked })}
      onClick={onClick}
    >
      <Icon type="like" style={{ marginRight: '5px' }} /> {t('Like')}
    </Button>
  );
};
