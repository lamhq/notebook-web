import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { MemoryRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../src/styles.css';
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
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  ),
];