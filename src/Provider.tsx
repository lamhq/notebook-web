import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import EventEmitter from 'eventemitter3';
import type { User } from 'oidc-client-ts';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import type { ReactNode } from 'react';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { axiosRequest } from './api/request';
import { getAbsoluteURL } from './common/utils';
import { Dialog } from './dialog';
import { EventProvider } from './event';
import { AUTH_CALLBACK_ROUTE } from './routes';
import { theme } from './theme';

// #region Locale
const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};
// #endregion

// #region Auth
function attachTokenToAPIRequest(user: User | undefined | null) {
  if (!user?.id_token) return;
  axiosRequest.defaults.headers.common.Authorization = `Bearer ${user.id_token}`;
}

const userManager = new UserManager({
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
});

const oidcConfig: AuthProviderProps = {
  userManager,
  // skip exchanging authorization token for non-auth callback routes
  skipSigninCallback: window.location.pathname !== AUTH_CALLBACK_ROUTE,
  onSigninCallback: attachTokenToAPIRequest,
};

// attach token to API request on load
userManager.getUser().then(attachTokenToAPIRequest, console.error);
// #endregion

// #region Event
const eventEmitter = new EventEmitter();
// #endregion

// #region Provider
export default function Provider({ children }: { children: ReactNode }) {
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
          <AuthProvider {...oidcConfig}>
            {/* event emitter */}
            <EventProvider emitter={eventEmitter}>{children}</EventProvider>
          </AuthProvider>
          <Dialog />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
// #endregion

// #region MockProvider
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
          {/* react-oidc-context */}
          <AuthProvider>{children}</AuthProvider>
          <Dialog />
        </MemoryRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
// #endregion
