import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventCard.module.css';

interface ShowMoreButtonProps {
  onClick: (event: React.MouseEvent) => void;
  btnText: string;
  isActive: boolean;
}

interface EventDetailsProps {
  isActive: boolean;
  event: Event;
}

interface EventTitleProps {
  event: Event;
}

interface EventCardProps {
  event: Event;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onClick,
  btnText,
  isActive,
}) => {
  const moreBtn = clx(styles.moreButton, {
    [styles.slanted]: isActive,
  });

  return (
    <button onClick={onClick} className={moreBtn}>
      {btnText}
    </button>
  );
};

const EventTitle: React.FC<EventTitleProps> = ({ event }) => {
  return (
    <React.Fragment>
      <h1 className={styles.title}>{event.title}</h1>
      <h4 className={styles.subtitle}>{event.subtitle}</h4>
    </React.Fragment>
  );
};

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <React.Fragment>
      <div className={styles.description}>
        <p>{event.description}</p>
      </div>
      <EventTitle event={event} />
    </React.Fragment>
  );
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isActive, setActive] = React.useState(false);

  const handleClick = () => {
    setActive((isActive) => !isActive);
  };

  return (
    <Container>
      <AspectRatioBox ratio={16 / 10} className="mb-10">
        <LazyLoadingImageDiv
          src={event.image}
          className={styles.wrapper + ' shadow-2xl '}
        >
          <div>
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <div className="absolute top-0 right-0 mr-3 mt-3">
            <ShowMoreButton
              onClick={handleClick}
              btnText="+"
              isActive={isActive}
            />
          </div>
          <div className={styles.flexColumn}>
            {isActive ? (
              <EventDetails isActive={isActive} event={event} />
            ) : (
              <EventTitle event={event} />
            )}
          </div>
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
