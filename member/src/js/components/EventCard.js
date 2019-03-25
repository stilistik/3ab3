import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { Icon, ImageDiv } from 'Components';

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
  render() {
    const { title, date, description } = this.props.event;
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
            <EventHeader title={title} date={date} />
            <Typography component="p" className={styles.typo}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size="small" color="primary" onClick={this.onEdit}>
            <Icon type="edit" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
