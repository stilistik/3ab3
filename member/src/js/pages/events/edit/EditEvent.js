import React from 'react';
import { DefaultGrid } from 'Components';
import { getQueryParams } from 'History';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from '@material-ui/core';
import Committee from './committee/Committee';
import Todos from './todo/Todos';
import Steps from './steps/Steps';

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
      <DefaultGrid overflow>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
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
            style={{ flexGrow: 1 }}
            containerStyle={{ height: '100%' }}
          >
            <Todos eventId={id} />
            <Committee eventId={id} />
            <div>
              <h1>Info</h1>
            </div>
            <Steps />
          </SwipeableViews>
        </div>
      </DefaultGrid>
    );
  }
}

export default EditEvent;
