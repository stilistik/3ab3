import React from 'react';
import EventForm from '../EventForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Message } from 'Components';
import { EVENTS } from '../list/Events';

const MUTATION = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;

const CreateEventForm = (props) => {
  const [createEvent] = useMutation(MUTATION);
  const onSubmit = async (values) => {
    try {
      await createEvent({
        variables: {
          input: values,
        },
        refetchQueries: () => {
          return [{ query: EVENTS }];
        },
      });
    } catch (error) {
      Message.error(error.message);
      return;
    }
    Message.success('Event successfully created');
  };

  return <EventForm {...props} onSubmit={onSubmit} />;
};

export default CreateEventForm;
