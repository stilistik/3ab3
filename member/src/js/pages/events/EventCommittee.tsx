import { IconButton, Paper, Typography } from '@material-ui/core';
import {
  Box,
  FormDialog,
  Icon,
  Message,
  UserAvatar,
  UserMultiSelectField,
} from 'Components/index';
import React from 'react';
import { HelpPopover } from './HelpPopover';
import { PaperHeader } from './PaperHeader';
import { Event, User } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import {
  ADD_COMMITTEE_MEMBERS,
  REMOVE_COMMITTEE_MEMBER,
} from 'Graphql/mutations';
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
        memberIds: values.user,
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
        <UserMultiSelectField id="user" label="Member" required={true} />
      </FormDialog>
    </React.Fragment>
  );
};

interface CommitteeMemberProps {
  user: User;
  event: Event;
}

const CommitteeMember: React.FC<CommitteeMemberProps> = ({ user, event }) => {
  const [removeCommitteeMember] = useMutation(REMOVE_COMMITTEE_MEMBER);

  const handleClick = () => {
    removeCommitteeMember({
      variables: {
        eventId: event.id,
        memberId: user.id,
      },
      refetchQueries: () => [
        { query: SINGLE_EVENT, variables: { eventId: event.id } },
      ],
    }).catch((error) => Message.error(error.message));
  };

  return (
    <Box.Row cmrnl={1} mb={1}>
      <UserAvatar user={user} />
      <Typography variant="body1">{user.name}</Typography>
      <IconButton onClick={handleClick}>
        <Icon type="removeCircle" />
      </IconButton>
    </Box.Row>
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
        {event.committee.length === 0 && (
          <Box.Row height="100px" jc="center">
            <Typography variant="body1">No committee members yet</Typography>
          </Box.Row>
        )}
        {event.committee.map((user) => {
          return <CommitteeMember key={user.id} user={user} event={event} />;
        })}
      </Box.Fill>
    </Paper>
  );
};
