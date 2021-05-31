import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import '../src/styles.css';
import { IdentityContext } from '../src/common/identity';
import { DialogProvider } from '../src/common/dialog';

const IdentityProvider = ({ children }) => {
  const contextVal = [
    {
      id: '123',
      displayName: 'Trevor Thompson',
      avatar: 'https://i.pravatar.cc/60',
      token: 'abc',
      expireAt: new Date(),
      email: 'trevo@gmail.com',
      roles: [],
    },
    () => undefined,
  ];
  return <IdentityContext.Provider value={contextVal}>{children}</IdentityContext.Provider>;
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <Router>
      <IdentityProvider>
        <DialogProvider>
          <Story />
        </DialogProvider>
      </IdentityProvider>
    </Router>
  ),
];