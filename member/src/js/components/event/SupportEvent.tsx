import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import {
  CircularProgress,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Box, Icon, Message, ConfirmationDialog } from 'Components/index';
import { CURRENT_USER_SUPPORTED_EVENTS, EVENT_SUPPORT } from 'Graphql/queries';
import { SUPPORT_EVENT, UNSUPPORT_EVENT } from 'Graphql/mutations';
import { User, Event } from 'Graphql/types';

const MIN_SUPPORT = 5;

const useProgressStyles = makeStyles((theme) => ({
  progress: { position: 'absolute' },
  background: { stroke: theme.palette.action.hover },
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
  const [show, setShow] = React.useState(false);
  const [supportEvent] = useMutation(SUPPORT_EVENT);
  const [unsupportEvent] = useMutation(UNSUPPORT_EVENT);

  const { loading, error, data } = useQuery(CURRENT_USER_SUPPORTED_EVENTS);
  if (loading || error) return null;

  const user: User = data.currentUser;
  const supported = user.supportedEvents.some((el) => el.id === event.id);

  const handleClick = () => {
    if (supported) {
      unsupportEvent({
        variables: {
          userId: data.currentUser.id,
          eventId: event.id,
        },
        refetchQueries: () => [
          { query: CURRENT_USER_SUPPORTED_EVENTS },
          { query: EVENT_SUPPORT, variables: { eventId: event.id } },
        ],
      }).catch((error) => Message.error(error.message));
    } else {
      setShow(true);
    }
  };

  const handleConfirm = () => {
    supportEvent({
      variables: {
        userId: data.currentUser.id,
        eventId: event.id,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_SUPPORTED_EVENTS },
        { query: EVENT_SUPPORT, variables: { eventId: event.id } },
      ],
    }).catch((error) => Message.error(error.message));
    setShow(false);
  };

  const handleCancel = () => setShow(false);

  return (
    <React.Fragment>
      <SupportProgress event={event}>
        <IconButton
          onClick={handleClick}
          onMouseDown={(e) => e.stopPropagation()}
          color={supported ? 'secondary' : 'inherit'}
        >
          <Icon type="groupAdd" />
        </IconButton>
      </SupportProgress>
      <ConfirmationDialog
        show={show}
        title="Support Event"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Support"
      >
        <Typography variant="body2">
          You are about to support the event <strong>{event.title}</strong>.
          Supporting an event means that the organizer will expect you to
          participate in the preparation and/or the realization of this event.
          Continue?
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};

export default SupportEvent;
