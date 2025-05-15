import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App element not found');
}

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
