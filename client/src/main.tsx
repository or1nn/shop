import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { AuthGuard } from './components/AuthGuard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthGuard>
        <App />
      </AuthGuard>
    </Provider>
  </StrictMode>
);
