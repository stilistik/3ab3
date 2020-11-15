import React from 'react';
import { Event } from 'App/prisma';
import styles from './MobileEventCard.module.css';
import { AspectRatioBox, Container } from 'Components/utility';
import { LazyLoadingImageDiv } from 'Components/image';
import { useSpring, animated } from 'react-spring';
import { SocialButtons } from 'Components/buttons';

interface GrowProps {
  show: boolean;
}

const Grow: React.FC<GrowProps> = ({ children, show }) => {
  const props = useSpring({
    from: {
      height: 0,
    },
    to: {
      height: show ? 400 : 0,
    },
  });
  return (
    <animated.div className="relative overflow-hidden w-full" style={props}>
      {children}
    </animated.div>
  );
};

interface MobileEventDetailsProps {
  event: Event;
}

const MobileEventDetails: React.FC<MobileEventDetailsProps> = ({ event }) => {
  return (
    <div className={styles.details}>
      <h1 className={styles.title}>{event.title}</h1>
      <SocialButtons event={event} size="small" className="mb-3" />
      <p>{event.description}</p>
    </div>
  );
};

interface MobileEventCardProps {
  event: Event;
}

export const MobileEventCard: React.FC<MobileEventCardProps> = ({ event }) => {
  const [isActive, setActive] = React.useState(true);

  const handleClick = () => {
    setActive((isActive) => !isActive);
  };

  return (
    <Container className="px-4">
      <div className={styles.wrapper}>
        <AspectRatioBox ratio={16 / 10}>
          <LazyLoadingImageDiv
            className={styles.image}
            src={event.image}
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
          </LazyLoadingImageDiv>
        </AspectRatioBox>
        <Grow show={isActive}>
          <MobileEventDetails event={event} />
        </Grow>
      </div>
    </Container>
  );
};
