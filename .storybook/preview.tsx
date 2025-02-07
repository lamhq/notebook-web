import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { handlers } from '../src/msw/handlers';
import '../src/styles.css';
import { theme } from '../src/theme';

// Initialize MSW
initialize({
  serviceWorker: {
    options: {
      // only mock API requests
      scope: '/api',
    },
  },
});

const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};

const preview: Preview = {
  parameters: {
    // layout: 'fullscreen',
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
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={customEnLocale}
        >
          <Story />
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
