import React from 'react';
import { Box } from 'Components/index';
import { SINGLE_EVENT } from 'Graphql/queries';
import { Event } from 'Graphql/types';
import { Paper, Typography } from '@material-ui/core';
import { PaperHeader } from '../PaperHeader';
import { EditInfo } from './EditInfo';
import { HelpPopover } from '../HelpPopover';
import { Trans, useTranslation } from 'react-i18next';

interface InfoItemProps {
  label: string;
  content: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, content }) => {
  return (
    <React.Fragment>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1">{content || '-'}</Typography>
    </React.Fragment>
  );
};

interface EventInfoProps {
  event: Event;
}

export const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const { t } = useTranslation();

  const refetchQueries = () => [
    { query: SINGLE_EVENT, variables: { eventId: event.id } },
  ];

  return (
    <Paper>
      <PaperHeader title={t('Info')}>
        <HelpPopover>
          <Trans i18nKey="eventInfoHelpText">
            This information will be shown on the public website once the event
            is published.
          </Trans>
        </HelpPopover>
        <EditInfo event={event} refetchQueries={refetchQueries} />
      </PaperHeader>
      <Box.Fill p={2} cmbnl={1}>
        <InfoItem label={t('Event Name')} content={event.title} />
        <InfoItem label={t('Subtitle')} content={event.subtitle} />
        <InfoItem label={t('Location')} content={event.place} />
        <InfoItem
          label={t('Date')}
          content={new Date(event.date).toDateString()}
        />
        <InfoItem
          label={t('Time')}
          content={new Date(event.date).toLocaleTimeString()}
        />
        <InfoItem label={t('Description')} content={event.description} />
        <InfoItem label={t('Spotify')} content={event.spotify} />
        <InfoItem label={t('Youtube')} content={event.youtube} />
        <InfoItem label={t('Facebook')} content={event.facebook} />
        <InfoItem label={t('Instagram')} content={event.instagram} />
      </Box.Fill>
    </Paper>
  );
};
