import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { DefaultGrid } from 'Components';
import { Grid, Hidden, Tabs, Tab } from '@material-ui/core';
import Feed from './feed/FeedManager';
import Events from './events/Events';

// import styles from './Home.css';

class MobileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  onChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Tabs value={value} onChange={this.onChange} variant="fullWidth">
          <Tab label="Feed" />
          <Tab label="Events" />
        </Tabs>
        <SwipeableViews
          axis="x"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Grid container>
            <Grid xs={12}>
              <Feed />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <Events />
            </Grid>
          </Grid>
        </SwipeableViews>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <Hidden smUp>
          <MobileHome />
        </Hidden>
        <Hidden xsDown>
          <Grid container>
            <Grid sm={6}>
              <Feed />
            </Grid>
            <Grid sm={6}>
              <Events />
            </Grid>
          </Grid>
        </Hidden>
      </DefaultGrid>
    );
  }
}

export default Home;
