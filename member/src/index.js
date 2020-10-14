import React from 'react';
import ReactDOM from 'react-dom';
import Style from 'Style';
import { App } from 'App';
import { StoreProvider } from 'App/store';
import { MuiPickersUtilsProvider as Picker } from '@material-ui/pickers';
import { CssBaseline } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';

import './css/master.less';

ReactDOM.render(
  <CssBaseline>
    <Style>
      <StoreProvider>
        <Picker utils={DateFnsUtils}>
          <LazyLoadingProvider>
            <App />
          </LazyLoadingProvider>
        </Picker>
      </StoreProvider>
    </Style>
  </CssBaseline>,
  document.getElementById('root')
);
