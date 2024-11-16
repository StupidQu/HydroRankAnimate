import './index.css';

import App from './App';
import Cookies from 'js-cookie';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

Cookies.set('sid', window.localStorage.getItem('sid') || '');
Cookies.set('sid.sig', window.localStorage.getItem('sid.sig') || '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
