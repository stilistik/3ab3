import React from 'react';
import { AspectRatioBox, Container, useMeasure } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import { SocialButtons } from 'Components/buttons';
import { Event } from 'App/prisma';
import { useSpring, animated } from 'react-spring';
import clx from 'classnames';

import styles from './EventCard.module.css';
import { EventTitle } from './EventTitle';

interface ShowMoreButtonProps {
  onClick: (event: React.MouseEvent) => void;
  btnText: string;
  isActive: boolean;
  className?: string;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onClick,
  btnText,
  isActive,
  className,
}) => {
  const moreBtn = clx(styles.moreButton, className, {
    [styles.slanted]: isActive,
  });

  return (
    <button onClick={onClick} className={moreBtn}>
      {btnText}
    </button>
  );
};

interface GrowProps {
  show: boolean;
}

const Grow: React.FC<GrowProps> = ({ children, show }) => {
  const props = useSpring({
    from: {
      transform: 'translate3d(100%, 0, 0)',
    },
    to: {
      transform: show ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
    },
  });
  return (
    <div className="w-full h-full relative overflow-hidden">
      <animated.div className="absolute w-full h-full" style={props}>
        {children}
      </animated.div>
    </div>
  );
};

interface EventDetailsProps {
  isActive: boolean;
  event: Event;
  height: number;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, height }) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.details} style={{ height }}>
        <div className={styles.description}>
          <p>{event.description}</p>
        </div>
        <SocialButtons event={event} size="small" />
      </div>
    </div>
  );
};

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isActive, setActive] = React.useState(false);
  const [titleRef, { height: titleHeight }] = useMeasure();
  const [boxRef, { height: boxHeight }] = useMeasure();

  const handleClick = () => {
    setActive((isActive) => !isActive);
  };

  const detailsHeight = boxHeight - titleHeight;
  return (
    <Container className="px-4">
      <AspectRatioBox ratio={16 / 10} className="mb-10" ref={boxRef}>
        <LazyLoadingImageDiv
          src={event.image}
          className={styles.wrapper + ' shadow-2xl cursor-pointer'}
          onClick={handleClick}
        >
          <div>
            <h2 className={styles.date}>
              {new Date(event.date).toLocaleDateString()}
            </h2>
            <h4 className={styles.time}>
              {'Doors: ' + new Date(event.date).toLocaleTimeString()}
            </h4>
          </div>
          <ShowMoreButton
            className="absolute top-0 right-0 pointer-events-none z-10"
            onClick={handleClick}
            btnText="+"
            isActive={isActive}
          />
          <Grow show={isActive}>
            <EventDetails
              isActive={isActive}
              event={event}
              height={detailsHeight}
            />
          </Grow>
          <EventTitle ref={titleRef} event={event} />
        </LazyLoadingImageDiv>
      </AspectRatioBox>
    </Container>
  );
};
