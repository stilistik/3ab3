import React from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import styles from './CardStack.module.css';

const to = (i: any) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r: number, s: number) =>
  `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

interface Card {
  front: React.ReactNode;
  back?: React.ReactNode;
}

interface CardStackProps {
  cards: Card[];
}

export const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const [gone] = React.useState(() => new Set());
  const [flipped] = React.useState(() => new Set());

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity, event }) => {
      event.stopPropagation();
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      // @ts-ignore
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          // @ts-ignore
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        // @ts-ignore
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  const [flipProps, setFlipProps] = useSprings(cards.length, (i) => ({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(0deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  return (
    <div className={styles.container}>
      {props.map(({ x, y, rot, scale }, i) => {
        return (
          <animated.div
            key={i}
            style={{
              transform: interpolate(
                [x, y],
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
            }}
          >
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              onClick={() =>
                // @ts-ignore
                setFlipProps((idx: number) => {
                  if (idx !== i || !cards[i].back) return;
                  const isFlipped = flipped.has(i);
                  if (isFlipped) flipped.delete(i);
                  else flipped.add(i);
                  return {
                    opacity: isFlipped ? 1 : 0,
                    transform: `perspective(600px) rotateY(${
                      isFlipped ? 0 : 180
                    }deg)`,
                  };
                })
              }
            >
              <animated.div
                className="w-full h-full absolute top-0 left-0"
                style={{
                  opacity: flipProps[i].opacity,
                  transform: flipProps[i].transform,
                }}
              >
                <div className={styles.card}>{cards[i].front}</div>
              </animated.div>
              <animated.div
                className="w-full h-full absolute top-0 left-0"
                style={{
                  opacity: flipProps[i].opacity.interpolate(
                    (o: number) => 1 - o
                  ),
                  transform: flipProps[i].transform.interpolate(
                    (t) => `${t} rotateY(180deg)`
                  ),
                }}
              >
                <div className={styles.card}>{cards[i].back}</div>
              </animated.div>
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
};
