import React from 'react';
import { Event } from 'Graphql/types';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { PaperHeader } from './PaperHeader';
import { Box, ConfirmationDialog, Message } from 'Components/index';
import { useMutation } from 'react-apollo';
import { DELETE_EVENT } from 'Graphql/mutations';
import { requestRoute } from 'App/router';
import { red } from '@material-ui/core/colors';
import { FUTURE_EVENT_FEED, ALL_EVENTS_FEED } from 'Graphql/queries';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));

interface DeleteEventProps {
  event: Event;
}

export const DeleteEvent: React.FC<DeleteEventProps> = ({ event }) => {
  const [show, setShow] = React.useState(false);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const styles = useStyles();

  const handleCancel = () => setShow(false);

  const handleClick = () => setShow(true);

  const handleConfirm = () => {
    deleteEvent({
      variables: {
        eventId: event.id,
      },
      refetchQueries: () => [
        { query: FUTURE_EVENT_FEED, variables: { first: 3, after: null } },
        { query: ALL_EVENTS_FEED, variables: { first: 10, after: null } },
      ],
    })
      .then(() => {
        requestRoute('/home');
      })
      .catch((error) => Message.error(error.message));
  };

  return (
    <React.Fragment>
      <Paper>
        <PaperHeader title="Delete Event"></PaperHeader>
        <Box.Fill p={2} cmbnl={1}>
          <Typography variant="body1">
            This will irreversibly delete this event and all its related data.
            Only an admin user can perform this action.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClick}
            disableElevation
            className={styles.delete}
          >
            Delete Event
          </Button>
        </Box.Fill>
      </Paper>
      <ConfirmationDialog
        show={show}
        title="Delete Event"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <Typography variant="body1">
          You are about to delete the event <strong>{event.title}</strong>. This
          is an irreversible action, all data related to the event will be lost.
          Continue?
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};
