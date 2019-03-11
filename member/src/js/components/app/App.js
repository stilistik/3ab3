import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'Redux/actions';
import AppHeader from './AppHeader';
import Routes from 'Routes';

import './App.css';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (access_token) => {
      dispatch(login(access_token));
    },
  };
};

class App extends React.Component {
  componentDidMount = () => {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) this.props.login(access_token);
  };

  render() {
    const props = {
      app: {
        isAuthenticated: false,
      },
    };

    return (
      <div styleName="container">
        <div styleName="header">
          <AppHeader />
        </div>
        <div styleName="content">
          <Router>
            <Routes props={props} />
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
