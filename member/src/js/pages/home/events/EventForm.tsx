import React from 'react';
import { Button } from '@material-ui/core';
import {
  ImageField,
  TextField,
  DateTimeField,
  Form,
  FormSubmit,
  Box,
} from 'Components/index';
import { Event } from 'Graphql/types';
import { FieldOptions, Serializable } from 'Components/form/types';

interface EventFormProps {
  event?: Event;
  onSubmit: (
    values: NestedRecord<Serializable>,
    opts: NestedRecord<FieldOptions>
  ) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} initValues={event} initAfterSubmit={true}>
      <Box cmbnl={1}>
        <ImageField id="image" required={true} label="Event Image" />
        <TextField id="title" label="Title" required={true} />
        <TextField id="description" label="Description" required={true} />
        <DateTimeField id="date" label="Date & Time" type="date" required={true} />
        <FormSubmit>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Create
          </Button>
        </FormSubmit>
      </Box>
    </Form>
  );
};
