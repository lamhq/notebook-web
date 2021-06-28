import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import viLocale from "date-fns/locale/vi";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { initializeState } from '../src/identity';
import { theme } from '../src/theme';
import '../src/styles.css';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewport: MINIMAL_VIEWPORTS,
    defaultViewport: 'mobile1',
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <RecoilRoot initializeState={initializeState}>
          <Router>
            <Story />
          </Router>
        </RecoilRoot>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ),
];