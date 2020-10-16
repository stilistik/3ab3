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
import { useTranslation } from 'react-i18next';

interface EventFormProps {
  event?: Event;
  onSubmit: (
    values: NestedRecord<Serializable>,
    opts: NestedRecord<FieldOptions>
  ) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit} initValues={event} initAfterSubmit={true}>
      <Box cmbnl={1}>
        <ImageField id="image" required={true} label={t('Event Image')} />
        <TextField id="title" label={t('Title')} required={true} />
        <TextField id="description" label={t('Description')} required={true} />
        <DateTimeField
          id="date"
          label={t('Date & Time')}
          type="date"
          required={true}
        />
        <FormSubmit>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            {t('Create')}
          </Button>
        </FormSubmit>
      </Box>
    </Form>
  );
};
