import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventCard.module.css';

const ShowMore: React.FC = () => {
  const [isActive, setActive] = React.useState(false);

  console.log(isActive);

  const handleClick = () => {
    if (isActive == true) {
      setActive(false);
    }
    setActive(true);
  };

  const moreBtn = clx(styles.topright, styles.more, {
    [styles.slanted]: isActive,
  });
  return (
    <button onClick={handleClick} className={moreBtn}>
      +
    </button>
  );
};

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
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <div className={styles.bottom}>
            <h1 className={styles.title}>{event.title}</h1>
            <h4 className={styles.subtitle}>{event.subtitle}</h4>
          </div>
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
