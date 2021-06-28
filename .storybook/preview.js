import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import viLocale from "date-fns/locale/vi";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import '../src/styles.css';
import { theme } from '../src/theme';
import { ApiContext, fakeApiHelper } from '../src/api';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewport: MINIMAL_VIEWPORTS,
    defaultViewport: 'mobile1',
  },
}

const fakeIdenity = {
  displayName: 'Admin',
  token: '',
  expireAt: new Date(),
  email: '',
  roles: [],
};

export const initializeTestState = ({ set }) => {
  set(identityState, fakeIdenity);
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <RecoilRoot initializeState={initializeTestState}>
          <Router>
            <ApiContext.Provider value={fakeApiHelper}>
              <Story />
            </ApiContext.Provider>
          </Router>
        </RecoilRoot>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ),
];