import React from 'react';
import { TweenMax } from 'gsap';
import { Grid, Paper, CssBaseline } from '@material-ui/core';
import LoginForm from './LoginForm';

import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.background = null;
  }

  componentDidMount = () => {
    this.container.addEventListener('mousemove', (e) => {
      this.parallaxIt(e, '#front', -60);
      this.parallaxIt(e, '#middle', -30);
      this.parallaxIt(e, '#back', 30);
    });
  };

  parallaxIt = (e, target, movement) => {
    const offsetLeft = this.container.getBoundingClientRect().left;
    const offsetTop = this.container.getBoundingClientRect().top;
    var relX = e.pageX - offsetLeft;
    var relY = e.pageY - offsetTop;

    TweenMax.to(target, 1, {
      x:
        ((relX - this.container.clientWidth / 2) / this.container.clientWidth) *
        movement,
      y:
        ((relY - this.container.clientHeight / 2) /
          this.container.clientHeight) *
        movement,
    });
  };

  render() {
    return (
      <div ref={(ref) => (this.container = ref)} styleName="container">
        <CssBaseline />
        <div
          id="back"
          ref={(ref) => (this.background = ref)}
          styleName="background"
        />
        <Grid styleName="grid" container justify="center">
          <Grid item xs={9} sm={6} md={4} lg={3} xl={3}>
            <Paper styleName="paper">
              <LoginForm />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
