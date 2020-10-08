import React from 'react';
import { Grid } from 'Components';
import { getQueryParams } from 'History';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from '@material-ui/core';
import Todos from './todo/Todos';

class EditEvent extends React.Component {
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
    const { id } = getQueryParams();
    if (!id) return null;
    return (
      <Grid.Default>
        <Tabs
          value={this.state.value}
          onChange={this.onChange}
          variant="fullWidth"
        >
          <Tab label="Todo" />
          <Tab label="Info" />
        </Tabs>
        <SwipeableViews
          axis="x"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{ flexGrow: 1 }}
          containerStyle={{ height: '100%' }}
        >
          <Todos eventId={id} />
          <div>
            <h1>Info</h1>
          </div>
        </SwipeableViews>
      </Grid.Default>
    );
  }
}

export default EditEvent;
