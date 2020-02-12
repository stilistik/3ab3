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

const MobileHome = () => {
  const [value, setValue] = React.useState(0);

  const onChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <Tabs value={value} onChange={onChange} variant="fullWidth">
        <Tab label="Feed" />
        <Tab label="Events" />
      </Tabs>
      <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex}>
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
    </React.Fragment>
  );
};

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

const Home = () => {
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
};

export default Home;
