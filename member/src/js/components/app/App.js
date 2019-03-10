import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './AppHeader';
import Routes from 'Routes';

import './App.css';

class App extends React.Component {
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

export default App;
