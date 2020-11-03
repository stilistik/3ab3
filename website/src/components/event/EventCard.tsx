import React from 'react';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventCard.module.css';

interface ShowMoreButtonProps {
  onClick: (event: React.MouseEvent) => void;
  className: string;
  btnText: string;
  isActive: boolean;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onClick,
  className,
  btnText,
  isActive,
}) => {
  const moreBtn = clx(className, styles.topRight, styles.more, {
    [styles.slanted]: isActive,
  });

  const moreWrapper = clx(styles.fillRight);

  console.log(moreWrapper);

  return (
    <button onClick={onClick} className={moreBtn}>
      {btnText}
    </button>
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
    <Container>
      <AspectRatioBox ratio={16 / 10} className="mb-10">
        <LazyLoadingImageDiv
          src={event.image}
          className={styles.wrapper + ' shadow-2xl'}
        >
          <div className={styles.topLeft}>
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <div className={styles.topRight}>
            <ShowMoreButton
              onClick={handleClick}
              className="absolute top-0 right-0 mr-3 mt-3"
              btnText="+"
              isActive={isActive}
            />
          </div>
          <div className="midRight">
            {isActive ? <p>es ist aktiv</p> : <p>es ist nicht aktiv</p>}
          </div>
          <div className={styles.bottomRight}>
            <h1 className={styles.title}>{event.title}</h1>
            <h4 className={styles.subtitle}>{event.subtitle}</h4>
          </div>
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
