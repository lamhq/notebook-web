import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import viLocale from "date-fns/locale/vi";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as OldThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../src/styles.css';
import { theme as oldTheme } from '../src/theme';
import { theme } from '../src/theme2';
import { identityState } from '../src/identity';
import { FakeApiProvider } from '../src/api';
import { ConfirmProvider } from '../src/confirm';

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
    <OldThemeProvider theme={oldTheme}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
          <RecoilRoot initializeState={initializeTestState}>
            <SnackbarProvider>
              <ConfirmProvider>
                <Router>
                  <FakeApiProvider>
                    <Story />
                  </FakeApiProvider>
                </Router>
              </ConfirmProvider>
            </SnackbarProvider>
          </RecoilRoot>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </OldThemeProvider>
  ),
];