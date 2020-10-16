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
    <Box.Flex column h="100%" w="100%">
      <Tabs value={value} onChange={onChange} variant="fullWidth">
        <Tab label="Feed" />
        <Tab label="Events" />
      </Tabs>
      <SwipeableViews
        axis="x"
        index={value}
        onChangeIndex={handleChangeIndex}
        containerStyle={{ height: '100%' }}
      >
        <Box px={2} ox="hidden">
          <PostFeedManager />
        </Box>
        <Box px={2} ox="hidden">
          <EventFeedManager />
        </Box>
      </SwipeableViews>
    </Box.Flex>
  );
};

const DesktopHome: React.FC = () => {
  return (
    <Grid.Default>
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
    </Grid.Default>
  );
};

export const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <MobileHome />
      </Hidden>
      <Hidden xsDown>
        <DesktopHome />
      </Hidden>
    </React.Fragment>
  );
};
