import React from 'react';
import ReactDOM from 'react-dom';
import Style from 'Style';
import Apollo from 'Apollo';
import App from 'App';
import Store from 'Redux/Store';

import './css/master.css';

ReactDOM.render(
  <Style>
    <Store>
      <Apollo>
        <App />
      </Apollo>
    </Store>
  </Style>,
  document.getElementById('root')
);
