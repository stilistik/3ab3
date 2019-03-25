import React from 'react';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

class AppCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen = (value) => {
    this.setState({ open: value });
  };

  render() {
    if (!this.props.isAuthenticated) return null;
    return (
      <div>
        <AppHeader setDrawerOpen={this.setOpen} />
        <AppMenu drawerOpen={this.state.open} setDrawerOpen={this.setOpen} />
      </div>
    );
  }
}

export default AppCore;
