import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { theme } from '../src/theme';

import { BrowserRouter } from 'react-router';

import '../src/styles.css';

const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
      default: 'mobile',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={customEnLocale}
        >
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
