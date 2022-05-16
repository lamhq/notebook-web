import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import enLocale from 'date-fns/locale/en-US';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../styles.css';
import { theme } from '../theme';
import routes from '../routes';
import { ProtectedRoute } from '../identity';
import LoadingFallback from '../common/atoms/LoadingFallback';
import NotFoundPage from '../common/pages/NotFoundPage';
import { ApiProvider } from '../api';
import { API_BASE_URL } from '../config';
import { ConfirmProvider } from '../confirm';

if (enLocale.options) {
  enLocale.options.weekStartsOn = 1;
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
        <RecoilRoot>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <ApiProvider baseUrl={API_BASE_URL}>
              <ConfirmProvider>
                <Router key={Math.random()}>
                  <Suspense fallback={<LoadingFallback />}>
                    <Switch>
                      {routes.map((r) => (
                        // Added property`key` to Router to fix warning
                        // when hot reloading Route component
                        <ProtectedRoute
                          key={r.path}
                          path={r.path}
                          component={r.component}
                          permissions={r.permissions}
                          exact
                        />
                      ))}

                      {/* 404 homepage */}
                      <Route>
                        <NotFoundPage />
                      </Route>
                    </Switch>
                  </Suspense>
                </Router>
              </ConfirmProvider>
            </ApiProvider>
          </SnackbarProvider>
        </RecoilRoot>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
