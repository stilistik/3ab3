import React from 'react';
import { DefaultGrid } from 'Components';
import { getQueryParams } from 'History';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from '@material-ui/core';
import Committee from './committee/Committee';
import Todos from './todo/Todos';

import styles from './EditEvent.css';

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

  render() {
    const { id } = getQueryParams();
    if (!id) return null;
    return (
      <DefaultGrid overflow>
        <Tabs
          value={this.state.value}
          onChange={this.onChange}
          variant="fullWidth"
        >
          <Tab label="Todo" />
          <Tab label="Committee" />
          <Tab label="Info" />
          <Tab label="Steps" />
        </Tabs>
        <SwipeableViews
          axis="x"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Todos eventId={id} />
          <Committee eventId={id} />
          <div>
            <h1>Info</h1>
          </div>
          <div>
            <h1>Steps</h1>
          </div>
        </SwipeableViews>
      </DefaultGrid>
    );
  }
}

export default EditEvent;
