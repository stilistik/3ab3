import React from 'react';
import { TweenMax } from 'gsap';
import { Loading } from 'Components';
import { Grid, CssBaseline } from '@material-ui/core';
import { LoginForm } from './LoginForm';

import styles from './LoginPage.less';

export const LoginPage = () => {
  const [loading, setLoading] = React.useState(true);
  const container = React.useRef(null);
  const background = React.useRef(null);

  const onMouseMove = React.useCallback((e) => {
    parallaxIt(e, '#back', 30);
  }, []);

  React.useEffect(() => {
    container.current.addEventListener('mousemove', onMouseMove);
    loadImage();
    return () =>
      container.current.removeEventListener('mousemove', onMouseMove);
  }, []);

  const loadImage = async () => {
    setLoading(true);
    const pic = 'drawer.jpg';
    let url = `url(${pic})`;
    let img = new Image();
    img.onload = () => {
      background.current.style.backgroundImage = url;
      setLoading(false);
    };
    img.src = pic;
  };

  const parallaxIt = (e, target, movement) => {
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
    <div ref={container} className={styles.container}>
      <CssBaseline />
      <div id="back" ref={background} className={styles.background} />
      <Grid className={styles.grid} container justify="center">
        <Grid item xs={9} sm={6} md={4} lg={3} xl={2}>
          {loading ? (
            <Loading />
          ) : (
            <div style={{ position: 'relative' }}>
              <LoginForm />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
