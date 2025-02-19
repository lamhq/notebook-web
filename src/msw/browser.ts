import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// async function enableNetworkMock() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }
//   const { worker } = await import('./msw/browser');
//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   await worker.start();
// }

// src/index.tsx
// const rootEl = document.getElementById('root');
// if (rootEl) {
//   const root = reactDom.createRoot(rootEl);
//   enableNetworkMock()
//     .then(() => {
//       root.render(
//         <StrictMode>
//           <Provider>
//             <App />
//           </Provider>
//         </StrictMode>,
//       );
//     })
//     .catch(console.error);
// }
