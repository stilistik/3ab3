import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Box } from 'Components/index';
import { Hidden, Tabs, Tab, Typography, Divider } from '@material-ui/core';
import { PostFeedManager } from './posts/PostFeedManager';
import { EventFeedManager } from './events/EventFeedManager';

const MobileHome: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const onChange = (_event: React.ChangeEvent<{}>, value: any) => {
    setValue(value);
  };

  const handleChangeIndex = (index: number) => {
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
            <PostFeedManager />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <EventFeedManager />
          </Grid>
        </Grid>
      </SwipeableViews>
    </React.Fragment>
  );
};

const DesktopHome: React.FC = () => {
  return (
    <Box py="20px">
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <Typography variant="h5">FEED</Typography>
          <Divider />
          <PostFeedManager />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">EVENTS</Typography>
          <Divider />
          <EventFeedManager />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Home: React.FC = () => {
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

