import React from 'react';
import { Event } from 'Graphql/types';
import {
  FormControlLabel,
  Link,
  Paper,
  Switch,
  Typography,
} from '@material-ui/core';
import { PaperHeader } from './PaperHeader';
import { Box, Message } from 'Components/index';
import { useMutation } from 'react-apollo';
import { SET_EVENT_PUBLISHED } from 'Graphql/mutations';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Trans, useTranslation } from 'react-i18next';

interface PublishEventProps {
  event: Event;
}

export const PublishEvent: React.FC<PublishEventProps> = ({ event }) => {
  const [setEventPublished] = useMutation(SET_EVENT_PUBLISHED);
  const { t } = useTranslation();

  const handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setEventPublished({
      variables: {
        eventId: event.id,
        published: checked,
      },
      refetchQueries: () => [
        { query: SINGLE_EVENT, variables: { eventId: event.id } },
      ],
    }).catch((error) => Message.error(error.message));
  };

  return (
    <Paper>
      <PaperHeader title={t('Publish Event')}></PaperHeader>
      <Box.Fill p={2} cmbnl={1}>
        <Typography variant="body1">
          <Trans i18nKey="eventPublishHelpText">
            Publishing the event will make it visible on the public website at{' '}
            <Link color="secondary" href="https://www.3ab3.ch">
              www.3ab3.ch
            </Link>
            . Only an admin user can perform this action.
          </Trans>
        </Typography>
        <FormControlLabel
          label={event.published ? t('Unpublish') : t('Publish')}
          control={<Switch checked={event.published} onChange={handleChange} />}
        />
      </Box.Fill>
    </Paper>
  );
};
