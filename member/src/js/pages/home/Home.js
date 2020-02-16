import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Box } from 'Components';
import { Hidden, Tabs, Tab, Typography, Divider } from '@material-ui/core';
import Feed from './feed/FeedManager';
import Events from './events/Events';

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
        <Grid container spacing={3}>
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
    <Box py="20px">
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <Typography variant="h5">FEED</Typography>
          <Divider />
          <Feed />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">EVENTS</Typography>
          <Divider />
          <Events />
        </Grid>
      </Grid>
    </Box>
  );
};

const Home = () => {
  return (
    <Grid.Default>
      <Hidden smUp>
        <MobileHome />
      </Hidden>
      <Hidden xsDown>
        <DesktopHome />
      </Hidden>
    </Grid.Default>
  );
};

export default Home;
