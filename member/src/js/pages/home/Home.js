import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { DefaultGrid } from 'Components';
import {
  Grid,
  Hidden,
  Tabs,
  Tab,
  Typography,
  Divider,
} from '@material-ui/core';
import Feed from './feed/FeedManager';
import Events from './events/Events';

import styles from './Home.css';

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

  handleChangeIndex = (index) => {
    this.setState({ value: index });
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
            <Grid item xs={12}>
              <Feed />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Events />
            </Grid>
          </Grid>
        </SwipeableViews>
      </div>
    );
  }
}

const DesktopHome = () => {
  return (
    <Grid container>
      <Grid item sm={6}>
        <div className={styles.header}>
          <Typography variant="h5" className={styles.typo}>
            FEED
          </Typography>
          <Divider />
        </div>
        <Feed />
      </Grid>
      <Grid item sm={6}>
        <div className={styles.header}>
          <Typography variant="h5" className={styles.typo}>
            EVENTS
          </Typography>
          <Divider />
        </div>
        <Events />
      </Grid>
    </Grid>
  );
};

class Home extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <Hidden smUp>
          <MobileHome />
        </Hidden>
        <Hidden xsDown>
          <DesktopHome />
        </Hidden>
      </DefaultGrid>
    );
  }
}

export default Home;
