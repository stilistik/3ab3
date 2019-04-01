import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { Icon, ImageDiv } from 'Components';
import LikeEvent from './LikeEvent';
import EventComments from './EventComments';
import EventStats from './EventStats';
import { requestRoute } from 'History';

import styles from './EventCard.css';

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
  return (
    <div className={styles.header}>
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
  );
};

export class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onComment = () => {
    this.setState({ show: true });
  };

  onEdit = () => {
    requestRoute('/editevent');
  };

  render() {
    const { event } = this.props;
    return (
      <Card>
        <CardActionArea className={styles.area} onClick={this.onEdit}>
          <ImageDiv
            image={global.API_URL + this.props.event.image}
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
        <EventStats eventId={event.id} onComment={this.onComment} />
        <CardActions>
          <LikeEvent event={event} />
          <Button size="small" color="primary" onClick={this.onComment}>
            <Icon type="addComment" style={{ marginRight: '5px' }} /> Comment
          </Button>
        </CardActions>
        {this.state.show ? <EventComments eventId={event.id} /> : null}
      </Card>
    );
  }
}
