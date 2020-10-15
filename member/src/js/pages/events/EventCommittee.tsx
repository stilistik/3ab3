import { IconButton, Paper, Typography } from '@material-ui/core';
import {
  Box,
  FormDialog,
  Icon,
  UserSelectField,
  Message,
  UserAvatar,
} from 'Components/index';
import React from 'react';
import { HelpPopover } from './HelpPopover';
import { PaperHeader } from './PaperHeader';
import { Event } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { ADD_COMMITTEE_MEMBERS } from 'Graphql/mutations';
import { Serializable } from 'Components/form/types';
import { SINGLE_EVENT } from 'Graphql/queries';

interface AddCommitteeMemberProps {
  event: Event;
}

const AddCommitteeMember: React.FC<AddCommitteeMemberProps> = ({ event }) => {
  const [addCommitteeMembers] = useMutation(ADD_COMMITTEE_MEMBERS);
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(true);

  const handleCancel = () => setShow(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    addCommitteeMembers({
      variables: {
        eventId: event.id,
        memberIds: [values.user],
      },
      refetchQueries: () => [
        { query: SINGLE_EVENT, variables: { eventId: event.id } },
      ],
    }).catch((error) => Message.error(error.message));
    setShow(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="add" />
      </IconButton>
      <FormDialog
        show={show}
        title="Select Committee Members"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      >
        <UserSelectField id="user" label="Member" required={true} />
      </FormDialog>
    </React.Fragment>
  );
};

interface EventCommitteeProps {
  event: Event;
}

export const EventCommittee: React.FC<EventCommitteeProps> = ({ event }) => {
  return (
    <Paper>
      <PaperHeader title="Committee">
        <HelpPopover>
          The members in the event committee are authorized to modify the event
          information on this page.
        </HelpPopover>
        <AddCommitteeMember event={event} />
      </PaperHeader>
      <Box.Fill p={2}>
        {event.committee.map((user) => {
          return (
            <Box.Row key={user.id} cmrnl={1} mb={1}>
              <UserAvatar user={user} />
              <Typography variant="body1">{user.name}</Typography>
            </Box.Row>
          );
        })}
      </Box.Fill>
    </Paper>
  );
};
