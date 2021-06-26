import React, { Suspense } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from 'date-fns/locale/vi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { theme } from '../../../theme';
import routes from '../../../routes';
import '../../../styles.css';
import { ProtectedRoute } from '../ProtectedRoute';
import { LoadingContent } from '../../atoms/LoadingContent';
import NotFoundPage from '../../pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
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
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
