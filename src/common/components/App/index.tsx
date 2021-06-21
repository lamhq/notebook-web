import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from 'date-fns/locale/vi';
import { theme } from '../../../theme';
import '../../../styles.css';
import ActivityListPage from '../../../diary/pages/ActivityListPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <ActivityListPage />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
