import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';

import { SocialButtons } from 'Components/buttons';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventCard.module.css';

interface ShowMoreButtonProps {
  onClick: (event: React.MouseEvent) => void;
  btnText: string;
  isActive: boolean;
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

interface EventTitleProps {
  event: Event;
}

const EventTitle: React.FC<EventTitleProps> = ({ event }) => {
  return (
    <React.Fragment>
      <h1 className={styles.title}>{event.title}</h1>
      <h4 className={styles.subtitle}>{event.subtitle}</h4>
    </React.Fragment>
  );
};

interface EventDetailsProps {
  isActive: boolean;
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <React.Fragment>
      <div className={styles.description}>
        <p>{event.description}</p>
      </div>
        <SocialButtons event={event} size="small" />
      <EventTitle event={event} />
    </React.Fragment>
  );
};

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isActive, setActive] = React.useState(false);

  const handleClick = () => {
    setActive((isActive) => !isActive);
  };

  return (
    <Container className="px-4">
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
          </div>
          <div className="absolute top-0 right-0 mr-3 mt-3">
            <ShowMoreButton
              onClick={handleClick}
              btnText="+"
              isActive={isActive}
            />
          </div>
          <div className={styles.flexColumn + ' ' + (isActive ? styles.isActive : '')}>
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
