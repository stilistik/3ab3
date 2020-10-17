import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'App';
import { LanguageProvider } from 'App/intl';
import { Theme } from 'App/theme';
import { StoreProvider } from 'App/store';
import { MuiPickersUtilsProvider as Picker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LazyLoadingProvider } from 'Components/image/LazyLoadingContext';

import './css/master.less';

ReactDOM.render(
  <LanguageProvider>
    <Theme>
      <StoreProvider>
        <Picker utils={DateFnsUtils}>
          <LazyLoadingProvider>
            <App />
          </LazyLoadingProvider>
        </Picker>
      </StoreProvider>
    </Theme>
  </LanguageProvider>,
  document.getElementById('root')
);
