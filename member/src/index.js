import React from 'react';
import ReactDOM from 'react-dom';
import Style from 'Style';
import Apollo from 'Apollo';
import App from 'App';
import Store from 'Redux/Store';
import { MuiPickersUtilsProvider as Picker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import './css/master.less';

ReactDOM.render(
  <Style>
    <Store>
      <Apollo>
        <Picker utils={DateFnsUtils}>
          <App />
        </Picker>
      </Apollo>
    </Store>
  </Style>,
  document.getElementById('root')
);
