import React from 'react';
import ReactDOM from 'react-dom';
import Style from 'Style';
import App from 'App';
import Store from 'Redux/Store';
import { MuiPickersUtilsProvider as Picker } from '@material-ui/pickers';
import { CssBaseline } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import './css/master.less';

ReactDOM.render(
  <CssBaseline>
    <Style>
      <Store>
        <Picker utils={DateFnsUtils}>
          <App />
        </Picker>
      </Store>
    </Style>
  </CssBaseline>,
  document.getElementById('root')
);
