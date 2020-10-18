import React from 'react';
import { TweenMax } from 'gsap';
import { Box } from 'Components/index';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
  },
  background: {
    position: 'absolute',
    top: '-5vh',
    left: '-5vw',
    width: '110vw',
    height: '110vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(drawer.jpg)`,
  },
});

export const UnauthBackground: React.FC = ({ children }) => {
  const container = React.useRef(null);
  const background = React.useRef(null);
  const styles = useStyles();

  React.useEffect(() => {
    const onMouseMove = (e: React.MouseEvent) => {
      parallaxIt(e, '#back', 30);
    };
    container.current.addEventListener('mousemove', onMouseMove);
    return () =>
      container.current.removeEventListener('mousemove', onMouseMove);
  }, []);

  const parallaxIt = (
    e: React.MouseEvent,
    target: string,
    movement: number
  ) => {
    const rect = container.current.getBoundingClientRect();
    const { clientWidth: w, clientHeight: h } = container.current;
    var relX = e.pageX - rect.left;
    var relY = e.pageY - rect.top;

    TweenMax.to(target, 1, {
      x: ((relX - w / 2) / w) * movement,
      y: ((relY - h / 2) / h) * movement,
    });
  };

  return (
    <Box
      ref={container}
      h="100vh"
      o="hidden"
      pos="relative"
      bgcolor="rgba(0,0,0,0.4)"
    >
      <div id="back" ref={background} className={styles.background} />
      <Box.Fill>{children}</Box.Fill>
    </Box>
  );
};
