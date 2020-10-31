import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import { Event } from 'App/prisma';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Container>
      <AspectRatioBox ratio={16 / 10} className="mb-10">
        <LazyLoadingImageDiv
          src={event.image}
          className={styles.wrapper + ' shadow-2xl'}
        >
          <div className={styles.top}>
            <h3 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h3>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <div className={styles.bottom}>
            <h1 className={styles.title}>{event.title}</h1>
            <h2 className={styles.subtitle}>{event.subtitle}</h2>
          </div>
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
