import { StrictMode } from 'react';
import reactDom from 'react-dom/client';

import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
