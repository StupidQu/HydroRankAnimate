import './index.css';

import App from './App';
import Cookies from 'js-cookie';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

Cookies.set('sid', import.meta.env.VITE_COOKIE_SID);
Cookies.set('sid.sig', import.meta.env.VITE_COOKIE_SID_SIG);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
