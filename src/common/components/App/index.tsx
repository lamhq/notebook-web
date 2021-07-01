import React, { Suspense } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from 'date-fns/locale/vi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../../../styles.css';
import { theme } from '../../../theme';
import routes from '../../../routes';
import { ProtectedRoute } from '../ProtectedRoute';
import { LoadingContent } from '../../atoms/LoadingContent';
import NotFoundPage from '../../pages/NotFoundPage';
import { ApiProvider } from '../../../api';
import { API_BASE_URL } from '../../../config';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <RecoilRoot>
          <ApiProvider baseUrl={API_BASE_URL}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Router key={Math.random()}>
                <Suspense fallback={<LoadingContent />}>
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
            </SnackbarProvider>
          </ApiProvider>
        </RecoilRoot>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
