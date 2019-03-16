import React from 'react';
import { TweenMax } from 'gsap';
import { Grid, Paper, CssBaseline, CircularProgress } from '@material-ui/core';
import LoginForm from './LoginForm';

import './LoginPage.css';

class DelayedSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.mounted = false;
  }

  componentDidMount = () => {
    this.mounted = true;
    setTimeout(() => {
      if (this.mounted) this.setState({ show: true });
    }, this.props.delay);
  };

  componentWillUnmount = () => (this.mounted = false);

  render() {
    if (!this.state.show) return null;
    return (
      <div styleName="spinner">
        <CircularProgress />
      </div>
    );
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.container = null;
    this.background = null;
  }

  componentDidMount = () => {
    this.container.addEventListener('mousemove', this.onMouseMove);
    this.loadImage();
  };

  componentWillUnmount = () => {
    this.container.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = (e) => {
    this.parallaxIt(e, '#back', 30);
  };

  loadImage = async () => {
    await this.setState({ loading: true });
    let url = 'url(back.jpg)';
    let img = new Image();
    img.onload = () => {
      this.background.style.backgroundImage = url;
      this.setState({ loading: false });
    };
    img.src = 'back.jpg';
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
            {this.state.loading ? (
              <DelayedSpinner delay={200} />
            ) : (
              <Paper styleName="paper">
                <LoginForm />
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
