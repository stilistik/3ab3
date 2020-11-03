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

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onClick,
  btnText,
  isActive,
}) => {
  const moreBtn = clx(styles.topRight, styles.more, {
    [styles.slanted]: isActive,
  });

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
          className={
            styles.wrapper + ' shadow-2xl '
          }
        >
          <div className={styles.left}>
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <div className={styles.right + ' ' + (isActive ? styles.isActive : '')}>
            <div className={styles.topRight}>
              <ShowMoreButton
                onClick={handleClick}
                btnText="+"
                isActive={isActive}
              />
            </div>
            <div className={styles.midRight}>
              {isActive ? (
                <p>{event.description}</p>
              ) : null}
            </div>
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
