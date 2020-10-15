import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { CircularProgress, IconButton, makeStyles } from '@material-ui/core';
import { Box, Icon, Message } from 'Components/index';
import { CURRENT_USER_SUPPORTED_EVENTS, EVENT_SUPPORT } from 'Graphql/queries';
import { SUPPORT_EVENT, UNSUPPORT_EVENT } from 'Graphql/mutations';
import { User, Event } from 'Graphql/types';

const MIN_SUPPORT = 5;

const useProgressStyles = makeStyles((theme) => ({
  progress: { position: 'absolute' },
  background: { stroke: theme.palette.background.default },
  foreground: { stroke: theme.palette.secondary.main },
}));

interface SupportProgressProps {
  event: Event;
  thickness?: number;
  size?: number;
}

const SupportProgress: React.FC<SupportProgressProps> = ({
  event,
  children,
  size = 66,
  thickness = 4,
}) => {
  const styles = useProgressStyles();
  const { loading, error, data } = useQuery(EVENT_SUPPORT, {
    variables: { eventId: event.id },
  });
  if (loading || error) return null;

  const supporterCount = data.event.supporters.length;
  const progress = (supporterCount / MIN_SUPPORT) * 100;

  return (
    <Box pos="relative" d="flex" ai="center" jc="center">
      <CircularProgress
        className={styles.progress}
        classes={{
          circle: styles.background,
        }}
        size={size}
        thickness={thickness}
        variant="static"
        value={100}
      />
      <CircularProgress
        className={styles.progress}
        classes={{
          circle: styles.foreground,
        }}
        size={size}
        thickness={thickness}
        variant="static"
        value={progress}
      />
      {children}
    </Box>
  );
};

interface SupportEventProps {
  event: Event;
}

const SupportEvent: React.FC<SupportEventProps> = ({ event }) => {
  const [supportEvent] = useMutation(SUPPORT_EVENT);
  const [unsupportEvent] = useMutation(UNSUPPORT_EVENT);

  const { loading, error, data } = useQuery(CURRENT_USER_SUPPORTED_EVENTS);
  if (loading || error) return null;

  const user: User = data.currentUser;
  const supported = user.supportedEvents.some((el) => el.id === event.id);

  console.log(user);

  const handleClick = () => {
    const mutate = supported ? unsupportEvent : supportEvent;
    mutate({
      variables: {
        userId: data.currentUser.id,
        eventId: event.id,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_SUPPORTED_EVENTS },
        { query: EVENT_SUPPORT, variables: { eventId: event.id } },
      ],
    }).catch((error) => Message.error(error.message));
  };

  return (
    <SupportProgress event={event}>
      <IconButton
        onClick={handleClick}
        onMouseDown={(e) => e.stopPropagation()}
        color={supported ? 'secondary' : 'inherit'}
      >
        <Icon type="groupAdd" />
      </IconButton>
    </SupportProgress>
  );
};

export default SupportEvent;
