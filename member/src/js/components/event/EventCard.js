import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { Icon, ImageContainer } from 'Components';
import LikeEvent from './LikeEvent';
import EventComments from './EventComments';
import EventStats from './EventStats';
import { requestRoute } from 'History';

import styles from './EventCard.less';

const DateDisplay = ({ date }) => {
  const str = new Date(date).toString();
  const month = str.split(' ')[1].toUpperCase();
  const day = str.split(' ')[2];
  return (
    <div className={styles.date}>
      <div>
        <Typography variant="body1" className={styles.month}>
          {month}
        </Typography>
        <Typography gutterBottom variant="h5" className={styles.day}>
          {day}
        </Typography>
      </div>
    </div>
  );
};

const EventHeader = ({ title, date }) => {
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.header}>
      <div style={{ display: 'flex' }}>
        <DateDisplay date={date} />
        <div>
          <Typography gutterBottom variant="h5" className={styles.typo}>
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" className={styles.typo}>
            Belvedere, Bremgarten
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const EventCard = ({ event }) => {
  const [show, setShow] = React.useState(false);

  const onComment = () => {
    setShow(true);
  };

  const onEdit = () => {
    requestRoute('/editevent', {
      id: event.id,
    });
  };

  const onSupport = () => {};

  return (
    <Card className={styles.card}>
      <CardActionArea className={styles.area} onClick={onEdit}>
        <ImageContainer
          image={global.API_URL + event.image}
          classes={{
            root: styles.image,
            progress: styles.progress,
            indicator: styles.indicator,
            icon: styles.icon,
          }}
        />
        <CardContent>
          <EventHeader title={event.title} date={event.date} />
          <Typography component="p" className={styles.typo}>
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={onSupport}
        onMouseDown={(e) => e.stopPropagation()}
        variant="outlined"
        className={styles.supportBtn}
      >
        <Icon type="groupAdd" />
      </Button>
      <EventStats eventId={event.id} onComment={onComment} />
      <CardActions>
        <LikeEvent event={event} />
        <Button size="small" color="primary" onClick={onComment}>
          <Icon type="addComment" style={{ marginRight: '5px' }} /> Comment
        </Button>
      </CardActions>
      {show && <EventComments eventId={event.id} />}
    </Card>
  );
};
