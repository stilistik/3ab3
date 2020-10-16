import React from 'react';
import ReactDOM from 'react-dom';
import 'App/i18n/i18n';
import { App } from 'App';
import { Theme } from 'App/theme';
import { StoreProvider } from 'App/store';
import { MuiPickersUtilsProvider as Picker } from '@material-ui/pickers';
import { CssBaseline } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';

import './css/master.less';

ReactDOM.render(
  <CssBaseline>
    <Theme>
      <StoreProvider>
        <Picker utils={DateFnsUtils}>
          <LazyLoadingProvider>
            <App />
          </LazyLoadingProvider>
        </Picker>
      </StoreProvider>
    </Theme>
  </CssBaseline>,
  document.getElementById('root')
);
