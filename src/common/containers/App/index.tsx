import React, { Suspense } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider as OldThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from 'date-fns/locale/vi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import '../../../styles.css';
import { theme as oldTheme } from '../../../theme';
import { theme } from '../../../theme2';
import routes from '../../../routes';
import { ProtectedRoute } from '../../../identity';
import LoadingFallback from '../../atoms/LoadingFallback';
import NotFoundPage from '../../pages/NotFoundPage';
import { ApiProvider } from '../../../api';
import { API_BASE_URL } from '../../../config';
import { ConfirmProvider } from '../../../confirm';

const App: React.FC = () => {
  return (
    <OldThemeProvider theme={oldTheme}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
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
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </OldThemeProvider>
  );
};

export default App;
