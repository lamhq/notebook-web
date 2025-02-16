import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { WebStorageStateStore } from 'oidc-client-ts';
import type { ReactNode } from 'react';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { getAbsoluteURL } from './common/utils';
import { Dialog } from './dialog';
import { AUTH_CALLBACK_ROUTE } from './routes';
import { theme } from './theme';

const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};

const oidcConfig: AuthProviderProps = {
  authority: process.env.PUBLIC_OIDC_AUTHORITY ?? '',
  client_id: process.env.PUBLIC_OIDC_CLIENT_ID ?? '',
  redirect_uri: getAbsoluteURL(AUTH_CALLBACK_ROUTE),
  response_type: 'code',
  scope: 'email openid profile',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  /**
   * required for exchanging authorization code with access token
   * exposing the client secret on the client side can be insecure, but let's leave it for now
   */
  client_authentication: 'client_secret_basic',
  client_secret: process.env.PUBLIC_OIDC_CLIENT_SECRET,
  // skip exchanging authorization token for non-auth callback routes
  skipSigninCallback: window.location.pathname !== AUTH_CALLBACK_ROUTE,
};

export default function Provider({ children }: { children: ReactNode }) {
  console.log('Provider');
  return (
    // Material UI
    <ThemeProvider theme={theme}>
      {/* DatePicker */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={customEnLocale}
      >
        {/* React Router */}
        <BrowserRouter>
          {/* react-oidc-context */}
          <AuthProvider {...oidcConfig}>{children}</AuthProvider>
          <Dialog />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export type MockProviderProps = {
  children: ReactNode;
};

export function MockProvider({ children }: MockProviderProps) {
  return (
    // Material UI
    <ThemeProvider theme={theme}>
      {/* DatePicker */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={customEnLocale}
      >
        {/* React Router */}
        <MemoryRouter>
          {children}
          <Dialog />
        </MemoryRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
