import React from 'react';
import { Box, Icon, Message } from 'Components/index';
import {
  Typography,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import { EventForm } from './EventForm';
import { useMutation } from 'react-apollo';
import { CREATE_EVENT } from 'Graphql/mutations';
import { Serializable } from 'Components/form/types';
import { useTranslation } from 'react-i18next';

interface CreateEventProps {
  refetch: () => Promise<any>;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ refetch }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [createEvent] = useMutation(CREATE_EVENT);
  const { t } = useTranslation();

  const handleSubmit = async (values: NestedRecord<Serializable>) => {
    try {
      await createEvent({
        variables: {
          input: values,
        },
      });
      await refetch();
      setExpanded(false);
    } catch (error) {
      Message.error(error.message);
      return;
    }
    Message.success(t('Event successfully created'));
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((expanded) => !expanded)}
    >
      <AccordionSummary expandIcon={<Icon type="down" />}>
        <Typography variant="h6">{t('Create Event')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box.Fill>
          <EventForm onSubmit={handleSubmit} />
        </Box.Fill>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateEvent;
