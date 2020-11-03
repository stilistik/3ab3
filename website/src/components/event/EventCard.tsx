import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventCard.module.css';

interface ShowMoreProps {
  className: string;
  btnText: string;
}

const ShowMoreButton: React.FC<ShowMoreProps> = ({ className, btnText }) => {
  const [isActive, setActive] = React.useState(false);

  const handleClick = () => {
    setActive((isActive) => !isActive);
  };

  const moreBtn = clx(className, styles.topRight, styles.more, {
    [styles.slanted]: isActive,
  });

  const moreWrapper = clx(styles.fillRight);

  console.log(moreWrapper);

  return (
    <button onClick={handleClick} className={moreBtn}>
      {btnText}
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
          <div>
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
            <ShowMoreButton
              className="absolute top-0 right-0 mr-3 mt-3"
              btnText="+"
            />
            <div className={styles.bottomRight}>
              <h1 className={styles.title}>{event.title}</h1>
              <h4 className={styles.subtitle}>{event.subtitle}</h4>
            </div>
          </div>
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
