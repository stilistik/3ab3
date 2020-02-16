import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid} from 'Components';
import {
  Typography,
  Divider,
  Hidden,
  Tabs,
  Tab,
} from '@material-ui/core';
import BalanceChart from './BalanceChart';
import ConsumptionChart from './ConsumptionChart';
import CurrentBalance from './CurrentBalance';
import TransactionTable from './TransactionTable';

const DesktopProfile = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CurrentBalance />
      </Grid>
      <Grid item xs={12} sm={6}>
        <BalanceChart />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ConsumptionChart />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5">HISTORY</Typography>
        <Divider />
        <br />
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

const MobileProfile = () => {
  const [value, setValue] = React.useState(0);

  const onChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Tabs value={value} onChange={onChange} variant="fullWidth">
        <Tab label="Balance" />
        <Tab label="Charts" />
        <Tab label="History" />
      </Tabs>
      <Container>
        <SwipeableViews
          axis="x"
          index={value}
          onChangeIndex={handleChangeIndex}
          slideStyle={{ overflow: 'hidden' }}
        >
          <Grid container>
            <Grid item xs={12}>
              <CurrentBalance />
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ overflow: 'hidden' }}>
            <Grid item xs={12}>
              <BalanceChart />
            </Grid>
            <Grid item xs={12}>
              <ConsumptionChart />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">HISTORY</Typography>
              <Divider />
              <br />
              <TransactionTable />
            </Grid>
          </Grid>
        </SwipeableViews>
      </Container>
    </div>
  );
};

const Profile = () => {
  return (
    <Grid.Default>
      <Hidden smUp>
        <MobileProfile />
      </Hidden>
      <Hidden xsDown>
        <DesktopProfile />
      </Hidden>
    </Grid.Default>
  );
};

export default Profile;
