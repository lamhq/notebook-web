import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/theme';
import '../src/styles.css';

// import { BrowserRouter as Router } from 'react-router-dom';
// import { IdentityContext } from '../src/common/identity';
// import { DialogProvider } from '../src/common/dialog';

// const IdentityProvider = ({ children }) => {
//   const contextVal = [
//     {
//       id: '123',
//       displayName: 'Trevor Thompson',
//       avatar: 'https://i.pravatar.cc/60',
//       token: 'abc',
//       expireAt: new Date(),
//       email: 'trevo@gmail.com',
//       roles: [],
//     },
//     () => undefined,
//   ];
//   return <IdentityContext.Provider value={contextVal}>{children}</IdentityContext.Provider>;
// };

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

// export const decorators = [
//   (Story) => (
//     <Router>
//       <IdentityProvider>
//         <DialogProvider>
//           <Story />
//         </DialogProvider>
//       </IdentityProvider>
//     </Router>
//   ),
// ];

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];