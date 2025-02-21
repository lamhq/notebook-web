import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import App from './App';
import Provider from './Provider';
import './styles.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>,
  );
}
