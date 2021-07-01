import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import viLocale from "date-fns/locale/vi";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../src/styles.css';
import { theme } from '../src/theme';
import { identityState } from '../src/identity';
import { ApiContext, fakeApiUtils } from '../src/api';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewport: MINIMAL_VIEWPORTS,
    defaultViewport: 'mobile1',
  },
}

const initializeTestState = ({ set }) => {
  set(identityState, {
    displayName: 'Admin',
    token: '',
    expireAt: new Date(),
    email: '',
    roles: [],
  });
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <RecoilRoot initializeState={initializeTestState}>
          <SnackbarProvider>
            <Router>
              <ApiContext.Provider value={fakeApiUtils}>
                <Story />
              </ApiContext.Provider>
            </Router>
          </SnackbarProvider>
        </RecoilRoot>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ),
];