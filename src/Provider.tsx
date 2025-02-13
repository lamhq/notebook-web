import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import type { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { Dialog } from './dialog';
import { theme } from './theme';

const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};

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
          {children}
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
