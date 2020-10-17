import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Icon, LazyLoadingImageDiv } from 'Components/index';
import { LikeEvent } from './LikeEvent';
import EventComments from './EventComments';
import { EventStats } from './EventStats';
import SupportEvent from './SupportEvent';
import { requestRoute } from 'App/router/History';
import { Event } from 'Graphql/types';
import { Box } from 'Components/layout';
import { useTranslation } from 'react-i18next';

// import styles from './EventCard.less';

const useDateDisplayStyles = makeStyles((theme) => ({
  month: {
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    marginBotton: '-3px',
  },
  day: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface DateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const styles = useDateDisplayStyles();

  const str = new Date(date).toString();
  const month = str.split(' ')[1].toUpperCase();
  const day = str.split(' ')[2];
  return (
    <Box d="flex" jc="center" ai="center" w="60px" h="60px" mt={1} mr={2}>
      <div>
        <Typography variant="body1" className={styles.month}>
          {month}
        </Typography>
        <Typography gutterBottom variant="h5" className={styles.day}>
          {day}
        </Typography>
      </div>
    </Box>
  );
};

interface EventHeaderProps {
  title: string;
  date: string;
  place: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({ title, date, place }) => {
  return (
    <Box pb={1} mb={2} borderBottom={1} borderColor="divider">
      <Box.Row>
        <DateDisplay date={date} />
        <div>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {place}
          </Typography>
        </div>
      </Box.Row>
    </Box>
  );
};

const useEventCardStyles = makeStyles((theme) => ({
  card: { position: 'relative' },
  area: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
  },
}));

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [show, setShow] = React.useState(false);
  const styles = useEventCardStyles();
  const { t } = useTranslation();

  const onComment = () => {
    setShow(true);
  };

  const onEdit = () => {
    requestRoute('/event', {
      params: { id: event.id },
    });
  };

  return (
    <Card className={styles.card}>
      <CardActionArea className={styles.area} onClick={onEdit}>
        <LazyLoadingImageDiv src={event.image} width="100%" height="250px" />
        <CardContent>
          <EventHeader
            title={event.title}
            date={event.date}
            place={event.place}
          />
          <Typography component="p">{event.description}</Typography>
        </CardContent>
      </CardActionArea>
      <Box pos="absolute" top={250} right={0} margin={2} h="50px" w="60px">
        <SupportEvent event={event} />
      </Box>
      <EventStats eventId={event.id} onComment={onComment} />
      <CardActions>
        <LikeEvent event={event} />
        <Button size="small" onClick={onComment}>
          <Icon type="addComment" style={{ marginRight: '5px' }} /> {t('Comment')}
        </Button>
      </CardActions>
      {show && <EventComments eventId={event.id} />}
    </Card>
  );
};
