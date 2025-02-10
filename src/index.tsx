import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import App from './App';
import Provider from './Provider';

async function enableHttpMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./msw/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start();
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  enableHttpMocking()
    .then(() => {
      root.render(
        <StrictMode>
          <Provider>
            <App />
          </Provider>
        </StrictMode>,
      );
    })
    .catch(console.error);
}
